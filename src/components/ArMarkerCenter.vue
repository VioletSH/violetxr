<template>
  <!-- play-audio="audio: #audio1" -->
  <a-marker preset="hiro" keep-object :id="id" ref="origin">
    <a-entity
      light="type: spot; angle: 45; intensity: 5"
      position="0.15 2.8 -2"
      rotation="-135 0 0"
    ></a-entity>
    <!-- Violet -->
    <a-entity
      v-if="selectionState == 0"
      gltf-model="glb/violet/d1.glb"
      scale="1 1 1"
      position="-0.1 0.095 0.4"
      animation-mixer
      ref="originModel"
    ></a-entity>
    <a-entity
      v-else-if="selectionState == 1"
      gltf-model="glb/Violet/d4.glb"
      scale="1 1 1"
      position="-0.1 0.095 0.4"
      animation-mixer
      ref="originModel"
    ></a-entity>
    <a-entity
      v-else-if="selectionState == 2"
      gltf-model="glb/Violet/d5.glb"
      scale="1 1 1"
      position="-0.1 0.095 0.4"
      animation-mixer
      ref="originModel"
    ></a-entity>

    <!-- Base -->
    <a-entity
      gltf-model="glb/base2.glb"
      scale="0.25 0.25 0.25"
      position="0 0 0"
      animation-mixer
    ></a-entity>
    <a-entity
      v-if="!this.modelLoaded"
      id="load"
      rotation="0 0 0"
      position="0 0.25 0"
      geometry="primitive: dodecahedron; radius: 0.5"
      material="color:#ffffff;opacity:0.25;shader:flat"
    >
      <a-entity
        gltf-model="glb/loading.glb"
        animation-mixer
        scale="0.25 0.25 0.25"
        position="-0.325 0.2 0"
      ></a-entity>
    </a-entity>

    <!--Audios-->
    <audio
      v-if="selectionState == 0"
      src="glb/Violet/Audios/d1.mp3"
      ref="audio"
    ></audio>
    <audio
      v-else-if="selectionState == 1"
      src="glb/Violet/Audios/d4.mp3"
      ref="audio"
    ></audio>
    <audio
      v-else-if="selectionState == 2"
      src="glb/Violet/Audios/d5.mp3"
      ref="audio"
    ></audio>
  </a-marker>
</template>

<script>
export default {
  name: "ArMarkerCenter",
  props: {
    id: String,
    model: String,

    selectionState: Number
  },
  data: function() {
    return {
      modelLoaded: false
    };
  },
  watch: {
    selectionState: function(newVal, oldVal) {
      // watch it
      if (newVal != oldVal) {
        this.$refs.origin.classList.remove("ready");
        this.modelLoaded = false;
      }
    }
  },
  mounted: function() {
    //Load one
    this.$refs.originModel.addEventListener("model-loaded", () => {
      this.modelLoaded = true;
      this.$refs.origin.classList.add("ready");
    });
    this.$refs.origin.addEventListener("markerLost", () => {
      this.$refs.audio.pause();
    });
    this.$refs.origin.addEventListener("markerFound", () => {
      if (
        this.$refs.audio.currentTime !== this.$refs.audio.duration &&
        this.$refs.origin.classList.contains("ready")
      ) {
        this.$refs.audio.play();
      }
    });
    this.$refs.origin.addEventListener("model-loaded", () => {
      if (
        this.$refs.origin.classList.contains("ready") &&
        this.$refs.origin.object3D.visible
      ) {
        this.$refs.audio.play();
      }
    });
    this.$refs.audio.addEventListener("ended", () => {
      this.$refs.originModel.setAttribute("animation-mixer", "loop", "once"); // The color is blue.
    });
  }
};
</script>

<style></style>
