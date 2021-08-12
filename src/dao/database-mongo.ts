import Database from "./database";
import * as MongoDB from "mongodb";

export abstract class DatabaseMongo extends Database
{
    //Mongo client used for the connection to the database
    private _mongoClient: MongoDB.MongoClient | null;
    private get mongoClient(): MongoDB.MongoClient | null { return this._mongoClient; }
    private set mongoClient(value: MongoDB.MongoClient | null) { this._mongoClient = value; }

    //Link to the database
    private _dbLink: MongoDB.Db | null;
    private get dbLink(): MongoDB.Db | null { return this._dbLink; }
    private set dbLink(value: MongoDB.Db | null) { this._dbLink = value; }

    /**
     * Constructor
     * @param host Server host of the database
     * @param port Post used by the SGBD
     * @param dbName Name of the database
     * @param user User used for the connection
     * @param password Password of the user
     */
    constructor(host: string, port: number, dbName: string, user: string, password: string)
    {
        super(host, port, dbName, user, password);

        this._mongoClient = null;
        this._dbLink = null;
    }

    /**
     * Opens a connection to the database
     */
    async connect()
    {
        if (!this.dbLink)
        {
            const uri = `mongodb://${this.host}:${this.port}/`;
            this.mongoClient = await MongoDB.connect(uri, { useUnifiedTopology: true });
            
            this.dbLink = this.mongoClient.db(this.dbName);
        }
    }

    /**
     * Disconnects from the database
     */
    async disconnect()
    {
        this.mongoClient?.close();
    }

    /**
     * Create a new collection
     * @param tableName Name of the collection
     */
    async createTable(tableName: string)
    {
        await this.getTable(tableName);
    }

    /**
     * Get a collection from its name
     * @param tableName Name of the collection to return
     * @returns The found collection or null
     */
    async getTable(tableName: string): Promise<MongoDB.Collection | null>
    {
        return await this.dbLink?.collection(tableName) ?? null;
    }

    /**
     * Deletes all data from a collection
     * @param tableName Name of the collection to drop
     */
    async dropTable(tableName: string)
    {
        const table = await this.getTable(tableName);
        await table?.deleteMany({});
    }

    /**
     * Insterts new data inside a collection
     * @param tableName Name of the collection where add data
     * @param item Data to add
     * @returns The id of the inserted value or null
     */
    async insert(tableName: string, item: any): Promise<string | null>
    {
        const table = await this.getTable(tableName);

        const result = await table?.insertOne(item);

        return result?.insertedId ?? null;
    }

    /**
     * Updates an existing value in a collection
     * @param tableName Collection to update
     * @param query Query to identify the items to update
     * @param value Value to affect to the found items
     */
    async update(tableName: string, query: any, value: any)
    {
        try
        {
            const table = await this.getTable(tableName);
            await table?.updateOne(query, { $set: value });
        }
        catch (error)
        {
            console.error(error);
        }
    }

    /**
     * Removes items from a collection
     * @param tableName Collection to update
     * @param query Query to identify items to delete
     */
    async remove(tableName: string, query: any)
    {
        try {            
            const table = await this.getTable(tableName);
            await table?.deleteOne(query);
        }
        catch(error)
        {
            console.error(error);
        }
    }

    /**
     * Returns items identified by the query
     * @param tableName Name of the collection where search items
     * @param filters Query to identify items
     * @returns An array containing found items
     */
    async find(tableName: string, filters: any): Promise<any>
    {
        const table = await this.dbLink?.collection(tableName);

        return table?.find(filters).toArray() ?? [];
    }
}