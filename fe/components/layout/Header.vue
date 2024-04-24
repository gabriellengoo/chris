<template>
  <!-- bg-white -->
  <header
    class=" absolute top-0 w-3/6  pb-10  leading-snug uppercase   "
  >
  <!-- justify-center fixed border-b-2 border-black pt-8 -->
    <div
      class=" mobilemenu headbg flex justify-center flex-wrap  items-center gap-4 p-2 md:pb-2 md:pt-2 md:flex-nowrap"
    >
    <!-- <Animation></Animation> -->
    <!-- <div><h1 class="titleText flex justify-between items-center text-9xl align-baseline text-center uppercase">Scripted</h1></div> -->
    <!-- <NuxtLink
          to="/"
          class="headtop titleText flex justify-between items-center text-9xl align-baseline text-center uppercase"
     
        >
        CHISARA AGOR
        </NuxtLink> -->
  

        


  <nav class="headtoplinks w-[45vw] linktextmb text-[2rem] justify-between flex">
    <NuxtLink to="/" class="header-link">Home</NuxtLink>
        <NuxtLink to="/works">Work</NuxtLink>
        <NuxtLink to="/poetry" >Poetry</NuxtLink>
      </nav>

      <!-- <SearchBar /> -->

     
    </div>
   

    <LayoutMenu v-if="menu"></LayoutMenu>
  </header>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import SearchBar from '~/components/SearchBar.vue'

export default {
  components: {
    // Header,
    SearchBar
  },
  data() {
    return {
      touchHover: false,
      touchMove: false,
    };
  },
  computed: {
    ...mapState(['contact', 'menu']),
  },
  methods: {
    ...mapMutations(['TOGGLE_MENU']),
    startAnimation() {
      this.touchHover = true;
      this.touchMove = true;
    },
    endAnimation() {
      // Add a short delay to see the tap-based animation
      setTimeout(() => {
        this.touchHover = false;
        this.touchMove = false;
      }, 300);
    },
    // scrollToContact() {
    //   this.$emit('scroll-to-contact');
    // },
    scrollToContact() {
      this.scrollToSection('#contact');
    },
    scrollToAbout() {
      this.scrollToSection('#about');
    },
    scrollToSection(selector) {
  const section = document.querySelector(selector);
  if (section) {
    const offset = section.offsetTop;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
    },
  },
};
</script>

<style scoped>

/* fade */
/* .headbg{
    background-image: linear-gradient(to bottom, rgb(255, 255, 255), rgba(240, 240, 240, 0));
    background-repeat: no-repeat;
} */


/* white */
.headbg{
 /* background: #f3f3f7; */
}

.headtoplinks{
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-style: normal;
}

.titleText {
  /* font-family: 'AtlasGrotesk', sans-serif; */
  font-size: 15rem;
  /* line-height: 7.5rem; */
}

.animate-hover {
  transition: color 0.3s ease-in-out;
}

.titleText:hover .animate-hover,
.titleText.touch-hover .animate-hover {
  color: black; /* Change to the desired tap hover color */
}

.hover-move {
  transition: transform 0.3s ease-in-out, margin-right 0.3s ease-in-out;
}

.titleText:hover .hover-move,
.titleText.touch-move .hover-move {
  transform: translateX(30px); /* Adjust the value based on your preference */
  margin-right: 30px; /* Adjust the value based on your preference */
}

/* Mobile styles using media query */
@media (max-width: 768px) {
  .titleText {
    font-size: 13vw;
  }

  .mobilemenu {
    justify-content: space-between;
  }

  .linktextmb {
    text-align: end;
    font-size: 4vw;
  }
}
</style>