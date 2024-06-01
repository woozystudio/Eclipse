import Category from "../enums/Category";

export default interface ContextMenuManager {
    name: string;
    type: number;
    userPermissions: bigint;
    category: Category;
    development: boolean;
}