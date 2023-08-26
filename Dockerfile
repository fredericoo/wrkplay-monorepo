# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS/Prisma"

# Set production environment
RUN npm i -g pnpm

WORKDIR /app
# COPY patches patches
# COPY .nvmrc package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json .npmrc docker-entrypoint ./
# COPY apps/backend/package.json ./apps/backend/package.json
COPY . .
RUN apt-get update -y && apt-get install -y openssl
RUN cd apps/backend && pnpm install --frozen-lockfile
RUN cd apps/backend && pnpm prisma generate

ENV NODE_ENV=production

# Entrypoint prepares the database.
ENTRYPOINT ["/app/docker-entrypoint"]

CMD [ "pnpm", "start", "--filter=backend" ]

