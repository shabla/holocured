migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w9uiuedxyi7ktba")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kobj1ioy",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "attack",
        "skill",
        "special"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w9uiuedxyi7ktba")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kobj1ioy",
    "name": "type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "attack",
        "passive",
        "special"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
