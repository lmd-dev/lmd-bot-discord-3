/**
 * [ABSTRACT CLASS] Base class of managers
 */
class YTManager
{
    /**
     * Constructor
     */
    constructor()
    {
        if (new.target === YTManager)
            throw "Cannot construct Manager instances. Abstract class detected.";

        //Cache for last loaded items
        this._cache = [];
    }

    //Cache getter
    get cache() { return this._cache }

    /**
     * Lists requested items
     * @param {*} query Parameters of the query
     * @param {*} restApi Rest API to call 
     */
    async list(query, restApi) 
    {
        try
        {
            let data = await this._list(query, restApi);

            return data?.items ?? [];
        }
        catch (error)
        {
            console.error(error);
            return [];
        }
    };

    /**
     * [PRIVATE] Sends the list request to the Youtube Data API (recursive function)
     * @param {*} query 
     * @param {*} restApi 
     */
    async _list(query, restApi)
    {
        const YTRequest = require("./request");

        const data = await YTRequest.send({
            restApi: restApi,
            method: "get",
            fields: query
        });

        if (query.maxResults === undefined && data.nextPageToken)
        {
            query.pageToken = data.nextPageToken;
            
            const nextData = await this._list(query, restApi);

            data.items = data.items.concat(nextData.items);
        }

        return data;
    }
}

module.exports = YTManager;