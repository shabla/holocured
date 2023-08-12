migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g2w5w92uvf37wum")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "veumvxwe",
    "name": "category",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "enhancements",
        "stats",
        "other"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g2w5w92uvf37wum")

  // remove
  collection.schema.removeField("veumvxwe")

  return dao.saveCollection(collection)
})
