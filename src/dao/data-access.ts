import { DBBot } from "./db-bot";
import { Module } from "../modules/module";
import { Recordable } from "../recordable/recordable";

export class DataAccess<T extends Recordable>
{
    private _db: DBBot | null;
    private get db(): DBBot | null { return this._db; }

    private _tableName: string;
    private get tableName(): string { return this._tableName; }

    private _objectType: new (data:any) => T;
    private get objectType(): new (data: any) => T { return this._objectType; }

    /**
     * Constructor
     */
    private constructor(tableName: string, type: (new (data:any) => T))
    {
        this._db = null;
        this._tableName = tableName;
        this._objectType = type;
    }

    /**
     * Returns an initialized instance of the data access
     * @param tableName Name of the table to use
     * @param type Type of object to process
     */
    static async getInstance<T extends Recordable>(tableName: string, type: (new (data: any) => T)): Promise<DataAccess<T>>
    {
        const instance = new DataAccess<T>(tableName, type);
        await instance.initialize();

        return instance;
    }

    /**
     * Initialize DB connexion
     */
    private async initialize(): Promise<DataAccess<T>>
    {
        if (!this._db)
        {
            this._db = DBBot.instance;
            await this.db?.connect();
        }

        return this;
    }

    /**
     * Returns all items matching with the query
     * @param query
     */
    async findAll(query: any = {}): Promise<T[]>
    {
        const items = await this.db?.find(this.tableName, query);

        return items?.map((item: any) => { return new this.objectType(item); }) ?? [];
    }

    /**
     * Returns the first item matching with the query
     * @param query
     */
    async findOne(query: any = {}): Promise<T | null>
    {
        const items = await this.findAll(query);

        return ((items && items.length) ? items[0] : null);
    }

    /**
     * Insert an item of type T in the dataaccess table
     * @param item
     */
    async insert(item: T): Promise<boolean>
    {
        const insertedId = await this.db?.insert(this.tableName, item.toArray());

        if (insertedId)
        {
            item.id = insertedId;
            return true;
        }

        return false;
    }

    /**
     * Updates an item value
     * @param item
     */
    async update(item: T)
    {
        if (item.id === "")
            await this.insert(item);
        else
            await this.db?.update(this.tableName, { _id: item.id }, item.toArray());
    }
}