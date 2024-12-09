import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Form, Input, Button, Typography, Layout, Row, Col, Card } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content, Footer } = Layout;
const { TextArea } = Input;

function ContactUs() {
    const onFinish = (values) => {
        console.log('Received values:', values);
    };

    return (
        <Layout>
            <Navbar />
            <Content className="contact" style={{ padding: '50px 50px' }}>            
                <Title level={1} style={{ textAlign: 'center', marginBottom: '40px' }}>Contact Us</Title>

                <Row gutter={[32, 32]} justify="space-between">
                    <Col xs={24} lg={14}>
                        <Card title={<Title level={2}>Get in Touch</Title>}>
                            <Form
                                name="contact"
                                onFinish={onFinish}
                                layout="vertical"
                            >
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
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Please enter a valid email!' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="subject"
                                    label="Subject"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="message"
                                    label="Message"
                                    rules={[{ required: true, message: 'Please input your message!' }]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" size="large">
                                        Send Message
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>

                    <Col xs={24} lg={10}>
                        <Card title={<Title level={2}>Contact Information</Title>}>
                            <p><PhoneOutlined /> <strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a></p>
                            <p><MailOutlined /> <strong>Email:</strong> <a href="mailto:info@tockentix.com">info@tockentix.com</a></p>
                            <p><EnvironmentOutlined /> <strong>Address:</strong> Nairobi, Kenya</p>
                        </Card>
                    </Col>
                </Row>

                <Footer style={{ marginTop: '40px' }}>
                    <Row gutter={[32, 32]}>
                        <Col span={8}>
                            <Title level={3}>Events</Title>
                            <ul>
                                <li>Upcoming Events</li>
                                <li>Resell Tickets</li>
                                <li>My Tickets</li>
                            </ul>
                        </Col>
                        <Col span={8}>
                            <Title level={3}>Company</Title>
                            <ul>
                                <li><Link to="/about">About Us</Link></li>
                                <li>Careers</li>
                                <li>Blog</li>
                            </ul>
                        </Col>
                        <Col span={8}>
                            <Title level={3}>Support</Title>
                            <ul>
                                <li>Help Center</li>
                                <li><Link to="/contactUs">Contact Us</Link></li>
                                <li>FAQs</li>
                            </ul>
                        </Col>
                    </Row>
                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <p>© 2024 TicketGO. All rights reserved.</p>
                    </div>
                </Footer>
            </Content>
        </Layout>
    );
};

export default ContactUs;