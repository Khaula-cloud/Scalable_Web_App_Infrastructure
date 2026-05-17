FROM node:20-alpine

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy deps first — Docker layer cache optimization
COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/

USER appuser

EXPOSE 4000

# Healthcheck baked into image
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]
