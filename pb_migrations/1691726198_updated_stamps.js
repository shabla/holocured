migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7kfujt7r3irxs6i")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okevwyq8",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g9xljdz7",
    "name": "desc",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("7kfujt7r3irxs6i")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "okevwyq8",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "g9xljdz7",
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
})
