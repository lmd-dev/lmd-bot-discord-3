import { DatabaseMongo } from "./database-mongo";

export class DBBot extends DatabaseMongo
{
    //Unic instance of the database
    private static _instance: DBBot | null = null;

    /**
     * Constructor
     */
    private constructor()
    {
        super(process.env.DB_HOST ?? "", parseInt(process.env.DB_PORT ?? ""), process.env.DB_NAME ?? "", process.env.DB_USER ?? "", process.env.DB_PASSWORD ?? "");
    }

    /**
     * Returns the unic instance of the database
     */
    static get instance(): DBBot
    {
        if (!DBBot._instance)
            DBBot._instance = new DBBot();

        return DBBot._instance;
    };
}