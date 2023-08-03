migrate((db) => {
  const collection = new Collection({
    "id": "g2w5w92uvf37wum",
    "created": "2023-07-13 19:14:31.519Z",
    "updated": "2023-07-13 19:14:31.519Z",
    "name": "upgrades",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jre7bme1",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "xe3gxnri",
        "name": "costs",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_igznVK5` ON `upgrades` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("g2w5w92uvf37wum");

  return dao.deleteCollection(collection);
})
