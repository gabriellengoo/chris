<template>
  <div>
    <div class="containerhome absolute top-[2vh]" :style="{ transform: containerTransform }">
      <div class="w-[100vw]  h-screen">
        <button
          class=" z-20 top-[2vh] fixed left-[45vw] text-[white]"
          @click="TOGGLE_MENU()"
        >
          <!-- Hamburger Icon -->
          <svg
            v-if="!menu"
            class="h-[4rem] w-[4rem]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-width="1.5" d="M2 12h20M2 7h20M2 17h20"></path>
          </svg>
          <!-- X Icon -->
          <svg
            v-else
            class="h-[4rem] w-[4rem]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div class="absolute z-20 top-[40vh] w-[50vw]">
          <div v-if="menu" class="flex flex-col justify-center">
          

            <a
              v-if="menu"
              class="abouttexttitle linktext uppercase text-[1.8rem] leading-[1.5rem] pb-5"
              href="./"
              rel="noopener noreferrer"
            >
            Home
            </a>

            <a
              v-if="menu"
              class="abouttexttitle linktext uppercase text-[1.8rem] leading-[1.5rem] pb-5"
              href="./works"
              rel="noopener noreferrer"
            >
              Work
            </a>

            <button
              class="abouttexttitle uppercase text-[1.8rem] leading-[1.5rem] text-[white]"
              @click="transitionToPoems"
            >
              Poems
            </button>

            <p
              class="presssectextlink mt-10 flex justify-center text-[1.8rem] text-[white] leading-[4.5rem]"
            >
              Stay up to date
            </p>

            <div class="social-icons text-center">
              <a
                href="https://www.facebook.com/YourPage"
                target="_blank"
                class="social-icon"
              >
                <i class="scale-[2] p-5 text-white fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com/YourPage"
                target="_blank"
                class="social-icon"
              >
                <i class="scale-[2] p-5 text-white fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/YourPage"
                target="_blank"
                class="social-icon"
              >
                <i class="scale-[2] p-5 text-white fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <button
            class="absolute left-[95vw] top-[-37vh] text-[black] uppercase text-[1.8rem] leading-[1.5rem] pb-5"
            @click="goBack"
          >
            Home
          </button>
        </div>

        <!-- <Home v-if="currentSection === 'home'" /> -->
      </div>

      <div class="new-section" :style="{ transform: newSectionTransform }">
        <Poems v-if="currentSection === 'poems'" />
      </div>
    </div>
  </div>
</template>

<script>
import Works from "~/pages/works.vue";
import Poems from "~/pages/poems.vue";
import Home from "~/pages/index.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Works,
    Home,
    Poems,
  },
  data() {
    return {
      currentSection: 'home',
      containerTransform: "translateX(0)",
      newSectionTransform: "translateX(100vw)", // Initial position off-screen
    };
  },
  methods: {
    ...mapMutations(["TOGGLE_MENU"]),

    goBack() {
      this.currentSection = 'home';
      this.containerTransform = "translateX(0)";
      this.newSectionTransform = "translateX(100vw)";
    },
    transitionToPoems() {
      // Move the container to the left and bring in the Poems section
      this.containerTransform = "translateX(-50vw)";
      this.newSectionTransform = "translateX(0)";
      // Set the current section to 'poems'
      this.currentSection = 'poems';
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


<style>
.abouttexttitle {
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
}

.containerhome {
  display: flex;
  width: 200vw; /* Double the width for both sections */
  height: 100vh;
  transition: transform 0.5s ease-in-out;
  overflow: hidden;
}

.new-section {
  width: 50vw;
  height: 100vh;
  transition: transform 0s ease-in-out;
  overflow: hidden;
}

.presssectextlink {
  /* padding-top: 1rem; */
  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
  font-weight: 900;
}
</style>
