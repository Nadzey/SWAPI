import { StarWarsCard } from "../../modules/StarWarsCard.js";
import { HeroesModal } from "../../modules/HeroesModal.js";
import { searchInStarWarsAPI } from '../../modules/Search.js';

export function initNavigation() {
  const navigationButtons = document.querySelectorAll(
    ".buttons_navigation__button"
  );

  function setActiveButton(activeButtonId) {
    navigationButtons.forEach((button) => {
      if (button.id === activeButtonId) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  navigationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveButton(button.id);
      let url;
      switch (button.id) {
        case "button__navigation__planets":
          url = "https://www.swapi.tech/api/planets/";
          break;
        case "button__navigation__vehicles":
          url = "https://www.swapi.tech/api/vehicles/";
          break;
        default:
          url = "https://www.swapi.tech/api/people/";
          break;
      }
      loadData(url, button.id.replace("button__navigation__", ""));
    });
  });

  const defaultButton = document.getElementById(
    "button__navigation__people"
  );
  setActiveButton(defaultButton.id);
  loadData("https://www.swapi.tech/api/people/", "people");
  setupSearch();
}

function loadData(url, category) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".heroes__items");
      container.innerHTML = "";
      data.results.forEach((itemData) => {
        const itemCard = new StarWarsCard(itemData, category);
        container.appendChild(itemCard.generateCard());
      });
      toggleRefreshButton();
    })
    .catch((error) => console.error("Error fetching data: ", error));
}

function toggleRefreshButton() {
  const screenWidth = window.innerWidth;
  const heroesItems = document.querySelectorAll(".card");
  const refreshButtonContainer = document.querySelector(".refresh_button-container");

  heroesItems.forEach((item, index) => {
    if (screenWidth <= 768 && index >= 4) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });

  if (screenWidth <= 768 && heroesItems.length > 4) {
    refreshButtonContainer.style.display = "flex";
  } 
  else {
    refreshButtonContainer.style.display = "none";
  }

}

function showAllGalleryItems() {
  const refreshButton = document.querySelector(".refresh_button-container");
  const heroesItems = document.querySelectorAll(".card");
  heroesItems.forEach((item) => (item.style.display = "block"));
  refreshButton.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  const refreshButton = document.querySelector(".refresh_button-container");
  if (refreshButton) {
    refreshButton.addEventListener("click", showAllGalleryItems);
   
  }
  window.addEventListener("resize", toggleRefreshButton);
});

async function getClickedData(uid, category) {
    const url = `https://www.swapi.tech/api/${category}/${uid}`;
    console.log("Fetching data from URL:", url); 
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Received non-JSON response");
      }
  
      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  }
  

function renderHeroesModalWindow(item) {
  let modal = new HeroesModal("heroes-modal", item);
  modal.renderModalContent();
}

async function heroesItemClickHandler(e) {
  const heroesItemElement = e.target.closest(".card");
  if (heroesItemElement) {
    const clickedHeroestemId = heroesItemElement.getAttribute("data-id");
    const clickedHeroesItemCategory =
      heroesItemElement.getAttribute("data-category");
    const clickedHeroesData = await getClickedData(
      clickedHeroestemId,
      clickedHeroesItemCategory
    );
    renderHeroesModalWindow(clickedHeroesData);
  }
}

export function addHeroesModalClickHeandler() {
  const heroesItemsContainer = document.querySelector(".heroes__items");

  heroesItemsContainer.removeEventListener("click", heroesItemClickHandler);

  heroesItemsContainer.addEventListener("click", heroesItemClickHandler);
}

function setupSearch() {
  const searchButton = document.querySelector(".search");
  const searchInput = document.querySelector(".search-input");
  const searchCategorySelect = document.querySelector("#searchCategory");

  searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    const category = searchCategorySelect.value;

    if (!searchTerm) {
      alert("Please enter a search term.");
      return;
    }

    searchInStarWarsAPI(category, searchTerm)
      .then((data) => {
        if (data && data.result && data.result.length > 0) {
          const container = document.querySelector(".heroes__items");
          container.innerHTML = "";

          data.result.forEach((itemData) => {
            const cardData = {
              uid: itemData.uid,
              ...itemData.properties,
            };
            const itemCard = new StarWarsCard(cardData, category);
            container.appendChild(itemCard.generateCard());
          });
          toggleRefreshButton();
        } else {
          alert("No results found.");
        }
      })
      .catch((error) => {
        console.error("Search failed:", error.message);
      });
  });
}
