import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, inlineCode } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import CommandOption from "../../types/CommandOption";
import Case from "../../enums/Case";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class Help extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "help",
            description: "Need help? Check out the complete list of bot commands and details on each one.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [
                {
                    name: "command",
                    description: "Enter the name of a command.",
                    required: false,
                    type: ApplicationCommandOptionType.String
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {        
        const command = interaction.options.getString('command');
        const commands = this.client.commands;

        if(command) {
            const findCommand = commands.find(cmd => cmd.name === command);

            if (!findCommand) {
                await interaction.reply({ content: `${Case.Error} ${i18next.t('command.help.errors.no_command', { lng: LocaleParam, command: inlineCode(command) })}`, ephemeral: true });
                return;
            }

            const options = (findCommand.options as CommandOption[]).map((option: CommandOption) => { return `${inlineCode(`<${option.name}>`)}` }).join(' ');

            const HelpWithCommand = new EmbedBuilder()
            .setAuthor({ iconURL: this.client.user?.displayAvatarURL(), name: `${this.client.user?.username} ${this.client.version.version}` })
            .setTitle(`${i18next.t('command.help.commandinfo.title', { lng: LocaleParam, command: command })}`)
            .setColor(0x2B2D31)
            .addFields(
                { name: `${i18next.t('command.common.description', { lng: LocaleParam })}`, value: `${findCommand.description}` },
                { name: `${i18next.t('command.help.commandinfo.usage', { lng: LocaleParam })}`, value: `${inlineCode(`/${findCommand.name}`)} ${options}` }
            )
            .setFooter({ text: `${i18next.t('command.help.footer', { lng: LocaleParam })}` })

            await interaction.reply({ embeds: [HelpWithCommand], ephemeral: true })

        } else {

            const infoCommands = this.client.commands.filter(cmd => cmd.category === Category.Information);
            const modCommands = this.client.commands.filter(cmd => cmd.category === Category.Moderation);

            const HelpCommand = new EmbedBuilder()
            .setAuthor({ iconURL: this.client.user?.displayAvatarURL(), name: `${this.client.user?.username} ${this.client.version.version}` })
            .setTitle(`${i18next.t('command.help.title', { lng: LocaleParam })}`)
            .setColor(0x2B2D31)
            .addFields(
                { name: `Slash Commands: ${inlineCode('/')}`, value: `${i18next.t('command.help.description', { lng: LocaleParam })}` },
                { name: `${i18next.t('command.help.info_commands', { lng: LocaleParam })}`, value: `${infoCommands.map(cmd => inlineCode(cmd.name)).join(' ')}` },
                { name: `${i18next.t('command.help.mod_commands', { lng: LocaleParam })}`, value: `${modCommands.map(cmd => inlineCode(cmd.name)).join(' ')}` },
            )
            .setFooter({ text: `${i18next.t('command.help.footer', { lng: LocaleParam })}` })
    
            await interaction.reply({ embeds: [HelpCommand], ephemeral: true });
        }
    }
}