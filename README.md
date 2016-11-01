# gallerit

## Idea
- parses images from reddit's subreddits

## Design
- Cache loaded images to save APIs limits - Cache parser

### Reddit parser
- [Reddit's API](https://www.reddit.com/dev/api)

### Parser
- [Imgur API](https://api.imgur.com/)
- __Parser API__
    - 

        ```javascript
        /**
         * Parses images and returns an array of direct urls of images
         * See src/server/parser/default.js for reference implementation
         *
         * @param (object) redditPost - JSON with the reddit post
         * @returns (Promise) An array of image urls, rejects, if the url cannot be parsed
         */
         function parseImages(redditPost) {...}
        ```
        
    - Image objects
    
        ```javascript
        {
            /**
             * Required
            */
            url: 'https://i.imgur.com/1Cwu579c.jpg',
            /**
             * Optional
            */
            thumbnail: 'https://galler.it/api/thumbnail?url=https://i.imgur.com/1Cwu579c.jpg',
            /**
             * Required
             * Available types: image/video
            */
            type: 'video',
            /**
             * Optional
            */
            title: '[NBD] My new Felt'
        }
        ```
        
### UI
- Thumbnails of images are displayed on frontpage
- Menu stays fixed on top
- Search bar autocompletes subreddit names
- Use chips for each subreddit
- After clicking an image, overlay is dislayed
    - Layout
        ```
        [Start slideshow][Delay]
        
        [Previous][Image][Next ]
        ```
    - Clicking on overlay will close the preview
- __Slideshow__
    - Keyboard shortucts
        - *Spacebar* - Play/Pause
        - *Left/Right* - navigation
        - *Up/Down* - selects delay between images `[1/2/3/5/10/15]`
        - *B* - selects color of background `[black/white]`
        - Every action, will display text, letting the user know, what happened; Will hide after 2-3 seconds
    - Automatic fullscreen
    - Black/white background
- __Frontpage__
    - Layout
    - ```
        [Search bar] [Search] [Sort] [Start slideshow]

        [                   Images                   ]
        ```
    
## Libraries used
- [vue.js](https://github.com/vuejs/vue/tree/next)
- [VueX](https://github.com/vuejs/vuex/tree/next)
- [Vue router](https://github.com/vuejs/vue-router/tree/next)
- [Bootstrap](https://github.com/twbs/bootstrap)
- [Express](https://github.com/expressjs/express)
- [Webpack](https://github.com/webpack/webpack)
- [Babel](https://github.com/babel/babel)
