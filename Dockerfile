# Stage 1: Build React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/React
COPY React/package*.json ./
RUN npm ci
COPY React/ ./
RUN npm run build

# Stage 2: Production Node.js Backend Server & Serving Static Assets
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001

COPY Backend/package*.json ./Backend/
WORKDIR /app/Backend
RUN npm ci --only=production

COPY Backend/ ./
COPY --from=frontend-builder /app/React/dist /app/React/dist

EXPOSE 5001

CMD ["node", "server.js"]
