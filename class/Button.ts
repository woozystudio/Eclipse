import { CacheType, ButtonInteraction } from "discord.js";
import ButtonListener from "../types/ButtonListener";
import ButtonManager from "../types/ButtonManager";
import Eclipse from "./Eclipse";

export default class Button implements ButtonListener {
    client: Eclipse;
    custom_id: string;
    default_member_permissions: bigint;

    constructor(client: Eclipse, on: ButtonManager) {
        this.client = client;
        this.custom_id = on.customId;
        this.default_member_permissions = on.userPermissions;
    }

    Execute(interaction: ButtonInteraction<CacheType>): void {
    }
    
}