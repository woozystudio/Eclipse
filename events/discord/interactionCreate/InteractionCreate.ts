import { ButtonInteraction, ChatInputCommandInteraction, Collection, ContextMenuCommandInteraction, Events } from "discord.js";
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

    async Execute(interaction: ChatInputCommandInteraction, contextMenuInteraction: ContextMenuCommandInteraction, buttonInteraction: ButtonInteraction) {
        if(interaction.isChatInputCommand()) {
            const command: Command = this.client.commands.get(interaction.commandName)!;
    
            //@ts-ignore
            if(!command) return interaction.reply({ content: "outdated command", ephemeral: true }) && this.client.commands.delete(interaction.commandName);
    
            if(command.development && !this.client.config.developers.includes(interaction.user.id))
                return interaction.reply({ content: `This command is only for developers!`, ephemeral: true });
    
            try {
                const subCommandGroup = interaction.options.getSubcommandGroup(false);
                const subCommand = `${interaction.commandName}${subCommandGroup ? `.${subCommandGroup}`: ""}.${interaction.options.getSubcommand(false) || ""}`
    
                return this.client.subCommands.get(subCommand)?.Execute(interaction) || command.Execute(interaction);
            } catch (error) {
                console.log(error);
            }
        }

        if (contextMenuInteraction.isContextMenuCommand()) {
            const contextMenu: ContextMenu = this.client.contextMenus.get(contextMenuInteraction.commandName)!;

            if(contextMenu.development && !this.client.config.developers.includes(contextMenuInteraction.user.id))
                return contextMenuInteraction.reply({ content: `This command is only for developers!`, ephemeral: true });

            //@ts-ignore
            if (!contextMenu) return contextMenuInteraction.reply({ content: `outdated menu` }) && this.client.contextMenus.delete(contextMenuInteraction.commandName);

            const target = await contextMenuInteraction.guild?.members.fetch(contextMenuInteraction.user.id);

            if(!target?.permissions.has(contextMenu.userPermissions)) return await contextMenuInteraction.reply({ content: "`❌` You don't have sufficient permissions to execute this command.", ephemeral: true });

            try {
                const context = `${contextMenuInteraction.commandName}${contextMenuInteraction.commandType}`

                return this.client.contextMenus.get(context)?.Execute(contextMenuInteraction) || contextMenu.Execute(contextMenuInteraction);
            } catch (err) {
                console.error(err);
            }
        }

        if (buttonInteraction.isButton()) {
            const button: Button = this.client.buttons.get(buttonInteraction.customId)!;

            //@ts-ignore
            if (!button) return buttonInteraction.reply({ content: `outdated button` }) && this.client.buttons.delete(buttonInteraction.customid);

            const target = await buttonInteraction.guild?.members.fetch(buttonInteraction.user.id);

            if(!target?.permissions.has(button.default_member_permissions)) return await buttonInteraction.reply({ content: "`❌` You don't have sufficient permissions to execute this button.", ephemeral: true });

            try {
                const buttonId = `${buttonInteraction.customId}`;
    
                this.client.buttons.get(buttonId)?.Execute(buttonInteraction) || button.Execute(buttonInteraction);
            } catch (err) {
                console.log(err);
            }
        }
    }
}