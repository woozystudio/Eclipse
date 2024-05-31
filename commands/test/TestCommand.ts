import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

export default class TestCommand extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "test",
            description: "Test Command",
            category: Category.Test,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({  });
    }
}