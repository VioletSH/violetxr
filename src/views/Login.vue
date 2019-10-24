<template>
  <div class="login">
    <div class="container">
      <img src="/img/login/logo.png" class="logo" />
      <div class="center">
        <google-signin-btn
          label="Ingresa con Google"
          customClass="google-sign-in"
          @click="signin"
        />
        <span class="message"
          >Esta aplicación sólo utilizará sus datos para fines académicos.</span
        >
      </div>
      <div :class="user ? 'darker show' : 'darker'">
        <div :class="user ? 'user-welcome show' : 'user-welcome'">
          <img v-if="user" :src="user.image" />
          <span v-if="user" class="message"
            >Bienvenido {{ user.firstname }}</span
          >
        </div>
      </div>
    </div>
    <img src="/img/login/violet.png" class="avatar" />
  </div>
</template>

<script>
export default {
  name: "Login",
  data: function() {
    return {
      //user:null
    };
  },
  props: {
    user: Object
  },
  mounted: function() {
    document.body.style = ""; //After logout reset video margin styles on body
    this.getInitialData();
    this.$gapi.currentUser().then(user => {
      if (user) {
        console.log("1Signed in as %s", user.name);
        this.$emit("setUser", user);
        this.getInitialData();
        setTimeout(() => {
          this.$router.push("ar");
        }, 2500);
      } else {
        console.log("No user is connected.");
      }
    });
  },
  methods: {
    signin: function() {
      this.$gapi
        .signIn()
        .then(user => {
          this.$emit("setUser", user);
          console.log("2Signed in as %s", user.name);
          this.getInitialData();
          setTimeout(() => {
            this.$router.push("ar");
          }, 2000);
        })
        .catch(err => {
          console.error("Not signed in: %s", err.error);
        });
    },
    getInitialData: function() {
      // axios.get(API.userData+'/'+1)
      // .then((response)=>{
      //     this.$emit('setData',response.data)
      //     setTimeout(()=>{this.$router.push('ar')},2000)
      // })
      this.$emit("setData", {
        createdAt: 1566244496126,
        updatedAt: 1566244496126,
        id: 1,
        nombre: "Santiago Arce Cruz",
        correoElectronico: "santiago.arce@uao.edu.co",
        cursos: [
          {
            createdAt: 1566244495791,
            updatedAt: 1566244495791,
            id: 1,
            nombre: "Arquitectura de Sistemas Multimedia",
            abreviatura: "ASM",
            modulos: [
              {
                actividades: [
                  {
                    createdAt: 1566244496687,
                    updatedAt: 1566244496687,
                    id: 1,
                    nombre: "Material: Introducción a los Sistemas Multimedia",
                    descripcion:
                      "Material de estudio sobre Introducción a los Sistemas Multimedia",
                    modulo: 1,
                    contenidos: [
                      {
                        createdAt: 1566244511443,
                        updatedAt: 1566244511443,
                        id: 1,
                        tipoRespuesta: "",
                        actividad: 1,
                        peticion: {
                          createdAt: 1566244511411,
                          updatedAt: 1566244511411,
                          id: 1,
                          url:
                            "https://drive.google.com/file/d/1SWPeH0WqXEG2Ahn9Zz20g5dQB_5Nj2CV/view?usp=sharing",
                          tipoContenido: "application/pdf"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244496734,
                    updatedAt: 1566244496734,
                    id: 2,
                    nombre:
                      "Evaluación: Introducción a los Sistemas Multimedia",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Introducción a los Sistemas Multimedia",
                    modulo: 1,
                    contenidos: [
                      {
                        createdAt: 1566244511491,
                        updatedAt: 1566244511491,
                        id: 2,
                        tipoRespuesta: "application/vnd.google-apps.form",
                        actividad: 2,
                        peticion: {
                          createdAt: 1566244511468,
                          updatedAt: 1566244511468,
                          id: 2,
                          url:
                            "https://docs.google.com/forms/d/11NWz7QcY5OSaatqxThwslE3u0AiWSLmIJNzx3nEFbTg/edit?usp=sharing",
                          tipoContenido: "application/vnd.google-apps.form"
                        }
                      }
                    ]
                  }
                ],
                createdAt: 1566244496532,
                updatedAt: 1566244496532,
                id: 1,
                nombre: "Sistemas Multimedia",
                curso: 1
              },
              {
                actividades: [
                  {
                    createdAt: 1566244496771,
                    updatedAt: 1566244496771,
                    id: 3,
                    nombre: "Material: Hardware en un Sistema Multimedia",
                    descripcion:
                      "Material de estudio sobre Hardware en un Sistema Multimedia",
                    modulo: 2,
                    contenidos: [
                      {
                        createdAt: 1566244511544,
                        updatedAt: 1566244511544,
                        id: 3,
                        tipoRespuesta: "",
                        actividad: 3,
                        peticion: {
                          createdAt: 1566244511518,
                          updatedAt: 1566244511518,
                          id: 3,
                          url:
                            "https://drive.google.com/file/d/1F9aViFk_Zt4ULf2RL0khlheixmsSqH9u/view?usp=sharing",
                          tipoContenido: "application/pdf"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244496828,
                    updatedAt: 1566244496828,
                    id: 4,
                    nombre: "Evaluación: Hardware en un Sistema Multimedia",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Hardware en un Sistema Multimedia",
                    modulo: 2,
                    contenidos: [
                      {
                        createdAt: 1566244511596,
                        updatedAt: 1566244511596,
                        id: 4,
                        tipoRespuesta: "application/vnd.google-apps.form",
                        actividad: 4,
                        peticion: {
                          createdAt: 1566244511569,
                          updatedAt: 1566244511569,
                          id: 4,
                          url:
                            "https://docs.google.com/forms/d/1nIk6ZWLZqZHNGdfl5G8Z77JImSsLYXnJhwxZtx6iRRc/edit?usp=sharing",
                          tipoContenido: "application/vnd.google-apps.form"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244496878,
                    updatedAt: 1566244496878,
                    id: 5,
                    nombre: "Material: Hardware - Elemento Memoria",
                    descripcion:
                      "Material de estudio sobre Hardware - Elemento Memoria",
                    modulo: 2,
                    contenidos: [
                      {
                        createdAt: 1566244511649,
                        updatedAt: 1566244511649,
                        id: 5,
                        tipoRespuesta: "",
                        actividad: 5,
                        peticion: {
                          createdAt: 1566244511622,
                          updatedAt: 1566244511622,
                          id: 5,
                          url:
                            "https://drive.google.com/file/d/1VcmbA5Z-BTygawvvLipHLez0CcuVEVP1/view?usp=sharing",
                          tipoContenido: "application/pdf"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244496937,
                    updatedAt: 1566244496937,
                    id: 6,
                    nombre: "Evaluación: Hardware - Elemento Memoria",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Hardware - Elemento Memoria",
                    modulo: 2,
                    contenidos: [
                      {
                        createdAt: 1566244511700,
                        updatedAt: 1566244511700,
                        id: 6,
                        tipoRespuesta: "application/vnd.google-apps.form",
                        actividad: 6,
                        peticion: {
                          createdAt: 1566244511676,
                          updatedAt: 1566244511676,
                          id: 6,
                          url:
                            "https://docs.google.com/forms/d/132Ay9o734doEkKAuqIQUU63AZnfiMS7c4xJVEuk82TY/edit?usp=sharing",
                          tipoContenido: "application/vnd.google-apps.form"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244496987,
                    updatedAt: 1566244496987,
                    id: 7,
                    nombre: "Material: Hardware - Elemento CPU",
                    descripcion:
                      "Material de estudio sobre Hardware - Elemento CPU",
                    modulo: 2,
                    contenidos: [
                      {
                        createdAt: 1566244511751,
                        updatedAt: 1566244511751,
                        id: 7,
                        tipoRespuesta: "",
                        actividad: 7,
                        peticion: {
                          createdAt: 1566244511727,
                          updatedAt: 1566244511727,
                          id: 7,
                          url:
                            "https://drive.google.com/file/d/1KBN7KFNTZwYmYcswbQVSefupEw7H1DRm/view?usp=sharing",
                          tipoContenido: "application/pdf"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497026,
                    updatedAt: 1566244497026,
                    id: 8,
                    nombre: "Evaluación: Hardware - Elemento CPU",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Hardware - Elemento CPU",
                    modulo: 2,
                    contenidos: [
                      {
                        createdAt: 1566244511807,
                        updatedAt: 1566244511807,
                        id: 8,
                        tipoRespuesta: "application/vnd.google-apps.form",
                        actividad: 8,
                        peticion: {
                          createdAt: 1566244511776,
                          updatedAt: 1566244511776,
                          id: 8,
                          url:
                            "https://docs.google.com/forms/d/1i9ly6acB-0A7nEui1r_182sk57RDiTd2vxptY5heHl0/edit?usp=sharing",
                          tipoContenido: "application/vnd.google-apps.form"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497066,
                    updatedAt: 1566244497066,
                    id: 9,
                    nombre: "Material: Hardware - Elemento GPU",
                    descripcion:
                      "Material de estudio sobre Hardware - Elemento GPU",
                    modulo: 2,
                    contenidos: [
                      {
                        createdAt: 1566244511865,
                        updatedAt: 1566244511865,
                        id: 9,
                        tipoRespuesta: "",
                        actividad: 9,
                        peticion: {
                          createdAt: 1566244511830,
                          updatedAt: 1566244511830,
                          id: 9,
                          url:
                            "https://drive.google.com/file/d/1KBN7KFNTZwYmYcswbQVSefupEw7H1DRm/view?usp=sharing",
                          tipoContenido: "application/pdf"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497104,
                    updatedAt: 1566244497104,
                    id: 10,
                    nombre: "Evaluación: Hardware - Elemento GPU",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Hardware - Elemento GPU",
                    modulo: 2,
                    contenidos: [
                      {
                        createdAt: 1566244511915,
                        updatedAt: 1566244511915,
                        id: 10,
                        tipoRespuesta: "application/vnd.google-apps.form",
                        actividad: 10,
                        peticion: {
                          createdAt: 1566244511892,
                          updatedAt: 1566244511892,
                          id: 10,
                          url:
                            "https://docs.google.com/forms/d/1i9ly6acB-0A7nEui1r_182sk57RDiTd2vxptY5heHl0/edit?usp=sharing",
                          tipoContenido: "application/vnd.google-apps.form"
                        }
                      }
                    ]
                  }
                ],
                createdAt: 1566244496570,
                updatedAt: 1566244496570,
                id: 2,
                nombre: "Hardware",
                curso: 1
              },
              {
                actividades: [
                  {
                    createdAt: 1566244497364,
                    updatedAt: 1566244497364,
                    id: 17,
                    nombre:
                      "Material: Telecomunicaciones en un Sistema Multimedia",
                    descripcion:
                      "Material de estudio sobre Telecomunicaciones en un Sistema Multimedia",
                    modulo: 4,
                    contenidos: [
                      {
                        createdAt: 1566244512302,
                        updatedAt: 1566244512302,
                        id: 17,
                        tipoRespuesta: "",
                        actividad: 17,
                        peticion: {
                          createdAt: 1566244512283,
                          updatedAt: 1566244512283,
                          id: 17,
                          url1:
                            "/glb/content/telecomunicaciones.glb",
                          url2:
                            "/glb/content/telecomunicaciones.mp3",
                          tipoContenido: "model/gltf+json"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497404,
                    updatedAt: 1566244497404,
                    id: 18,
                    nombre:
                      "Evaluación: Telecomunicaciones en un Sistema Multimedia",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Telecomunicaciones en un Sistema Multimedia",
                    modulo: 4,
                    contenidos: [
                      {
                        createdAt: 1566244512350,
                        updatedAt: 1566244512350,
                        id: 18,
                        tipoRespuesta: "application/vnd.google-apps.form",
                        actividad: 18,
                        peticion: {
                          createdAt: 1566244512328,
                          updatedAt: 1566244512328,
                          id: 18,
                          url:
                            "https://docs.google.com/forms/d/1OgLAFZKRXKeguUe4MvJJEC4dZa0IzyPkU-UKLOQjeVE/edit?usp=sharing",
                          tipoContenido: "model/gltf+json"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497480,
                    updatedAt: 1566244497480,
                    id: 19,
                    nombre:
                      "Material: Telecomunicaciones - Elementos Físico y Enlace de datos",
                    descripcion:
                      "Material de estudio sobre Telecomunicaciones - Elementos Físico y Enlace de datos",
                    modulo: 4,
                    contenidos: []
                  },
                  {
                    createdAt: 1566244497516,
                    updatedAt: 1566244497516,
                    id: 20,
                    nombre:
                      "Evaluación: Telecomunicaciones - Elementos Físico y Enlace de datos",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Telecomunicaciones - Elementos Físico y Enlace de datos",
                    modulo: 4,
                    contenidos: []
                  },
                  {
                    createdAt: 1566244497547,
                    updatedAt: 1566244497547,
                    id: 21,
                    nombre:
                      "Material: Telecomunicaciones - Elementos Transporte y Red",
                    descripcion:
                      "Material de estudio sobre Telecomunicaciones - Elementos Transporte y Red",
                    modulo: 4,
                    contenidos: []
                  },
                  {
                    createdAt: 1566244497582,
                    updatedAt: 1566244497582,
                    id: 22,
                    nombre:
                      "Evaluación: Telecomunicaciones - Elementos Red y Transporte",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Telecomunicaciones - Elementos Red y Transporte",
                    modulo: 4,
                    contenidos: []
                  },
                  {
                    createdAt: 1566244497623,
                    updatedAt: 1566244497623,
                    id: 23,
                    nombre:
                      "Material: Telecomunicaciones - Elementos Sesión, Presentación y Aplicación",
                    descripcion:
                      "Material de estudio sobre Telecomunicaciones - Elementos Sesión, Presentación y Aplicación",
                    modulo: 4,
                    contenidos: []
                  },
                  {
                    createdAt: 1566244497660,
                    updatedAt: 1566244497660,
                    id: 24,
                    nombre:
                      "Evaluación: Telecomunicaciones - Elementos Sesión, Presentación y Aplicación",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Elementos Sesión, Presentación y Aplicación",
                    modulo: 4,
                    contenidos: []
                  }
                ],
                createdAt: 1566244496648,
                updatedAt: 1566244496648,
                id: 4,
                nombre: "Telecomunicaciones",
                curso: 1
              },
              {
                actividades: [
                  {
                    createdAt: 1566244497143,
                    updatedAt: 1566244497143,
                    id: 11,
                    nombre: "Material: Software en un Sistema Multimedia",
                    descripcion:
                      "Material de estudio sobre Software en un Sistema Multimedia",
                    modulo: 3,
                    contenidos: [
                      {
                        createdAt: 1566244511969,
                        updatedAt: 1566244511969,
                        id: 11,
                        tipoRespuesta: "",
                        actividad: 11,
                        peticion: {
                          createdAt: 1566244511942,
                          updatedAt: 1566244511942,
                          id: 11,
                          url:
                            "https://drive.google.com/file/d/1SWPeH0WqXEG2Ahn9Zz20g5dQB_5Nj2CV/view?usp=sharing",
                          tipoContenido: "application/pdf"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497176,
                    updatedAt: 1566244497176,
                    id: 12,
                    nombre: "Evaluación: Software en un Sistema Multimedia",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Software en un Sistema Multimedia",
                    modulo: 3,
                    contenidos: [
                      {
                        createdAt: 1566244512033,
                        updatedAt: 1566244512033,
                        id: 12,
                        tipoRespuesta: "application/vnd.google-apps.form",
                        actividad: 12,
                        peticion: {
                          createdAt: 1566244512008,
                          updatedAt: 1566244512008,
                          id: 12,
                          url:
                            "https://drive.google.com/open?id=11NWz7QcY5OSaatqxThwslE3u0AiWSLmIJNzx3nEFbTg",
                          tipoContenido: "application/vnd.google-apps.form"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497212,
                    updatedAt: 1566244497212,
                    id: 13,
                    nombre: "Material: Software - Elemento Sistema Operativo",
                    descripcion:
                      "Material de estudio sobre Software - Elemento Sistema Operativo",
                    modulo: 3,
                    contenidos: [
                      {
                        createdAt: 1566244512083,
                        updatedAt: 1566244512083,
                        id: 13,
                        tipoRespuesta: "",
                        actividad: 13,
                        peticion: {
                          createdAt: 1566244512059,
                          updatedAt: 1566244512059,
                          id: 13,
                          url:
                            "https://drive.google.com/file/d/1NrqvysKg3hCl-OWEQcCSH9udIoinbAuD/view?usp=sharing",
                          tipoContenido: "application/pdf"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497254,
                    updatedAt: 1566244497254,
                    id: 14,
                    nombre: "Evaluación: Software - Elemento Sistema Operativo",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Software - Elemento Sistema Operativo",
                    modulo: 3,
                    contenidos: [
                      {
                        createdAt: 1566244512132,
                        updatedAt: 1566244512132,
                        id: 14,
                        tipoRespuesta: "application/vnd.google-apps.form",
                        actividad: 14,
                        peticion: {
                          createdAt: 1566244512110,
                          updatedAt: 1566244512110,
                          id: 14,
                          url:
                            "https://docs.google.com/forms/d/1MBw1UkqJnikHj0_oOgakdcFMmoRAl-FNrYq44UH5ujs/edit?usp=sharing",
                          tipoContenido: "application/vnd.google-apps.form"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497288,
                    updatedAt: 1566244497288,
                    id: 15,
                    nombre: "Material: Software - Elemento Aplicaciones",
                    descripcion:
                      "Material de estudio sobre Software - Elemento Aplicaciones",
                    modulo: 3,
                    contenidos: [
                      {
                        createdAt: 1566244512189,
                        updatedAt: 1566244512189,
                        id: 15,
                        tipoRespuesta: "",
                        actividad: 15,
                        peticion: {
                          createdAt: 1566244512161,
                          updatedAt: 1566244512161,
                          id: 15,
                          url:
                            "https://drive.google.com/file/d/1fW3pe52vR1Wy1-eLQVen1wWBF2CKdMmi/view?usp=sharing",
                          tipoContenido: "application/pdf"
                        }
                      }
                    ]
                  },
                  {
                    createdAt: 1566244497329,
                    updatedAt: 1566244497329,
                    id: 16,
                    nombre: "Evaluación: Software - Elemento Aplicaciones",
                    descripcion:
                      "Prueba de evaluación sobre el material de estudio: Software - Elemento Aplicaciones",
                    modulo: 3,
                    contenidos: [
                      {
                        createdAt: 1566244512255,
                        updatedAt: 1566244512255,
                        id: 16,
                        tipoRespuesta: "application/vnd.google-apps.form",
                        actividad: 16,
                        peticion: {
                          createdAt: 1566244512232,
                          updatedAt: 1566244512232,
                          id: 16,
                          url:
                            "https://docs.google.com/forms/d/1UpS607TrdHt-F231hbkaK3WFdJYweSffkPoXq7eb6Pw/edit?usp=sharing",
                          tipoContenido: "application/vnd.google-apps.form"
                        }
                      }
                    ]
                  }
                ],
                createdAt: 1566244496611,
                updatedAt: 1566244496611,
                id: 3,
                nombre: "Software",
                curso: 1
              }
            ],
            caminoAsignado: {
              orden: [
                1,
                2,
                3,
                4,
                11,
                12,
                17,
                18,
                5,
                6,
                7,
                8,
                13,
                14,
                15,
                16,
                9,
                10
              ]
            },
            caminoEstudiante: { orden: [1, 2] },
            proximaActividad: {
              createdAt: 1566244496771,
              updatedAt: 1566244496771,
              id: 3,
              nombre: "Material: Hardware en un Sistema Multimedia",
              descripcion:
                "Material de estudio sobre Hardware en un Sistema Multimedia",
              modulo: 2
            }
          }
        ]
      });
      // setTimeout(() => {
      //   this.$router.push("ar");
      // }, 2000);
    }
  }
};
</script>
<style>
.login {
  display: flex;
  flex-direction: column;
  background-image: url("/img/login/hex.png");
  background-repeat: repeat;
  background-size: auto 1000px;
  background-position-x: -58%;
  background-color: #f7f7f7;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
}
.login img {
  display: block;
  width: min-content;
}
.login .logo {
  max-width: 500px;
}
.login .avatar {
  position: fixed;
  right: 0;
  --avatarWidth: 30em;
  bottom: calc(0px - (var(--avatarWidth) / 2));
  max-width: var(--avatarWidth);
}
.login .message {
  color: #707070;
  font-size: 0.85em;
}
.google-sign-in {
  height: fit-content;
  width: max-content;
  height: max-content;
}
.login .container {
  max-width: 75%;
  margin: 0.5em;
}
.login .container * {
  margin: 0.35em auto;
}
.center {
  text-align: center;
  justify-self: center;
  justify-content: center;
  align-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.darker {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  -webkit-transition: 0.25s;
  transition: 0.25s;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  margin: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.show {
  opacity: 1 !important;
  transform: none !important;
}
.user-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  color: #555;
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 5px;
  -webkit-box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  width: max-content;
  padding: 0.25em 0.5em;
  transition: 0.5s;
  transition-delay: 0.2s;
  transform: translateY(100vh);
}
.user-welcome img {
  max-width: 8em;
  border-radius: 100%;
}
@media only screen and (max-width: 768px) {
  .login {
    display: flex;
    flex-direction: column;
    background-image: url("/img/login/hex.png");
    background-repeat: repeat;
    background-size: auto 100%;
    background-position: -18em 2em;
    background-color: #f7f7f7;
    width: 100vw;
    height: 100vh;
  }
  .login .logo {
    max-width: 300px;
  }
  .login .avatar {
    --avatarWidth: 20em;
    right: -2em;
  }
}
@media only screen and (orientation: landscape) {
  .login {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background-image: url(/img/login/hex.png);
    background-repeat: repeat;
    background-size: auto 155%;
    background-position: -52em -4em;
    background-color: #f7f7f7;
    width: 100vw;
    height: 100vh;
  }
  .login .logo {
    max-width: 300px;
  }
  .login .avatar {
    --avatarWidth: 15em;
  }
}
</style>
