import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import Notification from '../../../utils/Notification';
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { IsValues } from '../../../utils/Validate';
import { registerService, loginWithGoogleService } from '../../../services/UserService';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

export default function Register() {
    const {onSetUser} = useContext(UserContext);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const isValues = IsValues(values);
        if (isValues.status === 1) {
            delete values.remember;
            delete values.passwordconfirm;
            
            values = { ...values, status: "2" }
            const result = await registerService(values);
            if (result.status === 200) {
                navigate("/confirm");
                Notification(api, 'success', result.message);
            } else {
                Notification(api, 'error', result.message);
            }
        } else {
            Notification(api, 'error', isValues.message);
        }
    };

    const onLoginWithGoogle = async (value) => {
        const values = await jwtDecode(value);
        const data = {
            email: values.email,
            password: values.sub,
            fullName: values.name,
            avatar: values.picture,
            status: "1"
        }

        const result = await loginWithGoogleService(data);

        if (result.status === 200) {
            onSetUser(result);
            navigate("/");
        } else {
            Notification(api, 'error', 'Login error!');
        }
    }
    
    return (
        <>
            {contextHolder}
            <div className='mainAuth'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
            >
                <Form.Item className='titleAuth'>
                    <h2 style={{ marginBottom: '10px' }}>Sign Up</h2>
                    <p>Create your new account.</p>
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input type="email" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Enter password"
                    />
                </Form.Item>
                <Form.Item
                    name="passwordconfirm"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password confirm!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Enter password confirm"
                    />
                </Form.Item>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Enter your name"
                    />
                </Form.Item>
                <Form.Item
                    name="idCard"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your card!',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Enter your id card"
                    />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone!',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        placeholder="Enter your phone"
                    />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" style={{ marginTop: "-10px" }}>
                    <Checkbox>I agree to the terms and conditions</Checkbox>
                </Form.Item>
                <Form.Item style={{ marginTop: '-20px' }}>
                    <Button type="primary" htmlType='submit' block className="login-form-button" style={{ marginBottom: '10px' }}>
                        Sign up
                    </Button>
                    <p style={{ marginBottom: '10px', textAlign:"center" }}>or sign up with other accounts ?</p>
                    <div style={{ display: "flex", justifyContent: "center", margin:"7px 0"}}>
                        <GoogleOAuthProvider clientId='341213027371-d8jtlok8s85eqhsdb3mde1lllqbd70dk.apps.googleusercontent.com'>
                            <GoogleLogin
                                locale='en'
                                onSuccess={token => {
                                    onLoginWithGoogle(token.credential);
                                }}
                                onError={() => {
                                    Notification(api, 'error', 'Login with google error!')
                                }} />
                        </GoogleOAuthProvider>
                    </div>
                    <p style={{textAlign:"center"}}>Already have an account? <a href='/login'>Click here to sign in.</a></p>
                </Form.Item>
            </Form>
            </div>

        </>
    );
};