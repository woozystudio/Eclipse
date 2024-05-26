import { ChatInputCommandInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";

export default interface SubCommandManager {
    client: Eclipse;
    name: string;
    subCommandName: string;
    subCommandGroupName: string;

    Execute(interaction: ChatInputCommandInteraction): void;
}