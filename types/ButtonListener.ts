import { ButtonInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";

export default interface ButtonListener {
    client: Eclipse;
    custom_id: string;
    default_member_permissions: bigint;

    Execute(interaction: ButtonInteraction): void;
}