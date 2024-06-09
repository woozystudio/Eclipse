export default interface Handler {
    createEventsListener(): void;
    createCommandsListener(): void;
    createSubCommandsListener(): void;
    createButtonInteractions(): void;
    createSelectMenuInteractions(): void;
    createContextMenuCommandsInteractions(): void;
}