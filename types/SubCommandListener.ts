import { ChatInputCommandInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";
import Category from "../enums/Category";

export default interface SubCommandManager {
    client: Eclipse;
    command: string;
    group: string;
    name: string;
    category: Category;
    locale: string;

    Execute(interaction: ChatInputCommandInteraction): void;
}