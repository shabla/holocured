migrate((db) => {
  const collection = new Collection({
    "id": "mmyosvfsft2fk88",
    "created": "2023-07-13 18:45:34.503Z",
    "updated": "2023-07-13 18:45:34.503Z",
    "name": "idols",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "r41a7f7k",
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
        "id": "diwtuf8m",
        "name": "stat_hp",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "1ovzrpez",
        "name": "stat_atk",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "0eozzfhz",
        "name": "stat_spd",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "jmoss5vq",
        "name": "stat_crt",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_6yQSu6g` ON `idols` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("mmyosvfsft2fk88");

  return dao.deleteCollection(collection);
})
