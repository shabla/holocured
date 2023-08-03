migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6c78q7i899sa8g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bewq6t7j",
    "name": "nickname",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6c78q7i899sa8g")

  // remove
  collection.schema.removeField("bewq6t7j")

  return dao.saveCollection(collection)
})
