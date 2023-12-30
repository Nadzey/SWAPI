export async function searchInStarWarsAPI(category, searchTerm) {

  const validCategories = ['people', 'planets', 'vehicles'];
  if (!validCategories.includes(category)) {
      throw new Error(`Invalid category. Please choose from ${validCategories.join(", ")}.`);
  }

  const url = `https://www.swapi.tech/api/${category}/?name=${searchTerm}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error during the API request:', error.message);
      return null;
  }
}
