import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, User, bold, inlineCode } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import CommandOption from "../../types/CommandOption";

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
        const commandName = interaction.options.getString('command');
        const commands = this.client.commands;
        
        if (commandName) {
            const command = commands.find(cmd => cmd.name === commandName);

            if (!command) {
                await interaction.reply({ content: `${inlineCode('❌')} No command found with the name ${inlineCode(commandName)}`, ephemeral: true });
                return;
            }

            const options = (command.options as CommandOption[]).map((option: CommandOption) => {
                return `${inlineCode(`<${option.name}>`)}`;
            }).join(' ');

            const embed = new EmbedBuilder()
            .setAuthor({ iconURL: this.client.user?.displayAvatarURL(), name: `${this.client.user?.username} ${this.client.version.version}` })
            .setTitle(`Command information: ${command.name}`)
            .setDescription(`
                ${bold('Description:')}
                ${command.description}
            `)
            .setColor(0x2B2D31)
            .addFields(
                { name: 'Usage', value: `${inlineCode(`/${command.name}`)} ${options}` },
            );
                
            await interaction.reply({ embeds: [embed], ephemeral: false });
        } else {
            const infoCommands = this.client.commands.filter(cmd => cmd.category === Category.Information);
            const modCommands = this.client.commands.filter(cmd => cmd.category === Category.Moderation);

            const HelpCommand = new EmbedBuilder()
            .setAuthor({ iconURL: this.client.user?.displayAvatarURL(), name: `${this.client.user?.username} ${this.client.version.version}` })
            .setTitle(`Eclipse Help Menu`)
            .setColor(0x2B2D31)
            .setDescription(`
                ${bold('Slash Commands:')} ${inlineCode('/')}
                Transform your discord server to a place full of creativity and professionalism with unique plugins!
                These are the commands you can use:
            `)
            .addFields(
                { name: 'Information Commands', value: `${infoCommands.map(cmd => inlineCode(cmd.name)).join(' ')}` },
                { name: 'Moderation Commands', value: `${modCommands.map(cmd => inlineCode(cmd.name)).join(' ')}` },
            )
    
            await interaction.reply({ embeds: [HelpCommand] });
        }
    }
}