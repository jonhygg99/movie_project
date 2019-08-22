import { SELECTION, POPULAR, NOW_PLAYING, TOP_RATED, UPCOMING } from './actions'

const selectionReducer = (state = POPULAR, action) => {
    switch (action.payload) {
        case POPULAR:
            return POPULAR
        case NOW_PLAYING:
            return NOW_PLAYING
        case TOP_RATED:
            return TOP_RATED
        case UPCOMING:
            return UPCOMING
        default:
            return state
    }
}

export default selectionReducer