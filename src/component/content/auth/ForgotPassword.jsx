import { Button, Form, Input, Result, notification } from 'antd';
import { forgotPasswordService } from '../../../services/UserService';
import { useState } from 'react';
import Notification from '../../../utils/Notification';

export default function ForgotPassword() {
    const [isCheck, setIsCheck] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const onFinish = async (value) => {
        const result = await forgotPasswordService(value.email);
        if (result.status === 200) {
            setIsCheck(true);
        } else {
            Notification(api, 'error', 'The system is error!');
        }

    };
    
    if (isCheck === true) {
        return (
            <Result
                status="success"
                title="Send Email Successfully!"
                subTitle="We have sent an email with your new password. Please check your email."
                extra={[
                    <Button block type="primary" key="console">
                        <a href='/login'>Go to sign in</a>
                    </Button>
                ]}
            />
        )
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
                    <h2 style={{ marginBottom: '10px' }}>Forgot Password</h2>
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
                    <Input placeholder="Enter email" type='email' />
                </Form.Item>
                <Form.Item>
                    <p style={{textAlign:"center"}}>You will receive a new password provided by us. This password will be valid for 10 minutes. Please go to your email to receive your password and change it</p>
                </Form.Item>
                <Form.Item style={{ marginTop: '-20px' }}>
                    <Button type="primary" htmlType='submit' block className="login-form-button" style={{ margin: '10px 0' }}>
                        Send email
                    </Button>
                    <p style={{textAlign:"center"}}>Don't have an account? <a href='register'>Click here to sign up.</a></p>
                </Form.Item>
            </Form>
            </div>
        </>
    );
};