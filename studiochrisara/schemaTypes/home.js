import { A11yEmoji } from 'a11y-react-emoji';
import { MdSettings, MdColorLens, MdMenu } from 'react-icons/md'; // Import icons from react-icons library
// const Project = () => <A11yEmoji symbol="🏠" label="Home Icon" />;


export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  // icon: "🏠",
  // icon: '🏠',
  // liveEdit: true,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
        //chimail
    {
      name: 'menutext',
      title: 'Menu Socials text',
      type: 'string',
    },
    {
      name: "imagesoc",
      title: "Menu Socials Image",
      type: "image",
    }, 
    {
      name: 'menutextlink',
      title: 'Menu Socials Link',
      type: 'string',
    },
    {
      name: 'menutextlink2',
      title: 'Menu Store Link',
      type: 'string',
    },
    {
      name: "imagest",
      title: "Menu Store Image",
      type: "image",
    }, 

    // buttons
    {
      name: 'stlink2btn',
      title: 'Image button area Link 1',
      type: 'string',
    },
    {
      name: "imagestbtn",
      title: "Image button area 1",
      type: "image",
    }, 
    {
      name: 'soclink2btn',
      title: 'Image button area Link 2',
      type: 'string',
    },
    {
      name: "imagesocbtn",
      title: "Image button area Image 2",
      type: "image",
    }, 
    // buttons

    {
      name: "sections4",
      title: "Home main image",
      type: "array",
      of: [
        {
          name: "section4",
          title: "Section",
          type: "object",
          fields: [
            {
              name: "title4",
              title: "Title",
              type: "string",
            },
            {
              name: "image4",
              title: "About Image",
              type: "image",
            }, 
            {
              name: "video",
              title: "Video",
              type: "mux.video",
              hidden: ({ parent, value }) =>
                (!value && parent?.spacer) || (!value && parent?.image),
            },
            {
              name: 'youtubeUrl',
              title: 'YouTube Video URL',
              type: 'url',
            },
            {
              name: 'vimeoUrl',
              title: 'Vimeo Video URL',
              type: 'url',
            },
          ],
        },
      ], 
    },
    {
      name: 'grid2',
      title: 'More projects grid',
      type: 'grid2',
    },
    {
      name: "sections",
      title: "About Text",
      type: "array",
      of: [
        {
          name: "section",
          title: "Section",
          type: "object",
          fields: [
            // {
            //   name: "title",
            //   title: "Title",
            //   type: "string",
            // },
            {
              name: "title",
              title: "Title Image",
              type: "image", 
            },
            // {
            //   name: "subtitle",
            //   title: "Subtitle",
            //   type: "string",
            // },
            {
              name: "image",
              title: "Logo image",
              type: "image",
            },
            {
              name: "content",
              title: "Content",
              type: "blockContent",
            },
          ],
        },
      ],
    },
    {
      name: "sections2",
      title: "Contact Info",
      type: "array",
      of: [
        {
          name: "section2",
          title: "Section",
          type: "object",
          fields: [
            {
              name: "title2",
              title: "Title",
              type: "string",
            },
            {
              name: "content2",
              title: "Content",
              type: "blockContent",
            },
          ],
        },
      ],
    },
    {
      name: "sections3",
      title: "Press",
      type: "array",
      of: [
        {
          name: "section3",
          title: "Section",
          type: "object",
          fields: [
            {
              name: "title3",
              title: "Title",
              type: "string",
            },
            {
              name: "content3",
              title: "Content",
              type: "blockContent",
            },
          ],
        },
      ],
    },

    {
      name: "sections5",
      title: "Additional links",
      type: "array",
      of: [
        {
          name: "section5",
          title: "Section",
          type: "object",
          fields: [
            {
              name: "title5",
              title: "Title",
              type: "string",
            },
            {
              name: "image5",
              title: "Image button area",
              type: "image",
            },
             
            {
              name: "content5",
              title: "Content",
              type: "blockContent",
            },
          ],
        },
      ],
    },
    {
      name: "sections6",
      title: "View Here button",
      type: "array",
      of: [
        {
          name: "section6",
          title: "Section",
          type: "object",
          fields: [
            {
              name: "title6",
              title: "Title",
              type: "string",
            },
            {
              name: "content6",
              title: "Content",
              type: "blockContent",
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    // prepare(selection) {
    //   const { title } = selection;
    //   return {
    //     title: `📽️ ${title}`,
    //   };
    // },
  },
};
