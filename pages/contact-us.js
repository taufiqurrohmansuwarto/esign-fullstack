import React from 'react';
import { Form, Input, Button, Typography, Row, Col, Space, Icon } from 'antd';

const { Title } = Typography;

const ContactUsPage = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Success:', values);
    };

    return (
        <>
            <Row justify="center">
                <Col xs={22} sm={18} md={12}>
                    <Title level={2} style={{ textAlign: 'center' }}>
                        Contact Us
                    </Title>
                    <Form form={form} onFinish={onFinish} style={{ marginTop: 40 }}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="message"
                            label="Message"
                            rules={[{ required: true, message: 'Please input your message!' }]}
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item style={{ textAlign: 'center' }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: 40 }}>
                <Space>
                    <Icon type="facebook" style={{ fontSize: 32 }} />
                    <Icon type="twitter" style={{ fontSize: 32 }} />
                    <Icon type="instagram" style={{ fontSize: 32 }} />
                </Space>
            </Row>
        </>
    );
};

export default ContactUsPage;