class Index {
  constructor(recipeList) {
    this.recipeList = recipeList;
    this.recipeListToDisplay = this.recipeList;
    this.selectedIngredient = [];
    this.selectedAppliance = [];
    this.selectedUstensil = [];

    this.gatherFilterData();

    this.initDOM();
    this.initEvent();

    this.fillDOM();
  }

  initDOM() {
    this.selectedFilterList = document.querySelector(".selected-filters");

    this.searchField = document.querySelector(".search-field input");

    this.dropdownIngredient = document.querySelector(".dropdown.ingredient");
    this.dropdownIngredientSearch = this.dropdownIngredient.querySelector(
      ".dropdown-search input"
    );
    this.dropdownAppliance = document.querySelector(".dropdown.appliance");
    this.dropdownApplianceSearch = this.dropdownAppliance.querySelector(
      ".dropdown-search input"
    );
    this.dropdownUstensil = document.querySelector(".dropdown.ustensil");
    this.dropdownUstensilSearch = this.dropdownUstensil.querySelector(
      ".dropdown-search input"
    );

    this.recipeSection = document.querySelector(".recipe-list-section");
  }

  initEvent() {
    [
      this.dropdownIngredient,
      this.dropdownAppliance,
      this.dropdownUstensil,
    ].forEach((dropdown) => {
      dropdown.querySelector("button").addEventListener("click", () => {
        this.toggleDropdown(dropdown);
      });

      dropdown
        .querySelector(".dropdown-search em")
        .addEventListener("click", () => {
          this.toggleDropdown(dropdown);
        });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        this.closeAllDropdown();
      }
    });

    this.searchField.addEventListener("input", () => {
      this.searchRecipe();
    });

    this.dropdownIngredientSearch.addEventListener("input", () => {
      this.searchIngredient();
    });
    this.dropdownApplianceSearch.addEventListener("input", () => {
      this.searchAppliance();
    });
    this.dropdownUstensilSearch.addEventListener("input", () => {
      this.searchUstensil();
    });
  }

  searchRecipe() {
    if (this.searchField.value.length < 3) {
      this.recipeListToDisplay = this.recipeList;
    } else {
      //do job with searchField
    }

    this.gatherFilterData();
    this.fillRecipeList();
  }

  searchFiltersInList(listFilter, searchValue) {
    let resultList = [];
    if(searchValue.length < 1) {
      return listFilter;
    }

    //do job with listFilter

    return resultList;
  }

  searchIngredient() {
    let searchValue = this.dropdownIngredientSearch.value;
    let resultList = this.searchFiltersInList(
      this.usedIngredientList,
      searchValue
    );
    this.fillDropdownIngredient(resultList);
  }

  searchAppliance() {
    let searchValue = this.dropdownApplianceSearch.value;
    let resultList = this.searchFiltersInList(
      this.usedApplianceList,
      searchValue
    );
    this.fillDropdownAppliance(resultList);
  }

  searchUstensil() {
    let searchValue = this.dropdownUstensilSearch.value;
    let resultList = this.searchFiltersInList(
      this.usedUstensilList,
      searchValue
    );
    this.fillDropdownUstensil(resultList);
  }

  fillDOM() {
    this.fillDropdownIngredient();
    this.fillDropdownAppliance();
    this.fillDropdownUstensil();

    this.fillRecipeList();
  }

  gatherFilterData() {
    let ingredientList = [];
    ingredientList = this.recipeListToDisplay
      .map((recipe) => {
        return recipe.ingredients
          .map((ingredient) => {
            return ingredient.ingredient;
          })
          .flat();
      })
      .flat();
    this.usedIngredientList = [];
    this.usedIngredientList = [...new Set(ingredientList)];

    let applianceList = [];
    applianceList = this.recipeListToDisplay
      .map((recipe) => {
        return recipe.appliance;
      })
      .flat();
    this.usedApplianceList = [];
    this.usedApplianceList = [...new Set(applianceList)];

    let ustensilList = [];
    ustensilList = this.recipeListToDisplay
      .map((recipe) => {
        return recipe.ustensils
          .map((ustensil) => {
            return ustensil;
          })
          .flat();
      })
      .flat();
    this.usedUstensilList = [];
    this.usedUstensilList = [...new Set(ustensilList)];
  }

  fillDropdownIngredient(list = null) {
    let listIngredient;
    if (list === null) {
      listIngredient = this.usedIngredientList;
    } else {
      listIngredient = list;
    }

    this.dropdownIngredient.querySelector(".dropdown-menu").innerHTML = "";

    listIngredient.forEach((ingredient) => {
      if (!this.selectedIngredient.includes(ingredient)) {
        const ingredientRow = document.createElement("li");
        ingredientRow.innerText = ingredient;
        ingredientRow.addEventListener("click", () => {
          this.toggleFilter(ingredient, "ingredient");
        });
        this.dropdownIngredient
          .querySelector(".dropdown-menu")
          .appendChild(ingredientRow);
      }
    });
  }

  fillDropdownAppliance(list = null) {
    let listAppliance;
    if (list === null) {
      listAppliance = this.usedApplianceList;
    } else {
      listAppliance = list;
    }

    this.dropdownAppliance.querySelector(".dropdown-menu").innerHTML = "";

    listAppliance.forEach((appliance) => {
      if (!this.selectedAppliance.includes(appliance)) {
        const applianceRow = document.createElement("li");
        applianceRow.innerText = appliance;
        applianceRow.addEventListener("click", () => {
          this.toggleFilter(appliance, "appliance");
        });
        this.dropdownAppliance
          .querySelector(".dropdown-menu")
          .appendChild(applianceRow);
      }
    });
  }

  fillDropdownUstensil(list = null) {
    let listUstensil;
    if (list === null) {
      listUstensil = this.usedUstensilList;
    } else {
      listUstensil = list;
    }

    this.dropdownUstensil.querySelector(".dropdown-menu").innerHTML = "";

    listUstensil.forEach((ustensil) => {
      if (!this.selectedUstensil.includes(ustensil)) {
        const ustensilRow = document.createElement("li");
        ustensilRow.innerText = ustensil;
        ustensilRow.addEventListener("click", () => {
          this.toggleFilter(ustensil, "ustensil");
        });
        this.dropdownUstensil
          .querySelector(".dropdown-menu")
          .appendChild(ustensilRow);
      }
    });
  }

  fillSelectedFilterList() {
    this.selectedFilterList.innerHTML = "";
    this.selectedIngredient.forEach((ingredient) => {
      const filter = TemplateFactory.getSelectedFilterTemplate();
      filter.querySelector("span").innerText = ingredient;
      filter.classList.add("ingredient");
      filter.querySelector("em").addEventListener("click", () => {
        this.toggleFilter(ingredient, "ingredient");
      });
      this.selectedFilterList.appendChild(filter);
    });

    this.selectedAppliance.forEach((appliance) => {
      const filter = TemplateFactory.getSelectedFilterTemplate();
      filter.querySelector("span").innerText = appliance;
      filter.classList.add("appliance");
      filter.querySelector("em").addEventListener("click", () => {
        this.toggleFilter(appliance, "appliance");
      });
      this.selectedFilterList.appendChild(filter);
    });

    this.selectedUstensil.forEach((ustensil) => {
      const filter = TemplateFactory.getSelectedFilterTemplate();
      filter.querySelector("span").innerText = ustensil;
      filter.classList.add("ustensil");
      filter.querySelector("em").addEventListener("click", () => {
        this.toggleFilter(ustensil, "ustensil");
      });
      this.selectedFilterList.appendChild(filter);
    });
  }

  fillRecipeList() {    
    this.recipeSection.innerHTML = "";
    this.recipeListToDisplay.forEach((recipe) => {
      const recipeFactory = new RecipeFactory(recipe);
      this.recipeSection.appendChild(recipeFactory.getRecipeCard());
    });
  }

  toggleDropdown(dropdown) {
    if (dropdown.classList.contains("active")) {
      dropdown.classList.remove("active");
    } else {
      this.closeAllDropdown();
      dropdown.classList.add("active");
    }
  }

  toggleFilter(filterName, filterType) {
    switch (filterType) {
      case "ingredient":
        if (!this.selectedIngredient.includes(filterName)) {
          this.selectedIngredient.push(filterName);
        } else {
          this.selectedIngredient.splice(
            this.selectedIngredient.indexOf(filterName),
            1
          );
        }
        this.fillDropdownIngredient();
        break;
      case "appliance":
        if (!this.selectedAppliance.includes(filterName)) {
          this.selectedAppliance.push(filterName);
        } else {
          this.selectedAppliance.splice(
            this.selectedAppliance.indexOf(filterName),
            1
          );
        }
        this.fillDropdownAppliance();
        break;
      case "ustensil":
        if (!this.selectedUstensil.includes(filterName)) {
          this.selectedUstensil.push(filterName);
        } else {
          this.selectedUstensil.splice(
            this.selectedUstensil.indexOf(filterName),
            1
          );
        }
        this.fillDropdownUstensil();
        break;
    }
    this.fillSelectedFilterList();
  }

  closeAllDropdown() {
    [
      this.dropdownIngredient,
      this.dropdownAppliance,
      this.dropdownUstensil,
    ].forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
}

self.index = new Index(recipes);
