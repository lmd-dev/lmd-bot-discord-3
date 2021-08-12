import { DBBot } from "./db-bot";
import { Recordable } from "../recordable/recordable";
import { parse } from "path";
import { ObjectId } from "mongodb";

export class DataAccess<T extends Recordable>
{
    //Database used for the data of the bot
    private _db: DBBot | null;
    private get db(): DBBot | null { return this._db; }

    //Name of the processing collection
    private _tableName: string;
    private get tableName(): string { return this._tableName; }

    //Type of the objects manipulated in the collection
    private _objectType: (new (data: any) => T) | null;
    private get objectType(): (new (data: any) => T) | null { return this._objectType; }

    /**
     * Constructor
     */
    private constructor(tableName: string, type: (new (data: any) => T) | null = null)
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
    static async getInstance<T extends Recordable>(tableName: string, type: (new (data: any) => T) | null = null): Promise<DataAccess<T>>
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
    async findAll(query: any = {}): Promise<T[] | any[]>
    {
        const items = await this.db?.find(this.tableName, query);

        return items?.map((item: any) =>
        {
            if (this.objectType !== null)
                return new this.objectType(item);
            else
            {
                if (item._id)
                {
                    item.id = item._id
                    delete item._id
                }

                return item;
            }
        }) ?? [];
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
    async insert(item: T | any): Promise<boolean>
    {
        const insertedId = await this.db?.insert(this.tableName, this.objectType !== null ? item.toArray() : item);

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
    async update(item: T | any)
    {
        let temp: any = item;

        if(this.objectType === null)
        {
            temp = JSON.parse(JSON.stringify(item));
            if(temp.id)
            {
                delete temp.id;
            }
        }
        
        if (item.id === "")
            await this.insert(item);
        else
        {
            await this.db?.update(this.tableName, { _id: new ObjectId(item.id) }, this.objectType !== null ? item.toArray() : temp);
        }
    }

    /**
     * Remove an item value
     * @param id Id of the item to remove
     */
    async remove(id: string)
    {
        await this.db?.remove(this.tableName, { _id: new ObjectId(id) });
    }
}