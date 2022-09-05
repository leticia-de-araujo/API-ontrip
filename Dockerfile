FROM node:16.16.0

USER root

RUN apt update

ENV PORT=3001

EXPOSE 3001

WORKDIR /app

COPY "package.json" .

RUN yarn

COPY . .

CMD [ "yarn", "dev" ]