import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import Command from "../class/Command";
import Eclipse from "../class/Eclipse";

export default class TestCommand extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "test",
            description: "Test Command",
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({ content: "Test Command approved!" })
    }
}