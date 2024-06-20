import { ModalSubmitInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";

export default interface ModalListener {
    client: Eclipse;
    custom_id: string;
    default_member_permissions: bigint;

    Execute(interaction: ModalSubmitInteraction): void;
}