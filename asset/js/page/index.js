class Index {
  constructor(recipeList) {
    this.recipeList = recipeList;
    this.usedRecipeList = this.recipeList;
    this.selectedIngredient = [];
    this.selectedAppliance = [];
    this.selectedUstensil = [];

    this.gatherUsefullData();

    this.initDOM();
    this.initEvent();

    this.fillDOM();
  }

  initDOM() {
    this.selectedFilterList = document.querySelector(".selected-filters");

    this.dropdownIngredient = document.querySelector(".dropdown.ingredient");
    this.dropdownAppliance = document.querySelector(".dropdown.appliance");
    this.dropdownUstensil = document.querySelector(".dropdown.ustensil");

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
        .querySelector(".guess-filter em")
        .addEventListener("click", () => {
          this.toggleDropdown(dropdown);
        });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        this.closeAllDropdown();
      }
    });
  }

  fillDOM() {
    this.fillDropdownIngredient();
    this.fillDropdownAppliance();
    this.fillDropdownUstensil();

    this.fillRecipeList();
  }

  gatherUsefullData() {
    let ingredientList = [];
    ingredientList = this.recipeList
      .map((recipe) => {
        return recipe.ingredients
          .map((ingredient) => {
            return ingredient.ingredient;
          })
          .flat();
      })
      .flat();
    this.ingredientListUnique = [...new Set(ingredientList)];

    let applianceList = [];
    applianceList = this.recipeList
      .map((recipe) => {
        return recipe.appliance;
      })
      .flat();
    this.applianceListUnique = [...new Set(applianceList)];

    let ustencilList = [];
    ustencilList = this.recipeList
      .map((recipe) => {
        return recipe.ustensils
          .map((ustensil) => {
            return ustensil;
          })
          .flat();
      })
      .flat();
    this.ustencilListUnique = [...new Set(ustencilList)];

    this.usedIngredientList = this.ingredientListUnique;
    this.usedApplianceList = this.applianceListUnique;
    this.usedUstencilList = this.ustencilListUnique;
  }

  fillDropdownIngredient() {
    this.dropdownIngredient.querySelector(".dropdown-menu").innerHTML = "";

    this.usedIngredientList.forEach((ingredient) => {
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

  fillDropdownAppliance() {
    this.dropdownAppliance.querySelector(".dropdown-menu").innerHTML = "";

    this.usedApplianceList.forEach((appliance) => {
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

  fillDropdownUstensil() {
    this.dropdownUstensil.querySelector(".dropdown-menu").innerHTML = "";

    this.usedUstencilList.forEach((ustencil) => {
      if (!this.selectedUstensil.includes(ustencil)) {
        const ustencilRow = document.createElement("li");
        ustencilRow.innerText = ustencil;
        ustencilRow.addEventListener("click", () => {
          this.toggleFilter(ustencil, "ustensil");
        });
        this.dropdownUstensil
          .querySelector(".dropdown-menu")
          .appendChild(ustencilRow);
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

    this.selectedUstensil.forEach((ustencil) => {
      const filter = TemplateFactory.getSelectedFilterTemplate();
      filter.querySelector("span").innerText = ustencil;
      filter.classList.add("ustensil");
      filter.querySelector("em").addEventListener("click", () => {
        this.toggleFilter(ustencil, "ustensil");
      });
      this.selectedFilterList.appendChild(filter);
    });
  }

  fillRecipeList() {
    this.usedRecipeList.forEach((recipe) => {
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
