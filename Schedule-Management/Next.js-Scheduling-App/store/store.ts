/* eslint-disable import/no-cycle */
import { AnyAction, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk"
import combinedReducer from "./reducers/index"

const middlewares = [thunk]

export const store = configureStore({
	reducer: combinedReducer,
	middleware: middlewares
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
export const useTypedDispatch = () => useDispatch<TypedDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
