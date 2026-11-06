// scripts/provision.mjs against a local stand-in for Railway's GraphQL API: the sequence of mutations, their shapes, the variables the
// app needs, the DATABASE_URL reference, the registry line — and that no family code or secret ever lands anywhere but the API call.
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';

let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('provision (mock Railway API)');
const calls = [];
const mock = http.createServer((req, res) => {
  let body = ''; req.on('data', (d) => { body += d; });
  req.on('end', () => {
    const b = JSON.parse(body); const op = /(mutation|query)\s+(\w+)/.exec(b.query)[2];
    calls.push({ op, auth: req.headers.authorization, v: b.variables });
    const data = { projectCreate: { projectCreate: { id: 'p1', name: b.variables.input && b.variables.input.name } }, environments: { environments: { edges: [{ node: { id: 'e1', name: 'production' } }] } },
      serviceCreate: { serviceCreate: { id: `s${calls.length}`, name: (b.variables.input || {}).name } }, volumeCreate: { volumeCreate: { id: 'v1' } }, serviceInstanceUpdate: { serviceInstanceUpdate: true },
      variableCollectionUpsert: { variableCollectionUpsert: true }, serviceDomainCreate: { serviceDomainCreate: { id: 'd1', domain: 'mm-test.up.railway.app' } }, serviceInstanceDeployV2: { serviceInstanceDeployV2: 'dep1' } }[op];
    res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ data }));
  });
});
await new Promise((r) => mock.listen(0, r));
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-prov-')), reg = path.join(dir, 'families.json');
try {
  // async spawn: the mock answers from this very process, so a blocking spawnSync would deadlock
  const run = (args, env = {}) => new Promise((res) => {
    const p = spawn(process.execPath, ['scripts/provision.mjs', ...args], { env: { ...process.env, RAILWAY_API: `http://127.0.0.1:${mock.address().port}`, RAILWAY_TOKEN: 'tok-test', ANTHROPIC_API_KEY: 'sk-test-key', ...env } });
    let stdout = '', stderr = ''; p.stdout.on('data', (d) => { stdout += d; }); p.stderr.on('data', (d) => { stderr += d; });
    p.on('exit', (status) => res({ status, stdout, stderr }));
  });
  const bad = await run(['Bad Name']); ok(bad.status === 1 && /usage/.test(bad.stderr), 'a bad family name is refused');
  const r = await run(['smith', '--code=24681357', '--view-pin=135790', `--registry=${reg}`]);
  ok(r.status === 0, `runs to the end (${r.status})${r.status ? '\n' + r.stderr : ''}`);
  const ops = calls.map((c) => c.op).join(',');
  ok(ops === 'projectCreate,environments,serviceCreate,volumeCreate,serviceInstanceUpdate,serviceCreate,variableCollectionUpsert,serviceInstanceUpdate,serviceDomainCreate,serviceInstanceDeployV2', `the documented mutations in order (${ops})`);
  ok(calls.every((c) => c.auth === 'Bearer tok-test'), 'every call carries the token as Authorization: Bearer');
  ok(calls[0].v.input.name === 'mm-smith' && calls[0].v.input.defaultEnvironmentName === 'production', 'projectCreate: mm-<family>, environment production');
  const pg = calls[2].v.input, app = calls[5].v.input;
  ok(pg.name === 'Postgres' && pg.source.image.startsWith('postgres:16') && pg.variables.POSTGRES_DB === 'mb' && pg.variables.POSTGRES_PASSWORD.length >= 20, 'Postgres: image service with its own random password');
  ok(calls[3].v.input.serviceId === 's3' && calls[3].v.input.mountPath === '/var/lib/postgresql/data' && calls[3].v.input.environmentId === 'e1', 'Postgres: a volume for its data');
  ok(app.name === 'App' && app.source.repo === 'wayla69/Family-Trip' && app.branch === 'main', 'App: from the repo, branch main');
  const vars = calls[6].v.input.variables;
  ok(calls[6].v.input.serviceId === 's6' && vars.FAMILY_CODE === '24681357' && vars.VIEW_PIN === '135790' && /^[A-Za-z0-9_-]{10,}$/.test(vars.VIEW_TOKEN) && vars.SESSION_SECRET.length >= 40 && vars.BACKUP_TOKEN.length >= 30 && vars.ANTHROPIC_API_KEY === 'sk-test-key' && vars.STORY_DAILY === '60' && vars.DATA_DIR === '/data', 'App variables: the codes given, fresh random secrets, the Claude key, the caps');
  ok(vars.DATABASE_URL === `postgresql://postgres:${pg.variables.POSTGRES_PASSWORD}@\${{Postgres.RAILWAY_PRIVATE_DOMAIN}}:5432/mb` && calls[6].v.input.skipDeploys === true, 'DATABASE_URL references the Postgres service; no deploy before the settings are in');
  ok(calls[7].v.input.healthcheckPath === '/healthz' && calls[7].v.input.sleepApplication === false && calls[7].v.input.region === 'asia-southeast1', 'App settings: /healthz health check, never sleeps, Singapore region');
  ok(calls[8].v.input.serviceId === 's6' && calls[9].v.serviceId === 's6', 'domain and first deploy on the App service');
  const regRows = JSON.parse(fs.readFileSync(reg, 'utf8'));
  ok(regRows.length === 1 && regRows[0].name === 'smith' && regRows[0].url === 'https://mm-test.up.railway.app' && regRows[0].token === vars.BACKUP_TOKEN && !JSON.stringify(regRows).includes('24681357') && !JSON.stringify(regRows).includes(vars.SESSION_SECRET), 'registry: name, url and backup token only — never the family code or the session secret');
  ok(r.stdout.includes('24681357') && r.stdout.includes('135790') && r.stdout.includes('/v/' + vars.VIEW_TOKEN) && r.stdout.includes('Bucket') && !r.stdout.includes(vars.SESSION_SECRET), 'prints the codes and the relatives\' link once, the bucket steps, never the session secret');
  calls.length = 0;
  const d = await run(['jones', '--dry', `--registry=${reg}`], { RAILWAY_TOKEN: '' });
  ok(d.status === 0 && calls.length === 0 && d.stdout.includes('[dry]') && JSON.parse(fs.readFileSync(reg, 'utf8')).length === 1, '--dry: prints the plan, calls nothing, writes nothing');
} finally { mock.close(); fs.rmSync(dir, { recursive: true, force: true }); }
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
