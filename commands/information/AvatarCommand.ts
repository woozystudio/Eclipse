import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, User } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import { LocaleParam } from "../../types/LocaleParam";

export default class Avatar extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "avatar",
            description: "Displays a user's profile picture.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [
                {
                    name: "target",
                    description: "Select a user from the server to display their avatar.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: "size",
                    description: "Select a size for the avatar image.",
                    required: false,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        { name: '16', value: '16' },
                        { name: '32', value: '32' },
                        { name: '64', value: '64' },
                        { name: '128', value: '128' },
                        { name: '256', value: '256' },
                        { name: '512', value: '512' },
                        { name: '1024', value: '1024' },
                        { name: '2048', value: '2048' },
                        { name: '4096', value: '4096' },
                    ]
                }
            ],
            development: false,
            locale: LocaleParam
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target') as User;
        const size = interaction.options.getString('size') || 4096;

        const AvatarEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setTitle(`@${target?.username}'s avatar`)
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
        
        switch (size) {
            case '16':
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 16 })}`)
                break;
            case '32':
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 32 })}`)
                break;
            case '64':
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 64 })}`)
                break;
            case '128':
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 128 })}`)
                break;
            case '256':
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 256 })}`)
                break;
            case '512':
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 512 })}`)
                break;
            case '1024':
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 1024 })}`)
                break;
            case '2048':
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 2048 })}`)
                break;
            case '4096':
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 4096 })}`)
                break;

            default:
                AvatarEmbed.setImage(`${target?.displayAvatarURL({ size: 4096 })}`)
                break;
        }


        await interaction.reply({ embeds: [AvatarEmbed], ephemeral: true });
    }
}