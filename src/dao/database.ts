export abstract class Database
{
    //Server host of the database
    private _host: string;
    public get host(): string { return this._host; }

    //Port used by the server host
    private _port: number;
    public get port(): number { return this._port; }

    //Name of the database
    private _dbName: string;
    public get dbName(): string { return this._dbName; }

    //User used for the connection
    private _user: string;
    public get user(): string { return this._user; }

    //Password of the user
    private _password: string;
    public get password(): string { return this._password; }

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
        this._host = host;
        this._port = port
        this._dbName = dbName;
        this._user = user;
        this._password = password;
    }

    /**
     * Opens a connection to the database
     */
    abstract connect(): Promise<void>;

    /**
     * Disconnects from the database
     */
    abstract disconnect(): Promise<void>;

    /**
     * Create a new collection
     * @param tableName Name of the collection
     */
    abstract createTable(tableName: string): Promise<void>;
    
    /**
     * Deletes all data from a collection
     * @param tableName Name of the collection to drop
     */
    abstract dropTable(tableName: string): Promise<void>;

    /**
     * Insterts new data inside a collection
     * @param tableName Name of the collection where add data
     * @param item Data to add
     * @returns The id of the inserted value or null
     */
     abstract insert(tableName: string, item: any): Promise<string | null>;

    /**
     * Updates an existing value in a collection
     * @param tableName Collection to update
     * @param query Query to identify the items to update
     * @param value Value to affect to the found items
     */
    abstract update(tableName: string, query: any, value: any): Promise<void>;
    
    /**
     * Removes items from a collection
     * @param tableName Collection to update
     * @param query Query to identify items to delete
     */
    abstract remove(tableName: string, query: any): Promise<void>;
}

export default Database;