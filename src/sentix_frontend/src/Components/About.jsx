import React from 'react';
import Navbar from './Navbar';
import { Layout, Typography, Card, Row, Col } from 'antd';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function About () {
    return (
        <Layout className="about-page">
            <Navbar />
            <Content style={{ padding: '50px' }}>
                <Row justify="center">
                    <Col span={24}>
                        <Title level={1}>About Us</Title>
                        <Paragraph>Welcome to TockenTix - your go-to platform for hassle-free event ticketing!</Paragraph>

                        <Card style={{ marginBottom: '24px' }}>
                            <Title level={4}>Our Mission</Title>
                            <Paragraph>Our mission is to make event ticketing simple, secure, and accessible. Whether you're organizing a concert, a conference, or a local event, we're here to provide a seamless experience for both event organizers and attendees.</Paragraph>
                        </Card>

                        <Card style={{ marginBottom: '24px' }}>
                            <Title level={4}>Why Choose Us?</Title>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '8px' }}><Text>✓ Decentralized and Secure: Built on a decentralized network, ensuring transparency and security.</Text></li>
                                <li style={{ marginBottom: '8px' }}><Text>✓ User-Friendly Interface: Enjoy a smooth and intuitive experience from ticket purchase to entry.</Text></li>
                                <li style={{ marginBottom: '8px' }}><Text>✓ Real-Time Updates: Stay informed with real-time notifications and updates.</Text></li>
                                <li style={{ marginBottom: '8px' }}><Text>✓ Simplified Process: Streamline ticket issuance, transfer and authentication.</Text></li>
                            </ul>
                        </Card>

                        <Card style={{ marginBottom: '24px' }}>
                            <Title level={4}>Meet the Team</Title>
                            <Paragraph>We're a team of passionate developers, designers, and event enthusiasts dedicated to transforming the ticketing industry.</Paragraph>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default About;