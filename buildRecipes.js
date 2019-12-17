const rawRecipes = require("./data/rawRecipes");
const books = require("./data/books");
const categories = require("./data/categories");
const categoriesRecipes = require("./data/categories_recipes");

const _ = require("lodash");

module.exports = () => {
  const recipes = rawRecipes
    .map(r => ({
      //id: r[0],
      id: r[11],
      name: r[1],
      serves: r[2],
      cooking_time: r[3],
      description: r[4],
      ingredients: r[5],
      method: r[6],
      footnote: r[9],
      vegetarian: !!r[10],
      //slug: r[11],
      preparation_time: r[17],
      book: _.get(
        books.find(b => b.id === r[18]),
        "slug"
      ),
      categories: categoriesForRecipe(r[0])
    }))
    .map(r => _.pickBy(r));

  return recipes;
};

function categoriesForRecipe(recipeId) {
  return categoriesRecipes
    .filter(c => c.recipe_id === recipeId)
    .map(cr => cr.category_id)
    .map(cid => categories.find(c => c.id === cid).slug);
}
