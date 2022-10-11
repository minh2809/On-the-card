import { useCallback } from "react";
import { useTypedDispatch } from "@/store/store";
import { startLoading, completeLoading } from "@/store/reducers/loadingReducer";

const useLoading = () => {
  const dispatch = useTypedDispatch();

  const startLoadingCallback = useCallback(() => {
    dispatch(startLoading());
  }, [dispatch]);

  const completeLoadingCallback = useCallback(() => {
    dispatch(completeLoading());
  }, [dispatch]);

  return {
    startLoading: startLoadingCallback,
    endLoading: completeLoadingCallback,
  };
};

export default useLoading;
