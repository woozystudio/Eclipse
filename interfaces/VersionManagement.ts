export default interface VersionManagement {
    stableVersion: string;
    version: string;
    state: string;
    channel: string;
    canaryStableVersion: string,
    canaryVersion: string,
    canaryState: string,
    canaryChannel: string
}