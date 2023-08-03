migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6c78q7i899sa8g")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mliik9sg",
    "name": "number",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v6c78q7i899sa8g")

  // remove
  collection.schema.removeField("mliik9sg")

  return dao.saveCollection(collection)
})
