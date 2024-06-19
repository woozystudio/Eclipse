import { Schema, model } from "mongoose";

let languageSchema = new Schema({
    GuildID: String,
    Language: String,
});

export default model('LanguageSchema', languageSchema);