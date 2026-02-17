# ---------- BUILD STAGE ----------
FROM node:20-slim AS build
WORKDIR /app

# Copy dependency files to allow caching 'npm ci' products
COPY package*.json tsconfig*.json ./

RUN npm ci

# Copy rest of files to allow next 'npm build'
COPY . .

# ---- Build-time variables (Vite only) ----
# Declare argument used with --build-arg
ARG VITE_GIST_ID_EN
ARG VITE_GIST_ID_FR

# Build bundle
RUN npm run build

# ---------- RUNTIME STAGE ----------
FROM node:20-slim as runtime
WORKDIR /app

# Copy only necessary runtime files
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules

# ---- Runtime configuration ----
ENV PORT=4173

EXPOSE $PORT

CMD ["npm", "run", "preview", "--", "--host"]