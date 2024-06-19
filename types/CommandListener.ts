import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";
import Category from "../enums/Category";

export default interface CommandListener {
    client: Eclipse;
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: bigint;
    development: boolean;

    Execute(interaction: ChatInputCommandInteraction): void;
    AutoComplete(interaction: AutocompleteInteraction): void;
}