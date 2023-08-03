migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6c78q7i899sa8g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_PydRv8e` ON `generations` (\n  `name`,\n  `branch`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6c78q7i899sa8g")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_PydRv8e` ON `generations` (`name`)"
  ]

  return dao.saveCollection(collection)
})
