import { ButtonInteraction, PermissionFlagsBits } from "discord.js";
import Eclipse from "../class/Eclipse";
import Button from "../class/Button";

export default class TestSubCommand extends Button {
    constructor(client: Eclipse) {
        super(client, {
            customId: "testing",
            userPermissions: PermissionFlagsBits.UseApplicationCommands
        });
    }

    async Execute(interaction: ButtonInteraction) {
        await interaction.reply("Test button interaction")
    }
}