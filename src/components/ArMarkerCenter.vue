<template>
  <!-- play-audio="audio: #audio1" -->
  <a-marker preset="hiro" keep-object :id="id" ref="origin">
    <a-entity
      light="type: spot; angle: 45; intensity: 5"
      position="0.089 2.643 0.809"
      rotation="300 0 0"
    ></a-entity>
    <!-- Violet -->    
    <a-entity
      v-if="selectionState == 0"
      gltf-model="glb/Violet/d1.glb"
      scale="1 1 1"
      position="0.163 0.084 -0.454"
      rotation="0 180 0"
      animation-mixer="timeScale:1"
      ref="originModel"
    ></a-entity>
    <a-entity
      v-else-if="selectionState == 1"
      gltf-model="glb/Violet/d4.glb"
      scale="1 1 1"
      position="0.163 0.084 -0.454"
      rotation="0 180 0"
      animation-mixer="timeScale:1"
      ref="originModel"
    ></a-entity>
    <a-entity
      v-else-if="selectionState == 2"
      gltf-model="glb/Violet/d5.glb"
      scale="1 1 1"
      position="0.163 0.084 -0.454"
      rotation="0 180 0"
      animation-mixer="timeScale:1"
      ref="originModel"
    ></a-entity>
    <!-- content -->
    <a-entity
      v-if="selectionState == 3 && contentModel"
      :gltf-model="this.contentModel"
      scale="0.25 0.25 0.25"
      position="-0.1 0.095 0.4"
      animation-mixer="timeScale:1;"
      ref="originModel"
    ></a-entity>
    <!-- Base -->
    <a-entity
      v-if="!contentModel"
      gltf-model="glb/base2.glb"
      scale="0.25 0.25 0.25"
      position="0 0 0"
    ></a-entity>
    <!-- <template v-if="!this.modelLoaded">
      <a-entity
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
    </template> -->

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
    <audio
      v-else-if="selectionState == 3 && contentAudio"
      :src="this.contentAudio"
      ref="audio"
    ></audio>
  </a-marker>
</template>

<script>
export default {
  name: "ArMarkerCenter",
  props: {
    id: String,
    contentModel: String,
    contentAudio: String,

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
      console.log(newVal,oldVal)
      if (newVal != oldVal) {
        console.log('in')
        this.$refs.origin.classList.remove("ready");
        this.modelLoaded=false
      }
    }
  },
  mounted: function() {
    //Load one
    if(this.$refs.origin){
      this.$refs.originModel.addEventListener("model-loaded", () => {
        this.modelLoaded = true;
        this.$refs.origin.classList.add("ready");
      });
      this.$refs.origin.addEventListener("markerLost", () => {
        this.$refs.audio.pause();
        this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "0"); 
      });
      this.$refs.origin.addEventListener("markerFound", () => {
        this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "1"); 
        if (
          this.$refs.audio.currentTime !== this.$refs.audio.duration &&
          this.$refs.origin.classList.contains("ready")
        ) {
          this.$refs.audio.play();
          this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "1"); 
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
    }
    if(this.$refs.audio){
      this.$refs.audio.addEventListener("ended", () => {
        this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "0"); // The color is blue.
      });
      this.$refs.audio.addEventListener("play", () => {
        this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "1"); // The color is blue.
      });
    }
  }
};
</script>

<style></style>
