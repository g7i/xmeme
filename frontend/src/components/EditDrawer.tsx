import {Alert, Button, Col, Drawer, Form, FormInstance, Input, message, Row, Spin} from "antd";
import React, {useContext, useRef, useState} from "react";
import axios from "axios";
import {LoadingState, MemeContextState} from "../constants/ContextTypes";
import {MemesContext} from "../contexts/MemeContext";
import ActionTypes from "../constants/ActionTypes";
import {Meme} from "../constants/Meme";
import {APIEndpoint} from "../configs/Configs";
import {EditOutlined} from "@ant-design/icons";

// Drawer for editing meme
export default function EditDrawer({meme}: { meme: Meme }): JSX.Element {

    const {dispatch} = useContext<MemeContextState>(MemesContext);
    const formRef = useRef<FormInstance>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [requestStatus, setRequestStatus] = useState<LoadingState>(LoadingState.SUCCEED);

    const handleUpdate = async (values: any): Promise<void> => {
        setRequestStatus(LoadingState.LOADING);
        const data = {
            caption: values.caption,
            url: values.url,
        }
        values.id = meme.id;
        try {
            await axios.patch(`${APIEndpoint}/memes/${meme.id}`, data);
            dispatch({
                type: ActionTypes.UPDATE_MEME,
                payload: values,
            });
            setRequestStatus(LoadingState.SUCCEED);
            setIsDrawerOpen(false);
            message.success('Meme updated successfully!');
        } catch (err) {
            console.error(err);
            setRequestStatus(LoadingState.FAILED);
        }
    }

    return (
        <React.Fragment>
            <a onClick={() => setIsDrawerOpen(true)}>
                <EditOutlined /> Edit
            </a>
            <Drawer
                title="Update a meme"
                width={window.innerWidth < 768 ? 300 : 540}
                onClose={() => setIsDrawerOpen(false)}
                visible={isDrawerOpen}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={() => setIsDrawerOpen(false)} style={{marginRight: 8}}>
                            Cancel
                        </Button>
                        <Button onClick={() => formRef.current.submit()} type="primary"
                                disabled={requestStatus === LoadingState.LOADING}>
                            Update
                        </Button>
                    </div>
                }
            >
                <Spin size={"large"} spinning={requestStatus === LoadingState.LOADING}>
                    <Form initialValues={meme} onFinish={handleUpdate} layout="vertical" hideRequiredMark ref={formRef}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{message: 'Please enter name'}]}
                                >
                                    <Input disabled={true}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="caption"
                                    label="Caption"
                                    rules={[{required: true, message: 'Please enter caption'}]}
                                >
                                    <Input placeholder="Please enter caption"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="url"
                                    label="URL"
                                    rules={[{required: true, message: 'Please enter url', type: "url"}]}
                                >
                                    <Input placeholder="Please enter URL"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        {
                            requestStatus === LoadingState.FAILED && (
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Alert
                                            message="Failed to update meme"
                                            description="You might be trying to update a duplicate meme."
                                            type="error"
                                            showIcon
                                        />
                                    </Col>
                                </Row>
                            )
                        }
                    </Form>
                </Spin>
            </Drawer>
        </React.Fragment>
    );
}