<template>
  <main class="min-h-full">
    <!-- <LenisComponent /> -->
    <!-- <TransitionComponent /> -->
    
    <transition name="fade">
      <Nuxt />
    </transition>

    <transition name="fade">
    <!-- <LayoutHeader
      :class="
        $nuxt.$route.name == 'index' ||
        $nuxt.$route.name == 'home' ||
        $nuxt.$route.name == 'index-bak' ||
        $nuxt.$route.name == 'about' ||
        $nuxt.$route.name == 'work' || 
        $nuxt.$route.name == 'contact'
          ? ''
          : ' md:flex'
      "
    ></LayoutHeader> -->
  </transition>
 
    <!-- <LayoutHeaderMin
      :class="
        $nuxt.$route.name == 'index' ||
        $nuxt.$route.name == 'index-bak' ||
        $nuxt.$route.name == 'about' ||
        $nuxt.$route.name == 'production' ||
        $nuxt.$route.name == 'artists'
          ? 'hidden'
          : 'hidden md:flex'
      "
    ></LayoutHeaderMin> -->
 
  </main>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import TransitionComponent from '~/components/TransitionComponent.vue';
// import LenisComponent from '~/components/LenisComponent.vue';
// import Lenis from '@studio-freight/lenis';



export default {

  methods: {
    ...mapActions(['setTitle']),
    ...mapMutations(['SET_FOOTER', 'CLOSE_MENU']),
  },
  data() {
    return {
      lenis: null,
      // loading: true,
      // ... other data properties
    };
  },
  mounted() {
    // const lenis = new Lenis()

// lenis.on('scroll', (e) => {
//   console.log(e)
// })

// function raf(time) {
//   lenis.raf(time)
//   requestAnimationFrame(raf)
// }

// requestAnimationFrame(raf)
},

  components: {
    TransitionComponent,
  },
  watch: {
    $route: function (value) {
      this.setTitle(false)
      this.SET_FOOTER(false)
      this.CLOSE_MENU()
    },
  },
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
