migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mmyosvfsft2fk88")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xvql9qad",
    "name": "gen",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "v6c78q7i899sa8g",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mmyosvfsft2fk88")

  // remove
  collection.schema.removeField("xvql9qad")

  return dao.saveCollection(collection)
})
