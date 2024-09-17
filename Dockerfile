FROM node:20 as node-base

# 1. Install dependencies and build Next.js application
FROM node-base as builder
WORKDIR /app
COPY . ./

RUN npm install

RUN npm run build

# 2. Copy all the files and run Next.js applicaton
FROM node-base as runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# @TODO: Docker image is still 1.1 gb and should be easily reduced

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
ENV NODE_ENV production
# Disable Next.js telemetry
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
CMD ["node", "server.js"]
