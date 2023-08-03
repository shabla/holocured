migrate((db) => {
  const collection = new Collection({
    "id": "4jhgcb6g6d9qw4l",
    "created": "2023-07-13 19:01:50.036Z",
    "updated": "2023-07-13 19:01:50.036Z",
    "name": "items",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vi5jnqao",
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
        "id": "ubaytsqf",
        "name": "type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "weapon",
            "item",
            "collab"
          ]
        }
      },
      {
        "system": false,
        "id": "nhsou21n",
        "name": "desc",
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
        "id": "ss9n4xts",
        "name": "spritePos",
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
        "id": "jpgp22yp",
        "name": "requirement",
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
      "CREATE UNIQUE INDEX `idx_ROwrQO3` ON `items` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("4jhgcb6g6d9qw4l");

  return dao.deleteCollection(collection);
})
