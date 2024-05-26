import { Client, Collection, GatewayIntentBits } from "discord.js";
import Bot from "../interfaces/Bot";
import Configuration from "../interfaces/Configuration";
import 'colors';
import Listeners from "./Listeners";

export default class Eclipse extends Client implements Bot
{
    addListeners: Listeners;
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
        this.addListeners = new Listeners(this);
    }
    
    Init(): void {
        this.AddListeners();
        this.login(this.config.token).catch((err) => console.error(err));
    }

    AddListeners(): void {
        this.addListeners.createEventsListener();
    }
}