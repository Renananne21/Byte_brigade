import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../Images/LOGO.jpg';
import { AuthClient } from "@dfinity/auth-client";
import { Layout, Menu, Input, Button, Badge, Avatar } from 'antd';
import { ShoppingCartOutlined, SearchOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';


const { Header } = Layout;

function Navbar({ searchTerm, setSearchTerm }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const defaultOptions = {
        createOptions: {
            idleOptions: {
                disableIdle: true
            }
        },
        loginOptions: {
            identityProvider: "https://identity.ic0.app/#authorize"
        }
    };

    const login = async () => {
        try {
            const authClient = await AuthClient.create({
                idleOptions: { disableIdle: true }
            });
            
            if (await authClient.isAuthenticated()) {
                handleAuthenticated(authClient);
                return;
            }

            await authClient.login({
                identityProvider: "https://identity.ic0.app/#authorize",
                onSuccess: () => handleAuthenticated(authClient),
                onError: (error) => {
                    console.error("Login failed:", error);
                    setIsAuthenticated(false);
                },
                maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000)
            });
        } catch (error) {
            console.error("Authentication error:", error);
            setIsAuthenticated(false);
        }
    };
    
    const handleAuthenticated = async (authClient) => {
        const identity = await authClient.getIdentity();
        if (identity) {
            setIsAuthenticated(true);
            setShowToast(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        async function checkAuth() {
            const authClient = await AuthClient.create({
                idleOptions: { disableIdle: true }
            });
            if (await authClient.isAuthenticated()) {
                handleAuthenticated(authClient);
            }
        }
        checkAuth();
    }, []);
     
    return (
        <Header style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0 20px', 
            background: 'transparent',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="plasma-background"></div>
            <div className="logo" style={{ marginRight: '24px', position: 'relative', zIndex: 1 }}>
                <img src={logo} alt="TockenTix" style={{ height: '32px' }} />
            </div>

            <Input.Search
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: 300, marginRight: '24px', position: 'relative', zIndex: 1 }}
            />

            <div style={{ flex: 1 }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
                <Menu mode="horizontal" style={{ border: 'none', background: 'transparent' }}>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="events">
                        <Link to="#">Events</Link>
                    </Menu.Item>
                    <Menu.Item key="about">
                        <Link to="/about">About</Link>
                    </Menu.Item>
                </Menu>
                <Badge count={0}>
                    <Avatar icon={<ShoppingCartOutlined />} />
                </Badge>
                <Button type="default" href="/contactUs" icon={<MailOutlined />}>
                    Contact Us
                </Button>
                {!isAuthenticated && (
                    <Button type="primary" onClick={login}>
                        Log In
                    </Button>
                )}
            </div>
            <style>{`
                .plasma-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, #ff0000, #ff7300, #00ff00, #0073ff);
                    background-size: 400% 400%;
                    animation: plasma 15s ease infinite;
                    opacity: 0.3;
                    filter: blur(50px);
                }
                
                @keyframes plasma {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .ant-menu-horizontal {
                    color: #fff;
                }
                
                .ant-menu-horizontal > .ant-menu-item:hover {
                    color: #1890ff;
                }
                
                .ant-menu-horizontal > .ant-menu-item-selected {
                    color: #1890ff;
                }
            `}</style>
        </Header>
    );}

export default Navbar;