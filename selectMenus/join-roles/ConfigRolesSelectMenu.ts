import { AnySelectMenuInteraction, PermissionFlagsBits } from "discord.js";
import Eclipse from "../../class/Eclipse";
import SelectMenu from "../../class/SelectMenu";
import JoinRolesConfig from "../../database/JoinRolesConfig";
import Case from "../../enums/Case";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

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

        await interaction.reply({ content: `${Case.Success} ${i18next.t('command.config.common.success', { lng: LocaleParam })}`, ephemeral: true });
    }
}