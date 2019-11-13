<template>
  <div class="arContainer">
    <div class="instructions show" ref="instructions">
      <h1>Violet xR</h1>
      <div :class="this.currentInstruction === 1 ? 'desc show' : 'desc'">
        <span>Existen 5 tipos de marcadores distingibles por color.</span>
        <div class="image-container">
          <img src="/img/tutorial/markers.png"  style="max-width: 120%; margin: -3em; width: inherit; max-height: none;"/>
        </div>
      </div>
      <div :class="this.currentInstruction === 2 ? 'desc show' : 'desc'">
        <div class="image-container">
          <img src="/img/tutorial/markertypes.png" style="max-width: 120%; margin: -3em; width: inherit; max-height: none;"/>
        </div>
      </div>
      <div :class="this.currentInstruction === 3 ? 'desc show' : 'desc'">
        <span>Para interacuar debes escanear los marcadores.</span>
        <div class="image-container">
          <img src="/img/tutorial/scan.png" />
          <img src="/img/tutorial/ar.png" />
        </div>
      </div>
      <div :class="this.currentInstruction === 4 ? 'desc show' : 'desc'">
        <span>Primero escanea a Violet con el marcador principal.</span>
        <div class="image-container">
          <img src="/img/tutorial/agent.png"/>
          <img src="/img/tutorial/ar_agent.png"/>
        </div>
      </div>
      <div :class="this.currentInstruction === 5 ? 'desc show' : 'desc'">
        <span>Para realizar selecciones, acerca los marcadores, guíate por las formas.</span>
        <div class="image-container">
          <img src="/img/tutorial/selection.gif" style="max-width: 120%; margin: -3em; width: inherit; max-height: none;"/>
        </div>
      </div>
      <div :class="this.currentInstruction === 6 ? 'desc show' : 'desc'">
        <span>Para deseleccionar, aleja los marcadores del principal.</span>
        <div class="image-container">
          <img src="/img/tutorial/deselection.gif" style="max-width: 120%; margin: -3em; width: inherit; max-height: none;"/>
        </div>
      </div>
      <div :class="this.currentInstruction === 7 ? 'desc show' : 'desc'">
        <span>¡COMENCEMOS!</span>
        <div class="image-container">
          <img src="/img/tutorial/smartphone.gif"/>
          <img src="/img/tutorial/arrow.gif"/>
          <img src="/img/tutorial/hmd_user.png"/>
        </div>
        <span>Por favor gira tu celular, selecciona el ícono y ubícalo en el CardBoard.</span>
      </div>
      <div class="buttons">
        <!-- <button
          class="vxr-button"
          style="border: solid;background: none;"
          @click="this.skipInstruction"
        >
          Omitir
        </button> -->
        <button
          class="vxr-button"
          style="background: #4d2066;"
          @click="this.nextInstruction"
        >
          {{
            this.currentInstruction === this.totalInstructions - 1
              ? "Entendido"
              : "Siguiente"
          }}
        </button>
      </div>
    </div>
    <a-scene
      embedded
      renderer="precision:high; antialias: auto; colorManagement: true; sortObjects: true;physicallyCorrectLights: true; logarithmicDepthBuffer: true;"
      arjs="trackingMethod:best; debugUIEnabled: false; sourceType: webcam; detectionMode: mono_and_matrix; matrixCodeType: 4x4_BCH_13_5_5;canvasWidth: 240; canvasHeight: 180"
      ref="scene"
      loading-screen="dotsColor: white; backgroundColor: #993FCB"
    >
      <a-entity light="type: ambient; intensity: 1;"></a-entity>
      <a-entity camera ar-stereo>
        <a-entity
          light="type: directional; color: #FFF; intensity: 1"
          position="-0.5 1 1"
        ></a-entity>
        <!-- Markers -->
        <ArMarkerCenter
          :id="markerOriginID"
          :selectionState="
            this.contenido ? (this.actividad.nombre.includes('Material') ? 3:4) : this.actividad ? 2 : this.modulo ? 1 : 0
          "
          :contentType="this.contenido?this.contenido.peticion.tipoContenido:''"
          :contentResource="this.contenido?(this.contenido.peticion.url1?this.contenido.peticion.url1:this.contenido.peticion.url):null"
          :contentAudio="this.contenido?(this.contenido.peticion.url2?this.contenido.peticion.url2:null):null"
        />
        <!-- Sugerencia -->
        <a-marker
          type="barcode" value=32
          keep-object
          v-if="this.sugerencia"
          class="sugerencia"
          :distance-event="
            'target:#markerOrigin;drawLine:true;customDataEvent:' +
              JSON.stringify(this.sugerencia)
          "
        >
          <a-entity
            v-if="
              this.actividad
                ? this.actividad.nombre == this.sugerencia.nombre
                : false
            "
            position="0 0 0"
            particle-system="particleCount: 10; positionSpread:1.2 1.2 1.2;type:3; velocityValue:0 0.5 0;velocitySpread:0.5 1 0.5; accelerationSpread: 0 0 0; accelerationValue: 0 0.5 0;dragValue:0.5;dragSpread:0.5;maxAge:1"
          ></a-entity>

          <a-entity
            geometry="primitive: cylinder; segmentsRadial: 6; segmentsHeight: 1;height: 0.1"
            scale=""
            rotation="0 90 0"
            position="0 0 0"
            draw="background:#777700"
            :textwrap="
              'textAlign: center; x: 128; y: 150; text:' +
                this.sugerencia.nombre +
                '; color: white;width:200'
            "
          >
          </a-entity>
          <!-- 3D Icon -->
          <a-entity
            gltf-model="glb/marker/Sugerencia.glb"
            scale="0.15 0.15 0.15"
            position="0 0.5 -0.5"
            animation-mixer
            animation="property: rotation; to:0 360 0; dur: 5000; easing: linear; loop: true"
          ></a-entity>
        </a-marker>
        <!-- Options -->
        <template v-if="this.curso">
          <ArMarkerOption
            :markerOriginID="markerOriginID"
            :key="module.id + 'M'"
            v-for="(module, i) in curso.modulos"
            :marker="i+1"
            :text="module.nombre"
            class="modulo"
            :customDataEvent="module"
            color="#4d2066"
            :current="modulo ? modulo.nombre : ''"
            :model="'glb/marker/' + (i + 1) + '.glb'"
          />
        </template>

        <template v-if="this.modulo">
          <ArMarkerOption
            :markerOriginID="markerOriginID"
            :key="i + 'A'"
            v-for="(activity, i) in this.modulo.actividades"
            :marker="i + 13"
            :text="activity.nombre"
            class="actividad"
            :customDataEvent="activity"
            :color="
              activity.nombre.includes('Material') ? '#227722' : '#4422DD'
            "
            :current="actividad ? actividad.nombre : ''"
            :model="
              activity.nombre.includes('Material')
                ? 'glb/marker/Material.glb'
                : 'glb/marker/Evaluacion.glb'
            "
          />
        </template>
        <!-- Test -->
        <ArTest v-if="this.contenido?this.contenido.id==18:false"/>
      </a-entity>
    </a-scene>
    <div :class="isModalExit?'darker show fixed':'darker fixed'">
      <div :class="isModalExit?'modal show':'modal'">
        <span class="message"> ¿Desea cerrar sesión o salir de la aplicación?</span>
        <div class="horizontal">
          <button class="vxr-button" @click="isModalExit=false">Cancelar</button>
          <button class="vxr-button">Salir</button>
          <button class="vxr-button" @click="logout">Cerrar Sesión</button>
        </div>
      </div>
    </div>
    <!-- External Link Modal -->
    <template v-if="this.contenido && this.contenido.peticion.tipoContenido!='model/gltf+json'">
      <div class="external" @click="isModalExternal=true"></div>
      <div :class="isModalExternal?'darker show fixed':'darker fixed'">
        <div :class="isModalExternal?'modal show':'modal'">
          <span class="message">Está apunto de ser redirigido a un link fuera de la aplicación, ¿desea continuar?</span>
          <div class="horizontal">
            <form :action="contenido.peticion.url" class="horizontal">
              <button class="vxr-button" @click="isModalExternal=false">Cancelar</button>
              <input class="vxr-button" type="submit" value="Continuar"/>
            </form>
          </div>
        </div>
      </div>
    </template>
    <button id="log-out" class="vxr-button" @click="isModalExit=true">Salir</button>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import ArMarkerOption from "../components/ArMarkerOption";
import ArMarkerCenter from "../components/ArMarkerCenter";
import ArTest from "../components/ArTest";
import ArContent from "../components/ArContent"; //Temporal
export default {
  name: "ArScene",
  components: {
    ArMarkerOption,
    ArMarkerCenter,
    ArTest,
    ArContent
  },
  props: {
    user: Object,
    data: Object
  },
  data: function() {
    return {
      modulo: null,
      actividad: null,
      contenido: null,
      curso: null,
      sugerencia: null,

      markerOriginID: "markerOrigin",
      currentInstruction: 1,
      totalInstructions: 8,

      isModalExit: false,
      isModalExternal: false
    };
  },
  mounted: function() {
    //Display instruction for 2 seconds
    if (!this.user) {
      //this.$router.push('/')
    }
    if (!this.data) {
      this.$router.push("/");
    }
    this.curso = this.data.cursos[0];
    this.sugerencia = this.data.cursos[0].proximaActividad;
    this.$refs.scene.addEventListener("distance-event", e => {
      console.log(e);
      var target = e.target;
      var data = e.detail.data;
      var type = target.classList[0];
      if (e.detail.type == "selected") {
        if (type == "modulo") {
          console.log("addedModule");
          this.modulo = this.curso.modulos.filter(x => x.id === data.id)[0];
        } else if (type == "actividad") {
          this.actividad = data;
          this.contenido = data.contenidos[0]
        } else if (type == "sugerencia") {
          this.actividad = data;
          this.contenido = data.contenidos[0]
        }
      } else {
        if (type == "modulo") {
          this.modulo = null;
          this.actividad = null;
          this.contenido = null;
        } else if (type == "actividad") {
          this.actividad = null;
          this.contenido = null
        }
        else if (type == "sugerencia") {
          this.actividad = null;
          this.contenido = null
        }
      }
    });
    //Create GUI on enter vR
    this.$refs.scene.addEventListener("enter-vr", () => {
      var parentElement = this.$refs.scene.querySelector(
        ".webvr-polyfill-fullscreen-wrapper"
      );
      var container = document.createElement("div");
      container.classList.add("vr-ui");
      var btnExit = document.createElement("button");
      btnExit.classList.add("vxr-button");
      btnExit.classList.add("exit-vr");
      btnExit.innerHTML = "Salir de RV";
      btnExit.addEventListener("click", () => {
        this.$refs.scene.exitVR();
      });
      container.appendChild(btnExit);
      parentElement.appendChild(container);
    });
    this.$refs.scene.addEventListener("exit-vr", () => {
      this.$refs.scene.camera.position.set(0, 0, 0);
      this.$refs.scene.camera.rotation.set(0, 0, 0);
    });
  },
  beforeDestroy: function() {
    document.body.lastElementChild.remove();
  },
  methods: {
    logout: function() {
      this.$gapi.signOut().then(() => {
        //Library isn't working as expected and the promise is resolved even if the signout is not completed
        setTimeout(() => {
          this.$emit("setUser", null);
          console.log("User disconnected.");
          location.reload();
          this.$router.push("/");
        }, 250);
      });
    },
    nextInstruction: function() {
      this.currentInstruction++;
      if (this.currentInstruction >= this.totalInstructions)
        this.$refs.instructions.classList.remove("show");
    },
    // skipInstruction: function() {
    //   this.currentInstruction = this.totalInstructions;
    //   this.$refs.instructions.classList.remove("show");
    // }
  }
};
</script>

<style>
.arContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.instructions {
  position: fixed;
  top: 0;
  left: 0;
  height: -webkit-fill-available;
  width: -webkit-fill-available;
  /*background: linear-gradient(#993fcb, #4d2066);*/
  background: linear-gradient(#fff, #eee);
  z-index: 10000;
  color: #4d2066;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1.5em 3em;
  opacity: 0;
  transition: 0.25s;
  pointer-events: none;
}
.instructions .image-container {
  display: flex;
  justify-content: space-around;
  padding: auto 1em;
  align-items: center;
}
.instructions img {
  width: fit-content;
  margin: auto;
  max-width: 25%;
}
@media only screen and (orientation: landscape) {
  .instructions img {
    width: auto;
    max-height: 30vh;
  }
}
.instructions h1 {
  font-size: 2em;
}
.instructions span {
  margin: 1.25em 0.25em;
  font-size: 1.25em;
  display: block;
}
.instructions span * {
  max-height: 1em;
  max-width: 2em;
}
.instructions .desc {
  transform: translateX(110vw);
  transition: 0.25s;
  transition-delay: 0.3s;
  position: absolute;
}
.instructions .buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 80%;
  pointer-events: all;
}
.instructions .buttons button {
  margin: 0.25em;
}
.instructions .show {
  position: initial;
}
a-scene {
  position: absolute;
  width: inherit;
  height: inherit;
}
#log-out {
  z-index: 1000;
  position: fixed;
  top: 0.5em;
  right: 0.5em;
}
.vxr-button,
.a-enter-vr-button {
  background-color: rgba(181, 0, 218, 0.5);
  color: white;
  border: none;
  padding: 0.75em;
  border-radius: 0.25em;
}
.a-enter-vr-button {
  padding: 1.5em 2em;
}
.vr-ui {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 2;
}
.vr-ui .exit-vr {
  position: absolute;
  top: 1em;
  left: 1em;
}
.fixed{
    top: 0;
    left: 0;
    height: -webkit-fill-available;
    width: -webkit-fill-available;
}
.fixed .modal{
  padding: 0.75em;
}
.horizontal{
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top:0.5em;
}
.external{
  height: 100%;
  width: 90%;
  position: absolute;
}
</style>
