import { ContextMenuCommandInteraction, CacheType } from "discord.js";
import ContextMenuListener from "../interfaces/ContextMenuListener";
import Eclipse from "./Eclipse";
import ContextMenuManager from "../interfaces/ContextMenuManager";

export default class ContextMenu implements ContextMenuListener {
    client: Eclipse;
    name: string;
    type: number;
    development: boolean;

    constructor(client: Eclipse, on: ContextMenuManager) {
        this.client = client;
        this.name = on.name;
        this.type = on.type;
        this.development = on.development;
    }

    Execute(interaction: ContextMenuCommandInteraction<CacheType>): void {
    }
    
}