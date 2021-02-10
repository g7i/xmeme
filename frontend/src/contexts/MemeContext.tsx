import React, {Context, createContext, useReducer} from "react";
import {Action, LoadingState, MemeContextState} from "../constants/ContextTypes";
import ActionTypes from "../constants/ActionTypes";
import {Meme} from "../constants/Meme";

const initialState: MemeContextState = {
    memes: [],
    currentMeme: null,
    modalState: false,
    loadingState: LoadingState.LOADING,
    addMemeState: LoadingState.SUCCEED,
    newMemes: [],
}


const initialContext: MemeContextState = {
    ...initialState,
    dispatch: (): void => {
        throw new Error('setDispatch function must be overridden');
    }
}

export const MemesContext: Context<MemeContextState> = createContext<MemeContextState>(initialContext);

const memesReducer = (state: MemeContextState, action: Action): MemeContextState => {
    let memes: Meme[] = [];
    switch (action.type) {
        case ActionTypes.SET_MEMES:
            return {
                ...state,
                memes: action.payload,
            };
        case ActionTypes.APPEND_MEME:
            memes = [...state.memes];
            if (!memes.some(meme => meme.id === action.payload.id)) {
                memes = [action.payload, ...state.memes];
            }
            return {
                ...state,
                memes,
                newMemes: state.newMemes.filter(meme => meme.id !== action.payload.id)
            };
        case ActionTypes.APPEND_NEW_MEME:
            memes = [...state.memes, ...state.newMemes];
            let newMemes: Meme[] = [...state.newMemes];
            if (!memes.some(meme => meme.id === action.payload.id)) {
                newMemes = [action.payload, ...newMemes];
            }
            return {
                ...state,
                newMemes,
            };
        case ActionTypes.MERGE_NEW_MEMES:
            memes = [...state.newMemes, ...state.memes];
            return {
                ...state,
                memes,
                newMemes: [],
            };
        case ActionTypes.DELETE_MEME:
            return {
                ...state,
                memes: state.memes.filter(meme => meme.id !== action.payload),
            };
        case ActionTypes.UPDATE_MEME:
            console.log(action.payload)
            return {
                ...state,
                memes: state.memes.map(meme => {
                    if (meme.id === action.payload.id) {
                        meme.url = action.payload.url;
                        meme.caption = action.payload.caption;
                    }
                    return meme;
                }),
            };
        case ActionTypes.SET_MODAL_STATE:
            return {
                ...state,
                modalState: action.payload,
            };
        case ActionTypes.SET_LOADING_STATE:
            return {
                ...state,
                loadingState: action.payload,
            };
        case ActionTypes.SET_ADD_MEME_STATE:
            return {
                ...state,
                addMemeState: action.payload,
            };
        case ActionTypes.UPDATE_CONTEXT:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}


export const MemesProvider = ({children}: any): JSX.Element => {
    const [video, dispatch] = useReducer(memesReducer, initialState);

    return (
        <MemesContext.Provider value={{...video, dispatch}}>
            {children}
        </MemesContext.Provider>
    )
}
