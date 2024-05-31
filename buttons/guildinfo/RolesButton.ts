import { ButtonInteraction, EmbedBuilder, Guild, PermissionFlagsBits } from "discord.js";
import Button from "../../class/Button";
import Eclipse from "../../class/Eclipse";

export default class RolesButtonGuildInfoCommand extends Button {
    constructor(client: Eclipse) {
        super(client, {
            customId: "guildinfo-command-roles",
            userPermissions: PermissionFlagsBits.UseApplicationCommands
        })
    }
    
    async Execute(interaction: ButtonInteraction) {
        const guild = interaction.guild as Guild;
        const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(role => `${role}`).join('\n');

        const RolesEmbed = new EmbedBuilder()
        .setAuthor({ iconURL: `${interaction.guild?.iconURL()}`, name: `${interaction.guild?.name}` })
        .setThumbnail(interaction.guild?.iconURL({ size: 2048}) as string)
        .setTitle(`Roles (${guild.roles.cache.size})`)
        .setColor(0x2B2D31)
        .setDescription(roles)

        await interaction.reply({ embeds: [RolesEmbed], ephemeral: true });
    }
}