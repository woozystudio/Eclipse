import { ChatInputCommandInteraction, CacheType } from "discord.js";
import SubCommandListener from "../types/SubCommandListener";
import SubCommandManager from "../types/SubCommandManager";
import Eclipse from "./Eclipse";

export default class SubCommand implements SubCommandListener {
    client: Eclipse;
    command: string;
    group: string;
    name: string;
    
    constructor(client: Eclipse, on: SubCommandManager){
        this.client = client;
        this.command = on.command;
        this.group = on.group;
        this.name = on.name;
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
    }

}