export const authReducer = (state = {}, action) => {
    const {type, payload} = action
    switch (type) {
        case "setUser":
            return {...state, user: payload}
        default:
            return state
    }
}
