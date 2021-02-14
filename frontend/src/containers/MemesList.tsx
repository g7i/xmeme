import React, {useContext, useEffect} from 'react';
import '../styles/App.css';
import axios from "axios";
import MemeModal from "../components/MemeModal";
import AddDrawer from "../components/AddDrawer";
import {MemesContext} from "../contexts/MemeContext";
import {LoadingState, MemeContextState} from "../constants/ContextTypes";
import ActionTypes from "../constants/ActionTypes";
import MemeCard from "../components/MemeCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import {Alert, Button} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {Snackbar} from "@material-ui/core";

import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {APIEndpoint} from "../configs/Configs";
import {ResetScroll} from "../utils/HandleScroll";

function MUAlert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function MemesList(): JSX.Element {
    const {memes, loadingState, dispatch, newMemes} = useContext<MemeContextState>(MemesContext);

    useEffect(() => {
        axios.get(`${APIEndpoint}/memes`)
            .then(result => {
                dispatch({
                    type: ActionTypes.UPDATE_CONTEXT,
                    payload: {
                        memes: result.data,
                        loadingState: LoadingState.SUCCEED,
                    }
                });
            })
            .catch(err => {
                console.error(err);
                dispatch({
                    type: ActionTypes.SET_LOADING_STATE,
                    payload: LoadingState.FAILED,
                });
            });
        const events = new EventSource(`${APIEndpoint}/memes/subscribe`);
        events.onmessage = (event) => {
            const meme = JSON.parse(event.data);
            if (Object.keys(meme).length)
                dispatch({
                    type: ActionTypes.APPEND_NEW_MEME,
                    payload: meme,
                });
        };
    }, []);

    const handleMergeMemes = (): void => {
        dispatch({
            type: ActionTypes.MERGE_NEW_MEMES,
            payload: {}
        });
    }

    const getContent = (): JSX.Element => {
        switch (loadingState) {
            case LoadingState.LOADING:
                return (
                    <LoadingSkeleton/>
                );
            case LoadingState.FAILED:
                return <Alert message="An Error Occurred" type="error" showIcon/>;
            default:
                return (
                    <div className="memes__container">
                        <Snackbar
                            anchorOrigin={{vertical: "top", horizontal: "center"}}
                            open={newMemes.length > 0}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#2296F3",
                                paddingRight: "10px"
                            }}>
                                <MUAlert severity="info" style={{boxShadow: "none"}}>{newMemes.length} new
                                    Meme(s)!</MUAlert>
                                <Button color="secondary" size="small" onClick={handleMergeMemes}>
                                    Refresh
                                </Button>
                            </div>
                        </Snackbar>
                        {
                            memes.map(meme => (
                                <MemeCard key={meme.id} meme={meme}/>
                            ))
                        }
                        <MemeModal/>
                        <br/><br/><br/>
                    </div>
                );
        }
    }

    return (
        <div className="list_container">
            <div className="back_arrow">
                <Button onClick={ResetScroll} type={"link"} icon={<ArrowLeftOutlined/>}>Back</Button>
            </div>
            {getContent()}
            <AddDrawer/>
        </div>
    );
}

export default MemesList;
