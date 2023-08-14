migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w9uiuedxyi7ktba")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v5kdxvdh",
    "name": "desc",
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
  const collection = dao.findCollectionByNameOrId("w9uiuedxyi7ktba")

  // remove
  collection.schema.removeField("v5kdxvdh")

  return dao.saveCollection(collection)
})
