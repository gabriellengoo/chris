<template>
  <main class="mt-1 flex h-screen overflow-hidden">
    <div class="w-[50vw] h-screen overflow-hidden flex justify-center">
      <!-- <div>
        <p>Poems</p>
      </div>

      <div>
        <p>Poems text</p>
      </div> -->

      <div  v-if="poems && poems.sections" class="bordersec pb-0 anchor" id="about">
        <span
          class="aboutsec text-4xl"
          v-for="section in poems.sections"
          :key="section._key"
        >
          <div class="flex items-center " v-if="section.title">
            <div class="md:flex flex-col p-10 pb-0 md:justify-between">

              <div class="p-10">
                <p
                  class="abouttexttitle text-center uppercase text-[1.5rem] leading-[1.5rem]  pb-5"
                >
                {{ section.title }}
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
              </div>

            </div>
          </div>
        </span>
      </div>
    </div>
  </main>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
import { mapState, mapActions, mapMutations } from "vuex";
import "@fortawesome/fontawesome-free/css/all.css";
import Marqueec from "~/components/Marqueec.vue";
import Header from "~/components/layout/Header.vue";
import LenisComponent from "~/components/LenisComponent.vue";

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
      activeStyle: { textDecoration: "none" },
      isCollapsibleOpen: false,
      isGlitching: false,
      activeSection: null,  // New data property for active section
    };
  },

  async asyncData({ $sanity, store }) {
    const poemQuery = groq`*[_type == "poems" ]  {..., listImage, sections[] {title, content, _key} } | order(_updatedAt desc)[0]`;
    const poems = await $sanity.fetch(poemQuery);
    return { poems };
  },

  mounted() {
    if (this.poems && this.poems.sections.length > 0) {
      this.activeSection = this.poems.sections[0];
    }
  },

  methods: {
    ...mapActions(["setTitle"]),
    ...mapMutations(["TOGGLE_MENU"]),

    setActiveSection(section) {
      this.activeSection = section;
    },

    handleArrowClick() {
      window.scrollTo({
        top: window.scrollY + window.innerHeight,
        behavior: "smooth",
      });
    },

    startGlitchEffect() {
      this.isGlitching = true;
      setTimeout(() => {
        this.isGlitching = false;
      }, 1000);
    },

    setProject(reference) {
      this.project = reference;
    },
    toggleCollapsible() {
      this.isCollapsibleOpen = !this.isCollapsibleOpen;
    },

    openGallery() {
      this.$store.commit("setGalleryState", true);
    },
    closeGallery() {
      this.$store.commit("setGalleryState", false);
    },
    getYouTubeEmdedUrl(youtubeUrl) {
      const videoId = youtubeUrl.split("v=")[1];
      return `https://www.youtube.com/emded/${videoId}?autoplay=1&mute=1&controls=0&loop=1&showinfo=0`;
    },
    getVimeoEmdedUrl(vimeoUrl) {
      const videoId = vimeoUrl.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0`;
    },
    toggleBlueBox() {
      this.isBlueBoxActive = !this.isBlueBoxActive;
      this.updateContentContainerPosition();

      if (this.isBlueBoxActive) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    updateContentContainerPosition() {
      const isMobile = window.innerWidth <= 768;
      const offset = isMobile
        ? this.isBlueBoxActive
          ? "100vh"
          : "0"
        : this.isBlueBoxActive
        ? "365px"
        : "0";

      this.contentContainerStyle = {
        transform: `translateY(${offset})`,
      };
    },
  },
  computed: {
    ...mapState(["menu"]),

    arrowIconClass() {
      return this.isCollapsibleOpen ? "" : "fas fa-arrow-down";
    },
  },
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
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  /* font-family: 'GTWalsheimdb'; */
  /* border-right: 2px solid hsl(249.94deg 74.43% 42.94%);  */
}

.bordersec{
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
