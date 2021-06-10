const YTChannel = require("./channel");
const YTManager = require('./manager');

/**
 * Channels manager
 */
class YTChannels extends YTManager
{
    /**
     * Constructor
     */
    constructor()
    {
        super();
    }

    /**
     * Returns hcannels matching with the query
     * @param {*} query 
     */
    async list(query)
    {
        const data = await super.list(query, "channels");

        this._cache = data.map((item) => { return new YTChannel(item); });

        return this.cache;
    }
}

module.exports = YTChannels