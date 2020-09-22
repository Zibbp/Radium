<template>
  <div v-if="nowplaying" class="playing">
    <div class="movie">
      <div class="movie__poster">
        <img v-bind:src="media.Poster" />
      </div>
      <div>
        <h2 class="movie__title">
          <div>{{ media.Title }} ({{ media.Year }})</div>
          <div class="movie__rating">{{ media.Rated }}</div>
        </h2>
        <p class="movie__genres">{{ media.Genre }}</p>
        <p class="movie__time">{{ media.Runtime }}</p>
        <div class="movie__stars">
          <p>
            IMDb Rating
            <b-icon icon="star" size="is-small"></b-icon>
            {{ media.imdbRating }} / 10
          </p>

          <!-- <i class="fa fa-star-o" v-for="n in movieData.score.empty" aria-hidden="true"></i> -->
        </div>
        <p class="movie__plot">{{ media.Plot }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowplaying: false,
      media: {
        Poster: "/radium_playing_poster.png",
        Title: "Radium",
        Year: "2020",
        Rated: "PG",
        Runtime: "42 min",
        Genre: "VueJS, Javascript, Socket.IO, HLS",
        Plot:
          "Enter the TV Show or Movie below the player, in the advanced controls, to let the room know what's streaming.",
        imdbRating: "9.3"
      }
    };
  },
  mounted() {
    // Now playing banner
    this.$nuxt.$on("nowplaying", () => {
      this.nowplaying = !this.nowplaying;
    });
    this.$root.mySocket.on("setNowPlaying", playing => {
      this.fetchPlaying(playing);
    });
    // if client joins room late
    this.$nuxt.$on("setPlaying", playing => {
      this.fetchPlaying(playing);
    });
  },
  methods: {
    async fetchPlaying(playing) {
      try {
        if (playing == null) {
        } else {
          var res = await this.$axios.get(
            `https://www.omdbapi.com?apikey=${this.$config.OMDB_API_KEY}&t=${playing}`
          );
          if (res.data.Error == "Movie not found!") {
            $nuxt.$emit("stopLoading");
            this.$buefy.toast.open({
              duration: 2000,
              message: `Can't find ${playing}`,
              position: "is-bottom",
              type: "is-danger"
            });
          } else {
            this.media = res.data;
            $nuxt.$emit("stopLoading");
            this.$buefy.toast.open({
              duration: 2000,
              message: `Now Playing ${playing}`,
              position: "is-bottom",
              type: "is-success"
            });
          }
        }
      } catch (error) {
        console.log(error);
        $nuxt.$emit("stopLoading");
        this.$buefy.toast.open({
          duration: 2000,
          message: `Error`,
          position: "is-bottom",
          type: "is-warning"
        });
      }
    }
  }
};
</script>

<style>
.playing {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 1;
}
.movie {
  display: flex;
  background-color: #18212e;
  padding: 15px 25px 15px 15px;
  font-family: "Open Sans", sans-serif;
}
.movie__poster {
  margin-right: 15px;
  padding: 5px;
  /* width: 176px; */
}
.movie__poster img {
  border-radius: 5px;
  display: block;
  max-width: 230px;
  max-height: 200px;
  width: auto;
  height: auto;
}
.movie__title {
  display: flex;
  justify-content: space-between;
  margin: 0;
  color: #fff;
  font-size: 26px;
  font-weight: 900;
}
.movie__genres {
  color: #808080;
  margin: 0;
  font-style: italic;
}
.movie__time {
  color: #d3d3d3;
  margin: 5px 0 0 0;
}
.movie__stars {
  margin-top: 5px;
  color: #ffd700;
}
.movie__rating {
  right: 25px;
  position: absolute;
}
.movie__plot {
  margin-top: 5px;
  color: #808080;
  width: 100%;
}
</style>
