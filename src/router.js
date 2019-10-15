import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import ArScene from "./views/ArScene.vue";
import testAR from "./views/testAR.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/ar",
      name: "ArScene",
      component: ArScene
    },
    {
      path: "/test",
      name: "testAR",
      component: testAR
    }
  ]
});
