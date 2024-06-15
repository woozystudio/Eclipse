import { AnySelectMenuInteraction, PermissionFlagsBits, inlineCode } from "discord.js";
import Eclipse from "../../class/Eclipse";
import SelectMenu from "../../class/SelectMenu";
import JoinRolesConfig from "../../database/JoinRolesConfig";

export default class JoinRolesConfigSelectMenu extends SelectMenu {
    constructor(client: Eclipse) {
        super(client, {
            customId: "joinroles-config-menu",
            userPermissions: PermissionFlagsBits.ManageGuild
        })
    }
    
    async Execute(interaction: AnySelectMenuInteraction) {
        const selectedRoles = interaction.values;
        await JoinRolesConfig.findOneAndUpdate({ GuildID: interaction.guild?.id }, { RoleID: selectedRoles, }, { new: true, upsert: true });

        await interaction.reply({ content: `${inlineCode('✔️')} The join-roles plugin has been successfully configured.`, ephemeral: true });
    }
}