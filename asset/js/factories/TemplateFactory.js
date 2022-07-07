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
    recipeTimeIcon.classList.add("bi bi-clock");
    const recipeTimeValue = document.createElement("span");
    recipeTimeValue.classList.add("recipe-time-value");
    const recipeTimeText = document.createElement("span");
    recipeTimeText.appendChild(document.createTextNode("min"));
    recipeTimeZone.append(recipeTimeIcon, recipeTimeValue, recipeTimeText);
    recipeHeader.append(recipeTitle, recipeTimeZone);

    const recipeContentZone = document.createElement("div");
    recipeContent.classList.add("recipe-content");

    const recipeIngredient = document.createElement("ul");
    const recipeProcess = document.createElement("p");
    recipeContentZone.append(recipeIngredient, recipeProcess);

    recipeCard.append(recipeImgZone, recipeHeader, recipeContentZone);

    return recipeCard;
  }

  static getSelectedFilterTemplate() {
    const filter = document.createElement("div");
    filter.className.add("filter");

    const filterText = document.createElement("span");
    const filterCloseIcon = document.createElement("em");
    filterCloseIcon.classList.add("bi bi-x-circle");

    filter.append(filterText, filterCloseIcon);

    return filter;
  }
}
