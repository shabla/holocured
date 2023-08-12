migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fjih5ghl",
    "name": "super",
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
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // remove
  collection.schema.removeField("fjih5ghl")

  return dao.saveCollection(collection)
})
