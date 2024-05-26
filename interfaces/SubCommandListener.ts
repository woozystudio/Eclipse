import { ChatInputCommandInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";

export default interface SubCommandManager {
    client: Eclipse;
    command: string;
    name: string;
    group: string;

    Execute(interaction: ChatInputCommandInteraction): void;
}