migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "irykun8f",
    "name": "requires",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "4jhgcb6g6d9qw4l",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // remove
  collection.schema.removeField("irykun8f")

  return dao.saveCollection(collection)
})
