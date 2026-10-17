'use strict';
// Photo storage (docs/ADR.md ADR-3). Railway Storage Bucket (S3-compatible, private) when BUCKET is set; local disk otherwise (dev/tests).
// Railway bucket variables: BUCKET, ACCESS_KEY_ID, SECRET_ACCESS_KEY, REGION, ENDPOINT. BUCKET_PATH_STYLE=1 for MinIO.
// Objects are never public: the app streams them to signed-in users only.
const fs = require('fs');
const path = require('path');

const KEY_RE = /^[A-Za-z0-9/_-]{1,200}\.(jpg|json)$/;
const checkKey = (k) => { if (!KEY_RE.test(k) || k.includes('..')) throw new Error('bad storage key'); return k; };

function fsStore(root) {
  const file = (k) => path.join(root, checkKey(k));
  return {
    kind: 'fs',
    async put(k, buf) { const f = file(k); await fs.promises.mkdir(path.dirname(f), { recursive: true }); await fs.promises.writeFile(f, buf); },
    async get(k) { try { return await fs.promises.readFile(file(k)); } catch (e) { if (e.code === 'ENOENT') return null; throw e; } },
    async del(k) { await fs.promises.rm(file(k), { force: true }); },
    async ping() { await fs.promises.mkdir(root, { recursive: true }); await fs.promises.access(root, fs.constants.W_OK); },
  };
}

function s3Store(env) {
  const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadBucketCommand } = require('@aws-sdk/client-s3');
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
    async ping() { await s3.send(new HeadBucketCommand({ Bucket })); },
  };
}

function create(env = process.env, dataDir) {
  if (env.BUCKET) return s3Store(env);
  return fsStore(path.join(dataDir || path.resolve(env.DATA_DIR || './data'), 'media'));
}

module.exports = { create };
