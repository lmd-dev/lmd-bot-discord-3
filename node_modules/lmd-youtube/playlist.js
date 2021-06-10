const YTVideos = require('./videos');
/**
 * Represents a playlist
 */
class YTPlaylist
{
    /**
     * Constructor
     * @param {*} data Initialization data
     * @param {*} channel Parent channel of the playlist
     */
    constructor(data, channel = null)
    {
        this.kind = data?.kind ?? this.kind;
        this.id = data?.id ?? this.kind;
        this.publishedAt = new Date(data?.snippet?.publishedAt) ?? null;
        this.title = data?.snippet?.title ?? "";
        this.description = data?.snippet?.description ?? "";
        this.thumbnails = data?.snippet?.thumbnails ?? {};
        this.tags = data?.snippet?.tags ?? [];

        this.channel = channel;
        this.videos = new YTVideos(channel, this);
    }
}

module.exports = YTPlaylist;