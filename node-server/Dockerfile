FROM node:19-alpine as builder

WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

FROM node:19-alpine

WORKDIR /app
COPY --from=builder /build/package.json /build/yarn.lock ./
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/dist ./dist/
EXPOSE 5000
CMD ["node", "--trace-warnings", "./dist/server.js"]