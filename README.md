# Radium

## Next version of Radium

![radium-next](https://user-images.githubusercontent.com/21207065/163601003-87ceb20e-014f-4966-b2db-52d6b52d49cb.png)

This version of Radium is a demonstration of newer streaming technologies. For streaming it uses [OvenMediaEngine](https://github.com/AirenSoft/OvenMediaEngine), an open source streaming server that enables large-scale and sub-second latency live streaming.

The video player in Radium Next is OvenMedia's player [OvenPlayer](https://www.ovenmediaengine.com/ovenplayer). OvenPlayer supports a variety of streaming protocols such as WebRTC, LL MPEG-DASH, DASH, and HLS.

Radium Next is not as feature rich as the original Radium. It's primary purpose was a technology demonstration and for movie nights / streaming whatever with friends.

### Best Results

I have been using OBS to stream SRT to OvenMediaEngine then serving the stream via WebRTC to Radium Next. This setup provides a smooth, secure, sub-second stream.

## Getting Started

1. Setup [OvenMediaEngine](https://github.com/AirenSoft/OvenMediaEngine).
2. Use the provided `docker-compose.yml` in the repository to setup Radium Next.
   - Edit the environment variables in the compose file to match your needs.
3. Bring it up with `docker compose up -d`.
