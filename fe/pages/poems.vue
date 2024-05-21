<template>
  <main class="mt-1  w-screen flex md:h-screen h-auto overflow-hidden flex-col justify-center">
    <div class="bordersec">

      <!-- <div
      class="mobileslugtitle bcbtn2 hidden left-[90vw]  md:flex justify-end text-[1.525rem]"
    > -->
      <!-- <button  class="backc z-50 px-8 py-8" @click="goBack">Back</button> -->
      <!-- <a
              class="z-50 pb-8 pt-0"
              href="./../"
              rel="noopener noreferrer"
            >
            Home
            </a> -->
    <!-- </div> -->
    <div
      class=" p-5 font-bold flex justify-end uppercase  md:pb-5 text-[6.5rem] leading-[5.5rem]  bcbtn2  left-[90vw]  md:flex "
    >
      <a
              class="z-50 pb-8 pt-0"
              href="./../"
              rel="noopener noreferrer"
            >
            CHISARA AGOR
            </a>
    </div>


    <div class="    md:h-screen h-auto pt-[10vh] md:pt-0 overflow-hidden flex flex-col justify-center">
      <!-- Section Titles List]-->
    


      <div v-if="poems && poems.sections" class=" flex justify-center  section-list">
        <ul class="md:w-[50vw] w-screen  abouttexttitle font-bold text-center uppercase md:text-[1.5rem] md:leading-[1.5rem] text-[2rem] leading-[normal] pb-5">
          <li
            v-for="section in poems.sections"
            :key="section._key"
            @click="activeSection = section._key"
            :class="{ active: activeSection === section._key }"
            class="cursor-pointer p-4 text-center"
          >
            {{ section.title }}
          </li>
        </ul>
      </div>

      <!-- Section Content -->
      <div v-if="poems && poems.sections" class=" pb-[10vh] md:pb-0 anchor" id="about">
        <div
          v-for="section in poems.sections"
          :key="section._key"
          v-show="activeSection === section._key"
          class="section-content"
        >
          <div class=" items-center" v-if="section.title">
            <div class="md:flex flex-col p-10 pb-0 md:justify-between">
              <div class="p-10">
                <!-- <p class="abouttexttitle text-center uppercase text-[1.5rem] leading-[1.5rem] pb-5">
                  {{ section.title }}
                </p> -->

                <Richtext
                  class="abouttextdesk centerdiv text-center md:p-10 md:text-[1.5rem] md:leading-[1.5rem] text-[2rem] leading-[normal] md:flex hidden"
                  :blocks="section.content"
                  v-if="section.content"
                ></Richtext>

                <Richtext
                  class="abtextmb text-center contents md:hidden md:p-10 md:text-[1.5rem] md:leading-[1.5rem] text-[2rem] leading-[normal]"
                  :blocks="section.content"
                  v-if="section.content"
                ></Richtext>
              </div>
            </div>
          </div>
        </div>
      </div>
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
// import Richtext from "~/components/Richtext.vue"; 

export default {
  name: "Poems",

  components: {
    Marqueec,
    LenisComponent,
    Header,
    // Richtext,
  },

  data() {
    return {
      project: false,
      poems: null, // Make sure poems is defined in the data
      activeSection: null, // Track the currently active section
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

  async asyncData({ $sanity, store }) {
    const poemQuery = groq`*[_type == "poems" ]  {
      ...,
      sections[]{
        _key,
        title,
        content
      }
    } | order(_updatedAt desc)[0]`;

    const poems = await $sanity.fetch(poemQuery);

    return { poems };
  },

  methods: {
    ...mapActions(["setTitle"]),
    ...mapMutations(["TOGGLE_MENU"]),


    goBack() {
      // Implement your logic to navigate back
      // For example:
      this.$router.go(-1); // This navigates back in the browser history
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
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&showinfo=0`;
    },

    getVimeoEmdedUrl(vimeoUrl) {
      const videoId = vimeoUrl.split("/").pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0`;
    },

    toggleBlueBox() {
      this.isBlueBoxActive = !this.isBlueBoxActive;
      this.updateContentContainerPosition();
      document.body.style.overflow = this.isBlueBoxActive ? "hidden" : "auto";
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
    ...mapState({
      poems: state => state.poems.data,
    }),

    arrowIconClass() {
      return this.isCollapsibleOpen ? "fas fa-arrow-up" : "fas fa-arrow-down";
    },
  },


  mounted() {
    this.$store.dispatch('fetchPoems');
  },
};
</script>

<style scoped>
/* Add your styles here */
.bordersec{
  border-right: 1px solid black;
}

.section-list ul {
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  list-style: none;
  flex-wrap: wrap;
}

.section-list li {
  margin: 0 10px;
  cursor: pointer;
  /* padding: 10px 20px; */
  /* border: 1px solid #000; */
  border-radius: 5px;
}

.section-list li.active {
  /* background-color: #000; */
  color: #dddddd;
  color: hsl(249.94deg 74.43% 42.94%);
}

.section-content {
  /* display: none; */
}

.section-content.active {
  /* display: block; */
}

/* Add any additional styles here */
</style>
