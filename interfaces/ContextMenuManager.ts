import Category from "../enums/Category";

export default interface ContextMenuManager {
    name: string;
    type: number;
    category: Category;
    development: boolean;
}