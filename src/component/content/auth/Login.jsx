import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, notification } from 'antd';
import { loginService, loginWithGoogleService } from '../../../services/UserService';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import Notification from '../../../utils/Notification';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

export default function Login() {
    const [api, contextHolder] = notification.useNotification();
    const { onSetUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        delete values.remember;
        const result = await loginService(values);
        if (result.status === 200) {
            onSetUser(result);

            switch (result.data.roleId) {
                case 1:
                    window.location.href = '/admin';
                    break;
                case 2:
                    window.location.href = "/manager/statistic";
                    break;
                case 3:
                    window.location.href = "/reception/manageBooking";
                    break;
                default:
                    window.location.href = "/";
                    break;
            }
        } else {
            Notification(api, 'error', result.message);
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
        console.log(result);
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
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item className='titleAuth'>
                        <h2 style={{ marginBottom: '10px' }}>Sign In</h2>
                        <p>Sign in to stay connnected.</p>
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
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter email" type='email' />
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
                            type="password"
                            placeholder="Enter password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Row>
                            <Col span={12} >
                                <Form.Item name="remember" valuePropName="checked" style={{ float: 'left' }}>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <a className="login-form-forgot" href="/forgot" style={{ float: 'right' }}>
                                    Forgot password
                                </a>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item style={{ marginTop: '-20px' }}>
                        <Button type="primary" htmlType='submit' block className="login-form-button" style={{ marginBottom: '10px' }}>
                            Log in
                        </Button>
                        {/* <p style={{ marginBottom: '10px', textAlign: "center" }}>or sign in with other accounts ?</p>
                        <div style={{ display: "flex", justifyContent: "center", margin: "7px 0" }}>
                            <GoogleOAuthProvider clientId='654170447147-4soec7ad1vchp9tiscev4kkv3tjne5rh.apps.googleusercontent.com'>
                                <GoogleLogin
                                    locale='en'
                                    onSuccess={token => {
                                        onLoginWithGoogle(token.credential);
                                    }}
                                    onError={() => {
                                        Notification(api, 'error', 'Login with google error!')
                                    }} />
                            </GoogleOAuthProvider>
                        </div> */}
                        <p style={{ textAlign: "center" }}>Don't have an account? <a href='/register'>Click here to sign up.</a></p>
                    </Form.Item>
                </Form>
            </div>

        </>
    );
};