<template>
  <a-entity ref="test">
    <a-marker
      v-for="(option,index) in this.randomList(options)"
      :key="index+'MT'"
      type="barcode"
      :value="index+13"
      keep-object
      ref="markers"
      :class="option.order==1?'done':''"
      :id="'MT'+option.order"
      :test-right-to-left="'nextMarker:#MT'+(option.order+1)+';travelObject:#travelObject'">
      <a-entity :gltf-model="option.object" animation-mixer scale="0.25 0.25 0.25"></a-entity>
    </a-marker>
    <a-entity :gltf-model="travelObject" id="travelObject" scale="0.25 0.25 0.25"></a-entity>
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
    console.log(this.$refs)
    this.$refs.test.addEventListener('test-item-done',()=>{
      this.itemsDone +=1;
      if(this.itemsDone>=this.options.length-1){
        console.log('you ended')
      }
    })
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