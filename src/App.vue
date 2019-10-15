<template>
  <div id="app">
    <router-view
      :user="user"
      :data="data"
      @setUser="setUser"
      @setData="setData"
    />
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      user: null,
      data: null
    };
  },
  methods: {
    setUser: function(e) {
      this.user = e;
    },
    setData: function(e) {
      this.data = e;
    }
  }
};
</script>
<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // height: 100vh;
  // width: 100vw;
  height: inherit;
  width: inherit;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  margin-left: inherit;
  margin-top: inherit;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
