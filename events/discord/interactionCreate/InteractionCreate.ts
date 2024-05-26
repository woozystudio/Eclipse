import { ChatInputCommandInteraction, Collection, Events } from "discord.js";
import Event from "../../../class/Event";
import Command from "../../../class/Command";
import Eclipse from "../../../class/Eclipse";

export default class InteractionCreate extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.InteractionCreate,
            description: "InteractionCreate Event",
            once: false
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
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
    }
}