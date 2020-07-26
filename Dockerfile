FROM mhart/alpine-node:12

# create destination directory
RUN mkdir -p /usr/src/radium
WORKDIR /usr/src/radium

# copy the app, note .dockerignore
COPY . /usr/src/radium/
RUN npm install

# build
RUN npm run build

# expose 3000 on container
EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# start the app
CMD [ "npm", "start" ]