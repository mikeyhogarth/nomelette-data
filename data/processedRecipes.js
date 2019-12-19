const rawRecipes = require("./rawRecipes");
const _ = require("lodash");

module.exports = rawRecipes
  .map(r => ({
    id: r[0],
    name: r[1],
    serves: r[2],
    cooking_time: r[3],
    description: r[4],
    ingredients: r[5],
    method: r[6],
    footnote: r[9],
    vegetarian: !!r[10],
    preparation_time: r[17],
    slug: r[11],
    book_id: r[18]
  }))
  .map(r => _.pickBy(r));
