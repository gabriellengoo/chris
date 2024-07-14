<template>
  <!-- pt-40 -->
  <div class="pt-28 md:pt-0">
    <!-- <LenisComponent />  to="#about" -->
    <div class="w-screen h-screen overflow-hidden flex justify-center">
    
      <!-- home img -->
      <div v-if="home && home.sections4"  class="homeimgsize">
        <div v-for="section in home.sections4" :key="section._key">
          <MediaImage
            :size="section.image4.size"
            :aspect="section.image4.aspect"
            :src="section.image4.image4"
            v-if="section.image4.image4"
            class="landingimg max-h-full object-cover"
          ></MediaImage>
          <MediaVideo
            :id="section.video.id"
            v-if="section.video.id"
            class="md:max-h-full min-w-full object-cover"
          ></MediaVideo>
          <!-- Display YouTube Video -->
          <iframe
            v-else-if="section.youtubeUrl"
            :src="getYouTubeEmdedUrl(section.youtubeUrl)"
            frameborder="0"
            allowfullscreen
            class="md:max-h-full min-w-full object-cover pointer-events-none"
          ></iframe>
          <!-- Display Vimeo Video width="560" height="315"-->

          <iframe
            v-else-if="section.vimeoUrl"
            :src="getVimeoEmdedUrl(section.vimeoUrl)"
            frameborder="0"
            allowfullscreen
            class="max-w-full md:min-h-screen w-screen object-cover pointer-events-none"
          ></iframe>
        </div>
        
      </div>




 
   

        <!-- about text -->
        <div  >
        <!-- md:pb-5 sm:pb-5  -->
        <div v-if="home && home.sections" class="pb-0 anchor" id="about">
          <!-- about -->
          <span
            class="aboutsec text-4xl"
            v-for="section in home.sections"
            :key="section._key"
          >
            <div
              class="flex flex-col items-center pb-[5vw] "
              v-if="section.title"
            >
          

              <!-- about text -->
              <div  class="md:flex flex-col p-10 pb-0 md:justify-between">
    
                <!-- <Header /> -->

                <div class="p-10">
                  <!-- <p
                    class="abouttexttitle text-center uppercase text-[6rem] leading-[5.5rem] pb-5"
                  >
                    Chisara Agor 
                  </p> -->

                  <!-- press -->
                  <div
                    v-if="home.sections3"
                    class="presssecmd text-center justify-center md:pt-0 pb-5 md:pb-0 text-[1.7rem] leading-[1.7rem] flex"
                  >
                    <div
                      v-for="sections3 in home.sections3"
                      :key="sections3._key"
                      class="md:p-5 presssecinnermd"
                    >
                      <div class="presssec">
                        <p
                          v-if="sections3.title3"
                          class="presstitle md:pb-2 justify-start text-[3.5rem] leading-[4.5rem]"
                        >
                          <span>{{ sections3.title3 }}</span>
                        </p>
                        <Richtext
                          class="presssectext uppercase md:pb-5 text-[6.5rem] leading-[5.5rem]"
                          :blocks="sections3.content3"
                          v-if="sections3.content3"
                        ></Richtext>
                        <NuxtLink
                          v-if="sections3.title3"
                          to="/works"
                          class="presssectextlink justify-start text-[3.5rem] leading-[4.5rem]"
                        >
                          <span>view here</span>
                        </NuxtLink>
                      </div>
                   
                    </div>
                  </div>

              
                  <div v-if="home.grid2" class=" flex justify-center">
                  <Grid2
                    class="imagemarquee pl-[2rem]"
                    size="small"
                    :items="home.grid2"
                  ></Grid2>
                </div>


                  <p
                    class="abouttexttitle text-center uppercase text-[1.5rem] leading-[1.5rem] pt-20 pb-5"
                  >
                    About Chisara Agor
                  </p>

                  <Richtext
                    class="abouttextdesk text-center md:p-10 text-[1.5rem] leading-[1.5rem] md:contents hidden"
                    :blocks="section.content"
                    v-if="section.content"
                  ></Richtext>

                  <Richtext
                    class="abtextmb text-center contents md:hidden md:p-10 text-[1.7rem] leading-[1.7rem]"
                    :blocks="section.content"
                    v-if="section.content"
                  ></Richtext>


                      <!-- contct -->
                  <!-- Display the About Image    v-if="section.image.image"-->
                  <div id="contact" class="anchor">
                    <div
                      v-if="home.sections2"
                      class="contact-section  text-center contactsecmd pt-40 flex justify-between"
                    >
                      <div class="contactsecall border-t-[.2rem] border-solid  border-black md:pt-0">

                        <p
                    class="abouttexttitle uppercase text-[1.5rem] pt-5 leading-[1.5rem] pb-5"
                  >
                    Contact
                  </p>

                        <div class="md:flex md:pt-0">
                          <div class="pt-5">
                            <div
                              v-for="sections2 in home.sections2"
                              :key="sections2._key"
                              class="contacttextmd"
                            >
                              <div
                                v-if="sections2.content2"
                                class="contactsec  text-[1.4rem] leading-[1.4rem]"
                              >
                                <Richtext
                                  class=" text-left contactinner"
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
                </div>

                <!-- Add a button to toggle the collapsible section -->
                <button
                  @click="toggleCollapsible"
                  v-if="!isCollapsibleOpen"
                  class="contents md:hidden collapsible-button"
                >
                  ... view more
                  <!-- <i :class="arrowIconClass"></i> -->
                </button>

                <!-- <div class="flex justify-end"> -->
                <!-- about textt -->
                <div v-if="isCollapsibleOpen" class="collapsible-section">
                  <Richtext
                    class="abtextmbopen md:p-5 text-[1.7rem] leading-[1.7rem]"
                    :blocks="section.content"
                    v-if="section.content"
                  ></Richtext>
                </div>
              </div>
              <!-- </div> -->
            </div>
          </span>
        </div>
      </div>

      <!-- <p class="imgtext pb-5 ">
        COPYRIGHT ©2024 CHISARA AGOR
              </p> -->
      <!-- <Grid2 class="imagemarquee" size="small" :items="home.grid2"></Grid2> -->
    </div>
  </div>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
import { mapState, mapActions, mapMutations } from "vuex";
import "@fortawesome/fontawesome-free/css/all.css";
import Marqueec from "~/components/Marqueec.vue";
// import Vue3Marquee from 'vue3-marquee';
// import AboutPage from '~/components/AboutPage.vue'
import Header from "~/components/layout/Header.vue";
import LenisComponent from "~/components/LenisComponent.vue";
import Lenis from "@studio-freight/lenis";
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
  name: "IndexPage",

  components: {
    Marqueec,
    LenisComponent,
    Header,
  },

  data() {
    return {
      project: false,
      abouts: [],
      index: 1,
      lenis: null,
      realIndex: 0,
      step: 0,
      isBlueBoxActive: false,
      contentContainerStyle: {},
      scrolled: false,
      back: false,
      abouts: [],
      activeStyle: { textDecoration: "none" },
      isCollapsibleOpen: false,
      isGlitching: false,
    };
  },

  scroll() {
    if (this.project.slider) {
      this.scrolled = !this.scrolled;
      const gsap = this.$gsap;
      let height = this.$refs["footer"].offsetHeight;
      if (this.scrolled) {
        gsap.to(this.$refs["container"], { y: -height });
      } else {
        gsap.to(this.$refs["container"], { y: 0 });
      }
    }
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
    title, dis, photographer,year,imageWidth,hair,makeup,dop,set,styleing, link, production, location, listImage, draft,
      "reference" : {"key" : reference._ref, "title" : reference->title, "dis" : reference->dis, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "team" : reference->team, "meta" : reference->meta}} } 
     
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
          "title" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "position" : position}, 
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

    // Commit meta and metaemails to the Vuex store
    // store.commit("setMeta", home.meta);
    // store.commit("setMetaEmails", home.metaemails);
    // store.commit("setThumdnailTime", home.thumdnailTime);
    // store.commit('setYear', home.year);

    return { home };
  },

  //   mounted() {
  //     const lenis = new Lenis()

  // lenis.on('scroll', (e) => {
  //   console.log(e)
  // })

  // function raf(time) {
  //   lenis.raf(time)
  //   requestAnimationFrame(raf)
  // }

  // requestAnimationFrame(raf)

  //   },
  mounted() {},

  methods: {
    ...mapActions(["setTitle"]),
    ...mapMutations(["TOGGLE_MENU"]),

    handleArrowClick() {
      // Scroll down by 100vh
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: "smooth", // for smooth scrolling
      });
    },

    startGlitchEffect() {
      this.isGlitching = true;
      setTimeout(() => {
        this.isGlitching = false;
      }, 1000); // Adjust the duration of the glitch effect
    },

    setProject(reference) {
      this.project = reference;
    },
    toggleCollapsible() {
      this.isCollapsibleOpen = !this.isCollapsibleOpen;
    },

    openGallery() {
      this.$store.commit("setGalleryState", true); // Set gallery state as open
    },
    closeGallery() {
      this.$store.commit("setGalleryState", false); // Set gallery state as closed
    },
    getYouTubeEmdedUrl(youtubeUrl) {
      // Extract YouTube video ID from the URL
      const videoId = youtubeUrl.split("v=")[1];
      // Generate the YouTube emded URL with autoplay, mute, loop, and hide controls on hover parameters
      return `https://www.youtube.com/emded/${videoId}?autoplay=1&mute=1&controls=0&loop=1&showinfo=0`;
    },
    getVimeoEmdedUrl(vimeoUrl) {
      // Extract Vimeo video ID from the URL
      const videoId = vimeoUrl.split("/").pop();
      // Generate the Vimeo emded URL
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0`;
    },
    toggleBlueBox() {
      // Toggle the blue box visibility
      this.isBlueBoxActive = !this.isBlueBoxActive;

      // Update the content container position
      this.updateContentContainerPosition();

      if (this.isBlueBoxActive) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    updateContentContainerPosition() {
      const isMobile = window.innerWidth <= 768;
      // Calculate the offset based on blue box height
      const offset = isMobile
        ? this.isBlueBoxActive
          ? "100vh"
          : "0"
        : this.isBlueBoxActive
        ? "365px"
        : "0";

      // Calculate the offset based on whether it's a mobile screen or not

      // Set the content container position
      this.contentContainerStyle = {
        transform: `translateY(${offset})`,
      };
    },
  },
  computed: {
    ...mapState([ "menu"]),
    
    arrowIconClass() {
      // fas fa-arrow-up
      return this.isCollapsibleOpen ? "" : "fas fa-arrow-down";
    },
  },
  // created() {
  //   this.setTitle(this.home.title);
  // },
};
</script>

<style scoped>
.imgtext {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  color: #fff;
  /* font-family: 'AtlasGrotesk'; */
  font-size: 1rem;
  /* line-height: .5rem; */
  /* width: 5vw; */
}

.imgover {
  position: absolute;
  top: 30%;
  left: 70%;
  transform: translate(-50%, -50%);
  color: #fff;
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

.cursor-pointer {
  cursor: pointer; /* Set cursor to pointer */
}

.pathfill {
  fill: #fff !important;
}

.abouttitletexta {
  text-transform: uppercase;
  font-size: 7rem;
  line-height: 7.5rem;
  /* width: 20vw; */
  /* padding: 5rem; */
  padding-bottom: 5rem;
  /* padding-top: 0; */
  /* color: hsl(249.94deg 74.43% 42.94%); */
  font-family: "AtlasGrotesk", sans-serif;
}
/* Arrow down styles */
.arrow-down {
  /* text-align: center; */
  margin-bottom: 20px;
}

.fa-arrow-down {
  font-size: 24px;
  color: #000; /* Change the color as needed */
}
.morep {
  /* font-size: 6.75rem; */
  /* line-height: 4.3rem; */
  text-transform: uppercase;
  /* font-family: "GTWalsheimdb"; */
  /* font-family: "GTWalsheimbb"; */
  padding-top: 5rem;
  text-align: center;
}
.titleText {
  z-index: 10000 !important;
  /* font-weight: bolder; */
  color: whitesmoke;
  /* color: #2a2a2a; */
  /* font-family: "GTWalsheimd"; */
  left: 50%;
  top: 50%;
  /* width: 100vw; */
  transform: translate(-50%, -50%);
  position: absolute;
}

.contactheader {
  /* font-size: 3.75rem;
    line-height: 2.5rem ; */
  /* font-family: "GTWalsheimbb"; */
  /* text-transform: uppercase; */
  display: flex;
  /* justify-content: center; */
}

.abouttitle {
  display: flex;
  /* font-family: "GTWalsheimdb"; */
  /* justify-content: right; */
  /* text-transform: uppercase; */
  /* line-height: 2.25rem;
  font-size: 3.75rem; */
  /* line-height: 2.5rem ; */
  /* font-family: "GTWalsheimbb"; */
  /* text-transform: uppercase; */
}

.scriptedt {
  /* font-family: "GTWalsheimb"; */
}

.contactsecall {
  display: flex;
  flex-direction: column;
  flex-direction: row;
  justify-content: flex-end;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  text-transform: uppercase;
}

.contacttitle {
  display: flex;
  font-family: "GTWalsheimdb";
  text-transform: uppercase;
  /* line-height: 4.3rem; */
}

.contactsec {
  /* font-family: "GTWalsheiml" !important; */
  flex-direction: column;
  /* font-size: 1.5rem !important;
  line-height: 1.5rem !important; */
  display: flex;
  justify-content: space-between;

  align-items: flex-start;
    padding-left: 2vw;
  /* text-transform: uppercase;*/
}



.contacttextmd{
  padding-bottom: 2rem;
  /* border: 1px solid hsl(249.94deg 74.43% 42.94%); */
}

.presssec {
  /* font-family: "GTWalsheiml" !important; */
  /* font-size: 1.5rem !important;
  line-height: 1.5rem !important; */
  /* display: flex;
  justify-content: space-between !important; */
}

.presstitle {
  text-transform: uppercase;
}

.presssectext {
  /* font-family: "GTWalsheiml"; */
  /* text-transform: none !important; */
  color: rgb(55, 28, 191);
  display: flex;
  justify-content: space-between !important;
  padding-top: 1rem;
}

.presssectextlink {
  padding-top: 1rem;
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
}

.aboutsec {
  /* width: 100vw; */
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  /* font-family: 'GTWalsheimdb'; */
  /* border-right: 2px solid hsl(249.94deg 74.43% 42.94%);  */
  border-right: 1px solid black;
}

.abouttexttitle {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
}

.homeimgsize {
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* .homeimgsize img {
  max-width: 100%;
  max-height: 100%;
} */

.imagemarquee {
  z-index: 10 !important;
}

/* .contacttextmd:nth-child(1) {
  padding-bottom: 2rem;
}

.contacttextmd:nth-child(3) {
  padding-bottom: 2rem;
} */

/*  
.contacttextmd:nth-child(6) .contactsec
   display: flex;
    justify-content: space-between;
    flex-direction: row; */

@media (max-width: 768px) {
  .presssectext {
    font-family: unset;
  }

  .abouttitletexta {
    /* font-family: "GTWalsheimbb"; */
    /* text-transform: uppercase; */
    font-size: 4rem;
    line-height: 4rem;
    text-align: center;
  }

  .copyrtext {
    font-size: 1rem;
    line-height: 1rem;
    width: 40%;
  }

  .landingimg {
    height: auto;
  }

  .aboutsec {
    font-size: 1.25rem /* 36px */;
    line-height: 1.5rem /* 40px */;
  }

  .abouttitle {
    /* font-size: 1.25rem; */
    line-height: 1;
  }

  .contactsecmd {
    display: contents;
  }

  .contacttextmd {
    /* width: 60vw; */
    /* width: 100vw;  */
    padding: 0%;
    /* padding-top: 1.25rem; */
  }

  /* .contacttextmd:nth-child(1) {
    padding-bottom: 0rem;
    padding-top: 1.25rem;
  }

  .contacttextmd:nth-child(2) {
    padding-bottom: 0rem;
    padding-top: 1.25rem;
  }

  .contacttextmd:nth-child(3) {
    padding-top: 1.25rem;
    padding-bottom: 0rem;
  }

  .contacttextmd:nth-child(4) {
    padding-top: 2rem;
  } */

  .contactsec {
    font-size: 1.7rem !important;
    line-height: 1.7rem !important;
    text-transform: none;
  }

  .contactheader {
    /* font-family: "GTWalsheimbb"; */
    /* text-transform: uppercase; */
    font-size: 3rem;
  }

  .presstitle {
    /* font-family: "GTWalsheimbb"; */
    text-transform: none;
    font-size: 3rem;
    line-height: 3rem;
  }

  .contactimagemobile {
    width: 83.333333%;
    width: 100%;
    float: right;
  }

  .contactimagemobilecont {
    width: 100vw;
    display: flex;
    /* justify-content: flex-end; */
    justify-content: center;
  }

  .presssecmd {
    /* justify-content: unset; */
    /* padding-top: 0; */
    /* width: 100vw; */
    display: flex;
    /* justify-content: flex-end; */
  }

  .presssecinnermd {
    /* width: 83.333333%; */
    /* padding: 0; */
    padding-top: 3rem;
    padding-left: 0;
  }

  .presssec {
    /* font-size: 1.25rem !important;
    line-height: 1.25rem !important; */
  }

  .fa-arrow-down {
    padding-top: 1.25rem;
    font-size: 12px;
  }

  .morep {
    /* font-size: 1.25rem; */
    line-height: 1;
  }

  .collapsible-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    margin-top: 10px;
    padding-top: 20px;
  }

  .collapsible-section {
    /* display: none; */
    /* padding: 10px; */
  }

  .collapsible-section.show {
    display: block;
  }
}

/* header {  
  animation: 1.5s ease-out 0s 1 slideInFromLeft;
} */

/* .item {
  width: 33.3333%;
} */
</style>
