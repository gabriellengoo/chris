<template>
  <client-only> 
    <!-- pt-28 class="w-4/12 p-10 "-->
    <div class="">
      <div class=" overflow-x-hidden h-[100vh] blurfilter" ref="scrollContainer" @scroll="handleScroll">
        <div v-for="item in items"  :key="item._key" class="">
        <figure class="  w-[20vw] "   @mouseover="handleHover(item)"
  @mouseleave="handleLeave">
          <NuxtLink
            v-if="item.reference.slug"
            :to="`/work/${item.reference.slug}`"
          >
          <!-- class="marquee-container" -->
            <span >
              <figure class="  p-10 ">
                <MediaImage
                  :src="item.image.image"
                  v-if="item.image.image"
                  class=""
                ></MediaImage>
                <MediaVideo
                  :id="item.video.id"
                  v-if="item.video.id"
                ></MediaVideo>
                <!-- Render YouTube Video -->
                <iframe
                  v-else-if="item.youtubeUrl"
                  :src="getYouTubeEmbedUrl(item.youtubeUrl)"
                  frameborder="0"
                  allowfullscreen
                  class="pointer-events-none framesz"
                ></iframe>

                <!-- Render Vimeo Video -->
                <iframe
                  v-else-if="item.vimeoUrl"
                  :src="getVimeoEmbedUrl(item.vimeoUrl)"
                  frameborder="0"
                  allowfullscreen
                  class="pointer-events-none framesz"
                ></iframe>
              </figure>
            </span>
          </NuxtLink>
          <a v-else-if="item.link" :href="item.link" target="_blank">
            <span>
              <MediaImage
                :src="item.image.image"
                v-if="item.image.image"
              ></MediaImage>
              <MediaVideo
                :id="item.video.id"
                v-if="item.video.id"
                :thumbTime="item.video.thumbTime"
              ></MediaVideo>
              <!-- Render YouTube Video -->
              <iframe
                v-else-if="item.youtubeUrl"
                :src="getYouTubeEmbedUrl(item.youtubeUrl)"
                frameborder="0"
                allowfullscreen
                class="pointer-events-none"
              ></iframe>

              <!-- Render Vimeo Video -->
              <iframe
                v-else-if="item.vimeoUrl"
                :src="getVimeoEmbedUrl(item.vimeoUrl)"
                frameborder="0"
                allowfullscreen
                class="pointer-events-none"
              ></iframe>
            </span>
          </a>
          <figure v-else>
            <span>
              <MediaImage
                :src="item.image.image"
                v-if="item.image.image"
              ></MediaImage>
              <MediaVideo :id="item.video.id" v-if="item.video.id"></MediaVideo>
            </span>
          </figure>
        </figure>
      </div>
      </div>
      

         <!-- Render the enlarged image or video here -->
         <div v-if="hoveredItem" class="enlarged-item">
          <div class="background-overlay"></div> 
  <!-- Render the hovered item -->
  <div class="p-10 ">
    <NuxtLink v-if="hoveredItem.reference.slug" :to="`/work/${hoveredItem.reference.slug}`">
      <span>
        <figure class="">
          <MediaImage
            class="pointer-events-none w-[25vw]"
            :src="hoveredItem.image.image"
            v-if="hoveredItem.image && hoveredItem.image.image"
          ></MediaImage>
          <MediaVideo
            class="pointer-events-none w-[25vw]"
            :id="hoveredItem.video.id"
            v-if="hoveredItem.video && hoveredItem.video.id"
            :thumbTime="hoveredItem.video.thumbTime"
          ></MediaVideo>
        </figure>
        <figcaption
                class="capplace font-bold block  mr-auto "
                v-if="size == 'small'"
              >
                <span v-if="hoveredItem.title">{{ hoveredItem.title }}</span>
                <span v-else>{{ hoveredItem.reference.title }}</span>
        </figcaption>
      </span>
    </NuxtLink>
  </div>
</div>


   
    </div>
  </client-only>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["items", "size"],
  data() {
    return {
      project: false,
      containerClass: "flex flex-col w-full h-full",
      imageClass: "contain-image",
      isDesktop: false,
      hoveredItem: null,
      scrollInterval: null, // Initialize scroll interval variable
    };
  },
  computed: {
    ...mapState(["activeProject", "activeTalent"]), 
  },
  mounted() {
    this.redraw();
    // Check if the window width is greater than a certain threshold for desktop
    this.isDesktop = window.innerWidth > 768; // Adjust the threshold as needed
    // Listen to window resize events to update the isDesktop flag
    window.addEventListener("resize", this.handleResize);

    // Start auto-scrolling the container
    this.startAutoScroll();
  },
  beforeDestroy() {
    // Remove the resize event listener when the component is destroyed
    window.removeEventListener("resize", this.handleResize);

    // Clear the auto-scroll interval when the component is destroyed
    clearInterval(this.scrollInterval);
  },

  methods: {
    ...mapMutations(["SET_ACTIVE_PROJECT", "SET_ACTIVE_TALENT"]),
    redraw() {
      if (typeof this.$redrawVueMasonry === "function") {
        this.$redrawVueMasonry();
      }
    },

    handleHover(item) {
    this.hoveredItem = item;
  },
  handleLeave() {
    this.hoveredItem = null;
  },

    handleScroll() {
  const scrollContainer = this.$refs.scrollContainer;
  // Calculate the distance from the bottom of the scroll container
  const distanceFromBottom = scrollContainer.scrollHeight - (scrollContainer.scrollTop + scrollContainer.clientHeight);
  
  // Calculate the threshold dynamically based on the size of the items
  const itemWidth = 10; // Width of each item in vw (adjust as needed)
  const numItems = this.items.length; // Number of items in the container
  const containerWidth = numItems * itemWidth; // Total width of items in the container
  const containerThreshold = containerWidth * 0.1; // Set a threshold as 10% of the container width
  
  // If the distance from the bottom is less than the calculated threshold, fetch more data
  if (distanceFromBottom < containerThreshold) {
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
      const intervalDuration = 10; // Scroll every 10 milliseconds (adjust as needed)

      this.scrollInterval = setInterval(() => {
        const scrollContainer = this.$refs.scrollContainer;
        scrollContainer.scrollTop += 1; // Scroll down by 1 pixel
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
      const videoId = vimeoUrl.split("/").pop();
      // Generate the Vimeo embed URL
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&autopause=0`;
    },
    hover(item) {
      if (item.reference.title) {
        this.SET_ACTIVE_PROJECT(item.reference);
        if (this.size == "small") {
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
/* @media (min-width: 768px){
  .masonry.large .item.double {
    height: 55vh;

}
} */

.enlarged-item {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}

.enlarged-item img {
  position: fixed;
  top: 50vh;
  left: 50vw;
  /* height: 20vh; */
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 9999; /* Ensure it appears above other content */
}


.enlarged-item:hover .background-overlay {
  opacity: 0; /* Fade out the background overlay on hover */
}

.blur {
  filter: blur(5px);
}
</style>