<template>
  <a-scene embedded>
    <a-box position="0 0.5 0" material="opacity: 0.5; color: black"></a-box>
    <a-marker-camera preset="hiro"></a-marker-camera>
  </a-scene>
</template>

<script>
export default {
  name: "testAR"
};
</script>

<style>
a-scene {
  position: absolute;
  width: inherit;
  height: inherit;
}
</style>
