<template>
  <a-entity ref="contentEntity" class="content">
      <!-- Google -->
      <template v-if="ready&&googleContent">
          <template v-if="googleContentType==='application/pdf'&&htmlElementiD">
            <div class="html" >
             <div id="htmlElementiD" ref="htmlContainer">
                <pdf :src="{data:googleContent}" @page-loaded="this.fitView" ref="pdf"/>
             </div>
            </div>
            <a-entity geometry="primitive: plane; height: 1.25; width: 2.22222222222" rotation="-90 0 0" material="shader: html; target: #htmlElementiD; fps:1; ratio:width;">
            </a-entity>
          </template>
          <template v-else-if="googleContentType==='image/bmp'||googleContentType==='image/jpeg'||googleContentType==='image/tiff'||googleContentType==='image/png'">
            <a-image :src="encodeFile(googleContent,googleContentType)" rotation="-90 0 0"></a-image>
          </template>
          <template v-else-if="googleContentType==='video/x-flv'||googleContentType==='video/mp4'||googleContentType==='video/quicktime'||googleContentType==='video/x-msvideo'||googleContentType==='video/x-ms-wmv'||googleContentType==='video/ogg'">
            <video :src="encodeFile(googleContent,googleContentType)" :id="htmlElementiD" autoplay></video>
            <a-video ref="arVideo" :src="'#'+htmlElementiD" rotation="-90 0 0"></a-video>
          </template>
          <template v-else>
            <a-entity
            geometry="primitive: cylinder; segmentsRadial: 6; segmentsHeight: 1;height: 0.1"
            scale=""
            rotation="0 90 0"
            position="0 0 0"
            draw="background:#666666"
            textwrap="textAlign: center; x: 128; y: 150; text:Formato no soportado, has clic en la pantalla para redirigirte al sitio; color: white;width:200"></a-entity>
          </template>
      </template >
      <!-- Standard Urls -->
      <template v-else-if="ready">
        <template v-if="type==='video/x-flv'||type==='video/mp4'||type==='video/quicktime'||type==='video/x-msvideo'||type==='video/x-ms-wmv'||type==='video/ogg'">
            <video :src="encodeFile(content,type)" :id="htmlElementiD" autoplay></video>
            <a-video ref="arVideo" :src="'#'+htmlElementiD" rotation="-90 0 0"></a-video>
        </template>
        <a-image v-else-if="type==='image/bmp'||type==='image/jpeg'||type==='image/tiff'||type==='image/png'" :src="content" rotation="-90 0 0"></a-image>
        <template v-else-if="type==='application/pdf' && htmlElementiD">
            <div class="html" >
             <div id="htmlElementiD" ref="htmlContainer">
                <pdf :src="content" @page-loaded="this.fitView" ref="pdf"/>
             </div>
            </div>
            <a-entity geometry="primitive: plane; height: 1.25; width: 2.22222222222" rotation="-90 0 0" material="shader: html; target: #htmlElementiD; fps:1; ratio:width;"></a-entity>
        </template>
        <template v-else>
            <a-entity
            geometry="primitive: cylinder; segmentsRadial: 6; segmentsHeight: 1;height: 0.1"
            scale=""
            rotation="0 90 0"
            position="0 0 0"
            draw="background:#666666"
            textwrap="textAlign: center; x: 128; y: 150; text:Formato no soportado, has clic en la pantalla para redirigirte al sitio; color: white;width:200"></a-entity>
          </template>
      </template>
  </a-entity>
</template>
<script>
import pdf from 'vue-pdf'

export default {
    name:"ArContent",
    components: {
        pdf
    },
    props: {
        content:String,
        type:String,
    },
    data:function(){
        return({
            googleContent:null,
            googleContentType:null,
            htmlElementiD:null,
            ready:false
        });
    },
    mounted:function(){
        if(this.content.includes('google.com')){
            var fileId = this.content.match(/[-\w]{25,}/)[0]
            if(fileId){
                this.$gapi.request({
                path: 'https://www.googleapis.com/drive/v3/files/'+fileId+'?alt=media',
                method: 'GET',
                }).then(response => {
                    this.ready=true;
                    console.log(response);
                    this.googleContentType=response.headers['Content-Type'];
                    this.googleContent = response.body;
                    console.log('dispatching Event')
                    this.$refs.contentEntity.addEventListener('model-loaded',(e)=>{
                        console.log(e)
                    })
                    console.log(this.$refs.contentEntity.dispatchEvent(new CustomEvent('model-loaded',{"bubbles":true, "cancelable":false})))
                })
            }
            else{
                console.log('No file id match')
                this.$refs.contentEntity.dispatchEvent(new CustomEvent('model-loaded',{"bubbles":true, "cancelable":false}))
            }
        }
        else{
            this.ready = true
        }
        this.htmlElementiD = (Math.random()).toString(36).substring(7)+'html';
        //prevent parent body margin, only will work on mobile
        this.$refs.contentEntity.style.marginTop = -parseFloat(document.body.style.marginTop)+'px'
        
    },
    methods:{
        fitView:function(){
            setTimeout(()=>{
                var size = this.$refs.pdf.$children[0].size
                var height =size.height;
                var width =size.width;
                var proportion = height/width;
                var percent = (-3000000000/52640111)*proportion + (6145877693/52640111)
                this.$refs.htmlContainer.style.width=percent+"%";
            },500)
        },
        encodeFile:function(str,type){
            return 'data:'+type+';base64,' + btoa(str)
        }
    },
    beforeDestroy: function(){
        if(this.$refs.arVideo){
            this.$refs.arVideo.pause()
        }
    }
}
</script>

<style scoped>
.html{
    z-index: -10;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    opacity: 0;
    margin-top:  inherit
}
</style>