import { ContextMenuCommandInteraction, CacheType } from "discord.js";
import ContextMenuListener from "../interfaces/ContextMenuListener";
import Eclipse from "./Eclipse";
import ContextMenuManager from "../interfaces/ContextMenuManager";
import Category from "../enums/Category";

export default class ContextMenu implements ContextMenuListener {
    client: Eclipse;
    name: string;
    type: number;
    default_member_permissions: bigint;
    category: Category;
    development: boolean;

    constructor(client: Eclipse, on: ContextMenuManager) {
        this.client = client;
        this.name = on.name;
        this.type = on.type;
        this.default_member_permissions = on.userPermissions;
        this.category = on.category;
        this.development = on.development;
    }

    Execute(interaction: ContextMenuCommandInteraction<CacheType>): void {
    }
    
}