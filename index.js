const buildDbItems = require("./buildDbItems");
const dbItems = buildDbItems();
const insertDbItems = require("./insertDbItems");

insertDbItems(dbItems);
