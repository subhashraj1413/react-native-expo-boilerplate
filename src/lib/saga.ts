import type { PayloadAction } from "@reduxjs/toolkit";
import type { SagaIterator } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { analytics } from "./analytics/analytics";
import { sessionStorage } from "./storage/mmkv";
import { appApi } from "./api/client";
import { userApi } from "../features/user/api/user.api";
import { feedApi } from "../features/feed/api/feed.api";
import { authActions } from "../features/auth/store/auth.store";
import type { Session } from "../features/auth/types/auth.types";

function* handleSetSession(action: PayloadAction<Session>): SagaIterator {
  yield call([sessionStorage, "write"], action.payload);
  analytics.track("session_started", { email: action.payload.user.email });
  yield all([
    put(userApi.util.prefetch("getCurrentUser", undefined, { force: true })),
    put(feedApi.util.prefetch("getFeed", undefined, { force: true })),
  ]);
}

function* handleSignOut(): SagaIterator {
  yield call([sessionStorage, "clear"]);
  analytics.track("session_ended");
  yield put(appApi.util.resetApiState());
}

export function* rootSaga(): SagaIterator {
  yield all([
    takeLatest(authActions.setSession.type, handleSetSession),
    takeLatest(authActions.signOut.type, handleSignOut),
  ]);
}
