<h1 align="center">
  <br>
  <a href="https://github.com/Zibbp/Radium"><img src="https://i.imgur.com/gylnyVs.png" alt="Radium" width="500"></a>
  <br>
</h1>

<h4 align="center">🖥️<a href="https://radium-demo.herokuapp.com" target="_blank">Demo</a><i> may take a minute to wake app</i></h4>

<p align="center">
  Radium<a href="https://github.com/Zibbp/Radium">
    <img src="https://github.com/Zibbp/Radium/workflows/Build/badge.svg?branch=master"
         alt="Docker Image">
  </a>
  Nginx-RTMP-HLS <a href="https://github.com/Zibbp/Nginx-RTMP-HLS"><img src="https://github.com/Zibbp/Nginx-RTMP-HLS/workflows/Build/badge.svg"></a>
</p>

![screenshot](https://i.imgur.com/lHmxc6m.png)
Advanced Controls found below the player
![screenshot_ac](https://i.imgur.com/vHE50aH.png)

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
- Now Playing
  - Set what is being played [more info](https://github.com/Zibbp/Radium/wiki/Now-Playing---OMDb-API)
- More coming soon!

\*Only Admins are able to sync the room

## Getting Started

### Basic usage

Radium runs in a Docker container, simply modify and run the docker command.

```bash
# Basic Docker Container
$ docker run -d --name=radium -p 3000:3000 -e BASE_URL=https://radium.example.com zibbp/radium:latest
```

**Prefer using docker compose? Check out the [`docker-compose.yml`](https://github.com/Zibbp/Radium/blob/master/docker-compose.yml)**

Want to use Heroku? Click the button, enter environment variables, and click deploy!

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Options

##### Base URL _(REQUIRED)_

The base url is required for basic functionality.

_If not using a reverse proxy and a domain, the IP and PORT need to be supplied._

```bash
# Add the following environment variable
-e BASE_URL=https://radium.example.com
```

or

```bash
# Add the following environment variable
-e BASE_URL=http://1.2.3.4:3000
```

##### HLS

The HLS url can be changed via an environment variable or within the application when running. To set a permanent url, pass the environment variable `HLS_URL` through.

```bash
# Add the following environment variable
-e HLS_URL=https://domain.com/stream.m3u8
```

_If the `HLS_URL` variable is not passed through, a default demo file will play._

> Visit the documentation for generating HLS media.

##### Admin Token

The admin token is automatically generated and logged to the console whenever started, but a custom one can be passed through.

```bash
# Add the following environment variable
-e ADMIN_TOKEN=secret123
```

> Visit the documentation for token usage.

## Documentation

### [Full Documentation](https://github.com/Zibbp/Radium/wiki)

#### Highlights

- [Generating HLS media](https://github.com/Zibbp/Radium/wiki/HLS)
- [Chat Commands](https://github.com/Zibbp/Radium/wiki/Chat-Commands)
- [Advanced Usage](https://github.com/Zibbp/Radium/wiki/Advanced-Usage)

## Alternatives

##### Looking for something else? Check out these amazing opensource projects.

- [MovieNight](https://github.com/zorchenhimer/MovieNight) _This is a single-instance streaming server with chat. Originally written to replace Rabbit as the platform for watching movies with a group of people online._
- [Open Streaming Platform](https://gitlab.com/Deamos/flask-nginx-rtmp-manager) _A Self-Hosted Video Streaming and Recording Server Using Python, Flask, Nginx-RTMP._
- [Jellyfin](https://github.com/jellyfin/jellyfin) _The Free Software Media System_ **v10.6 introduced a synced playback feature**

## Information

> [zibbp.tech](https://zibbp.tech) &nbsp;&middot;&nbsp;
> GitHub [@zibbp](https://github.com/zibbp) &nbsp;&middot;&nbsp;

## License

Radium is distributed under the terms of the MIT license. See [LICENSE.md](https://github.com/Zibbp/Radium/blob/master/LICENSE) for details.
