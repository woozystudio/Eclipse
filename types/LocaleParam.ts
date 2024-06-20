import { AnySelectMenuInteraction, ButtonInteraction, CacheType, ChatInputCommandInteraction, ContextMenuCommandInteraction, Guild, ModalSubmitInteraction } from "discord.js";
import LanguageConfig from "../database/LanguageConfig";
import Eclipse from "../class/Eclipse";

export let LocaleParam: string;

export async function fetchLanguage(interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction | ButtonInteraction | AnySelectMenuInteraction | ModalSubmitInteraction) {
    const data = await LanguageConfig.findOne({ GuildID: interaction.guild?.id });
    if(data && data.Language) {
        return LocaleParam = `${data?.Language}`;
    } else {
        return LocaleParam = 'en-US';
    }
}