export interface TreeItem<T> {
  data: T|null
  children: TreeItem<T>[]
}

export interface Config {
  id: string,
  parentId: string,
}

/**
 * Unflattens an array to a tree with runtime O(n)
 */
export function arrayToTree<T> (items: T[], config: Config = { id: 'id', parentId: 'parentId' }): TreeItem<T>[] {
  // the resulting unflattened tree
  const rootItems: TreeItem<T>[] = []

  // stores all already processed items with ther ids as key so we can easily look them up
  const lookup: { [id: string]: TreeItem<T> } = {}

  // idea of this loop:
  // whenever an item has a parent, but the parent is not yet in the lookup object, we store a preliminary parent
  // in the lookup object and fill it with the data of the parent later
  // if an item has no parentId, add it as a root element to rootItems
  for (const item of items) {
    const itemId = (item as any)[config.id]
    const parentId = (item as any)[config.parentId]

    // look whether item already exists in the lookup table
    if (!Object.prototype.hasOwnProperty.call(lookup, itemId)) {
      // item is not yet there, so add a preliminary item (its data will be added later)
      lookup[itemId] = { data: null, children: [] } as TreeItem<T>
    }

    // add the current item's data to the item in the lookup table
    lookup[itemId].data = item

    const TreeItem = lookup[itemId]

    if (parentId === null) {
      // is a root item
      rootItems.push(TreeItem)
    } else {
      // has a parent

      // look whether the parent already exists in the lookup table
      if (!Object.prototype.hasOwnProperty.call(lookup, parentId)) {
        // parent is not yet there, so add a preliminary parent (its data will be added later)
        lookup[parentId] = { data: null, children: [] }
      }

      // add the current item to the parent
      lookup[parentId].children.push(TreeItem)
    }
  }

  return rootItems
}
