import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, inlineCode } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import CommandOption from "../../types/CommandOption";
import Case from "../../enums/Case";
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
            development: false,
            locale: LocaleParam
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {        
        const command = interaction.options.getString('command');
        const commands = this.client.commands;

        if(command) {
            const findCommand = commands.find(cmd => cmd.name === command);

            if (!findCommand) {
                await interaction.reply({ content: `${Case.Error} No command found with the name ${inlineCode(command)}`, ephemeral: true });
                return;
            }

            const options = (findCommand.options as CommandOption[]).map((option: CommandOption) => { return `${inlineCode(`<${option.name}>`)}` }).join(' ');

            const HelpWithCommand = new EmbedBuilder()
            .setAuthor({ iconURL: this.client.user?.displayAvatarURL(), name: `${this.client.user?.username} ${this.client.version.version}` })
            .setTitle(`Command information: ${command}`)
            .setColor(0x2B2D31)
            .addFields(
                { name: 'Description', value: `${findCommand.description}` },
                { name: 'Usage', value: `${inlineCode(`/${findCommand.name}`)} ${options}` }
            )
            .setFooter({ text: `Bot developed by: woozystudio` })

            await interaction.reply({ embeds: [HelpWithCommand], ephemeral: true })

        } else {

            const infoCommands = this.client.commands.filter(cmd => cmd.category === Category.Information);
            const modCommands = this.client.commands.filter(cmd => cmd.category === Category.Moderation);

            const HelpCommand = new EmbedBuilder()
            .setAuthor({ iconURL: this.client.user?.displayAvatarURL(), name: `${this.client.user?.username} ${this.client.version.version}` })
            .setTitle(`Eclipse Help Menu`)
            .setColor(0x2B2D31)
            .addFields(
                { name: `Slash Commands: ${inlineCode('/')}`, value: `Transform your discord server to a place full of creativity and professionalism with unique plugins! \nThese are the commands you can use:` },
                { name: 'Information Commands', value: `${infoCommands.map(cmd => inlineCode(cmd.name)).join(' ')}` },
                { name: 'Moderation Commands', value: `${modCommands.map(cmd => inlineCode(cmd.name)).join(' ')}` },
            )
            .setFooter({ text: `Bot developed by: woozystudio` })
    
            await interaction.reply({ embeds: [HelpCommand], ephemeral: true });
        }
    }
}