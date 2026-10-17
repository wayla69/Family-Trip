# Memory Book — Node 22, SQLite on a persistent volume mounted at /data
FROM node:22-bookworm-slim AS deps
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-bookworm-slim
ENV NODE_ENV=production DATA_DIR=/data PORT=3000
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
# headless Chromium (shell only) for the server-side A4 PDF, same version as playwright-core
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
RUN node node_modules/playwright-core/cli.js install --with-deps --only-shell chromium && rm -rf /var/lib/apt/lists/* /tmp/*
COPY package.json ./
COPY server server
COPY migrations migrations
COPY public public
COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server/index.js"]
