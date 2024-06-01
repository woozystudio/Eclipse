import { ContextMenuCommandInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";
import Category from "../enums/Category";

export default interface ContextMenuListener {
    client: Eclipse;
    name: string;
    type: number;
    default_member_permissions: bigint;
    category: Category;
    development: boolean;

    Execute(interaction: ContextMenuCommandInteraction): void;
}