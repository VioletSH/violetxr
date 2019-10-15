import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleApi from "vue-google-api";

import "./registerServiceWorker";
import "./js/applyStereo";

//Dependences
import "aframe-text-geometry-component";
import "aframe-particle-system-component";

Vue.config.productionTip = false;

//Google API
const config = {
  apiKey: "AIzaSyBzT_ssQdnGLZ0kc0lOgzrfbRThU7CmEDU",
  clientId:
    "445333639249-m78tmfvlib259sdosq1krtfdgpd1fo2h.apps.googleusercontent.com",
  scope:
    "profile email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive"
};
Vue.use(VueGoogleApi, config);

//Aframe Components
// AFRAME.registerComponent('auto-enter-vr', {
//   init: function () {
//       try{
//         this.el.sceneEl.enterVR();
//       }
//       catch(e){
//         console.log("Can't enter on Full Screen on Mobile Devices")
//       }
//   }
// });
AFRAME.registerComponent("keep-object", {
  schema: {
    time: { type: "number", default: 250 }
  },
  init: function() {
    var time = this.data.time;
    this.el.addEventListener("markerLost", function() {
      this.object3D.visible = true;
      setTimeout(() => {
        this.object3D.visible = false;
      }, time);
    });
  }
});

AFRAME.registerComponent("distance-event", {
  schema: {
    target: { type: "selector" },
    distance: { type: "number", default: 3 },
    drawLine: { default: false },
    color1: { default: "#0000ff" },
    color2: { default: "#00ff00" },
    customDataEvent: { default: "{message:notCustomDataSet}" }
  },
  init: function() {
    if (this.data.drawLine) {
      var geometry = new THREE.Geometry();
      geometry.vertices.push(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0)
      );
      var material = new THREE.LineBasicMaterial({
        color: this.data.color1
      });
      this.data.colors = {
        standard: new THREE.Color(this.data.color1),
        selected: new THREE.Color(this.data.color2)
      };
      var line = new THREE.Line(geometry, material);
      this.el.object3D.add(line);
    }
  },
  tick: function() {
    var target = this.data.target;
    if (this.data.drawLine)
      var line = this.el.object3D.getObjectByProperty("type", "Line");
    if (target && this.el.object3D.visible && target.object3D.visible) {
      //Drawing line
      if (line) {
        var position = target.object3D.position.clone();
        target.object3D.getWorldPosition(position);
        var convertedPosition = this.el.object3D.worldToLocal(position);
        line.geometry.vertices[0] = convertedPosition;
        line.geometry.verticesNeedUpdate = true;
      }
      //Calc position
      var targetPostion = target.object3D.position;
      var thisPosition = this.el.object3D.position;
      var distance = thisPosition.distanceTo(targetPostion);
      if (
        distance <= this.data.distance &&
        !this.el.classList.contains("selected")
      ) {
        this.el.emit("distance-event", {
          type: "selected",
          data: JSON.parse(this.data.customDataEvent)
        });
        this.el.classList.add("selected");

        line.material.color = this.data.colors.selected;
        line.material.needsUpdate = true;
      } else if (
        distance >= this.data.distance &&
        this.el.classList.contains("selected")
      ) {
        this.el.classList.remove("selected");
        this.el.emit("distance-event", {
          type: "deselected",
          data: JSON.parse(this.data.customDataEvent)
        });

        line.material.color = this.data.colors.standard;
        line.material.needsUpdate = true;
      }
    } else {
      if (line) {
        line.geometry.vertices[0].set(0, 0, 0);
        line.geometry.verticesNeedUpdate = true;
      }
      //console.log('No target is set, mandatory')
    }
  }
});
AFRAME.registerComponent("play-audio", {
  schema: {
    audio: { type: "selector" }
  },
  init: function() {
    this.el.addEventListener("markerLost", () => {
      this.data.audio.pause();
    });
    this.el.addEventListener("markerFound", () => {
      if (
        this.data.audio.currentTime !== this.data.audio.duration &&
        this.el.classList.contains("ready")
      ) {
        this.data.audio.play();
      }
    });
    this.el.addEventListener("model-loaded", () => {
      if (this.el.classList.contains("ready")) {
        this.data.audio.play();
      }
    });
  },
  tick: function() {
    //console.log(this.data.audio.currentTime,this.data.audio.duration)
  }
});
//Vue Instance
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
