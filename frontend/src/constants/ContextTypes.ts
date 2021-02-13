import ActionTypes from "./ActionTypes";
import {Meme} from "./Meme";
import {Dispatch} from "react";

// Action model
export type Action = {
    type: ActionTypes,
    payload: any,
}

// Context state model
export type MemeContextState = {
    memes: Meme[],
    newMemes: Meme[],
    currentMeme: Meme,
    modalState: boolean,
    loadingState: LoadingState,
    addMemeState: LoadingState,
    dispatch?: Dispatch<Action>,
}

// Request status
export enum LoadingState {
    LOADING,
    SUCCEED,
    FAILED
}