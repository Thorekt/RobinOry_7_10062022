class Index {
  constructor() {
    this.initDOM();
    this.initEvent();
  }

  initDOM() {
    this.dropdownIngredient = document.querySelector(".dropdown.ingredient");
    this.dropdownAppliance = document.querySelector(".dropdown.appliance");
    this.dropdownUstensil = document.querySelector(".dropdown.ustensil");
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

  toggleDropdown(dropdown) {
    if (dropdown.classList.contains("active")) {
      dropdown.classList.remove("active");
    } else {
      this.closeAllDropdown();
      dropdown.classList.add("active");
    }
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

self.index = new Index();
