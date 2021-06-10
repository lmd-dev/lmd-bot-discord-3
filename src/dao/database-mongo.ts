import Database from "./database";
import * as MongoDB from "mongodb";

export abstract class DatabaseMongo extends Database
{
    private _mongoClient: MongoDB.MongoClient | null;
    private get mongoClient(): MongoDB.MongoClient | null { return this._mongoClient; }
    private set mongoClient(value: MongoDB.MongoClient | null) { this._mongoClient = value; }

    private _dbLink: MongoDB.Db | null;
    private get dbLink(): MongoDB.Db | null { return this._dbLink; }
    private set dbLink(value: MongoDB.Db | null) { this._dbLink = value; }

    constructor(host: string, port: number, dbName: string, user: string, password: string)
    {
        super(host, port, dbName, user, password);

        this._mongoClient = null;
        this._dbLink = null;
    }

    async connect()
    {
        if (!this.dbLink)
        {
            const uri = `mongodb://${this.host}:${this.port}/`;
            this.mongoClient = await MongoDB.connect(uri, { useUnifiedTopology: true });
            
            this.dbLink = this.mongoClient.db(this.dbName);
        }
    }

    async disconnect()
    {
        this.mongoClient?.close();
    }

    async createTable(tableName: string)
    {
        await this.getTable(tableName);
    }

    async getTable(tableName: string): Promise<MongoDB.Collection | null>
    {
        return await this.dbLink?.collection(tableName) ?? null;
    }

    async dropTable(tableName: string)
    {
        const table = await this.getTable(tableName);
        await table?.deleteMany({});
    }

    async insert(tableName: string, item: any): Promise<string | null>
    {
        const table = await this.getTable(tableName);

        const result = await table?.insertOne(item);

        return result?.insertedId ?? null;
    }

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

    async find(tableName: string, filters: any): Promise<any>
    {
        const table = await this.dbLink?.collection(tableName);

        return table?.find(filters).toArray() ?? [];
    }
}