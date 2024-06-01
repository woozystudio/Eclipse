export default interface Handler {
    createEventsListener(): void;
    createCommandsListener(): void;
    createSubCommandsListener(): void;
    createButtonInteractions(): void;
    createContextMenuCommandsInteractions(): void;
}