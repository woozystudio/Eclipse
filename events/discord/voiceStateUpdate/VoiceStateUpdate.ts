import { ChannelType, Events, VoiceState } from "discord.js";
import Eclipse from "../../../class/Eclipse";
import Event from "../../../class/Event";
import JoinToCreateConfig from "../../../database/JoinToCreateConfig";

export default class VoiceStateUpdate extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.VoiceStateUpdate,
            description: "VoiceStateUpdate Event",
            once: false
        })
    }

    async Execute(oldState: VoiceState, newState: VoiceState) {
        const data = await JoinToCreateConfig.findOne({ GuildID: newState.guild?.id });
        if (!data) return;

        if (newState.channelId === data.ChannelID) {
            const createChannel = await newState.guild.channels.create({
                name: `${newState.member?.user.displayName}'s Channel`,
                type: ChannelType.GuildVoice,
                parent: data.ParentID
            });

            newState.member?.voice.setChannel(createChannel);

            const voiceStateUpdateListener = async () => {
                if (createChannel && createChannel.members.size === 0) {
                    await createChannel.delete();
                    this.client.removeListener(Events.VoiceStateUpdate, voiceStateUpdateListener);
                }
            };

            this.client.on(Events.VoiceStateUpdate, voiceStateUpdateListener);
        }
    }
}