"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Unflattens an array to a tree with runtime O(n)
 */
function arrayToTree(items, idKey, parentIdKey) {
    if (idKey === void 0) { idKey = 'id'; }
    if (parentIdKey === void 0) { parentIdKey = 'parentId'; }
    var _a, _b;
    // the resulting unflattened tree
    var rootItems = [];
    // stores all already processed items with ther ids as key so we can easily look them up
    var lookup = {};
    // idea of this loop:
    // whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
    // in the lookup object and fill it with the data of the parent later
    // if an item has no parentId, add it as a root element to rootItems
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var itemId = item[idKey];
        var parentId = item[parentIdKey];
        var data = 'data';
        var children = 'children';
        // look whether item already exists in the lookup table
        if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
            // item is not yet there, so add a preliminary item (its data will be added later)
            lookup[itemId] = (_a = {}, _a[data] = null, _a[children] = [], _a);
        }
        // add the current item's data to the item in the lookup table
        lookup[itemId][data] = item;
        var TreeItem = lookup[itemId];
        if (parentId === null) {
            // is a root item
            rootItems.push(TreeItem);
        }
        else {
            // has a parent
            // look whether the parent already exists in the lookup table
            if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
                // parent is not yet there, so add a preliminary parent (its data will be added later)
                lookup[parentId] = (_b = {}, _b[data] = null, _b[children] = [], _b);
            }
            // add the current item to the parent
            lookup[parentId][children].push(TreeItem);
        }
    }
    return rootItems;
}
exports.arrayToTree = arrayToTree;
//# sourceMappingURL=arrayToTree.js.map