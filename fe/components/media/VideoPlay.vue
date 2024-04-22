<template>
  <figure class="relative flex items-center justify-center">
    <video
      class="vidpointer object-cover w-full h-full bg pointer-events-auto cursor-pointer"
      ref="video"
      loop
      playsinline
      :muted="false"
      :poster="`https://image.mux.com/${this.id}/thumbnail.jpg?${
        thumbTime ? `time=${this.thumbTime}` : ''
      }`"
      :src="`https://stream.mux.com/${this.id}.m3u8`"
    ></video>

    <div
      class="controls absolute bottom-[15vh] w-full flex items-center justify-between px-4 py-2 bg-opacity-50 text-black"
    >
      <button class="control-button" @click="togglePlay">
        <svg
          v-if="!playing"
          class="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 3l14 9-14 9V3z"
          ></path>
        </svg>
        <!-- <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H6m13-6H6m13 10.4L6 21"></path>
</svg> -->
        <svg
          v-else
          class="w-10 h-10"
          id="Layer_1"
          style="enable-background: new 0 0 512 512"
          version="1.1"
          viewBox="0 0 512 512"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path d="M191,112v288h-47V112H191 M207,96h-79v320h79V96L207,96z" />
            <path d="M368,112v288h-47V112H368 M384,96h-79v320h79V96L384,96z" />
          </g>
        </svg>
        <!-- <svg v-else class="w-6 h-6"  fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" id="Layer_1"  version="1.1" viewBox="0 0 24 24"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M191,112v288h-47V112H191 M207,96h-79v320h79V96L207,96z"/><path d="M368,112v288h-47V112H368 M384,96h-79v320h79V96L384,96z"/></g></svg> -->
      </button>
      <div class="progress-bar flex-1 ml-4">
        <input
          type="range"
          class="w-full"
          min="0"
          max="100"
          step="1"
          v-model="currentTime"
          @input="seek"
        />
      </div>
      <button class="control-button" @click="toggleMute">
        <p class="pl-5">{{ muted ? "play sound" : "pause sound" }}</p>
      </button>
    </div>
  </figure>
</template>

<script>
import Hls from "hls.js";
export default {
  props: {
    id: { type: String },
    active: {
      type: Boolean,
      default: false,
    },
    autoplay: { type: Boolean, default: false },
    muted: {
      type: Boolean,
      default: false, // Change the default value to false
    },
    thumbTime: { type: Number },
  },
  data() {
    return {
      intersectionOptions: {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: [0, 0],
      },
      playing: false,
      aspectRatio: "",
      mobile: false,
      loaded: false,
      currentTime: 0,
    };
  },
  methods: {
    play() {
      let video = this.$refs["video"];
      video.play();
      this.playing = true;
    },
    pause() {
      let video = this.$refs["video"];
      video.pause();
      this.playing = false;
    },
    togglePlay() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },
    toggleMute() {
      let video = this.$refs["video"];
      video.muted = !video.muted;
      this.muted = video.muted;
    },
    seek() {
      let video = this.$refs["video"];
      video.currentTime = (video.duration / 100) * this.currentTime;
    },
  },
  watch: {
    active: function (newVal, oldVal) {
      if (!newVal) {
        this.pause();
      }
    },
  },

  // computed: {
  //   thumbPosition() {
  //     return `calc(${this.currentTime}% - 50px)`;
  //   }
  // },

  mounted() {
    if (window.outerWidth < 768) {
      this.mobile = true;
    }
    const playback = "https://stream.mux.com/" + this.id + ".m3u8";
    let video = this.$refs["video"];
    let that = this;
    if (Hls.isSupported()) {
      let hls = new Hls();
      hls.loadSource(playback);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        that.loaded = true;
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = playback;
      that.loaded = true;
    }

    video.addEventListener("timeupdate", () => {
      this.currentTime = (video.currentTime / video.duration) * 100;
    });
  },
};
</script>

<style scoped>
.controls {
  z-index: 100000000;
    pointer-events: auto;
}

.control-button {
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 1000000;
}
.progress-bar input[type="range"] {
  -webkit-appearance: none;
  height: 2px;
  background-color: black;
  /* background-color: hsl(0deg 0% 0% / 12%); */
  border-radius: 5px;
  outline: none;
}

.progress-bar input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  background-color: #000;
  border-radius: 50%;

  /* position: relative;
  right: 5vw; */
}


.vidpointer{
  pointer-events: none !important;
}
/* .proball{

position: relative;
left: 1vw;
} */
</style>
