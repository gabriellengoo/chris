<template>
  <!-- mt-1 --> 
  <main class=" flex h-screen overflow-hidden ">

    <!-- <div class="top-line"></div> -->


    <div v-if="grid.grid" class="w-[10%] marquee-1">
      <Grid class="" :items="grid.grid" size="small"></Grid>
    </div>

    <div v-if="grid.gridm" class="w-[10%] marquee-2">
      <Griddirect class="" :items="grid.gridm" size="small"></Griddirect>
    </div>

    <div v-if="grid.gride" class="w-[10%] marquee-3">
      <Grid class="" :items="grid.gride" size="small"></Grid>
    </div>

    <div v-if="grid.gridl" class="w-[10%] marquee-4">
      <Griddirect class="" :items="grid.gridl" size="small"></Griddirect>
    </div>



    <div v-if="grid.grid" class="w-[10%] marquee-1">
      <Grid class="" :items="grid.grid" size="small"></Grid>
    </div>

    <div v-if="grid.gridm" class="w-[10%] marquee-2">
      <Griddirect class="" :items="grid.gridm" size="small"></Griddirect>
    </div>

    <div v-if="grid.gride" class="w-[10%] marquee-3">
      <Grid class="" :items="grid.gride" size="small"></Grid>
    </div>

    <div v-if="grid.gridl" class="w-[10%] marquee-4">
      <Griddirect class="" :items="grid.gridl" size="small"></Griddirect>
    </div>


    <div v-if="grid.grid" class="w-[10%] marquee-1">
      <Grid class="" :items="grid.grid" size="small"></Grid>
    </div>

    <div v-if="grid.gridm" class="w-[10%] marquee-2">
      <Griddirect class="" :items="grid.gridm" size="small"></Griddirect>
    </div>

    <div v-if="grid.gride" class="w-[10%] marquee-3">
      <Grid class="" :items="grid.gride" size="small"></Grid>
    </div>




     <!-- about -->
     <div class="absolute top-[60vh] w-screen"  v-for="section in home.sections"
            :key="section._key">
          <div    v-if="section.title" class="footerp   flex justify-center">
            <div
              class="copyrtex items-baseline p-1  w-[85vw]  justify-between flex pt-10 uppercase md:pt-0 pb-5 "
            >
            <p
                    class="abouttexttitle uppercase   pb-5"
                  >
                    <!-- Contact -->
                  </p>

                        <div class="md:flex md:pt-0">
                          <div class="">
                            
                            <div
                              v-for="sections2 in home.sections2"
                              :key="sections2._key"
                              class=""
                            >
                              <div
                                v-if="sections2.content2"
                                class=" "
                              >
                              
                                <Richtext
                                  class="pt-2"
                                  :blocks="sections2.content2"
                                  v-if="sections2.content2"
                                ></Richtext>
                              </div>
                            </div>
                          </div>
            </div>
          </div>
          </div>
        </div>


<!-- artist img -->
        <!-- <div
        v-for="section in home.sections"
        :key="section._key"
        class="imgover md:pt-0 md:pb-20 abouttitle flex md:justify-center text-5xl md:text-6xl"
      >
        <div
          v-if="section.image.image"
          class="contactimagemobilecont h-fit flex justify-center"
        >
          <MediaImage
            :size="section.image.size"
            :aspect="section.image.aspect"
            :src="section.image.image"
            v-if="section.image.image"
            class="contactimagemobile w-full"
            @click="startGlitchEffect"
          ></MediaImage>
        </div>
      </div> -->

        <!-- footer -->
        <div class="absolute bottom-0 w-screen">
          <div class="footerp   flex justify-center">
            <div
              class="copyrtex items-baseline p-1  w-[98vw]  justify-between flex pt-10 uppercase md:pt-0 pb-5 "
            >
              <div
                class=" flex items-baseline justify-between  align-baseline text-center uppercase"
              >
                <!-- <span class=" pr-5 ">Chisara Agor</span> -->
                <!-- <span class="hover-move">Rose.co</span> -->
                <p class="crtext ">
                  COPYRIGHT ©2024
                </p>
              </div>

              <p class="crtext ">
                Site by Internet Arcitects
              </p>
            </div>
          </div>
        </div>
    
  </main>
</template>

<script>
import { mapState } from 'vuex';
import { groq } from "@nuxtjs/sanity";

export default {
  computed: {
    ...mapState(['grid']),
  },
  mounted() {
    // Fetch data here if needed
  },

  async asyncData({ $sanity, store }) {
    const homeQuery = groq`*[_type == "home" ]  {..., listImage,} {..., 
     
     grid[] {_key, spacer,youtubeUrl,vimeoUrl, "video" : 
    {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio},
      "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
    title, photographer,year,hair,styleing, link, production, location,
      "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "team" : reference->team, "meta" : reference->meta}} } 
     
      {..., grid2[] {_key, spacer, thumdnailTime,youtubeUrl,vimeoUrl, "video" : 
    {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio},
      "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
    title, photographer,year,imageWidth,hair,makeup,dop,set,styleing, link, production, location, listImage, draft,
      "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "team" : reference->team, "meta" : reference->meta}} } 
     
      {..., gridm[] {_key, spacer, thumdnailTime,youtubeUrl,vimeoUrl, "video" : 
    {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio},
      "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
    title, photographer,year,imageWidth,hair,makeup,dop,set,styleing, link, production, location, listImage, draft,
      "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "team" : reference->team, "meta" : reference->meta}} } 


    {...,meta[]{
      title,
      content,
    }}

    {...,metaemails[]{
      title,
      content,
      link,
     
    }}


      {...,
        sections[]{
          title,
          subtitle,
          content,
          "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
        }
      }


      {...,
        sections2[]{
          title2,
          content2,
        }
      }

      {...,
        sections3[]{
          title3,
          content3,
        }
      }

      {...,
        sections4[]{
          title4,
          youtubeUrl,
          vimeoUrl,
          "video" : 
                    {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio},
          "image4" : {"image4" : image4.asset._ref, "aspect" : image4.asset->metadata.dimensions.aspectRatio, "position" : position}, 

        }
      }
      
      | order(_updatedAt desc)[0]
      `;

    const home = await $sanity.fetch(homeQuery);

    return { home };
  },
};
</script>

<style scoped>


/* Add your styles here */
.top-line {
  width: 98vw; /* 95% of viewport width */
  height: 1.5px; /* Adjust height as needed */
  background-color: black; /* Adjust color as needed */
  position: absolute;
  top: 9vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
}

.copyrtext {
  /* font-family: "GTWalsheimbb"; */
}

.crtext {
  /* font-family: "GTWalsheim"; */
  /* font-family: "GTWalsheimbb"; */
}

.imgover {
  position: absolute;
  top: 30%;
  left: 20%;
  width: 15vw;
  transform: translate(-50%, -50%);
  transform: rotate(-10deg);
  color: #fff;
  /* display: none; */
}

.contactimagemobilecont:hover {
  animation: glitch 1s infinite;
}

@keyframes glitch {
  0% {
    opacity: 1;
    transform: scale(1) rotate(0deg) translate(0, 0);
    filter: hue-rotate(0deg);
  }
  10% {
    transform: scale(1.1) rotate(2deg) translate(-2px, -1px);
    filter: hue-rotate(10deg);
  }
  20% {
    transform: scale(1) rotate(-1deg) translate(2px, 0px);
    filter: hue-rotate(20deg);
  }
  30% {
    transform: scale(1.05) rotate(1deg) translate(-1px, 1px);
    opacity: 0.8;
    filter: hue-rotate(30deg);
  }
  40% {
    transform: scale(0.95) rotate(-2deg) translate(0px, 0px);
    opacity: 0.6;
    filter: hue-rotate(40deg);
  }
  50% {
    transform: scale(1) rotate(0deg) translate(0px, 0px);
    opacity: 0.4;
    filter: hue-rotate(50deg);
  }
  60% {
    transform: scale(1.03) rotate(-1deg) translate(1px, -1px);
    opacity: 0.6;
    filter: hue-rotate(60deg);
  }
  70% {
    transform: scale(0.97) rotate(2deg) translate(-1px, 1px);
    opacity: 0.8;
    filter: hue-rotate(70deg);
  }
  80% {
    transform: scale(1) rotate(0deg) translate(0px, 0px);
    opacity: 1;
    filter: hue-rotate(80deg);
  }
  90% {
    transform: scale(1.02) rotate(1deg) translate(2px, 1px);
    opacity: 0.6;
    filter: hue-rotate(90deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg) translate(0, 0);
    filter: hue-rotate(0deg);
  }
}

.contactimagemobile {
  animation: glitch 1s linear; /* Adjust the duration as needed */
  animation-fill-mode: forwards;
}

.contactimagemobilecont {
  opacity: 1;
}

.contactimagemobilecont img {
  opacity: 1;
}

.contactimagemobilecont img:hover {
  opacity: 0.8;
}

.contactimagemobilecont img:active {
  opacity: 0.6;
}

.contactimagemobilecont img:focus {
  opacity: 0.6;
}

.contactimagemobilecont img:visited {
  opacity: 0.6;
}

.contactimagemobilecont img:after {
  content: "";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.contactimagemobilecont img:hover:after {
  opacity: 0;
}

.contactimagemobilecont img:active:after {
  opacity: 0;
}

.contactimagemobilecont img:focus:after {
  opacity: 0;
}

.contactimagemobilecont img:visited:after {
  opacity: 0;
}
</style>
