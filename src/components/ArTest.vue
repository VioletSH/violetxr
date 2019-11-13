<template>
  <a-entity ref="test">
    <a-marker
      v-for="(option,index) in this.randomList(options)"
      :key="index+'MT'"
      type="barcode"
      :value="index+7"
      keep-object
      ref="markers"
      :class="option.order==1?'done':''"
      :id="'MT'+option.order"
      :test-right-to-left="'nextMarker:#MT'+(option.order+1)+';travelObject:#travelObject'">
      <a-entity
      light="type: spot; angle: 60; intensity: 5"
      position="0.089 2.643 0.809"
      rotation="300 0 0"
    ></a-entity>
      <a-entity :gltf-model="option.object" animation-mixer scale="0.25 0.25 0.25" rotation="0 180 0"></a-entity>
    </a-marker>
    <a-entity :gltf-model="travelObject" id="travelObject" scale="0.25 0.25 0.25"></a-entity>
    <audio src="./glb/content/test/intro.mp3" ref="intro"></audio>
    <audio src="./glb/content/test/timeout.mp3" ref="timeout"></audio>
    <audio src="./glb/content/test/end.mp3" ref="end"></audio>
  </a-entity>
</template>

<script>
export default {
  name: "ArTest",
  data: function(){
    return(
      {
        itemsDone:0,
        travelObject:'/glb/content/test/carta.glb',
        options:[
          {
            object:'/glb/content/test/capa1.glb',
            order:1
          },
          {
            object:'/glb/content/test/capa2.glb',
            order:2
          },
          {
            object:'/glb/content/test/capa3.glb',
            order:3
          },
          {
            object:'/glb/content/test/capa4.glb',
            order:4
          },
        ]
      }
    )
  },
  mounted(){
    this.$refs.intro.play()
    setTimeout(()=>{
      this.$refs.timeout.play()
    },60000)
    this.$refs.test.addEventListener('test-item-done',()=>{
      this.itemsDone +=1;
      if(this.itemsDone>=this.options.length-1){
        console.log('you ended')
        this.$refs.end.play()
      }
    })
  },
  beforeDestroy(){
    this.$refs.intro.stop()
    this.$refs.timeout.stop()
    this.$refs.end.stop()
  },
  methods:{
      randomList: function(rand){
      return Array.from(rand).sort(function(){return 0.5 - Math.random()});
    }
  }
}
</script>

<style>

</style>