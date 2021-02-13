import {Col, Row, Skeleton} from "antd";
import React from "react";

// Skeleton loading screen
export default function LoadingSkeleton(): JSX.Element {
    return (
        <div style={{padding: "100px"}}>
            <Row gutter={16}>
                <Col xs={24} lg={12}>
                    <Skeleton.Image/>
                    <Skeleton active={true}/>
                </Col>
                <Col xs={24} lg={12}>
                    <Skeleton.Image/>
                    <Skeleton active={true}/>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={24} lg={12}>
                    <Skeleton.Image/>
                    <Skeleton active={true}/>
                </Col>
                <Col xs={24} lg={12}>
                    <Skeleton.Image/>
                    <Skeleton active={true}/>
                </Col>
            </Row>
        </div>
    );
}