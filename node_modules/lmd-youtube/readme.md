# LMD-YOUTUBE

Manage YouTube Data API from NodeJS

## Installation

npm i lmd-youtube

## Getting started
1. Create a new file "index.js" :   
    
        //Include lmd-youtube module
        const Youtube = require('lmd-youtube');

        async function run()
        {
            //Initialize the instance with your API Key
            const yt = Youtube.getInstance('YourYouTubeAPIKeyHere');

            //Get channel data for LMD channel
            const channels = await yt.channels.list({id: 'UCrHKLu5uQE6kFaLFc70T1eg', part: "snippet"});

            channels.forEach(async (channel) => 
            {
                console.log(channel.title.toUpperCase());

                //Get playlists for the current channel
                const playlists = await channel.playlists.list({ part: "snippet"});

                for(const playlist of playlists)
                {
                    console.log(` - ${playlist.title}`);

                    //Get all videos for the current playlist
                    const videos = await playlist.videos.list({ part: "snippet"});

                    for(const video of videos) 
                    {
                        console.log(`  - ${video.title}`);
                    }

                    console.log('');
                }
            });
        }

        run();

2. Run the programme :

        node index.js