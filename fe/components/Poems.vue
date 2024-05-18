<template>
  <main class="mt-1 flex h-screen overflow-hidden">
    <div class="bordersec">
    <div class="w-[50vw]  h-screen overflow-hidden flex flex-col justify-center">
      <!-- Section Titles List -->
      <div v-if="poems && poems.sections" class="section-list">
        <ul class="abouttexttitle font-bold text-center uppercase text-[1.5rem] leading-[1.5rem] pb-5">
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
      <div v-if="poems && poems.sections" class=" pb-0 anchor" id="about">
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
// import Marqueec from "~/components/Marqueec.vue";
// import Header from "~/components/layout/Header.vue";
// import LenisComponent from "~/components/LenisComponent.vue";
// import Richtext from "~/components/Richtext.vue"; 

export default {
  name: "IndexPage",

  components: {
    // Marqueec,
    // LenisComponent,
    // Header,
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
      poems: [],
      activeStyle: { textDecoration: "none" },
      isCollapsibleOpen: false,
      isGlitching: false,
    };
  },

  async asyncData({ params, $sanity }) {
    const poemsQuery = groq`*[_type == "poems"]`;
    const poems = await $sanity.fetch(poemsQuery);
    return { poems };
  },

  methods: {
    ...mapActions(["setTitle"]),
    ...mapMutations(["TOGGLE_MENU"]),

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

    arrowIconClass() {
      return this.isCollapsibleOpen ? "fas fa-arrow-up" : "fas fa-arrow-down";
    },
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
}

.section-content {
  /* display: none; */
}

.section-content.active {
  /* display: block; */
}

/* Add any additional styles here */
</style>
