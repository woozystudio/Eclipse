import { ButtonInteraction, Events } from "discord.js";
import Event from "../../../class/Event";
import Button from "../../../class/Button";
import Eclipse from "../../../class/Eclipse";

export default class InteractionButtonCreate extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.InteractionCreate,
            description: "InteractionButton Event",
            once: false
        });
    }

    Execute(interaction: ButtonInteraction) {
        if (interaction.isButton()) {
            const button: Button = this.client.buttons.get(interaction.customId)!;

            //@ts-ignore
            if (!button) return interaction.reply({ content: `outdated button` }) && this.client.buttons.delete(interaction.customid);
            try {
                const buttonId = `${interaction.customId}`;
    
                this.client.buttons.get(buttonId)?.Execute(interaction) || button.Execute(interaction);
            } catch (err) {
                console.log(err);
            }
        }
    }
}