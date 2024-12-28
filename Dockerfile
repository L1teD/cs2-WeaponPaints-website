# TODO: add multistage builds so the final image is not as heavy and maybe also use pnpm instead of npm
FROM node:lts as prod

COPY . .
RUN npm i
ENTRYPOINT ['node', '.']
