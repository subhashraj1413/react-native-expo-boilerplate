import { authActions, selectAuthState } from "@/features/auth/store/auth.store";
import { useAppDispatch, useAppSelector } from "@/lib/store";

export const useSession = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);

  return {
    ...auth,
    signOut: () => {
      dispatch(authActions.signOut());
    },
  };
};
