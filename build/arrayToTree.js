"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Unflattens an array to a tree with runtime O(n)
 */
function arrayToTree(items, idKey, parentIdKey) {
    if (idKey === void 0) { idKey = 'id'; }
    if (parentIdKey === void 0) { parentIdKey = 'parentId'; }
    // the resulting unflattened tree
    var rootItems = [];
    // stores all already processed items with ther ids as key so we can easily look them up
    var lookup = new Map();
    // idea of this loop:
    // whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
    // in the lookup object and fill it with the data of the parent later
    // if an item has no parentId, add it as a root element to rootItems
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var itemId = item[idKey];
        var parentId = item[parentIdKey];
        // look whether item already exists in the lookup table
        var node = lookup.get(itemId);
        if (!node) {
            // item is not yet there, so add a preliminary item (its data will be added later)
            node = { data: null, children: [] };
            lookup.set(itemId, node);
        }
        // add the current item's data to the item in the lookup table
        node.data = item;
        if (parentId === null) {
            // is a root item
            rootItems.push(node);
        }
        else {
            // has a parent
            // look whether the parent already exists in the lookup table
            var parentNode = lookup.get(parentId);
            if (!parentNode) {
                // parent is not yet there, so add a preliminary parent (its data will be added later)
                parentNode = { data: null, children: [] };
                lookup.set(parentId, parentNode);
            }
            // add the current item to the parent
            parentNode.children.push(node);
        }
    }
    return rootItems;
}
exports.arrayToTree = arrayToTree;
//# sourceMappingURL=arrayToTree.js.map