FROM node:lts-alpine

WORKDIR /app

COPY ./app/package.json .

COPY ./app/yarn.lock .

RUN yarn install

COPY ./app /app/

RUN npm install -g serve

ENTRYPOINT [ "sh", "script.sh" ]