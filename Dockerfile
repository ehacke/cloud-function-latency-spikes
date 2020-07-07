FROM node:12

ENV NODE_ENV production
ENV UV_THREADPOOL_SIZE 10
ENV PORT 3000

# App install
WORKDIR /app

COPY package-lock.json /app
COPY package.json /app

RUN npm install --production

COPY ./src src/

CMD ["node", "src/run.js"]
