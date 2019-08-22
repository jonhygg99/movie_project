import { NEXT_PAGE, PREVIOUS_PAGE, INITIAL_PAGE } from './actions'

export default (page = 1, action) => {
    switch (action.type) {
        case NEXT_PAGE:
            const nextPage = page + 1
            return nextPage <= action.payload ? nextPage : page
        case PREVIOUS_PAGE:
            const newPage = page - 1
            return newPage < 1 ? 1 : newPage
        case INITIAL_PAGE:
            return 1
        default:
            return page
    }
}