import { Schema, model } from "mongoose";

let joinToCreateSchema = new Schema({
    GuildID: String,
    ChannelID: String,
    ParentID: String
});

export default model('JoinToCreateConfig', joinToCreateSchema);