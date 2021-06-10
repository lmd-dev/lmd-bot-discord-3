const YTPlaylists = require('./playlists');
const YTSearcher = require('./searcher');
const YTVideo = require('./video');

/**
 * Represents a Youtube Channel
 */
class YTChannel
{
    /**
     * Constructor
     * @param {*} data Initialization data 
     */
    constructor(data)
    {        
        this.kind = data?.kind ?? this.kind;
        this.id = data?.id ?? this.id;
        this.title = data?.snippet?.title ?? "";
        this.description = data?.snippet?.description ?? "";
        this.customUrl = data?.snippet?.customUrl ?? "";
        this.publishedAt = new Date(data?.snippet?.publishedAt) ?? null;
        this.thumbnails = data?.snippet?.thumbnails ?? {};
        this.defaultLanguage = data?.snippet?.defaultLanguage ?? "";
        this.country = data?.snippet?.country ?? "";

        this.playlists = new YTPlaylists(this);
    }

    /**
     * Search for videos of the current channel
     * @param {*} query 
     */
    async searchVideos(query)
    {
        query = query ?? {};
        query.channelId = this.id;
        query.type = "video";

        const searcher = new YTSearcher();
        const data = await searcher.search(query);
        
        return data.map((item) => { return new YTVideo(item, this); });
    }
}

module.exports = YTChannel;