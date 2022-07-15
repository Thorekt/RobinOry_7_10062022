class RecipeFactory {
  constructor(recipe) {
    this.id = recipe.id;
    this.title = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = recipe.ingredients;
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.ustencils = recipe.ustencils;
  }

  getRecipeCard() {
    const hmtl = TemplateFactory.getRecipeCardTemplate();
    hmtl.querySelector(".recipe-header h3").innerText = this.title;
    hmtl.querySelector(".recipe-time-value").innerText = this.time;
    this.ingredients.forEach((ingredient) => {
      const ingredientRow = TemplateFactory.getIngredientRecipeRowTemplate();
      if (ingredient.ingredient !== undefined) {
        ingredientRow.querySelector(".ingredient-name").innerText =
          ingredient.ingredient + ': ';
      }
      if (ingredient.quantity !== undefined) {
        ingredientRow.querySelector(".ingredient-quantity").innerText =
          ingredient.quantity+ ' ';
      }
      if (ingredient.unit !== undefined) {
        ingredientRow.querySelector(".ingredient-unit").innerText =
          ingredient.unit;
      }

      hmtl.querySelector(".recipe-content ul").appendChild(ingredientRow);
    });
    hmtl.querySelector(".recipe-content p").innerText = this.description;
    return hmtl;
  }
}
