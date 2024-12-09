import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, List, Divider, Space, Layout } from 'antd';
import { DownloadOutlined, HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Navbar from './Navbar';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

const Confirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { event, quantity, totalPrice, paymentMethod } = state;
  
  const orderNumber = Math.floor(Math.random() * 1000000);
  const purchaseDate = new Date().toLocaleDateString();

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '24px' }}>
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
              <Title level={2}>Thank You for Your Purchase!</Title>
            </div>

            <Card title="Order Summary">
              <Space direction="vertical">
                <Text strong>Order Number: #{orderNumber}</Text>
                <Text strong>Purchase Date: {purchaseDate}</Text>
              </Space>
            </Card>

            <Card>
              <Space align="start" size="large">
                <img src={event.image} alt={event.title} style={{ width: 200, borderRadius: '8px' }} />
                <Space direction="vertical">
                  <Title level={4}>{event.title}</Title>
                  <Text>{event.date} at {event.time}</Text>
                  <Text>{event.location}</Text>
                  <Text>Quantity: {quantity} tickets</Text>
                </Space>
              </Space>
            </Card>

            <Card title="Payment Details">
              <Space direction="vertical">
                <Text strong>Payment Method: {paymentMethod}</Text>
                <Text strong>Service Fee: ${(totalPrice * 0.10).toFixed(2)}</Text>
                <Text strong>Total Paid: ${(totalPrice * 1.10).toFixed(2)}</Text>
              </Space>
            </Card>

            <Card title="What's Next?">
              <List
                dataSource={[
                  'Your tickets have been sent to your email',
                  'Show your QR code at the venue entrance',
                  'Arrive at least 30 minutes before the event'
                ]}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </Card>

            <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />}
                onClick={() => {/* Add download logic */}}
              >
                Download Tickets
              </Button>
              <Button 
                icon={<HomeOutlined />}
                onClick={() => navigate('/')}
              >
                Return to Home
              </Button>
            </Space>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
};

export default Confirmation;