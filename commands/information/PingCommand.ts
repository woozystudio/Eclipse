import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, codeBlock, inlineCode } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class Ping extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "ping",
            description: "Recognizes the ping of the bot and the Discord API.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const PingEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .addFields(
            { name: `🔧 ${i18next.t('command.ping.bot_latency', { lng: LocaleParam })}`, value: `${codeBlock(`${Date.now() - interaction.createdTimestamp}`)}`, inline: true },
            { name: `🌐 ${i18next.t('command.ping.api_latency', { lng: LocaleParam })}`, value: `${codeBlock(`${this.client.ws.ping}`)}`, inline: true }
        )

        await interaction.reply({ embeds: [PingEmbed], ephemeral: true });
    }
}