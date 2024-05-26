import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import Eclipse from "../class/Eclipse";
import Command from "../class/Command";

export default class BotInfoCommand extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "test",
            description: "test",
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("Test")
    }
}