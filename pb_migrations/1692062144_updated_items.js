migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubaytsqf",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "weapon",
        "item",
        "collab",
        "super",
        "super-collab"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ubaytsqf",
    "name": "type",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "weapon",
        "item",
        "collab",
        "super"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
