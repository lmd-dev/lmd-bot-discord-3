const YTManager = require('./manager');

/**
 * Searchs for contents with Youtube Data API
 */
class YTSearcher extends YTManager
{
    /**
     * Constructor
     */
    constructor()
    {
        super();
    }

    /**
     * Returns YouTube items matching with the given query
     * @param {*} query 
     */
    async search(query)
    {
        return await super.list(query, "search");
    }
}

module.exports = YTSearcher;