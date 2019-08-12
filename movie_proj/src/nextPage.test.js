import { decrementPage, incrementPage } from './Home'

let result

test("decrement()", () => {
    expect(decrementPage(3)).toBe(2)
})