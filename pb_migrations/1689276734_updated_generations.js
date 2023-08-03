migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6c78q7i899sa8g")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6c78q7i899sa8g")

  collection.listRule = null

  return dao.saveCollection(collection)
})
