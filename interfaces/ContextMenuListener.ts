import { ContextMenuCommandInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";

export default interface ContextMenuListener {
    client: Eclipse;
    name: string;
    type: number;
    development: boolean;

    Execute(interaction: ContextMenuCommandInteraction): void;
}