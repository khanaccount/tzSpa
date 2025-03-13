import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { clearComments, fetchCommentsByPostId } from "store/slices/commentSlice";

export const useComments = (postId: number) => {
  const dispatch = useAppDispatch();
  const { comments, loading, error } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(clearComments());
    dispatch(fetchCommentsByPostId(postId));
  }, [dispatch, postId]);

  return { comments, loading, error };
};
