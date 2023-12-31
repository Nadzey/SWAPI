import { StarWarsCard } from "../../modules/StarWarsCard.js";
import { HeroesModal } from "../../modules/HeroesModal.js";
import { searchInStarWarsAPI } from '../../modules/Search.js';

let currentPage = 1;
const ITEMS_PER_PAGE = 12;
const BASE_URL = "https://www.swapi.tech/api";
let currentUrl = "https://www.swapi.tech/api/people?page=1&limit=100"; 
let currentCategory = "people"; 
let totalPages = 1;
let isSearchResultsDisplayed = false;
let searchResults = [];

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
    currentPage = 1; 
    isSearchResultsDisplayed = false;
    updatePageButtons();
    updatePageNumberDisplay();
  }

  navigationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveButton(button.id);
      let url;
      switch (button.id) {
        case "button__navigation__planets":
          url = `${BASE_URL}/planets?page=1&limit=${ITEMS_PER_PAGE}`;
          break;
        case "button__navigation__vehicles":
          url = `${BASE_URL}/vehicles?page=1&limit=${ITEMS_PER_PAGE}`;
          break;
        default:
          url = `${BASE_URL}/people?page=1&limit=${ITEMS_PER_PAGE}`;
          break;
      }
      loadData(url, button.id.replace("button__navigation__", ""));
    });
  });

  const defaultButton = document.getElementById(
    "button__navigation__people"
  );
  setActiveButton(defaultButton.id);
  loadData(`${BASE_URL}/people?page=1&limit=${ITEMS_PER_PAGE}`, "people");
  setupSearch();
}

function loadData(url, category) {
  if (isSearchResultsDisplayed) {
    return; 
  }
  if (currentUrl !== url || currentCategory !== category) {
    currentUrl = url;
    currentCategory = category;
  }

  fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => {
      const container = document.querySelector(".heroes__items");
      container.innerHTML = "";
      data.results.forEach((itemData) => {
        const itemCard = new StarWarsCard(itemData, category);
        container.appendChild(itemCard.generateCard());
      });
     
      toggleRefreshButton();
      totalPages = Math.ceil(data.total_records / ITEMS_PER_PAGE);
      checkPaginationVisibility();
      updatePageButtons();
    })
    .catch((error) => console.error("Error fetching data: ", error));
}

function checkPaginationVisibility() {
  let pagination = document.querySelector(".pagination");
  if (window.innerWidth <= 768 || isSearchResultsDisplayed) {
    pagination.style.display = "none";
  } else {
    pagination.style.display = "flex";
  }
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
  const container = document.querySelector(".heroes__items");
  container.innerHTML = "";

  if (isSearchResultsDisplayed) {
    searchResults.forEach(itemData => {
      const cardData = {
        uid: itemData.uid,
        ...itemData.properties,
      };
      const itemCard = new StarWarsCard(cardData, currentCategory);
      container.appendChild(itemCard.generateCard());
    });
  } else {
    fetch(`${BASE_URL}/${currentCategory}?page=1&limit=100`) 
      .then(response => response.json())
      .then(data => {
        data.results.forEach(itemData => {
          const itemCard = new StarWarsCard(itemData, currentCategory);
          container.appendChild(itemCard.generateCard());
        });
      })
      .catch(error => console.error("Error fetching all data: ", error));
  }

  const refreshButton = document.querySelector(".refresh_button-container");
  refreshButton.style.display = "none";
  checkPaginationVisibility();
}

document.addEventListener("DOMContentLoaded", () => {
  const refreshButton = document.querySelector(".refresh_button-container");
  if (refreshButton) {
    refreshButton.addEventListener("click", showAllGalleryItems);
   
  }
});

async function getClickedData(uid, category) {
    const url = `${BASE_URL}/${category}/${uid}`;
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

    currentUrl = `${BASE_URL}/${category}/?name=${searchTerm}`;
    currentCategory = category;
    currentPage = 1; 
    isSearchResultsDisplayed = true; 

    searchInStarWarsAPI(category, searchTerm)
      .then((data) => {
        if (data && data.result && data.result.length > 0) {
          const container = document.querySelector(".heroes__items");
          container.innerHTML = "";
          searchResults = data.result;
          
          data.result.forEach((itemData) => {
            const cardData = {
              uid: itemData.uid,
              ...itemData.properties,
            };
            const itemCard = new StarWarsCard(cardData, category);
            container.appendChild(itemCard.generateCard());
          });

          toggleRefreshButton();
          checkPaginationVisibility(); 
          updatePageButtons();
        } else {
          alert("No results found.");
        }
      })
      .catch((error) => {
        console.error("Search failed:", error.message);
      });
  });
}

function updatePageButtons() {
  document.querySelector('#prevPage').disabled = currentPage === 1;
  document.querySelector('#nextPage').disabled = currentPage === totalPages;
}

document.addEventListener("DOMContentLoaded", () => {
  const prevPageButton = document.querySelector('#prevPage');
  const nextPageButton = document.querySelector('#nextPage');

  if (prevPageButton) {
    prevPageButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        updateUrl();
        loadData(currentUrl, currentCategory);
        updatePageNumberDisplay();
      }
      isSearchResultsDisplayed = false;
    });
  }

  if (nextPageButton) {
    nextPageButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        updateUrl();
        loadData(currentUrl, currentCategory);
        updatePageNumberDisplay();
      }
      isSearchResultsDisplayed = false;
    });
  }
});


function updateUrl() {
  currentUrl = `${BASE_URL}/${currentCategory}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
}

function updatePageNumberDisplay() {
  const currentPageNumberElement = document.getElementById("currentPageNumber");
  currentPageNumberElement.textContent = currentPage;
}

window.addEventListener("resize", () => {
  toggleRefreshButton();
  checkPaginationVisibility();
});
