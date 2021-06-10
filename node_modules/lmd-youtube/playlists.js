const YTPlaylist = require('./playlist');
const YTManager = require('./manager');
/**
 * Playlists manager
 */
class YTPlaylists extends YTManager
{
    /**
     * Constructor
     * @param {Channel} channel Parent channel of the managed playlists
     */
    constructor(channel)
    {
        super();
        this.channel = channel;
    }

    /**
     * returns the playlists of the channel whitch match with the query properties
     * @param {*} query 
     */
    async list(query)
    {
        query = query || {};
        query.channelId = this.channel.id;

        const data = await super.list(query, "playlists");
        this._cache = data.map((item) => { return new YTPlaylist(item, this.channel); });

        return this.cache;
    }
}

module.exports = YTPlaylists;