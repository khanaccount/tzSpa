import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getPosts } from "services/api";
import { Post } from "interface/index";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    return await getPosts();
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : "Ошибка сервера");
  }
});

export const updatePost = createAsyncThunk("posts/updatePost", async (updatedPost: Post) => {
  return updatedPost;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (postId: number) => {
  return postId;
});

export const addPost = createAsyncThunk("posts/addPost", async (newPost: Post) => {
  return newPost;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })

      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })

      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      });
  },
});

export default postsSlice.reducer;
