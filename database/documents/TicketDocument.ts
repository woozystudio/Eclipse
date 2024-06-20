import { Schema, model } from "mongoose";

let ticketDocument = new Schema({
    GuildID: String,
    ChannelID: String,
    Members: [String],
    TicketID: String,
    Closed: Boolean,
    Moderator: String,
    Locked: Boolean,
    Claimed: Boolean
});

export default model('TicketDocument', ticketDocument);