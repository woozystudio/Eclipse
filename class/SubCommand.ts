import { ChatInputCommandInteraction, CacheType } from "discord.js";
import SubCommandListener from "../interfaces/SubCommandListener";
import SubCommandManager from "../interfaces/SubCommandManager";
import Eclipse from "./Eclipse";

export default class SubCommand implements SubCommandListener {
    client: Eclipse;
    name: string;
    subCommandName: string;
    subCommandGroupName: string;
    
    constructor(client: Eclipse, on: SubCommandManager){
        this.client = client;
        this.name = on.commandName;
        this.subCommandName = on.subCommandName;
        this.subCommandGroupName = on.subCommandGroupName;
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
    }

}