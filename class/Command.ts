import { ChatInputCommandInteraction, CacheType, AutocompleteInteraction } from "discord.js";
import CommandListener from "../interfaces/CommandListener";
import Eclipse from "./Eclipse";
import CommandManager from "../interfaces/CommandManager";

export default class Command implements CommandListener {
    client: Eclipse;
    name: string;
    description: string;
    options: object;
    default_member_permissions: bigint;
    development: boolean;

    constructor(client: Eclipse, on: CommandManager) {
        this.client = client;
        this.name = on.name;
        this.description = on.description;
        this.options = on.options;
        this.default_member_permissions = on.userPermissions;
        this.development = on.development;
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
    }
    AutoComplete(interaction: AutocompleteInteraction<CacheType>): void {
    }
    
}