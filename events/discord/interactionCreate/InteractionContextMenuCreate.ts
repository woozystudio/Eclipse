import { ChatInputCommandInteraction, Collection, ContextMenuCommandInteraction, Events } from "discord.js";
import Event from "../../../class/Event";
import ContextMenu from "../../../class/ContextMenu";
import Eclipse from "../../../class/Eclipse";

export default class InteractionContextMenuCreate extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.InteractionCreate,
            description: "InteractionContextMenuCreate Event",
            once: false
        });
    }

    Execute(interaction: ContextMenuCommandInteraction) {
        if(interaction.isContextMenuCommand()) {
            if (interaction.isContextMenuCommand()) {
                const contextMenu: ContextMenu = this.client.contextMenus.get(interaction.commandName)!;
    
                if(contextMenu.development && !this.client.config.developers.includes(interaction.user.id))
                    return interaction.reply({ content: `This command is only for developers!`, ephemeral: true });
    
                //@ts-ignore
                if (!contextMenu) return interaction.reply({ content: `outdated menu` }) && this.client.contextMenus.delete(interaction.commandName);
    
                try {
                    const context = `${interaction.commandName}${interaction.commandType}`
    
                    return this.client.contextMenus.get(context)?.Execute(interaction) || contextMenu.Execute(interaction);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
}