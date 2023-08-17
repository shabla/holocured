migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkz7yvhd",
    "name": "offsets",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": 5,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bkz7yvhd",
    "name": "offset",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": 5,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
