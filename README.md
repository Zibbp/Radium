<h1 align="center">
  <br>
  <a href="https://github.com/Zibbp/Radium"><img src="https://i.imgur.com/gylnyVs.png" alt="Radium" width="500"></a>
  <br>
</h1>

<h4 align="center">🚨 Alpha - Things will break and may not work</h4>

<p align="center">
  <a href="https://github.com/Zibbp/Radium">
    <img src="https://github.com/Zibbp/Radium/workflows/Build/badge.svg?branch=master"
         alt="Docker Image">
  </a>
  <a href="https://github.com/Zibbp/Nginx-RTMP"><img src="https://github.com/Zibbp/Nginx-RTMP/workflows/Nginx%20Docker%20Image/badge.svg"></a>
</p>

![screenshot](https://i.imgur.com/qW0onMq.png)

## Features

- HLS
  - RTMP to HLS stream with VOD capabilities
  - Direct HLS playback
- Controls
  - Play, pause, and sync all members in the room
- Sync Room
  - Sync button pushes users time to all clients\*
- Chat
  - No login, simply enter a displayname
  - Custom emotes from images
  - Admin authentication\*
- More coming soon!

\*Only Admins are able to sync the room

## Getting Started

### Basic usage

Radium runs in a Docker container, simply modify and run the docker command.

```bash
# Basic Docker Container
$ docker run -d --name=radium -p 3000:3000 -e BASE_URL=https://radium.example.com zibbp/radium:latest
```

### Options

##### Base URL _(REQUIRED)_

The base url is required for basic functionality.

```bash
# Add the following environment variable
-e BASE_URL=https://radium.example.com
```

##### HLS

The HLS url can be changed via an environment variable or within the application when running. To set a permanent url, pass the environment variable `HLS_URL` through.

```bash
# Add the following environment variable
-e HLS_URL=https://domain.com/stream.m3u8
```

_If the `HLS_URL` variable is not passed through, a default demo file will play._

##### Admin Token

The admin token is automatically generated and logged to the console whenever started, but a custom one can be passed through.

```bash
# Add the following environment variable
-e ADMIN_TOKEN=secret123
```

## Documentation

Coming Soon
<br> <br>

> [zibbp.tech](https://zibbp.tech) &nbsp;&middot;&nbsp;
> GitHub [@zibbp](https://github.com/zibbp) &nbsp;&middot;&nbsp;
