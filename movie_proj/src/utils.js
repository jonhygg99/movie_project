import { API_POPULAR, API_KEY } from "./constants";

export function getSearchUrl (searchText, page = 1) {
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
}