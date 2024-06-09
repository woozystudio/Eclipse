import { ChatInputCommandInteraction, TextChannel, inlineCode } from "discord.js";
import SubCommand from "../../class/SubCommand";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ReportsConfig from "../../database/ReportsConfig";

export default class Reports extends SubCommand {
    constructor(client: Eclipse) {
        super(client, {
            name: "reports",
            category: Category.Configuration,
            command: "config",
            group: ""
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.options.getChannel('channel') as TextChannel;
        
        await ReportsConfig.findOneAndUpdate({ GuildID: interaction.guild?.id }, { ChannelID: channel.id, }, { new: true, upsert: true });

        await interaction.reply({ content: `${inlineCode('✅')} The reporting plugin has been successfully configured.`, ephemeral: true });
    }
}