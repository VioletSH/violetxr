import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import ArScene from "./views/ArScene.vue";

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
    }
  ]
});
