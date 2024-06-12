import { Client, Collection, GatewayIntentBits } from "discord.js";
import Bot from "../types/Bot";
import Configuration from "../types/Configuration";
import Listeners from "./Listeners";
import Command from "./Command";
import SubCommand from "./SubCommand";
import Button from "./Button";
import ContextMenu from "./ContextMenu";
import { connect } from "mongoose";
import 'colors';
import SelectMenu from "./SelectMenu";

export default class Eclipse extends Client implements Bot
{
    addListeners: Listeners;
    config: Configuration;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    buttons: Collection<string, Button>;
    selectMenus: Collection<string, SelectMenu>;
    contextMenus: Collection<string, ContextMenu>
    development: boolean;
    version: any;

    constructor()
    {
        super({ 
            intents: [
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates
            ] 
        });

        this.config = require(`../../config/config.json`);
        this.version = require(`../../package.json`)
        this.addListeners = new Listeners(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.buttons = new Collection();
        this.selectMenus = new Collection();
        this.contextMenus = new Collection();
        this.development = (process.argv.slice(2).includes("--development"));
    }
    
    Login(): void {
        console.log(`Starting the client in ${this.development ? "development" : "production"} mode.`.cyan)
        this.AddListeners();

        this.login(this.development ? this.config.canaryToken : this.config.token).catch((err) => console.error(err));

        connect(this.config.mongoose)
            .then(() => console.log("☁ Connected to MongoDB database successfully.".blue))
            .catch((err) => console.error(err));
    }

    AddListeners(): void {
        this.addListeners.createEventsListener();
        this.addListeners.createCommandsListener();
        this.addListeners.createSubCommandsListener();
        this.addListeners.createButtonInteractions();
        this.addListeners.createSelectMenuInteractions();
        this.addListeners.createContextMenuCommandsInteractions();
    }
}