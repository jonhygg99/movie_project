export const NEXT_PAGE = 'NEXT_PAGE'
export const PREVIOUS_PAGE = 'PREVIOUS_PAGE'
export const INITIAL_PAGE = 'INITIAL_PAGE'
export const SELECTION = 'SELECTION'
export const POPULAR = 'popular'
export const NOW_PLAYING = 'now_playing'
export const TOP_RATED = 'top_rated'
export const UPCOMING = 'upcoming'

export const next_page = (max_page) => {
	return {
		type: NEXT_PAGE,
		payload: max_page
	}
}

export const previous_page = () => {
	return { type: PREVIOUS_PAGE }
}

export const initial_page = () => {
	return { type: INITIAL_PAGE }
}

export const select_category = (category) => {
	return {
		type: SELECTION,
		payload: category
	}
}
