const Youtube = require('./index');
const fetch = require('node-fetch');
/**
 * Centralize requests to the Youtube Data API
 */
class YTRequest
{
    /**
     * Send a request to the API
     * @param {*} queryFields Parameters of the request
     */
    static async send(queryFields)
    {
        let queryString = "";

        for (const field in queryFields.fields)
        {
            const value = queryFields.fields[field];

            queryString += `&${field}=`;

            if (value instanceof Array)
                queryString += value.map((item) => { return item.trim(); }).join(",");
            else if (value instanceof Date)
                queryString += YTRequest.dateToTimestamp(value);
            else
                queryString += value;
        }

        let url = `https://www.googleapis.com/youtube/v3/${queryFields.restApi}?key=${Youtube.apiKey}${queryString}`;

        const response = await fetch(url, { method: queryFields.method });
        const data = await response.json();

        return data;
    }

    /**
     * Converts JavaScript Date to Timestamp string
     * @param {*} date Date to convert
     */
    static dateToTimestamp(date)
    {
        if (!date || date instanceof Date === false)
            return;

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}T${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}.000Z`;
    }
}

module.exports = YTRequest;