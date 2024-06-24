<template>
  <client-only>
    <!-- class="marquee2" -->
    <!-- <Marqueec> -->
      <div class="images_marquee_wrapper " ref="scrollContainer" @scroll="handleScroll">
      <div
        v-masonry
        column-width=".item"
        item-selector=".item"
        class="marquee "
        :class="size"
        horizontal-order="true"
      >
        <div
          v-masonry-tile
          class="item"
          v-for="item in items"
          :key="item._key"
        >
        
          <figure class=" p-3 pt-10">
            <NuxtLink
              v-if="item.reference.slug"
              :to="`/work/${item.reference.slug}`"
            >
              <span>
                <figure                     :style="{
   height: `80vh`, 
 }">
                  <MediaImage
                    :size="item.image.size"
                    :aspect="item.image.aspect"
                    class="imgmarkgrsize"
                    :src="item.image.image"
                    v-if="item.image.image"
                  ></MediaImage>
                  <MediaVideo
                  class="vidsize"
                    :id="item.video.id"
                    
                    v-if="item.video.id"
                  ></MediaVideo>
                               <!-- Render YouTube Video -->
        <iframe
          v-else-if="item.youtubeUrl"
          :src="getYouTubeEmbedUrl(item.youtubeUrl)"
          frameborder="0"
          
          allowfullscreen
          class="vidsize"
        ></iframe>

        <!-- Render Vimeo Video -->
        <iframe
          v-else-if="item.vimeoUrl"
          :src="getVimeoEmbedUrl(item.vimeoUrl)"
          frameborder="0"
          
          allowfullscreen
          class="vidsize"
        ></iframe>
                </figure>
                <!-- <figcaption v-if="size == 'small'">
                  <span v-if="item.title">{{ item.title }}</span>
                  <span v-else>{{ item.reference.title }}</span>
                </figcaption> -->
              </span>
            </NuxtLink>
            <a v-else-if="item.link" :href="item.link" target="_blank">
              <span>
                <MediaImage
                  :size="item.image.size"
                  :aspect="item.image.aspect"
                  class="imgmarkgrsize"
                  :src="item.image.image"
                  v-if="item.image.image"
                ></MediaImage>
                <MediaVideo
                class="vidsize"
                  :id="item.video.id"
                  
                  v-if="item.video.id"
                ></MediaVideo>
                             <!-- Render YouTube Video -->
        <iframe
          v-else-if="item.youtubeUrl"
          :src="getYouTubeEmbedUrl(item.youtubeUrl)"
          frameborder="0"
          allowfullscreen
          class=" w-[50vw] h-[40vh]"
        ></iframe>

        <!-- Render Vimeo Video -->
        <iframe
          v-else-if="item.vimeoUrl"
          :src="getVimeoEmbedUrl(item.vimeoUrl)"
          frameborder="0"
          allowfullscreen
          class="w-[50vw] h-[40vh]"
        ></iframe>
                <!-- :style="`aspect-ratio: ${item.video.aspect.replace(':', '/')}`" -->
                <!-- <figcaption v-if="size == 'small'">
                  <span v-if="item.title">{{ item.title }}</span>
                  <span v-else>{{ item.reference.title }}</span>
                </figcaption> -->
              </span>
            </a>
            <figure v-else >
              <span>
                <MediaImage
                  :size="item.image.size"
                  :aspect="item.image.aspect"
                  class="imgmarkgrsize"
                 
                  :src="item.image.image"
                  v-if="item.image.image"
                ></MediaImage>
                <MediaVideo
                  :id="item.video.id"
                  class="vidsize"
                 
                  v-if="item.video.id"
                ></MediaVideo>
                             <!-- Render YouTube Video -->
        <iframe
          v-else-if="item.youtubeUrl"
          :src="getYouTubeEmbedUrl(item.youtubeUrl)"
          frameborder="0"
          allowfullscreen
          class="w-[50vw] h-[40vh]"
        ></iframe>

        <!-- Render Vimeo Video -->
        <iframe
          v-else-if="item.vimeoUrl"
          :src="getVimeoEmbedUrl(item.vimeoUrl)"
          frameborder="0"
          allowfullscreen
          class="w-[50vw] h-[40vh]"
        ></iframe>
                <!-- <figcaption v-if="size == 'small'">
                  <span v-if="item.title">{{ item.title }}</span>
                  <span v-else>{{ item.reference.title }}</span>
                </figcaption> -->
              </span>
            </figure>
          </figure>
        
        </div>
    
      </div>
    </div>
  <!-- </Marqueec> -->
  </client-only>
</template>


<script>
import { mapMutations, mapState } from 'vuex';

export default {
  props: ['items', 'size'],
  data() {
    return {
      project: false,
      containerClass: "flex flex-col w-full h-full",
      imageClass: "contain-image",
      isDesktop: false,
      scrollInterval: null, // Initialize scroll interval variable
    };
  },
  computed: {
    ...mapState(['activeProject', 'activeTalent']),
  },
  mounted() {
    this.redraw();
    this.isDesktop = window.innerWidth > 768;
    window.addEventListener('resize', this.handleResize);
    // Start auto-scrolling the container
    this.startAutoScroll();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    clearInterval(this.scrollInterval);
  },
  methods: {
    ...mapMutations(['SET_ACTIVE_PROJECT', 'SET_ACTIVE_TALENT']),
    handleResize() {
      this.isDesktop = window.innerWidth > 768;
    },
    redraw() {
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry();
      }
    },
    handleScroll(event) {
      const scrollContainer = this.$refs.scrollContainer;
      // Reverse the scroll direction by subtracting the scroll position from the maximum scroll width
      const distanceFromRight = scrollContainer.scrollWidth - (scrollContainer.scrollLeft + scrollContainer.clientWidth);
      const fetchThreshold = 50; // Pixels from the right

      // If the distance from the right is greater than the fetch threshold, fetch more data
      if (distanceFromRight < fetchThreshold) {
        this.fetchMoreData();
      }
    },
    fetchMoreData() {
      // Assuming items is an array, you can simply append the existing items to itself
      // This will repeat the content
      this.items = this.items.concat(this.items);
      // Fetch more data here and append it to the existing items array
      // Example:
      // this.$axios.get('/api/more-items')
      //   .then(response => {
      //     this.items = this.items.concat(response.data);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching more data:', error);
      //   });
    },
    startAutoScroll() {
      // Define the interval duration in milliseconds
      const intervalDuration = 30; // Scroll every 10 milliseconds (adjust as needed)

      this.scrollInterval = setInterval(() => {
        const scrollContainer = this.$refs.scrollContainer;
        scrollContainer.scrollLeft += 1; // Scroll right by 1 pixel
      }, intervalDuration);
    },
    getYouTubeEmbedUrl(youtubeUrl) { 
      // Extract YouTube video ID from the URL
      const videoId = youtubeUrl.split("v=")[1];
      // Generate the YouTube embed URL with autoplay, mute, loop, and hide controls on hover parameters
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&showinfo=0`;
    },
    getVimeoEmbedUrl(vimeoUrl) {
      // Extract Vimeo video ID from the URL
      const videoId = vimeoUrl.split('/').pop();
      // Generate the Vimeo embed URL
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0`;
    },
    hover(item) {
      if (item.reference.title) {
        this.SET_ACTIVE_PROJECT(item.reference);
        if (this.size == 'small') {
          this.SET_ACTIVE_TALENT(item.reference);
        } else {
          this.SET_ACTIVE_TALENT(item.reference.talentId);
        }
      } else {
        this.SET_ACTIVE_PROJECT(false);
      }
    },
    leave() {
      this.SET_ACTIVE_PROJECT(false);
      this.SET_ACTIVE_TALENT(false);
    },
  },
};
</script>

<style scoped>

.imgmarkgrsize{
    width: -webkit-fill-available; /* For Safari */
    width: fill-available; /* For other browsers */
    height: 40vh;
    width: auto;
    max-width: none;
    display: flex;
}

.img{
  padding: 5vw !important;
}



.masonry {
  height: 100vw;
    display: flex;
    flex-direction: row;
}
 
.images_marquee_wrapper {
  height: 85vh;
  height: 50vh;
    padding-bottom: 5vh;
  /* justify-content: center; */
  max-width: 100%;
  width: 80vw;
  overflow-y: hidden;
    overflow-x: scroll;
  /* height: 100vh ; */
  /* display: flex; */
  /* -webkit-animation: 0.75s ease 0s normal forwards 1 fadein;
  animation: 0.75s ease 0s normal forwards 1 fadein; */
  /* z-index: -1 !important; */
  /* animation: marquee2 3000s linear infinite;
  animation: marquee2 10 steps(340);  */
}

@keyframes fadein{
  0% { opacity:0; }
  66% { opacity:0; }
  100% { opacity:1; }
}

.marquee2 {
  display: flex;
  gap: 0;
  /* animation: marquee2 500s linear infinite; */
}





.vidsize{
  max-width: fit-content !important;
}

.item {
  /* height: 100vh;  */
  box-sizing: border-box;
  display: contents;
  /* Remove the following two lines */
  /* flex: 0 0 auto; */
  /* margin-right: 16px; */
}

@media (max-width: 768px) {
img{
  height: 29vh !important;
  width: auto;
}


.images_marquee_wrapper{
  /* height: auto !important; */
  width: 100vw;
  height: 30vh;
  /* height: 29vh !important; */
  /* animation: none !important; */
}
}



.images_marquee_wrapper {
  /* overflow: hidden; */
  overflow-y: hidden;
    overflow-x: scroll;
}

.marquee {
  display: flex;
  /* animation: marquee-scroll 100s linear infinite; */
}

.item {
  flex: 0 0 auto;
}

/* @keyframes marquee-scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
} */


</style>