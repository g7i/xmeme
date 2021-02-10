import ActionTypes from "./ActionTypes";
import {Meme} from "./Meme";
import {Dispatch} from "react";

export type Action = {
    type: ActionTypes,
    payload: any,
}

export type MemeContextState = {
    memes: Meme[],
    newMemes: Meme[],
    currentMeme: Meme,
    modalState: boolean,
    loadingState: LoadingState,
    addMemeState: LoadingState,
    dispatch?: Dispatch<Action>,
}

export enum LoadingState {
    LOADING,
    SUCCEED,
    FAILED
}