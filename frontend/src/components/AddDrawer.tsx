import {Alert, Button, Col, Drawer, Form, FormInstance, Image, Input, message, Row, Spin} from "antd";
import React, {useContext, useRef, useState} from "react";
import axios from "axios";
import {PlusCircleFilled} from "@ant-design/icons";
import {LoadingState, MemeContextState} from "../constants/ContextTypes";
import {MemesContext} from "../contexts/MemeContext";
import ActionTypes from "../constants/ActionTypes";
import RandomString from "../utils/RandomString";
import {APIEndpoint} from "../configs/Configs";

// Drawer for adding meme
export default function AddDrawer(): JSX.Element {

    const {dispatch, addMemeState} = useContext<MemeContextState>(MemesContext);
    const formRef = useRef<FormInstance>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [currentSrc, setCurrentSrc] = useState<string>('');

    const handleSubmit = async (values: any): Promise<void> => {
        dispatch({
            type: ActionTypes.SET_ADD_MEME_STATE,
            payload: LoadingState.LOADING,
        });
        try {
            const result = await axios.post(`${APIEndpoint}/memes`, values);
            dispatch({
                type: ActionTypes.APPEND_MEME,
                payload: {
                    ...result.data,
                    ...values,
                },
            });
            dispatch({
                type: ActionTypes.SET_ADD_MEME_STATE,
                payload: LoadingState.SUCCEED,
            });
            formRef.current.resetFields();
            setIsDrawerOpen(false);
            setCurrentSrc('');
            message.success('Meme added successfully!');
        } catch (err) {
            console.error(err);
            dispatch({
                type: ActionTypes.SET_ADD_MEME_STATE,
                payload: LoadingState.FAILED,
            });
        }
    }

    const handleRandomMeme = (): void => {
        const url: string = `https://urlme.me/${RandomString(5)}/CWoD/A%20Random%20Meme.jpg`;
        const caption: string = `${RandomString(5)} ${RandomString(7)}`
        formRef.current.setFieldsValue({name: "Random Meme", url, caption});
        setCurrentSrc(url);
    }

    return (
        <React.Fragment>
            <div className="fab">
                <Button onClick={() => setIsDrawerOpen(true)} type="primary" shape="circle"
                        icon={<PlusCircleFilled style={{fontSize: "45px", marginTop: "6px"}}/>}
                        style={{height: "70px", width: "70px"}} size={'large'}/>
            </div>
            <Drawer
                title="Create a new meme"
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
                        <Button onClick={formRef.current?.submit} type="primary"
                                disabled={addMemeState === LoadingState.LOADING}>
                            Submit
                        </Button>
                    </div>
                }
            >
                <Spin size={"large"} spinning={addMemeState === LoadingState.LOADING}>
                    <Form onFinish={handleSubmit} layout="vertical" hideRequiredMark ref={formRef}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{required: true, message: 'Please enter name'}]}
                                >
                                    <Input placeholder="Please enter name"/>
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
                                    <Input onChange={e => setCurrentSrc(e.target.value)}
                                           placeholder="Please enter URL"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Button size={"small"} onClick={handleRandomMeme}>Get Random Values</Button>
                        </Row>
                        <Row gutter={16}>
                            <Image src={currentSrc}/>
                        </Row>
                        {
                            addMemeState === LoadingState.FAILED && (
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Alert
                                            message="Failed to add meme"
                                            description="You might be trying to add a duplicate meme."
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