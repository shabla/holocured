migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w9uiuedxyi7ktba")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kyd33lbx",
    "name": "idol",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "mmyosvfsft2fk88",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("w9uiuedxyi7ktba")

  // remove
  collection.schema.removeField("kyd33lbx")

  return dao.saveCollection(collection)
})
