FROM node:12.19.0-alpine3.12

# create destination directory
WORKDIR /opt/app

COPY package.json package-lock.json* ./

# copy the app, note .dockerignore
RUN npm install

COPY . /opt/app

# build
RUN npm run build

# expose 3000 on container
EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "start" ]