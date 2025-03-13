import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCommentsByPostId } from "services/api";
import { Comment } from "interface";

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

// Экшен для получения комментариев
export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (postId: number) => {
    const response = await getCommentsByPostId(postId);
    return response;
  }
);

// Экшен для редактирования комментария
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async (updatedComment: Comment) => {
    return updatedComment;
  }
);

// Экшен для удаления комментария
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId: number) => {
    return commentId;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action: PayloadAction<Comment[]>) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        const index = state.comments.findIndex((comment) => comment.id === action.payload.id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
