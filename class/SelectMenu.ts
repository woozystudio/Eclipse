import { CacheType, AnySelectMenuInteraction } from "discord.js";
import SelectMenuListener from "../types/SelectMenuListener";
import SelectMenuManager from "../types/SelectMenuManager";
import Eclipse from "./Eclipse";

export default class SelectMenu implements SelectMenuListener {
    client: Eclipse;
    custom_id: string;
    default_member_permissions: bigint;

    constructor(client: Eclipse, on: SelectMenuManager) {
        this.client = client;
        this.custom_id = on.customId;
        this.default_member_permissions = on.userPermissions;
    }

    Execute(interaction: AnySelectMenuInteraction<CacheType>): void {
    }
    
}