import { ActionRowBuilder, ChatInputCommandInteraction, EmbedBuilder, RoleSelectMenuBuilder, inlineCode } from "discord.js";
import SubCommand from "../../class/SubCommand";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import JoinRolesConfig from "../../database/JoinRolesConfig";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class JoinRoles extends SubCommand {
    constructor(client: Eclipse) {
        super(client, {
            name: "join-roles",
            category: Category.Configuration,
            command: "config",
            group: ""
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const JoinRolesEmbed = new EmbedBuilder()
            .setColor("Yellow")
            .setDescription(`${i18next.t('command.config.joinroles.description', { lng: LocaleParam, command: `\`/config join-roles\`` })}`)

        const RolesSelectMenu = new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents(
            new RoleSelectMenuBuilder()
            .setCustomId('joinroles-config-menu')
            .setPlaceholder(`${i18next.t('command.config.joinroles.placeholder', { lng: LocaleParam })}`)
            .setMaxValues(25)
            .setMinValues(1)
        )

        await interaction.reply({ embeds: [JoinRolesEmbed], components: [RolesSelectMenu], ephemeral: true });
    }
}