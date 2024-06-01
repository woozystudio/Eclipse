import { ButtonInteraction, ChatInputCommandInteraction, ContextMenuCommandInteraction, Events, inlineCode } from "discord.js";
import Event from "../../../class/Event";
import Command from "../../../class/Command";
import Eclipse from "../../../class/Eclipse";
import ContextMenu from "../../../class/ContextMenu";
import Button from "../../../class/Button";

export default class InteractionCreate extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.InteractionCreate,
            description: "InteractionCreate Event",
            once: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction | ButtonInteraction) {
        if(interaction.isChatInputCommand()) {
            const command: Command = this.client.commands.get(interaction.commandName)!;
    
            //@ts-ignore
            if(!command) return interaction.reply({ content: "outdated command", ephemeral: true }) && this.client.commands.delete(interaction.commandName);
    
            if(command.development && !this.client.config.developers.includes(interaction.user.id))
                return interaction.reply({ content: `${inlineCode("❌")} This command is only for developers!`, ephemeral: true });
    
            try {
                const subCommandGroup = interaction.options.getSubcommandGroup(false);
                const subCommand = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}`: ""}.${interaction.options.getSubcommand(false) || ""}`
    
                return this.client.subCommands.get(subCommand)?.Execute(interaction) || command.Execute(interaction);
            } catch (error) {
                console.log(error);
            }
        }

        if (interaction.isContextMenuCommand()) {
            const contextMenu: ContextMenu = this.client.contextMenus.get(interaction.commandName)!;

            if(contextMenu.development && !this.client.config.developers.includes(interaction.user.id))
                return interaction.reply({ content: `${inlineCode("❌")} This command is only for developers!`, ephemeral: true });

            //@ts-ignore
            if (!contextMenu) return interaction.reply({ content: `outdated menu` }) && this.client.contextMenus.delete(interaction.commandName);

            const target = await interaction.guild?.members.fetch(interaction.user.id);

            if(!target?.permissions.has(contextMenu.userPermissions)) return await interaction.reply({ content: `${inlineCode("❌")} You don't have sufficient permissions to execute this command.`, ephemeral: true });

            try {
                const context = `${interaction.commandName}${interaction.commandType}`

                return this.client.contextMenus.get(context)?.Execute(interaction) || contextMenu.Execute(interaction);
            } catch (err) {
                console.error(err);
            }
        }

        if (interaction.isButton()) {
            const button: Button = this.client.buttons.get(interaction.customId)!;

            //@ts-ignore
            if (!button) return interaction.reply({ content: `outdated button` }) && this.client.buttons.delete(interaction.customid);

            const target = await interaction.guild?.members.fetch(interaction.user.id);

            if(!target?.permissions.has(button.default_member_permissions)) return await interaction.reply({ content: `${inlineCode("❌")} You don't have sufficient permissions to execute this button.`, ephemeral: true });

            try {
                const buttonId = `${interaction.customId}`;
    
                this.client.buttons.get(buttonId)?.Execute(interaction) || button.Execute(interaction);
            } catch (err) {
                console.log(err);
            }
        }
    }
}