import { Client, Collection, GatewayIntentBits } from "discord.js";
import Bot from "../interfaces/Bot";
import Configuration from "../interfaces/Configuration";
import Listeners from "./Listeners";
import Command from "./Command";
import SubCommand from "./SubCommand";

import 'colors';
export default class Eclipse extends Client implements Bot
{
    addListeners: Listeners;
    config: Configuration;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;

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
        this.commands = new Collection();
        this.subCommands = new Collection();
    }
    
    Init(): void {
        this.AddListeners();
        this.login(this.config.token).catch((err) => console.error(err));
    }

    AddListeners(): void {
        this.addListeners.createEventsListener();
        this.addListeners.createCommandsListener();
    }
}