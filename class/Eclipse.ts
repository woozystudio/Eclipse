import { Client, Collection, GatewayIntentBits } from "discord.js";
import Bot from "../interfaces/Bot";
import Configuration from "../interfaces/Configuration";
import 'colors';

export default class Eclipse extends Client implements Bot
{
    config: Configuration;

    constructor()
    {
        super({ 
            intents: [
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent
            ] 
        });

        this.config = require(`../../config/config.json`);
    }

    Init(): void {
        this.login(this.config.token).catch((err) => console.error(err));
    }
}