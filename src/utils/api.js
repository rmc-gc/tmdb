// Our authentication
const apiHost = 'https://api.themoviedb.org/3';
const apiKey = '6ed12e064b90ae1290fa326ce9e790ff';

/**
 * @description
 * Fetch the API config
 * @throws exception on error
 */
export const fetchAPIConfig = async () => {
  const configUrl = `${apiHost}/configuration?api_key=${apiKey}`;

  const response = await fetch(configUrl);
  if (response.status !== 200) {
      // eslint-disable-next-line no-throw-literal
      throw "Couldn't load API config";
  }

  return await response.json();
}

/**
 * @description
 * Fetch a list of the most popular films
 * @throws exception on error
 */
export const discoverPopularFilms = async () => {
  const filmsUrl = `${apiHost}/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

  const response = await fetch(filmsUrl);
  if (response.status !== 200) {
      // eslint-disable-next-line no-throw-literal
      throw "Couldn't load popular films";
  }

  return await response.json();
}

/**
 * @description
 * Helper function to encode the search text
 * @param {string} text 
 * @returns the encoded string to seach for
 */
const urlEncode = text => {
  return encodeURIComponent(text).replace(/!/g,  '%21')
                                 .replace(/'/g,  '%27')
                                 .replace(/\(/g, '%28')
                                 .replace(/\)/g, '%29')
                                 .replace(/\*/g, '%2A')
                                 .replace(/%20/g, '+');
}

/**
 * @description
 * Fetch a list of films based on search text
 * @throws exception on error
 */
export const searchForFilms = async (searchText) => {
  let encodedSearch = urlEncode(searchText);
  const filmsUrl = `${apiHost}/search/movie?api_key=${apiKey}&query=${encodedSearch}`;

  const response = await fetch(filmsUrl);
  if (response.status !== 200) {
      // eslint-disable-next-line no-throw-literal
      throw "Couldn't load popular films";
  }

  return await response.json();
}

/**
 * @descriptiod
 * Fetch a specific film by its id
 * @throws exception on error
 */
export const fetchFilm = async (id) => {
  const filmUrl = `${apiHost}/movie/${id}?api_key=${apiKey}`;

  const response = await fetch(filmUrl);
  if (response.status !== 200) {
      // eslint-disable-next-line no-throw-literal
      throw "Couldn't load film";
  }

  return await response.json();
}
