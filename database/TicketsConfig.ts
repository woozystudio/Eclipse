import { Schema, model } from "mongoose";

let ticketsSchema = new Schema({
    GuildID: String,
    ChannelID: String,
    CategoryID: String,
    Description: String
});

export default model('TicketsConfig', ticketsSchema);