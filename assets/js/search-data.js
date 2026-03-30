// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "My publications.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-music",
          title: "Music",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/music/";
          },
        },{id: "post-a-post-with-plotly-js",
        
          title: "a post with plotly.js",
        
        description: "this is what included plotly.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/plotly/";
          
        },
      },{id: "post-a-post-with-image-galleries",
        
          title: "a post with image galleries",
        
        description: "this is what included image galleries could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/photo-gallery/";
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-a-post-with-tabs",
        
          title: "a post with tabs",
        
        description: "this is what included tabs in a post could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/tabs/";
          
        },
      },{id: "post-a-post-with-typograms",
        
          title: "a post with typograms",
        
        description: "this is what included typograms code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/typograms/";
          
        },
      },{id: "post-a-post-that-can-be-cited",
        
          title: "a post that can be cited",
        
        description: "this is what a post that can be cited looks like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/post-citation/";
          
        },
      },{id: "post-a-post-with-pseudo-code",
        
          title: "a post with pseudo code",
        
        description: "this is what included pseudo code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/pseudocode/";
          
        },
      },{id: "post-a-post-with-code-diff",
        
          title: "a post with code diff",
        
        description: "this is how you can display code diffs",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/code-diff/";
          
        },
      },{id: "post-a-post-with-advanced-image-components",
        
          title: "a post with advanced image components",
        
        description: "this is what advanced image components could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/advanced-images/";
          
        },
      },{id: "post-a-post-with-vega-lite",
        
          title: "a post with vega lite",
        
        description: "this is what included vega lite code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/vega-lite/";
          
        },
      },{id: "post-a-post-with-geojson",
        
          title: "a post with geojson",
        
        description: "this is what included geojson code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/geojson-map/";
          
        },
      },{id: "post-a-post-with-echarts",
        
          title: "a post with echarts",
        
        description: "this is what included echarts code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/echarts/";
          
        },
      },{id: "post-a-post-with-chart-js",
        
          title: "a post with chart.js",
        
        description: "this is what included chart.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/chartjs/";
          
        },
      },{id: "post-a-post-with-tikzjax",
        
          title: "a post with TikZJax",
        
        description: "this is what included TikZ code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/tikzjax/";
          
        },
      },{id: "post-a-post-with-bibliography",
        
          title: "a post with bibliography",
        
        description: "an example of a blog post with bibliography",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/post-bibliography/";
          
        },
      },{id: "post-a-post-with-jupyter-notebook",
        
          title: "a post with jupyter notebook",
        
        description: "an example of a blog post with jupyter notebook",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/jupyter-notebook/";
          
        },
      },{id: "post-a-post-with-custom-blockquotes",
        
          title: "a post with custom blockquotes",
        
        description: "an example of a blog post with custom blockquotes",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/custom-blockquotes/";
          
        },
      },{id: "post-a-post-with-table-of-contents-on-a-sidebar",
        
          title: "a post with table of contents on a sidebar",
        
        description: "an example of a blog post with table of contents on a sidebar",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/sidebar-table-of-contents/";
          
        },
      },{id: "post-a-post-with-audios",
        
          title: "a post with audios",
        
        description: "this is what included audios could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/audios/";
          
        },
      },{id: "post-a-post-with-videos",
        
          title: "a post with videos",
        
        description: "this is what included videos could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/videos/";
          
        },
      },{id: "post-displaying-beautiful-tables-with-bootstrap-tables",
        
          title: "displaying beautiful tables with Bootstrap Tables",
        
        description: "an example of how to use Bootstrap Tables",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/tables/";
          
        },
      },{id: "post-a-post-with-table-of-contents",
        
          title: "a post with table of contents",
        
        description: "an example of a blog post with table of contents",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2023/table-of-contents/";
          
        },
      },{id: "post-a-post-with-giscus-comments",
        
          title: "a post with giscus comments",
        
        description: "an example of a blog post with giscus comments",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2022/giscus-comments/";
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "post-a-post-with-redirect",
        
          title: "a post with redirect",
        
        description: "you can also redirect to assets like pdf",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/assets/pdf/example_pdf.pdf";
          
        },
      },{id: "post-a-post-with-diagrams",
        
          title: "a post with diagrams",
        
        description: "an example of a blog post with diagrams",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/diagrams/";
          
        },
      },{id: "post-a-distill-style-blog-post",
        
          title: "a distill-style blog post",
        
        description: "an example of a distill-style blog post and main elements",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2021/distill/";
          
        },
      },{id: "post-a-post-with-twitter",
        
          title: "a post with twitter",
        
        description: "an example of a blog post with twitter",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2020/twitter/";
          
        },
      },{id: "post-a-post-with-disqus-comments",
        
          title: "a post with disqus comments",
        
        description: "an example of a blog post with disqus comments",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/disqus-comments/";
          
        },
      },{id: "post-a-post-with-math",
        
          title: "a post with math",
        
        description: "an example of a blog post with some math",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/math/";
          
        },
      },{id: "post-a-post-with-code",
        
          title: "a post with code",
        
        description: "an example of a blog post with some code",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/code/";
          
        },
      },{id: "post-a-post-with-images",
        
          title: "a post with images",
        
        description: "this is what included images could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/images/";
          
        },
      },{id: "post-a-post-with-formatting-and-links",
        
          title: "a post with formatting and links",
        
        description: "march &amp; april, looking forward to summer",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2015/formatting-and-links/";
          
        },
      },{id: "albums-around-the-fur",
          title: 'Around the Fur',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/around-the-fur/";
            },},{id: "albums-audioslave",
          title: 'Audioslave',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/audioslave/";
            },},{id: "albums-fear-of-a-blank-planet",
          title: 'Fear of a Blank Planet',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/blank-planet/";
            },},{id: "albums-breakfast-in-america",
          title: 'Breakfast in America',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/breakfast%20copy/";
            },},{id: "albums-breakfast-in-america",
          title: 'Breakfast in America',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/breakfast/";
            },},{id: "albums-clube-da-esquina-i",
          title: 'Clube da Esquina I',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/clube-da-esquina/";
            },},{id: "albums-the-colour-and-the-shape",
          title: 'The Colour and the Shape',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/colour-and-shape/";
            },},{id: "albums-continuum",
          title: 'Continuum',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/continuum/";
            },},{id: "albums-core",
          title: 'Core',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/core/";
            },},{id: "albums-the-dark-side-of-the-moon",
          title: 'The Dark Side of the Moon',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/dark-side/";
            },},{id: "albums-darkfighter",
          title: 'Darkfighter',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/darkfighter/";
            },},{id: "albums-death-by-rock-and-roll",
          title: 'Death by Rock and Roll',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/death-by-rock/";
            },},{id: "albums-definitely-maybe",
          title: 'Definitely Maybe',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/definitely/";
            },},{id: "albums-desintegration",
          title: 'Desintegration',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/desintegration/";
            },},{id: "albums-dirt",
          title: 'Dirt',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/dirt/";
            },},{id: "albums-eight-arms-to-hold-you",
          title: 'Eight Arms to Hold You',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/eight-arms/";
            },},{id: "albums-el-camino",
          title: 'El Camino',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/el-camino/";
            },},{id: "albums-eye-in-the-sky",
          title: 'Eye in the Sky',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/eye-in-the-sky/";
            },},{id: "albums-facelift",
          title: 'Facelift',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/facelift/";
            },},{id: "albums-feral-roots",
          title: 'Feral Roots',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/feral-roots/";
            },},{id: "albums-foo-fighters",
          title: 'Foo Fighters',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/ff/";
            },},{id: "albums-great-western-valkyre",
          title: 'Great Western Valkyre',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/great-western/";
            },},{id: "albums-head-on-the-door",
          title: 'Head on the Door',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/head-on-the-door/";
            },},{id: "albums-himalayan",
          title: 'Himalayan',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/himalayan/";
            },},{id: "albums-hopes-and-fears",
          title: 'Hopes and Fears',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/hopes-and-fears/";
            },},{id: "albums-how-did-we-get-so-dark",
          title: 'How Did We Get So Dark?',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/how-get-so-dark/";
            },},{id: "albums-kiss-me-kiss-me-kiss-me",
          title: 'Kiss Me Kiss Me Kiss Me',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/kiss-me%20copy/";
            },},{id: "albums-kiss-me-kiss-me-kiss-me",
          title: 'Kiss Me Kiss Me Kiss Me',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/kiss-me/";
            },},{id: "albums-loveless",
          title: 'Loveless',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/loveless/";
            },},{id: "albums-meteora",
          title: 'Meteora',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/meteora/";
            },},{id: "albums-mezzanine",
          title: 'Mezzanine',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/mezzanine/";
            },},{id: "albums-what-39-s-the-story-morning-glory",
          title: '(What&amp;#39;s the Story?) Morning Glory',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/morning-glory/";
            },},{id: "albums-ok-computer",
          title: 'Ok Computer',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/ok-computer/";
            },},{id: "albums-pet-your-friends",
          title: 'Pet Your Friends',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/pet-friends/";
            },},{id: "albums-reeling",
          title: 'Reeling',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/reeling/";
            },},{id: "albums-romance",
          title: 'Romance',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/romance/";
            },},{id: "albums-royal-blood",
          title: 'Royal Blood',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/royal-blood/";
            },},{id: "albums-siamese-dream",
          title: 'Siamese Dream',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/siamese-dream/";
            },},{id: "albums-social-cues",
          title: 'Social Cues',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/social-cues/";
            },},{id: "albums-sonne",
          title: 'Sonne',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/sonne/";
            },},{id: "albums-star",
          title: 'Star',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/star/";
            },},{id: "albums-super-extra-gravity",
          title: 'Super Extra Gravity',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/super-extra-gravity/";
            },},{id: "albums-the-bends",
          title: 'The Bends',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/the-bends/";
            },},{id: "albums-tinderbox",
          title: 'Tinderbox',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/tinderbox/";
            },},{id: "albums-twilight",
          title: 'Twilight',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/twilight/";
            },},{id: "albums-wasting-light",
          title: 'Wasting Light',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/wasting-light/";
            },},{id: "albums-wish",
          title: 'Wish',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/wish/";
            },},{id: "albums-zeit",
          title: 'Zeit',
          description: "",
          section: "Albums",handler: () => {
              window.location.href = "/albums/zeit/";
            },},{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/cv_felipe.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%66%65%6C%69%70%65%72%63%72.%65%6E%67@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/felipercr", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/felipercr", "_blank");
        },
      },{
        id: 'social-whatsapp',
        title: 'whatsapp',
        section: 'Socials',
        handler: () => {
          window.open("https://wa.me/5531987772238", "_blank");
        },
      },];
