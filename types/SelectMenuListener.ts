import { AnySelectMenuInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";

export default interface SelectMenuListener {
    client: Eclipse;
    custom_id: string;
    default_member_permissions: bigint;

    Execute(interaction: AnySelectMenuInteraction): void;
}