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
        ```
        /**
        * Can parse site
        *
        * @param (string) url - Url of the site (https://imgur.com/a/3vA39c)
        * @returns (boolean) Whether it can parse the site
        */
        function matchSite(url) {...}
        ```
        
    - 
        ```
        /**
         * Parses images and returns an array of direct urls of images
         *
         * @param (string) url - Url of the site
         * @returns (array) An array of image urls
         */
         function parseImages(url) {...}
        ```
    - Image objects
    
        ```
        {
            /**
             * Required
            */
            url: 'https://i.imgur.com/1Cwu579c.jpg',
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
- [vue.js](https://vuejs.org/)
