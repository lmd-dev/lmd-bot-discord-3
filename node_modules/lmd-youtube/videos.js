const YTManager = require('./manager');
const YTVideo = require('./video');
/**
 * Videos manager
 */
class YTVideos extends YTManager
{
    /**
     * Constructor
     * @param {*} channel Parent channel of the video
     * @param {*} playlist Parent playlist of the video
     */
    constructor(channel, playlist)
    {
        super();
        this.channel = channel;
        this.playlist = playlist;
    }

    /**
     * Returns videos of the associated playlist whitch match with the query properties
     * @param {*} query 
     */
    async list(query)
    {
        query = query || {};
        query.playlistId = this.playlist.id;

        const data = await super.list(query, "playlistItems");

        this._cache = data.map((item) => {return new YTVideo(item, this.channel, this.playlist); });

        return this._cache;
    }
}

module.exports = YTVideos;