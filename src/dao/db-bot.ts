import { DatabaseMongo } from "./database-mongo";

export class DBBot extends DatabaseMongo
{
    private static _instance: DBBot | null = null;

    private constructor()
    {
        super("localhost", 27017, "lmd-discord-bot", "", "");
    }

    static get instance(): DBBot
    {
        if (!DBBot._instance)
            DBBot._instance = new DBBot();

        return DBBot._instance;
    };
}