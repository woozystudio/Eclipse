import { ApplicationCommandOptionType, ChannelType, ChatInputCommandInteraction, PermissionFlagsBits, inlineCode } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import LanguageConfig from "../../database/LanguageConfig";
import Case from "../../enums/Case";

export default class Language extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "language",
            description: "Configure the bot language on the server.",
            category: Category.Configuration,
            userPermissions: PermissionFlagsBits.ManageGuild,
            options: [
                {
                    name: "lang",
                    description: "Select a language from the list.",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {
                            name: "Español México (es-MX)", value: "es-MX"
                        },
                        {
                            name: "English United States (en-US)", value: "en-US"
                        }
                    ]
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        try {
            const lang = interaction.options.getString('lang') as string;
    
            await LanguageConfig.findOneAndUpdate({ GuildID: interaction.guild?.id }, { Language: lang, }, { new: true, upsert: true });

            await interaction.reply({ content: `${Case.Success} The language has been established to ${inlineCode(lang)}`, ephemeral: true });
        } catch (err) {
            console.error(err)
        }
    }
}