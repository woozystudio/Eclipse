import { ChatInputCommandInteraction, Role } from "discord.js";
import SubCommand from "../../class/SubCommand";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import MuteConfig from "../../database/MuteConfig";
import Case from "../../enums/Case";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class MuteSub extends SubCommand {
    constructor(client: Eclipse) {
        super(client, {
            name: "mute",
            category: Category.Configuration,
            command: "config",
            group: ""
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const role = interaction.options.getRole('role') as Role;

        await MuteConfig.findOneAndUpdate({ GuildID: interaction.guild?.id }, { RoleID: role.id, }, { new: true, upsert: true });

        await interaction.reply({ content: `${Case.Success} ${i18next.t('command.config.common.success', { lng: LocaleParam })}`, ephemeral: true });
    }
}