<h1 align="center">
  <br>
  <a href="https://github.com/Zibbp/Radium"><img src="https://i.imgur.com/gylnyVs.png" alt="Radium" width="500"></a>
  <br>
</h1>

<h4 align="center">🚨 Alpha - Things will break and may not work</h4>

<p align="center">
  <a href="https://github.com/Zibbp/Radium">
    <img src="https://github.com/Zibbp/Radium/workflows/Radium%20Docker%20Image/badge.svg"
         alt="Docker Image">
  </a>
  <a href="https://github.com/Zibbp/Nginx-RTMP"><img src="https://github.com/Zibbp/Nginx-RTMP/workflows/Nginx%20Docker%20Image/badge.svg"></a>
</p>

![screenshot](https://i.imgur.com/ywWYOaQ.jpeg)

## Features

- HLS
  - RTMP to HLS stream with VOD capabilities
  - Direct HLS playback
- Controls
  - Play and Pause buttons are synced between clients
- Sync Room
  - Sync button gets clients time and pushes to others\*
- Chat
  - No login, simply enter a displayname
  - Custom emotes from images
  - Admin authentication\*
- More coming soon!

\*Only Admins are able to sync the room

## Getting Started

Radium runs in a Docker container allowing easy deployment and updating, simply modify and run the docker command.

```bash
# Basic Docker Container
$ docker run -d --name=radium -p 3000:3000 zibbp/radium:latest
```

### Options

##### HLS

To change the HLS url pass the environment variable `HLS_URL` through.

```bash
# Add the following environment variable
-e HLS_URL=https://domain.com/stream.m3u8
```

_If the `HLS_URL` variable is not passed through, a default demo file will play._

##### Base URL

The base url is required for basic functionality.

```bash
# Add the following environment variable
-e BASE_URL=https://radium.example.com
```

##### Admin Token

The admin token is automatically generated and logged to the console whenever started, but a custom one can be passed through.

```bash
# Add the following environment variable
-e ADMIN_TOKEN=secret123
```

## Usage & Documentation

Coming Soon
<br> <br>

> [zibbp.tech](https://zibbp.tech)
> GitHub [@zibbp](https://github.com/zibbp)
