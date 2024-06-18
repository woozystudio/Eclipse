import { ChatInputCommandInteraction, Role } from "discord.js";
import SubCommand from "../../class/SubCommand";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import MuteConfig from "../../database/MuteConfig";
import Case from "../../enums/Case";
import { LocaleParam } from "../../types/LocaleParam";

export default class MuteSub extends SubCommand {
    constructor(client: Eclipse) {
        super(client, {
            name: "mute",
            category: Category.Configuration,
            command: "config",
            group: "",
            locale: LocaleParam
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const role = interaction.options.getRole('role') as Role;

        await MuteConfig.findOneAndUpdate({ GuildID: interaction.guild?.id }, { RoleID: role.id, }, { new: true, upsert: true });

        await interaction.reply({ content: `${Case.Success} The muting plugin has been successfully configured.`, ephemeral: false });
    }
}