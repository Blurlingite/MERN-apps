// Section 11 Lecture 60 - Post Reducer, Action & Initial
import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case UPDATE_LIKES:
      return {
        ...state,

        // for each post: If the post's ID is equal to the payload's ID (b/c we sent the post's ID through the payload) that means this is the correct post that we are adding/removing a like to. If we have the correct post, return the post's state (containing that post's data) which is "...post"
        // Also, we are setting the "likes" field of the post object to the amount of likes on the payload (payload.likes). When you like or unlike a post, that change will be in the payload.
        // Else (:), return the post as it is (if it's not the one we are looking for), "post"
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };

    default:
      return state;
  }
}