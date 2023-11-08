FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
COPY --from=builder /app/dist /app
EXPOSE 4000
CMD ["npm", "run", "preview", "--host"]