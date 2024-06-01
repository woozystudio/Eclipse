import { ChatInputCommandInteraction, CacheType, AutocompleteInteraction } from "discord.js";
import CommandListener from "../types/CommandListener";
import Eclipse from "./Eclipse";
import CommandManager from "../types/CommandManager";
import Category from "../enums/Category";

export default class Command implements CommandListener {
    client: Eclipse;
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: bigint;
    development: boolean;

    constructor(client: Eclipse, on: CommandManager) {
        this.client = client;
        this.name = on.name;
        this.description = on.description;
        this.category = on.category;
        this.options = on.options;
        this.default_member_permissions = on.userPermissions;
        this.development = on.development;
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
    }
    AutoComplete(interaction: AutocompleteInteraction<CacheType>): void {
    }
    
}