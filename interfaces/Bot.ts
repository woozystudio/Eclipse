import { Collection } from "discord.js";
import Configuration from "./Configuration";
import Command from "../class/Command";
import SubCommand from "../class/SubCommand";
import Listeners from "../class/Listeners";
import Button from "../class/Button";
import ContextMenu from "../class/ContextMenu";

export default interface Bot {
    addListeners: Listeners;
    config: Configuration;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    buttons: Collection<string, Button>;
    contextMenus: Collection<string, ContextMenu>
    development: boolean;
    version: any;

    Login(): void;
    AddListeners(): void;
}