migrate((db) => {
  const collection = new Collection({
    "id": "v6c78q7i899sa8g",
    "created": "2023-07-13 18:54:50.404Z",
    "updated": "2023-07-13 18:54:50.404Z",
    "name": "generations",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oriowzhb",
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
        "id": "bng8uzsf",
        "name": "branch",
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
      "CREATE UNIQUE INDEX `idx_PydRv8e` ON `generations` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("v6c78q7i899sa8g");

  return dao.deleteCollection(collection);
})
