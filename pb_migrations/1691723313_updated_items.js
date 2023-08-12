migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hjy4xeee",
    "name": "notes",
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
  collection.schema.removeField("hjy4xeee")

  return dao.saveCollection(collection)
})
