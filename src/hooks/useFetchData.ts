import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";

export const useFetchData = <T>(
  selector: (state: any) => { data: T[]; loading: boolean; error: string | null },
  fetchAction: () => any,
  clearAction?: () => any
) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(selector);

  useEffect(() => {
    if (clearAction) dispatch(clearAction());
    if (!data.length) {
      dispatch(fetchAction());
    }
  }, [dispatch, fetchAction, clearAction, data.length]);

  return { data, loading, error };
};
