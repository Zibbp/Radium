FROM node:16-alpine

ENV NUXT_VERSION=2.15.18

WORKDIR /app

ADD frontend ./
RUN : \
  && yarn install \
  && yarn build --standalone \
  && rm -rf node_modules \
  && rm package.json \
  && yarn add "nuxt-start@${NUXT_VERSION}" \
  && yarn cache clean \
  && :

ENTRYPOINT ["npx", "nuxt-start"]
EXPOSE 3000
