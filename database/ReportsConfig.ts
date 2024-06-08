import { Schema, model } from "mongoose";

let reportsSchema = new Schema({
    GuildID: String,
    ChannelID: String,
});

export default model('ReportsConfig', reportsSchema);