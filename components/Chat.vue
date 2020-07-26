<template>
  <div class="has-background-black-ter chat-panel">
    <!-- messages panel -->
    <div class="message-panel" id="message-panel">
      <div class="chat-message" v-for="item in chat" :key="item.message">
        <img
          v-if="item.user.isAdmin"
          src="/admin.png"
          class="admin-badge"
          alt="admin"
        />
        <strong :style="{ color: item.user.color }"
          >{{ item.user.username }}:&nbsp;</strong
        >
        <div v-html="item.message" />
      </div>
    </div>
    <!-- input panel -->
    <div class="input-panel">
      <form>
        <div class="control">
          <input
            class="input message-input has-text-white"
            v-model="message"
            type="text"
            placeholder="Send a message"
          />
        </div>
        <div class="control">
          <!-- <button
            v-if="this.$store.state.user.isAdmin"
            class="button is-black is-pulled-left"
          >
            Admin
          </button> -->
          <button
            @click.prevent="sendMessage"
            class="button is-success is-outlined is-pulled-right"
          >
            Chat
          </button>
        </div>
      </form>
    </div>
    <b-modal
      :active.sync="isComponentModalActive"
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <Emotes></Emotes>
    </b-modal>
  </div>
</template>

<script>
import socket from "~/plugins/socket.io";
import Emotes from "./Emotes";
export default {
  components: { Emotes },
  data() {
    return {
      isComponentModalActive: false,
      chat: [],
      message: ""
    };
  },
  mounted() {
    socket.on("newMessage", message => {
      this.chat.push(message);
      this.$nextTick(() => {
        this.setScrollToEnd();
      });
    });
  },
  methods: {
    setScrollToEnd() {
      const element = document.getElementById("message-panel");
      element.scrollTop = element.offsetHeight + element.scrollHeight;
    },
    async sendMessage() {
      if (this.message == "/help") {
        this.message = "/auth<br>/emotes";
        this.message = "";
      } else if (this.message == "/emotes") {
        this.isComponentModalActive = true;
        this.message = "";
      } else if (this.message.substring(0, 5) == "/auth") {
        var code = this.message.substring(6);
        try {
          var res = await this.$axios.post(`${this.$config.BASE_URL}/auth`, {
            code
          });
          this.$buefy.toast.open({
            duration: 1000,
            message: `Authenticated`,
            position: "is-bottom",
            type: "is-success"
          });
          this.$store.commit("isAdmin");
        } catch (error) {
          console.log(error);
          this.$buefy.toast.open({
            duration: 1000,
            message: `Incorrect Code`,
            position: "is-bottom",
            type: "is-danger"
          });
        }

        this.message = "";
      } else if (this.message == "") {
        this.message = "";
      } else {
        const emotes = {
          "3Head": "<img src=/emotes/3Head.png>",
          "4Weird": "<img src=/emotes/4Weird.png>",
          "5Head": "<img src=/emotes/5Head.png>",
          array: "<img src=/emotes/array.js>",
          asmonSmash: "<img src=/emotes/asmonSmash.gif>",
          blobDance: "<img src=/emotes/blobDance.gif>",
          Clap: "<img src=/emotes/Clap.gif>",
          cmonBruh: "<img src=/emotes/cmonBruh.png>",
          COGGERS: "<img src=/emotes/COGGERS.gif>",
          Dance: "<img src=/emotes/Dance.gif>",
          DansGame: "<img src=/emotes/DansGame.png>",
          ditto: "<img src=/emotes/ditto.gif>",
          docSpin: "<img src=/emotes/docSpin.gif>",
          DonoWall: "<img src=/emotes/DonoWall.gif>",
          EZ: "<img src=/emotes/EZ.png>",
          FeelsWeirdMan: "<img src=/emotes/FeelsWeirdMan.png>",
          forsenCD: "<img src=/emotes/forsenCD.png>",
          gachiBASS: "<img src=/emotes/gachiBASS.gif>",
          gachiGASM: "<img src=/emotes/gachiGASM.png>",
          gachiHYPER: "<img src=/emotes/gachiHYPER.gif>",
          HACKERMANS: "<img src=/emotes/HACKERMANS.gif>",
          HandsUp: "<img src=/emotes/HandsUp.png>",
          headBang: "<img src=/emotes/headBang.gif>",
          HYPERCLAP: "<img src=/emotes/HYPERCLAP.gif>",
          Jebaited: "<img src=/emotes/Jebaited.png>",
          Kapp: "<img src=/emotes/Kapp.png>",
          Kappa: "<img src=/emotes/Kappa.png>",
          KEKW: "<img src=/emotes/KEKW.png>",
          KKomrade: "<img src=/emotes/KKomrade.png>",
          KKonaW: "<img src=/emotes/KKonaW.png>",
          Kreygasm: "<img src=/emotes/Kreygasm.png>",
          LULW: "<img src=/emotes/LULW.png>",
          monkaS: "<img src=/emotes/monkaS.png>",
          monkaW: "<img src=/emotes/monkaW.png>",
          monkaX: "<img src=/emotes/monkaX.gif>",
          OMEGALUL: "<img src=/emotes/OMEGALUL.png>",
          parse: "<img src=/emotes/parse.js>",
          PeepoCheer: "<img src=/emotes/PeepoCheer.gif>",
          peepoClap: "<img src=/emotes/peepoClap.gif>",
          PeepoDance: "<img src=/emotes/PeepoDance.gif>",
          peepoHappy: "<img src=/emotes/peepoHappy.png>",
          peepoHug: "<img src=/emotes/peepoHug.png>",
          peepoLeave: "<img src=/emotes/peepoLeave.gif>",
          peepoPogClimbingTreeHard4House:
            "<img src=/emotes/peepoPogClimbingTreeHard4House.gif>",
          peepoPoo: "<img src=/emotes/peepoPoo.png>",
          peepoPooPoo: "<img src=/emotes/peepoPooPoo.gif>",
          peepoS: "<img src=/emotes/peepoS.png>",
          peepoSad: "<img src=/emotes/peepoSad.png>",
          peepoSimp: "<img src=/emotes/peepoSimp.gif>",
          peepoSmash: "<img src=/emotes/peepoSmash.gif>",
          peepoWTF: "<img src=/emotes/peepoWTF.png>",
          pepeD: "<img src=/emotes/pepeD.gif>",
          Pepega: "<img src=/emotes/Pepega.png>",
          PepegaAim: "<img src=/emotes/PepegaAim.gif>",
          PepegaGun: "<img src=/emotes/PepegaGun.gif>",
          PepegaPls: "<img src=/emotes/PepegaPls.gif>",
          PepeHands: "<img src=/emotes/PepeHands.png>",
          pepeJAM: "<img src=/emotes/pepeJAM.gif>",
          PepeLaugh: "<img src=/emotes/PepeLaugh.png>",
          pepeMeltdown: "<img src=/emotes/pepeMeltdown.gif>",
          PepePls: "<img src=/emotes/PepePls.gif>",
          PETTHEPEEPO: "<img src=/emotes/PETTHEPEEPO.gif>",
          Pog: "<img src=/emotes/Pog.png>",
          POGGERS: "<img src=/emotes/POGGERS.png>",
          PogU: "<img src=/emotes/PogU.png>",
          ppHop: "<img src=/emotes/ppHop.gif>",
          ppOverheat: "<img src=/emotes/ppOverheat.gif>",
          ResidentSleeper: "<img src=/emotes/ResidentSleeper.png>",
          ricardoFlick: "<img src=/emotes/ricardoFlick.gif>",
          Sadge: "<img src=/emotes/Sadge.png>",
          smileW: "<img src=/emotes/smileW.png>",
          sumSmash: "<img src=/emotes/sumSmash.gif>",
          Triathalon: "<img src=/emotes/Triathalon.gif>",
          TriDance: "<img src=/emotes/TriDance.gif>",
          TriHard: "<img src=/emotes/TriHard.png>",
          WAYTOODANK: "<img src=/emotes/WAYTOODANK.gif>",
          WeirdChamp: "<img src=/emotes/WeirdChamp.png>",
          WideArrive: "<img src=/emotes/WideArrive.gif>",
          WideHard: "<img src=/emotes/WideHard.png>",
          WideHarder: "<img src=/emotes/WideHarder.png>",
          WideHardo: "<img src=/emotes/WideHardo.png>",
          widepeepoHappy: "<img src=/emotes/widepeepoHappy.png>",
          widepeepoHappyRightHeart:
            "<img src=/emotes/widepeepoHappyRightHeart.gif>",
          YAPP: "<img src=/emotes/YAPP.gif>",
          YEP: "<img src=/emotes/YEP.png>"
        };
        const stringArr = this.message.split(" ");
        const result = stringArr
          .map(word => (emotes[word] ? emotes[word] : word))
          .join(" ");
        var message = {
          message: result,
          user: this.$store.state.user
        };
        socket.emit("message", message);
        this.message = "";
      }
    }
  }
};
</script>

<style lang="scss">
.input-panel {
  /* display: flex; */
  width: 16.6vw;
  bottom: 0;
  position: absolute;
}
.message-panel {
  height: 92%;
  overflow: scroll;
  padding: 0.5rem;
}

.message-panel::-webkit-scrollbar {
  display: none;
}
.message-panel {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.chat-panel {
  max-height: 94vh;
  height: 94vh;
}
.chat-input {
  width: 75%;
}
.chat-button {
  width: 25%;
}
.message-input {
  background-color: hsl(0, 0%, 4%);
  border-color: #1b1c25;
}
.chat-message {
  color: #d3d3d3;
  display: flex;
}
.admin-badge {
  height: 18px;
  width: 18px;
  margin-top: 3px;
  margin-right: 5px;
}
.input:hover {
  border-color: hsl(141, 71%, 48%);
}
.input:active {
  border-color: hsl(141, 71%, 48%) !important;
  color: hsl(141, 71%, 48%) !important;
}
</style>
