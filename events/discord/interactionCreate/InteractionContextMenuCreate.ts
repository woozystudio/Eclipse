import { ChatInputCommandInteraction, Collection, ContextMenuCommandInteraction, Events, PermissionFlagsBits } from "discord.js";
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

    async Execute(interaction: ContextMenuCommandInteraction) {
        if (interaction.isContextMenuCommand()) {
            const contextMenu: ContextMenu = this.client.contextMenus.get(interaction.commandName)!;

            if(contextMenu.development && !this.client.config.developers.includes(interaction.user.id))
                return interaction.reply({ content: `This command is only for developers!`, ephemeral: true });

            //@ts-ignore
            if (!contextMenu) return interaction.reply({ content: `outdated menu` }) && this.client.contextMenus.delete(interaction.commandName);

            const target = await interaction.guild?.members.fetch(interaction.user.id);

            if(!target?.permissions.has(contextMenu.userPermissions)) return await interaction.reply({ content: "`❌` You don't have sufficient permissions to execute this command." });

            try {
                const context = `${interaction.commandName}${interaction.commandType}`

                return this.client.contextMenus.get(context)?.Execute(interaction) || contextMenu.Execute(interaction);
            } catch (err) {
                console.error(err);
            }
        }
    }
}