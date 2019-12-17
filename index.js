const buildRecipes = require("./buildRecipes");
const recipes = buildRecipes();
const insertRecipes = require("./insertRecipes");

insertRecipes(recipes);
