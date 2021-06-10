export abstract class Database
{
    private _host: string;
    public get host(): string { return this._host; }

    private _port: number;
    public get port(): number { return this._port; }

    private _dbName: string;
    public get dbName(): string { return this._dbName; }

    private _user: string;
    public get user(): string { return this._user; }

    private _password: string;
    public get password(): string { return this._password; }

    constructor(host: string, port: number, dbName: string, user: string, password: string)
    {
        this._host = host;
        this._port = port
        this._dbName = dbName;
        this._user = user;
        this._password = password;
    }

    abstract connect(): Promise<void>;

    abstract createTable(tableName: string): Promise<void>;
    abstract dropTable(tableName: string): Promise<void>;

    abstract update(tableName: string, query: any, value: any): Promise<void>;
}

export default Database;