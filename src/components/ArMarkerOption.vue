<template>
  <a-marker
    type="barcode"
    :value="this.marker"
    :distance-event="
      'target:#' +
        markerOriginID +
        ';drawLine:true;customDataEvent:' +
        JSON.stringify(this.customDataEvent)
    "
    ref="marker"
    smooth="true"
  >
    <!-- <a-box position='0 0.5 0' material='opacity: 0.5; color: red'></a-box> -->
    <!-- <a-cylinder :color="this.color" height="0.1" radius="0.5" segments-radial='6' rotation="0 90 0"> -->
    <!-- 3D Icon -->
    <!-- <a-entity v-if="this.model" :gltf-model="model" scale='0.15 0.15 0.15' position="0 0.5 0" animation-mixer animation="property: rotation; to:0 360 0; dur: 5000; easing: linear; loop: true"></a-entity>
    </a-cylinder>-->

    <a-entity
      v-if="this.text == this.current"
      position="0 0 0.75"
      particle-system="particleCount: 10; positionSpread:1.2 1.2 1.2;type:3; velocityValue:0 0.5 0;velocitySpread:0.5 1 0.5; accelerationSpread: 0 0 0; accelerationValue: 0 0.5 0;dragValue:0.5;dragSpread:0.5;maxAge:1;size:0.5; color:#b500da; opacity:0.5; texture:./img/particle.png"
    ></a-entity>

    <a-entity
      geometry="primitive: cylinder; segmentsRadial: 6; segmentsHeight: 1;height: 0.1"
      :scale="this.text == this.current?'0.5 0.5 0.5':''"
      rotation="0 90 0"
      :position="this.text == this.current?'0 0 0.75':'0 0 0'"
      :draw="'background:' + this.color + ''"
      :textwrap="
        'textAlign: center; x: 128; y: 150; text:' +
          this.text +
          '; color: white;width:200'
      "
    ></a-entity>
    <!-- 3D Icon -->
    <a-entity
      v-if="this.model"
      :gltf-model="model"
      :scale="this.text == this.current?'0.02 0.02 0.02':'0.15 0.15 0.15'"
      :position="this.text == this.current?'0 0 0.75':'0 0.5 -0.5'"
      animation-mixer
      animation="property: rotation; to:0 360 0; dur: 5000; easing: linear; loop: true"
    ></a-entity>

    <!-- Text -->
    <!-- <a-entity scale='0.5 0.5 0.5' position='-0.5 0.15 0' rotation="-90 0 0" :text-geometry="'value:'+this.text+';font:#typeFont'" material="color: white"></a-entity> -->
    <!-- <a-text :value="this.text" position='0 0.15 0.8' rotation="-90 0 0" align="center"></a-text> -->
  </a-marker>
</template>

<script>
export default {
  name: "ArMarkerOption",
  props: {
    text: String,
    color: String,
    marker: Number,
    customDataEvent: Object,
    current: String,
    model: String,

    markerOriginID: String
  },
  data: function() {
    return {
      isSelected: false
    };
  },
  mounted: function() {
    // this.$refs.marker.addEventListener('distance-event',(e)=>{
    //     this.isSelected=e.detail.type=='selected'&&this.text==this.current
    // })
  },
  updated: function() {
    this.isSelected = this.text == this.current;
  }
};
</script>

<style></style>
