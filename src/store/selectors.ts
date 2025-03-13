import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "store/store";

// Селектор для постов
export const selectPosts = createSelector(
  (state: RootState) => state.posts,
  (posts) => ({
    data: posts.posts,
    loading: posts.loading,
    error: posts.error,
  })
);

// Селектор для комментариев
export const selectComments = createSelector(
  (state: RootState) => state.comments,
  (comments) => ({
    data: comments.comments,
    loading: comments.loading,
    error: comments.error,
  })
);
