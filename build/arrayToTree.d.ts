export interface TreeItem<T> {
    data: T | null;
    children: TreeItem<T>[];
}
export interface Config<T> {
    id: keyof T;
    parentId: keyof T;
}
/**
 * Unflattens an array to a tree with runtime O(n)
 */
export declare function arrayToTree<T>(items: T[], idKey?: string, parentIdKey?: string): TreeItem<T>[];
