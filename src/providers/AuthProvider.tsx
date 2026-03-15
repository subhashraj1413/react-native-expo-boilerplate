import { useEffect, type PropsWithChildren } from "react";
import { useAppDispatch } from "@/lib/store";
import { sessionStorage } from "@/lib/storage/mmkv";
import { authActions } from "@/features/auth/store/auth.store";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const session = sessionStorage.read();

    if (session) {
      dispatch(authActions.hydrateSession(session));
      return;
    }

    dispatch(authActions.finishHydration());
  }, [dispatch]);

  return children;
};
