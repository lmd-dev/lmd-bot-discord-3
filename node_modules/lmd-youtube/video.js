/**
 * Represents a Youtube Video
 */
class YTVideo
{
    constructor(data, channel = null, playlist = null)
    {
        this.channel = channel;
        this.playlist = playlist;

        if (data?.kind === "youtube#searchResult")
        {
            this.kind = data?.id?.kind ?? "";
            this.id = data?.id?.videoId ?? "";

        }
        else
        {
            this.kind = data?.kind ?? "";
            this.id = data?.id ?? "";
        }

        this.publishedAt = new Date(data?.snippet?.publishedAt) ?? null;
        this.title = data?.snippet?.title ?? "";
        this.description = data?.snippet?.description ?? "";
        this.thumbnails = data?.snippet?.thumbnails ?? {};
        this.position = data?.snippet?.position ?? 0;
        this.tags = data?.snippet?.tags ?? [];
    }
}

module.exports = YTVideo;