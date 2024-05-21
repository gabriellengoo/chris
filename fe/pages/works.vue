<template>
  <main class="mt-1 flex h-screen overflow-hidden">
    <div class="w-screen h-screen overflow-hidden flex justify-center">
     
<!-- hom btn -->
<div
      class=" p-5 font-bold flex justify-end uppercase  md:pb-5 text-[6.5rem] leading-[5.5rem]  bcbtn2  left-[90vw] md:hidden contens "
    >
      <a
              class="z-50 pb-8 pt-0"
              href="./../"
              rel="noopener noreferrer"
            >
            CHISARA AGOR
            </a>
    </div>

     
     
      <!-- about text w-2/4-->
      <div>
        <div v-if="currentGrid === 'grid'" class="marquee-1">
          <Grid class="" :items="grid.grid" size="small"></Grid>
        </div>

        <div v-if="currentGrid === 'gridm'" class=" marquee-2">
          <Griddirect class="" :items="grid.gridm" size="small"></Griddirect>
        </div>

        <div v-if="currentGrid === 'gride'" class=" marquee-3">
          <Grid class="" :items="grid.gride" size="small"></Grid>
        </div>

        <div v-if="currentGrid === 'gridl'" class=" marquee-4">
          <Griddirect class="" :items="grid.gridl" size="small"></Griddirect>
        </div>
      </div>


      
      <!-- home img --> 
      <div>
        <p class=" cursor-pointer textmul md:text-[1.5rem] text-[2rem]" @mouseenter="cycleHoverText" @click="cycleGrid">{{ hoverText }}</p>
        <!-- <button class="textmul text-[1.5rem]" @click="goBack">Go Back</button> -->
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      hoverTexts: ['CLICK ME', 'VISUAL ARTIST', 'WRITER', 'PERFORMER','MUSICIAN','DESIGNER'], // Array of text for hovering
      hoverIndex: 0, // Index to track the current hover text
      gridTypes: ['grid', 'gridm', 'gride', 'gridl'], // Array of grid types
      gridIndex: 0 // Index to track the current grid type
    };
  },
  computed: {
    ...mapState(['grid']),
    hoverText() {
      return this.hoverTexts[this.hoverIndex];
    },
    currentGrid() {
      return this.gridTypes[this.gridIndex];
    }
  },
  methods: {
    cycleHoverText() {
      this.hoverIndex = (this.hoverIndex + 1) % this.hoverTexts.length;
    },
    cycleGrid() {
      this.gridIndex = (this.gridIndex + 1) % this.gridTypes.length;
    },
    goBack() {
      this.$root.$emit('slideBack');
    },
  },
  mounted() {
    // Fetch data here if needed
  }
};
</script>

<style scoped>
.textmul{
  position: absolute;
    top: 50%;
    left: 13%;
    transform: translate(-50%, -50%);
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    font-style: normal;
    color: hsl(249.94deg 74.43% 42.94%);
}

@media (max-width: 768px) {
  .textmul{
  position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    font-family: "Roboto", sans-serif;
    font-weight: 900;
    font-style: normal;
    color: hsl(249.94deg 74.43% 42.94%);
}
}
/* Add your styles here */
</style>
