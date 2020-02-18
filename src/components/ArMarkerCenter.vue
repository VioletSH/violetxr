<template>
  <a-marker type="barcode" value=0 :id="id" ref="origin">
    <a-entity
      light="type: spot; angle: 60; intensity: 5"
      position="0.089 2.643 0.809"
      rotation="300 0 0"
    ></a-entity>
        <!-- Base -->
    <a-entity
      v-if="!contentResource"
      gltf-model="glb/base2.glb"
      scale="0.25 0.25 0.25"
      position="0 0 0"
    ></a-entity> 
    <template v-if="(!this.modelLoaded) && this.selectionState!=4">
      <a-entity
        v-if="this.selectionState<3"
        id="load"
        rotation="0 0 0"
        position="0 0.25 0"
        geometry="primitive: dodecahedron; radius: 0.5"
        material="color:#ffffff;opacity:0.25;shader:flat"
      >
      </a-entity>
      <a-entity
        gltf-model="glb/loading.glb"
        animation-mixer
        scale="0.25 0.25 0.25"
        position="-0.325 0.45 0"
      ></a-entity>
    </template>
    <!-- Violet -->    
    <a-entity
      class="content"
      v-if="selectionState == 0"
      gltf-model="glb/Violet/d1.glb"
      scale="1 1 1"
      position="0.163 0.084 -0.454"
      rotation="0 180 0"
      animation-mixer="timeScale:0"
      ref="originModel"
    ></a-entity>
    <a-entity
      class="content"
      v-else-if="selectionState == 1"
      gltf-model="glb/Violet/d4.glb"
      scale="1 1 1"
      position="0.163 0.084 -0.454"
      rotation="0 180 0"
      animation-mixer="timeScale:0"
      ref="originModel"
    ></a-entity>
    <a-entity
      class="content"
      v-else-if="selectionState ==2"
      gltf-model="glb/Violet/d4.glb"
      scale="1 1 1"
      position="0.163 0.084 -0.454"
      rotation="0 180 0"
      animation-mixer="timeScale:0"
      ref="originModel"
    ></a-entity>
    <!-- content GLTF -->
    <a-entity
      class="content"
      v-else-if="selectionState == 3 && contentResource && contentType=='model/gltf+json'"
      :gltf-model="this.contentResource"
      scale="0.25 0.25 0.25"
      position="-0.1 0.095 0.4"
      animation-mixer="timeScale:0;"
      ref="originModel"
    ></a-entity>
    <!-- Handle another type of resources -->
        <ArContent v-else-if="selectionState == 3 && contentResource && contentType" :content="this.contentResource" :type="this.contentType" />
    <!-- test -->
    <a-entity
      class="content"
      v-else-if="selectionState == 4 && contentType=='model/gltf+json'"
      animation-mixer
    >
     <a-entity
      geometry="primitive: cylinder; segmentsRadial: 6; segmentsHeight: 1;height: 0.1"
      scale=""
      rotation="0 90 0"
      position="0 0 0"
      draw="background:#666666"
      textwrap="textAlign: center; x: 128; y: 150; text:Evaluación en curso; color: white;width:200"></a-entity>
    </a-entity>
    
    <a-entity
      class="content"
      v-else-if="selectionState == 4 && !(contentType=='model/gltf+json')"
      animation-mixer
    >
     <a-entity
      geometry="primitive: cylinder; segmentsRadial: 6; segmentsHeight: 1;height: 0.1"
      scale=""
      rotation="0 90 0"
      position="0 0 0"
      draw="background:#666666"
      textwrap="textAlign: center; x: 128; y: 128; text:Evaluación Externa, has clic en la pantalla para redirigirte al sitio; color: white;width:200"></a-entity>
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
      :src="this.contentAudio"
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
import ArContent from "./ArContent"
export default {
  name: "ArMarkerCenter",
  components:{
    ArContent,
  },
  props: {
    id: String,
    contentType: String,
    contentResource: String,
    contentAudio: String,

    selectionState: Number
  },
  data: function() {
    return {
      modelLoaded: false,
    };
  },
  watch: {
    selectionState: function(newVal, oldVal) {
      // watch it
      if (newVal != oldVal) {
        this.$refs.origin.classList.remove("ready");
        this.modelLoaded=false
      }
    }
  },
  mounted: function() {
    this.addListeners();
  },
  updated: function(){
 
  },
  methods:{
    addListeners: function(){
      
    //Load one
    if(this.$refs.origin){
      this.$refs.origin.addEventListener("markerLost", () => {
        if(this.$refs.audio)
        this.$refs.audio.pause();
        if(this.$refs.originModel)
        this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "0"); 
      });
      this.$refs.origin.addEventListener("markerFound", () => {
        if ( this.$refs.audio &&
          this.$refs.audio.currentTime !== this.$refs.audio.duration &&
          this.$refs.origin.classList.contains("ready")
        ) {
          this.$refs.audio.play();
          if(this.$refs.originModel)
          this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "1"); 
        }
      });
      this.$refs.origin.addEventListener("model-loaded", (e) => {
        if(e.srcElement.classList.contains('content')){
          this.modelLoaded = true;
          this.$refs.origin.classList.add("ready")
          if (
            this.$refs.origin.classList.contains("ready") &&
            this.$refs.origin.object3D.visible
          ) {
          if(this.$refs.audio)
            this.$refs.audio.play();
          if(this.$refs.originModel)
            this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "1"); 
          }
        }
      });
    }
    if(this.$refs.audio){
      this.$refs.audio.addEventListener("ended", () => {
        if(this.$refs.originModel)
        this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "0");
      });
      this.$refs.audio.addEventListener("play", () => {
        if(this.$refs.originModel)
        this.$refs.originModel.setAttribute("animation-mixer", "timeScale", "1");
      });
    }
    },
  }
};
</script>

<style></style>
