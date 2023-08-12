migrate((db) => {
  const collection = new Collection({
    "id": "7kfujt7r3irxs6i",
    "created": "2023-08-11 03:56:19.186Z",
    "updated": "2023-08-11 03:56:19.186Z",
    "name": "stamps",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_gLZf7MK` ON `stamps` (`name`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7kfujt7r3irxs6i");

  return dao.deleteCollection(collection);
})
