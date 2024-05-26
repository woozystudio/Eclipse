import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";

export default interface CommandListener {
    client: Eclipse;
    name: string;
    description: string;
    options: object;
    default_member_permissions: bigint;

    Execute(interaction: ChatInputCommandInteraction): void;
    AutoComplete(interaction: AutocompleteInteraction): void;
}