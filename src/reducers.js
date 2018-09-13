import { SELECT_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS, INVALIDATE_SUBREDDIT } from "./actions";
import { combineReducers } from "redux";

function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}

function posts(state = { isFetching: false, didInvalidate: false, items: [] }, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return {...state, didInvalidate: true}
        case REQUEST_POSTS:
            return {...state, isFetching: true, didInvalidate: false}
        case RECEIVE_POSTS:
            return {...state, isFetching: false, didInvalidate: false, items: action.posts, lastUpdated: action.receivedAt}
        default:
            return state
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
        case INVALIDATE_SUBREDDIT:
            return {...state, [action.subreddit]: posts(state[action.subreddit], action)}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    selectedSubreddit,
    postsBySubreddit
})

export default rootReducer