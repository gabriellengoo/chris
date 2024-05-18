export const state = () => ({
  grid: [],
  title: false,
  activeProject: false,
  activeTalent: false,
  footer: false,
  isGalleryOpen: false,
  // contact: false,
  menu: false,
  aboutPage: null,
  poems: null,
  metaemailsData: null,
})



export const mutations = {

  setMetaEmailsData(state, data) {
    state.metaemailsData = data;
  },

  setGalleryState(state, isOpen) {
    state.isGalleryOpen = isOpen;
  },
  SET_GRID(state, grid) {
    state.grid = grid
  },
  SET_TITLE(state, title) {
    state.title = title
  },
  SET_ACTIVE_PROJECT(state, project) {
    state.activeProject = project
  },
  SET_ACTIVE_TALENT(state, talent) {
    state.activeTalent = talent
  },
  SET_FOOTER(state, footer) {
    state.footer = footer
  },
  SET_POEMS_PAGE(state, poems) {
    state.poems = poems
  },
  // SET_CONTACT(state, contact) {
  //   state.contact = contact
  // },
  TOGGLE_MENU(state) {
    state.menu = !state.menu
  },
  CLOSE_MENU(state) {
    state.menu = false
  },
}

import { groq } from '@nuxtjs/sanity'

export const actions = {


  async nuxtServerInit({ commit }) { 
    // Home Grid
    const gridQuery = groq`*[_type == "home" ] {grid[] {_key, double, spacer, youtubeUrl,vimeoUrl, "video" : {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio}, "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "size" : {"width" : image.asset->metadata.dimensions.width, "height" : image.asset->metadata.dimensions.height}, "position" : position}, link, title, "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "talentId" : reference->talent._ref, "team" : reference->team, "meta" : reference->meta}}} | order(_updatedAt desc)[0]`
    const grid = await this.$sanity.fetch(gridQuery)
    commit('SET_GRID', grid)


      // Works Grid
      const gridQuery2 = groq`*[_type == "works" ] {grid[] {_key, double, spacer, youtubeUrl,vimeoUrl, "video" : {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio}, "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "size" : {"width" : image.asset->metadata.dimensions.width, "height" : image.asset->metadata.dimensions.height}, "position" : position}, link, title, "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "talentId" : reference->talent._ref, "team" : reference->team, "meta" : reference->meta}}
       ,  gridm[] {_key, double, spacer, youtubeUrl,vimeoUrl, "video" : {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio}, "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "size" : {"width" : image.asset->metadata.dimensions.width, "height" : image.asset->metadata.dimensions.height}, "position" : position}, link, title, "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "talentId" : reference->talent._ref, "team" : reference->team, "meta" : reference->meta}}
       ,  gride[] {_key, double, spacer, youtubeUrl,vimeoUrl, "video" : {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio}, "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "size" : {"width" : image.asset->metadata.dimensions.width, "height" : image.asset->metadata.dimensions.height}, "position" : position}, link, title, "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "talentId" : reference->talent._ref, "team" : reference->team, "meta" : reference->meta}}
       ,  gridl[] {_key, double, spacer, youtubeUrl,vimeoUrl, "video" : {"id" : video.asset->playbackId, "aspect" : video.asset->data.aspect_ratio}, "image" : {"image" : image.asset._ref, "aspect" : image.asset->metadata.dimensions.aspectRatio, "size" : {"width" : image.asset->metadata.dimensions.width, "height" : image.asset->metadata.dimensions.height}, "position" : position}, link, title, "reference" : {"key" : reference._ref, "title" : reference->title, "clients" : reference->client[].label, "slug" : reference->slug.current, "talent" : reference->talent->title, "talentId" : reference->talent._ref, "team" : reference->team, "meta" : reference->meta}}
      }
      | order(_updatedAt desc)[0]`
      const grid2 = await this.$sanity.fetch(gridQuery2)
      commit('SET_GRID', grid2)



      const poemsQuery = groq`*[_type == "poems"]{
        ...,
        sections[]{
          _key,
          title,
          content
        }
      } | order(_updatedAt desc)[0]`;
      const poems = await this.$sanity.fetch(poemsQuery);
      commit('SET_POEMS_PAGE', poems);

  },


  async fetchAboutPage({ commit }) {
    const query = groq`*[_type == "about"]`;
    const aboutPage = await this.$sanity.fetch(query);
    commit('SET_ABOUT_PAGE', aboutPage);
  },


  // async fetchPoems({ commit }) {
  //   const poemsQuery = groq`*[_type == "poems"]{
  //     ...,
  //     sections[]{
  //       _key,
  //       title,
  //       content
  //     }
  //   } | order(_updatedAt desc)[0]`;
  //   const poems = await this.$sanity.fetch(poemsQuery);
  //   commit('SET_POEMS_PAGE', poems);
  // },


  setTitle({ commit }, title) {
    commit('SET_TITLE', title)
  },
}
