# ---------- Build stage ----------
FROM node:20-slim AS build
WORKDIR /app

# 1. Install dependencies (cache optimized)
COPY package*.json tsconfig*.json ./
RUN npm ci

# 2. Copy source code
COPY . .

# 3. Configure buildtime (--build-arg)
ARG VITE_GIST_ID_EN
ARG VITE_GIST_ID_FR

# 4. Build the application
RUN npm run build

# ---------- Runtime stage ----------
FROM node:20-slim AS runtime
WORKDIR /app

# 5. Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# 6. Copy compiled artifacts only
COPY --from=build /app/dist/ ./dist/

# 7. Configure runtime (-e)
ENV PORT=5173
ENV NODE_ENV=production

EXPOSE $PORT

# 8. Drop privileges as non-root user (security best practice)
RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

CMD ["node", "dist/server.js"]
