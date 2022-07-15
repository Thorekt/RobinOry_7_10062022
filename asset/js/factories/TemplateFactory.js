class TemplateFactory {
  static getRecipeCardTemplate() {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const recipeImgZone = document.createElement("div");
    recipeImgZone.classList.add("recipe-image");

    const recipeHeader = document.createElement("div");
    recipeHeader.classList.add("recipe-header");

    const recipeTitle = document.createElement("h3");
    const recipeTimeZone = document.createElement("div");
    recipeTimeZone.classList.add("recipe-time");

    const recipeTimeIcon = document.createElement("em");
    recipeTimeIcon.classList.add("bi");
    recipeTimeIcon.classList.add("bi-clock");
    const recipeTimeValue = document.createElement("span");
    recipeTimeValue.classList.add("recipe-time-value");
    const recipeTimeText = document.createElement("span");
    recipeTimeText.appendChild(document.createTextNode("min"));
    recipeTimeZone.append(recipeTimeIcon, recipeTimeValue, recipeTimeText);
    recipeHeader.append(recipeTitle, recipeTimeZone);

    const recipeContentZone = document.createElement("div");
    recipeContentZone.classList.add("recipe-content");

    const recipeIngredient = document.createElement("ul");
    const recipeProcess = document.createElement("p");
    recipeContentZone.append(recipeIngredient, recipeProcess);

    recipeCard.append(recipeImgZone, recipeHeader, recipeContentZone);

    return recipeCard;
  }

  static getIngredientRecipeRowTemplate(){
    const ingredientRow = document.createElement("li");
    const ingredientName = document.createElement("span");
    ingredientName.classList.add("ingredient-name");
    const ingredientQuantity = document.createElement("span");
    ingredientQuantity.classList.add("ingredient-quantity");
    const ingredientUnit = document.createElement("span");
    ingredientUnit.classList.add("ingredient-unit");

    ingredientRow.append(ingredientName, ingredientQuantity, ingredientUnit);
    return ingredientRow;
  }


  static getSelectedFilterTemplate() {
    const filter = document.createElement("div");
    filter.classList.add("filter");

    const filterText = document.createElement("span");
    const filterCloseIcon = document.createElement("em");
    filterCloseIcon.classList.add("bi");
    filterCloseIcon.classList.add("bi-x-circle");

    filter.append(filterText, filterCloseIcon);

    return filter;
  }
}
