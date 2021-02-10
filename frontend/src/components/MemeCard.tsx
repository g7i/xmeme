import {Meme} from "../constants/Meme";
import React, {useContext} from "react";
import ActionTypes from "../constants/ActionTypes";
import {MemeContextState} from "../constants/ContextTypes";
import {MemesContext} from "../contexts/MemeContext";
import {Button, message, Popconfirm, Popover} from "antd";
import {MoreOutlined} from "@ant-design/icons";
import axios from "axios";
import EditDrawer from "./EditDrawer";
import {APIEndpoint} from "../configs/Configs";

export default function MemeCard({meme}: { meme: Meme }): JSX.Element {
    const {dispatch} = useContext<MemeContextState>(MemesContext);

    const showInModal = (meme: Meme): void => {
        dispatch({
            type: ActionTypes.UPDATE_CONTEXT,
            payload: {
                currentMeme: meme,
                modalState: true,
            }
        });
    }

    const handleDelete = async (): Promise<void> => {
        try {
            await axios.delete(`${APIEndpoint}/memes/${meme.id}`);
            dispatch({
                type: ActionTypes.DELETE_MEME,
                payload: meme.id,
            });
            message.success('Meme deleted successfully!');
        } catch (e) {
            console.error(e);
            message.error('Unable to add meme!');
        }
    }

    const content: JSX.Element = (
        <div onClick={e => e.stopPropagation()} style={{display: "flex", justifyContent: "space-around"}}>
            <EditDrawer meme={meme}/>
            <Popconfirm
                title="Are you sure to delete this meme?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
                className={"confirm"}
            >
                <Button>Delete</Button>
            </Popconfirm>
        </div>
    );

    return (
        <div className="meme zoomable" key={meme.id}>
            <div className="img" onClick={() => showInModal(meme)}>
                <img src={meme.url} alt=""/>
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
            <div className="actions">
                <Popover content={content}>
                    <Button icon={<MoreOutlined/>}/>
                </Popover>
            </div>
        </div>
    );
}