import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import Command from "../class/Command";
import Eclipse from "../class/Eclipse";
import MessageColor from "../enums/MessageColor";
import Textures from "../enums/Textures";
import Category from "../enums/Category";

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
        await interaction.reply({ embeds: [
            new EmbedBuilder().setColor(MessageColor.Danger).setDescription(`${Textures.Error} An error occured`),
            new EmbedBuilder().setColor(MessageColor.Success).setDescription(`${Textures.Success} Successfully`)
        ] });
    }
}