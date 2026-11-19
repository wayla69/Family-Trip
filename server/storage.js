'use strict';
// Photo storage (docs/ADR.md ADR-3). Railway Storage Bucket (S3-compatible, private) when BUCKET is set; local disk otherwise (dev/tests).
// Railway bucket variables: BUCKET, ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, ENDPOINT. BUCKET_PATH_STYLE=1 for MinIO.
// Objects are never public: the app streams them to signed-in users only.
const fs = require('fs');
const path = require('path');

const KEY_RE = /^[A-Za-z0-9/_-]{1,200}\.(jpg|png|svg|json|webm|m4a|mp3|ogg|aac|mp4)$/;   // photos, thumbnails, the odd json, the kids' voice memos, their video clips (mp4), their drawn characters (png) and a book's drawn pictures (svg)
const checkKey = (k) => { if (!KEY_RE.test(k) || k.includes('..')) throw new Error('bad storage key'); return k; };

function fsStore(root) {
  const file = (k) => path.join(root, checkKey(k));
  return {
    kind: 'fs',
    async put(k, buf) { const f = file(k); await fs.promises.mkdir(path.dirname(f), { recursive: true }); await fs.promises.writeFile(f, buf); },
    async get(k) { try { return await fs.promises.readFile(file(k)); } catch (e) { if (e.code === 'ENOENT') return null; throw e; } },
    async del(k) { await fs.promises.rm(file(k), { force: true }); },
    // a part of an object (a film or a clip asked for by byte range): only those bytes are read — never the whole file per request
    async size(k) { try { return (await fs.promises.stat(file(k))).size; } catch (e) { if (e.code === 'ENOENT') return null; throw e; } },
    stream(k, a, b) { return fs.createReadStream(file(k), { start: a, end: b }); },
    // every object under a folder ('p/'): {key, size, at} — the stray-file sweep's view of what is stored
    async *list(prefix) {
      const base = path.join(root, prefix);
      async function* walk(d) {
        let ents; try { ents = await fs.promises.readdir(d, { withFileTypes: true }); } catch (e) { if (e.code === 'ENOENT') return; throw e; }
        for (const e of ents) {
          const f = path.join(d, e.name);
          if (e.isDirectory()) yield* walk(f);
          else if (e.isFile()) { const st = await fs.promises.stat(f); yield { key: path.relative(root, f).split(path.sep).join('/'), size: st.size, at: st.mtimeMs }; }
        }
      }
      yield* walk(base);
    },
    async ping() { await fs.promises.mkdir(root, { recursive: true }); await fs.promises.access(root, fs.constants.W_OK); },
  };
}

function s3Store(env) {
  const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadBucketCommand, HeadObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
  const Bucket = env.BUCKET;
  const s3 = new S3Client({
    region: env.REGION || 'auto',
    endpoint: env.ENDPOINT,
    forcePathStyle: env.BUCKET_PATH_STYLE === '1',
    requestChecksumCalculation: 'WHEN_REQUIRED',   // non-AWS S3: skip the SDK's default CRC32 headers
    responseChecksumValidation: 'WHEN_REQUIRED',
    credentials: { accessKeyId: env.ACCESS_KEY_ID, secretAccessKey: env.SECRET_ACCESS_KEY },
  });
  return {
    kind: 's3',
    async put(k, buf, mime = 'image/jpeg') { await s3.send(new PutObjectCommand({ Bucket, Key: checkKey(k), Body: buf, ContentType: mime })); },
    async get(k) {
      try {
        const r = await s3.send(new GetObjectCommand({ Bucket, Key: checkKey(k) }));
        return Buffer.from(await r.Body.transformToByteArray());
      } catch (e) { if (e.name === 'NoSuchKey' || e.$metadata?.httpStatusCode === 404) return null; throw e; }
    },
    async del(k) { await s3.send(new DeleteObjectCommand({ Bucket, Key: checkKey(k) })); },
    async size(k) {
      try { return Number((await s3.send(new HeadObjectCommand({ Bucket, Key: checkKey(k) }))).ContentLength); }
      catch (e) { if (e.name === 'NotFound' || e.name === 'NoSuchKey' || e.$metadata?.httpStatusCode === 404) return null; throw e; }
    },
    async stream(k, a, b) { return (await s3.send(new GetObjectCommand({ Bucket, Key: checkKey(k), Range: `bytes=${a}-${b}` }))).Body; },
    async *list(prefix) {
      let token;
      do {
        const r = await s3.send(new ListObjectsV2Command({ Bucket, Prefix: prefix, ContinuationToken: token, MaxKeys: 1000 }));
        for (const o of r.Contents || []) yield { key: o.Key, size: Number(o.Size) || 0, at: o.LastModified ? new Date(o.LastModified).getTime() : 0 };
        token = r.IsTruncated ? r.NextContinuationToken : undefined;
      } while (token);
    },
    async ping() { await s3.send(new HeadBucketCommand({ Bucket })); },
  };
}

function create(env = process.env, dataDir) {
  if (env.BUCKET) return s3Store(env);
  return fsStore(path.join(dataDir || path.resolve(env.DATA_DIR || './data'), 'media'));
}

module.exports = { create };
