const YTChannels = require("./channels");

/**
 * Entry point of the API
 */
class Youtube
{
    //Unic instance of the API
    static _instance = null;

    //Used Google Youtube API Key
    static apiKey = "";

    /**
     * [Private] Constructor
     * @param {string} apiKey API Key to use 
     */
    constructor(apiKey)
    {
        this.channels = new YTChannels();

        Youtube.apiKey = apiKey;
    }

    /**
     * Retunrs the unic instance of the API entry point
     * @param {string} apiKey API Key to use 
     */
    static getInstance(apiKey = null)
    {
        if (Youtube._instance === null)
            Youtube._instance = new Youtube(apiKey);

        return Youtube._instance;
    }
}

module.exports = Youtube;