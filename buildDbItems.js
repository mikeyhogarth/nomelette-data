const recipes = require("./data/processedRecipes");
const books = require("./data/books");
const categories = require("./data/categories");
const categoriesRecipes = require("./data/categories_recipes");

const _ = require("lodash");

module.exports = () => {
  // recipe items
  const recipeItems = recipes
    .map(recipe => ({
      pk: `Recipe#${recipe.slug}`,
      sk: `Recipe#${recipe.slug}`,
      name: recipe.name,
      serves: recipe.serves,
      cookingTime: recipe.cooking_time,
      description: recipe.description,
      ingredients: recipe.ingredients,
      method: recipe.method,
      footnote: recipe.footnote,
      vegetarian: !!recipe.vegetarian,
      preparationTime: recipe.preparation_time,
      slug: recipe.slug
    }))
    .map(r => _.pickBy(r));

  // recipe category items

  const categoryRecipeItems = categoriesRecipes
    .map(cr => {
      return {
        pk: `Recipe#${recipes.find(r => r.id === cr.recipe_id).slug}`,
        sk: `Category#${categories.find(c => c.id === cr.category_id).slug}`
      };
    })
    .map(r => _.pickBy(r));

  // recipe book items
  const bookRecipeItems = recipes
    .filter(r => r.book_id != null)
    .map(r => {
      return {
        pk: `Recipe#${r.slug}`,
        sk: `Book#${books.find(b => b.id === r.book_id).slug}`
      };
    });

  // category items
  const categoryItems = categories
    .map(c => ({
      pk: `Category#${c.slug}`,
      sk: `Category#${c.slug}`,
      name: c.name,
      slug: c.slug
    }))
    .map(r => _.pickBy(r));

  // book items
  const bookItems = books
    .map(book => ({
      pk: `Book#${book.id}`,
      sk: `Book#${book.id}`,
      title: book.title,
      slug: book.slug,
      description: book.description
    }))
    .map(r => _.pickBy(r));

  return [
    ...recipeItems,
    ...categoryRecipeItems,
    ...categoryItems,
    ...bookRecipeItems,
    ...bookItems
  ];
};
