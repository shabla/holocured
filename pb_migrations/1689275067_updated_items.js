migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // remove
  collection.schema.removeField("ss9n4xts")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ss9n4xts",
    "name": "spritePos",
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
})
