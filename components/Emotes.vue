<template>
  <table class="table is-narrow is-bordered">
    <thead>
      <tr>
        <th class="table-head">Emote</th>
        <th class="table-head">Preview</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in emotes" :key="item.name">
        <td>{{ item.name }}</td>
        <td v-html="item.emote"></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      emotes: [
        { name: "3Head", emote: "<img src=/emotes/3Head.png>" },
        { name: "4Weird", emote: "<img src=/emotes/4Weird.png>" },
        { name: "5Head", emote: "<img src=/emotes/5Head.png>" },
        { name: "array", emote: "<img src=/emotes/array.js>" },
        { name: "asmonSmash", emote: "<img src=/emotes/asmonSmash.gif>" },
        { name: "blobDance", emote: "<img src=/emotes/blobDance.gif>" },
        { name: "Clap", emote: "<img src=/emotes/Clap.gif>" },
        { name: "cmonBruh", emote: "<img src=/emotes/cmonBruh.png>" },
        { name: "COGGERS", emote: "<img src=/emotes/COGGERS.gif>" },
        { name: "Dance", emote: "<img src=/emotes/Dance.gif>" },
        { name: "DansGame", emote: "<img src=/emotes/DansGame.png>" },
        { name: "ditto", emote: "<img src=/emotes/ditto.gif>" },
        { name: "docSpin", emote: "<img src=/emotes/docSpin.gif>" },
        { name: "DonoWall", emote: "<img src=/emotes/DonoWall.gif>" },
        { name: "EZ", emote: "<img src=/emotes/EZ.png>" },
        { name: "FeelsWeirdMan", emote: "<img src=/emotes/FeelsWeirdMan.png>" },
        { name: "forsenCD", emote: "<img src=/emotes/forsenCD.png>" },
        { name: "gachiBASS", emote: "<img src=/emotes/gachiBASS.gif>" },
        { name: "gachiGASM", emote: "<img src=/emotes/gachiGASM.png>" },
        { name: "gachiHYPER", emote: "<img src=/emotes/gachiHYPER.gif>" },
        { name: "HACKERMANS", emote: "<img src=/emotes/HACKERMANS.gif>" },
        { name: "HandsUp", emote: "<img src=/emotes/HandsUp.png>" },
        { name: "headBang", emote: "<img src=/emotes/headBang.gif>" },
        { name: "HYPERCLAP", emote: "<img src=/emotes/HYPERCLAP.gif>" },
        { name: "Jebaited", emote: "<img src=/emotes/Jebaited.png>" },
        { name: "Kapp", emote: "<img src=/emotes/Kapp.png>" },
        { name: "Kappa", emote: "<img src=/emotes/Kappa.png>" },
        { name: "KEKW", emote: "<img src=/emotes/KEKW.png>" },
        { name: "KKomrade", emote: "<img src=/emotes/KKomrade.png>" },
        { name: "KKonaW", emote: "<img src=/emotes/KKonaW.png>" },
        { name: "Kreygasm", emote: "<img src=/emotes/Kreygasm.png>" },
        { name: "LULW", emote: "<img src=/emotes/LULW.png>" },
        { name: "monkaS", emote: "<img src=/emotes/monkaS.png>" },
        { name: "monkaW", emote: "<img src=/emotes/monkaW.png>" },
        { name: "monkaX", emote: "<img src=/emotes/monkaX.gif>" },
        { name: "OMEGALUL", emote: "<img src=/emotes/OMEGALUL.png>" },
        { name: "parse", emote: "<img src=/emotes/parse.js>" },
        { name: "PeepoCheer", emote: "<img src=/emotes/PeepoCheer.gif>" },
        { name: "peepoClap", emote: "<img src=/emotes/peepoClap.gif>" },
        { name: "PeepoDance", emote: "<img src=/emotes/PeepoDance.gif>" },
        { name: "peepoHappy", emote: "<img src=/emotes/peepoHappy.png>" },
        { name: "peepoHug", emote: "<img src=/emotes/peepoHug.png>" },
        { name: "peepoLeave", emote: "<img src=/emotes/peepoLeave.gif>" },
        {
          name: "peepoPogClimbingTreeHard4House",
          emote: "<img src=/emotes/peepoPogClimbingTreeHard4House.gif>"
        },
        { name: "peepoPoo", emote: "<img src=/emotes/peepoPoo.png>" },
        { name: "peepoPooPoo", emote: "<img src=/emotes/peepoPooPoo.gif>" },
        { name: "peepoS", emote: "<img src=/emotes/peepoS.png>" },
        { name: "peepoSad", emote: "<img src=/emotes/peepoSad.png>" },
        { name: "peepoSimp", emote: "<img src=/emotes/peepoSimp.gif>" },
        { name: "peepoSmash", emote: "<img src=/emotes/peepoSmash.gif>" },
        { name: "peepoWTF", emote: "<img src=/emotes/peepoWTF.png>" },
        { name: "pepeD", emote: "<img src=/emotes/pepeD.gif>" },
        { name: "Pepega", emote: "<img src=/emotes/Pepega.png>" },
        { name: "PepegaAim", emote: "<img src=/emotes/PepegaAim.gif>" },
        { name: "PepegaGun", emote: "<img src=/emotes/PepegaGun.gif>" },
        { name: "PepegaPls", emote: "<img src=/emotes/PepegaPls.gif>" },
        { name: "PepeHands", emote: "<img src=/emotes/PepeHands.png>" },
        { name: "pepeJAM", emote: "<img src=/emotes/pepeJAM.gif>" },
        { name: "PepeLaugh", emote: "<img src=/emotes/PepeLaugh.png>" },
        { name: "pepeMeltdown", emote: "<img src=/emotes/pepeMeltdown.gif>" },
        { name: "PepePls", emote: "<img src=/emotes/PepePls.gif>" },
        { name: "PETTHEPEEPO", emote: "<img src=/emotes/PETTHEPEEPO.gif>" },
        { name: "Pog", emote: "<img src=/emotes/Pog.png>" },
        { name: "POGGERS", emote: "<img src=/emotes/POGGERS.png>" },
        { name: "PogU", emote: "<img src=/emotes/PogU.png>" },
        { name: "ppHop", emote: "<img src=/emotes/ppHop.gif>" },
        { name: "ppOverheat", emote: "<img src=/emotes/ppOverheat.gif>" },
        {
          name: "ResidentSleeper",
          emote: "<img src=/emotes/ResidentSleeper.png>"
        },
        { name: "ricardoFlick", emote: "<img src=/emotes/ricardoFlick.gif>" },
        { name: "Sadge", emote: "<img src=/emotes/Sadge.png>" },
        { name: "smileW", emote: "<img src=/emotes/smileW.png>" },
        { name: "sumSmash", emote: "<img src=/emotes/sumSmash.gif>" },
        { name: "Triathalon", emote: "<img src=/emotes/Triathalon.gif>" },
        { name: "TriDance", emote: "<img src=/emotes/TriDance.gif>" },
        { name: "TriHard", emote: "<img src=/emotes/TriHard.png>" },
        { name: "WAYTOODANK", emote: "<img src=/emotes/WAYTOODANK.gif>" },
        { name: "WeirdChamp", emote: "<img src=/emotes/WeirdChamp.png>" },
        { name: "WideArrive", emote: "<img src=/emotes/WideArrive.gif>" },
        { name: "WideHard", emote: "<img src=/emotes/WideHard.png>" },
        { name: "WideHarder", emote: "<img src=/emotes/WideHarder.png>" },
        { name: "WideHardo", emote: "<img src=/emotes/WideHardo.png>" },
        {
          name: "widepeepoHappy",
          emote: "<img src=/emotes/widepeepoHappy.png>"
        },
        {
          name: "widepeepoHappyRightHeart",
          emote: "<img src=/emotes/widepeepoHappyRightHeart.gif>"
        },
        { name: "YAPP", emote: "<img src=/emotes/YAPP.gif>" },
        { name: "YEP", emote: "<img src=/emotes/YEP.png>" }
      ]
    };
  }
};
</script>

<style>
.table {
  background-color: hsl(0, 0%, 21%);
  color: #d3d3d3;
}
.table-head {
  color: #d3d3d3 !important;
}
</style>
