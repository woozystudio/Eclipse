import { CacheType, ModalSubmitInteraction } from "discord.js";
import Eclipse from "./Eclipse";
import ModalListener from "../types/ModalListener";
import ModalManager from "../types/ModalManager";

export default class Modal implements ModalListener {
    client: Eclipse;
    custom_id: string;
    default_member_permissions: bigint;

    constructor(client: Eclipse, on: ModalManager) {
        this.client = client;
        this.custom_id = on.customId;
        this.default_member_permissions = on.userPermissions;
    }

    Execute(interaction: ModalSubmitInteraction<CacheType>): void {
    }
    
}