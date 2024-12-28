# TODO: add multistage builds so the final image is not as heavy and maybe also use pnpm instead of npm
FROM node:lts-alpine as prod

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT ["node", "index.js"]
