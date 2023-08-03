migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g2w5w92uvf37wum")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gwt2fdcr",
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
  const collection = dao.findCollectionByNameOrId("g2w5w92uvf37wum")

  // remove
  collection.schema.removeField("gwt2fdcr")

  return dao.saveCollection(collection)
})
