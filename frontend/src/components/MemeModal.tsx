import React, {useContext} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {MemeContextState} from "../constants/ContextTypes";
import {MemesContext} from "../contexts/MemeContext";
import ActionTypes from "../constants/ActionTypes";

// Material-UI styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

// Modal to enlarge meme
const MemeModal = (): JSX.Element => {
    const {currentMeme: meme, modalState, dispatch} = useContext<MemeContextState>(MemesContext);
    const classes: Record<"modal" | "paper", string> = useStyles();

    const handleClose = (): void => {
        dispatch({
            type: ActionTypes.SET_MODAL_STATE,
            payload: false,
        });
    };

    return (
        <Modal
            className={classes.modal}
            open={modalState}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={modalState}>
                {
                    meme && (
                        <div className="wrapper">
                            <div className="meme modal">
                                <div className="img">
                                    <img
                                        src={meme.url}
                                        alt=""/>
                                    <div className="caption">
                                        <span className="title">Caption</span>
                                        <div className="text">{meme.caption}</div>
                                    </div>
                                </div>
                                <div className="name">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-person-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                    </svg>
                                    <div className="text">{meme.name}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Fade>
        </Modal>
    );
};

export default MemeModal;