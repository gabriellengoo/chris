<template>
  <client-only>
    <div
      v-masonry
      column-width=".item"
      item-selector=".item"
      class="w-full masonry"
      :class="size"
      horizontal-order="true"
    > 
    <!-- item.double ? 'double h-fit' : '', vid height?  --> 
      <div
        v-masonry-tile
        class="relative transition-opacity duration-300 item"
        v-for="item in items"
        :key="item._key"
        :class="[
          item.double ? 'double h-fit' : '',
          item.spacer != 0 ? 'p-2' : '',
          item.image.image || item.video.id ? '' : 'hidden md:block',
          // mobile test?
          item.double && size == 'small' ? '' : '',
          activeTalent &&
          activeTalent != item.reference.talentId &&
          activeTalent != item.reference
            ? ''
            : '', 
        ]"
      > 
      <!--  :style="{ backgroundColor: item.double ? 'red' : 'blue', }" 
                  :style="{ minHeight: item.video.id ? (isDesktop ? (item.double ? '75vh' : '45vh') : '15vh') : 'auto' }"
       ? 'h-space-fit md:h-space-fit 2xl:h-space-fit' vid space height--> 
        <figure
          class="flex flex-col w-[19vw]" 
          :style="{ minHeight: item.video.id ? (isDesktop ? 'autoh' : 'auto') : 'auto' }"
          :class="[
            item.spacer
              ? `h-space-${item.spacer + 1}  md:h-space-${item.spacer}`
              : item.image.aspect >= 1
              ? item.double
                 ? 'h-space-10 md:h-space-10 2xl:h-space-10'
                : 'h-space-5 md:h-space-3 2xl:h-space-2'
              : item.double
              ? 'h-space-fit md:h-space-fit 2xl:h-space-fit'
              : 'h-space-12 md:h-space-6 2xl:h-space-4',
              // mb-6
            size == 'small' ? '' : '',
          ]"
        >
          <NuxtLink
            :class="[
              containerClass,
              item.image.position == 'right'
                ? 'items-end'
                : item.image.position == 'center'
                ? 'items-center'
                : 'items-start',
            ]"
            v-if="item.reference.slug"
            :to="`/work/${item.reference.slug}`"
            @mouseenter.native="hover(item)"
            @mouseleave.native="leave()"
          >
            <span
              class="flex flex-col items-start h-full max-w-full"
              :class="size == 'small' ? 'w-full' : 'w-auto'"
            >
              <figure
              class="figsize"
                :class="size == 'small' ? 'block w-full' : 'h-full w-auto'"
                :style="
                  item.video && item.video.aspect && size == 'small'
                    ? `aspect-ratio: ${item.video.aspect.replace(':', '/')}`
                    : ''
                "
              >
                <MediaImage
                  :size="item.image.size"
                  :aspect="item.image.aspect"
                  :src="item.image.image"
                  v-if="item.image.image"
                  class="contain-image"
                  :sizes="
                    size == 'sm' ? 'sm:60vw md:15vw' : 'sm:150vw md:150vw'
                  "
                ></MediaImage>
                <!-- :style="{ backgroundColor: item.double ? 'red' : 'blue', }"  -->
                <MediaVideo 
                  :id="item.video.id"
                  :thumbTime="item.video.thumbTime"                 
     v-if="item.video.id"
                  class="dubvid vdpadoverview object-contain object-top w-auto h-full"
                    
                ></MediaVideo>
              </figure>
              <figcaption
                class="capplace font-bold block  mr-auto "
                v-if="size == 'small'"
              >
                <span v-if="item.title">{{ item.title }}</span>
                <span v-else>{{ item.reference.title }}</span>
              </figcaption>
              <figcaption
                class="capplaces text-center block  mr-auto "
                v-if="size == 'small'"
              >
                <span v-if="item.dis">{{ item.dis }}</span>
                <span v-else>{{ item.reference.dis }}</span>
              </figcaption>
            </span>
          </NuxtLink>
          <a
            v-else-if="item.link"
            :href="item.link"
            target="_blank"
            :class="[
              containerClass,
              item.image.position == 'right'
                ? 'items-end'
                : item.image.position == 'center'
                ? 'items-center'
                : 'items-start',
            ]"
            @mouseenter="
              item.reference.title
                ? SET_ACTIVE_PROJECT(item.reference)
                : SET_ACTIVE_PROJECT(item._key)
            "
            @mouseleave="SET_ACTIVE_PROJECT(false)"
          >
            <span class="flex flex-col items-start w-auto h-full max-w-full">
              <MediaImage
                :size="item.image.size"
                :aspect="item.image.aspect"
                :src="item.image.image"
                v-if="item.image.image"
                class="contain-image"
                :sizes="size == 'sm' ? 'sm:60vw md:15vw' : 'sm:150vw md:150vw'"
              ></MediaImage>
              <MediaVideo
                :id="item.video.id"
                :style="`aspect-ratio: ${item.video.aspect.replace(':', '/')}`"
                v-if="item.video.id"
                :thumbTime="item.video.thumbTime"
                class="object-contain vdpadoverview object-top w-auto h-full"
              ></MediaVideo>
              <figcaption
                class="capplace block py-2 px-2 mr-auto text-xs"
                v-if="size == 'small'"
              >
                <span v-if="item.title">{{ item.title }}</span>
                <span v-else>{{ item.reference.title }}</span>
              </figcaption>
            </span>
          </a>
          <figure
            v-else
            :class="[
              containerClass,
              item.image.position == 'right'
                ? 'items-end'
                : item.image.position == 'center'
                ? 'items-center'
                : 'items-start',
            ]"
          >
            <span class="flex flex-col items-start w-auto h-full max-w-full">
              <MediaImage
                :size="item.image.size"
                :aspect="item.image.aspect"
                :src="item.image.image"
                v-if="item.image.image"
                :class="imageClass"
                :sizes="size == 'sm' ? 'sm:60vw md:15vw' : 'sm:150vw md:150vw'"
              ></MediaImage>
              <MediaVideo
                :id="item.video.id"
                :style="`aspect-ratio: ${item.video.aspect.replace(':', '/')}`"
                v-if="item.video.id"
                :thumbTime="item.video.thumbTime"
                class="object-contain vdpadoverview object-top w-auto h-full"
              ></MediaVideo>
              <figcaption
                class="capplace block py-2 px-2 mr-auto text-xs"
                v-if="size == 'small'"
              >
                <span v-if="item.title">{{ item.title }}</span>
                <span v-else>{{ item.reference.title }}</span>
              </figcaption>
            </span>
          </figure>
        </figure>
      </div>
    </div>
  </client-only>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: ['items', 'size'],
  data() {
    return {
      project: false,
      containerClass: 'flex flex-col w-full h-full',
      imageClass: 'contain-image',
      isDesktop: false,
    }
  },
  computed: {
    ...mapState(['activeProject', 'activeTalent']),
  },
  mounted() {
    this.redraw()
      // Check if the window width is greater than a certain threshold for desktop
      this.isDesktop = window.innerWidth > 768; // Adjust the threshold as needed
    // Listen to window resize events to update the isDesktop flag
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    // Remove the resize event listener when the component is destroyed
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    ...mapMutations(['SET_ACTIVE_PROJECT', 'SET_ACTIVE_TALENT']),
    redraw() {
      if (typeof this.$redrawVueMasonry === 'function') {
        this.$redrawVueMasonry()
      }
    },
    beforeDestroy() {
    // Remove the resize event listener when the component is destroyed
    window.removeEventListener('resize', this.handleResize);
  },
    hover(item) {
      if (item.reference.title) {
        this.SET_ACTIVE_PROJECT(item.reference)
        if (this.size == 'small') {
          this.SET_ACTIVE_TALENT(item.reference)
        } else {
          this.SET_ACTIVE_TALENT(item.reference.talentId)
        }
      } else {
        this.SET_ACTIVE_PROJECT(false)
      }
    },
    leave() {
      this.SET_ACTIVE_PROJECT(false)
      this.SET_ACTIVE_TALENT(false)
    },
  },
}
</script>
<style scoped>
/* @media (min-width: 768px){
  .masonry.large .item.double {
    height: 55vh;
 
}
} */

.vdpadoverview{
  padding: 5px;
}

</style>