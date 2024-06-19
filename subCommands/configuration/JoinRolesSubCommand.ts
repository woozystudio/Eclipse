import { ActionRowBuilder, ChatInputCommandInteraction, EmbedBuilder, RoleSelectMenuBuilder, inlineCode } from "discord.js";
import SubCommand from "../../class/SubCommand";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import JoinRolesConfig from "../../database/JoinRolesConfig";

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
            .setDescription(`
            ${inlineCode(`❓`)} Select the roles that will be automatically granted to all users that log in to the server.

            ${inlineCode(`💡`)} You can change this anytime using the ${inlineCode(`/config join-roles`)} command.
        `)

        const RolesSelectMenu = new ActionRowBuilder<RoleSelectMenuBuilder>().addComponents(
            new RoleSelectMenuBuilder()
            .setCustomId('joinroles-config-menu')
            .setPlaceholder('Select one or more server roles')
            .setMaxValues(25)
            .setMinValues(1)
        )

        await interaction.reply({ embeds: [JoinRolesEmbed], components: [RolesSelectMenu], ephemeral: true });
    }
}