import { API_KEY } from "./constants";

export function getSearchUrl (searchText, page = 1) {
    return `https://api.themoviedb.org/3/search/movie?${API_KEY}&language=en-US&query=${searchText}&page=${page}`
}