import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  comments: [], // Added comments array in the initial state
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.posts = [];
      state.comments = []; // Clear comments on logout
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) =>
        post._id === action.payload.post._id ? action.payload.post : post
      );
      state.posts = updatedPosts;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments = state.comments ? [...state.comments, action.payload] : [action.payload];
    },    
  },
});

export const {
  setLogin,
  setLogout,
  setPost,
  setPosts,
  deletePost,
  setComments,
  addComment, // Exported correctly
} = authSlice.actions;

export default authSlice.reducer;
