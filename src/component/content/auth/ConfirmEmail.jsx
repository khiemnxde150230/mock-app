import { Button, Result } from 'antd';
import '../../../assests/css/auth.css'
import { useParams } from 'react-router-dom';
import { confirmAccountService } from '../../../services/UserService';

export default function ConfirmEmail() {
    const { id } = useParams();

    if (id !== undefined) {
        const response = async () => {
            const result = await confirmAccountService(id);
            return result;
        }
        response();
        return (
            <Result
                status="success"
                title="Account confirmation successful."
                subTitle="Welcome to our website. Experience now!"
                extra={[
                    <Button type="primary">
                        <a href='/'>Go to Home page</a>
                    </Button>,
                ]}
            />
        )
    }
    
    return (
        <Result
            status="success"
            title="Thank you for registering an account at our website."
            subTitle="Please check your email to verify your account. Wish you have a good day."
            extra={[
                <Button type="primary">
                    <a href='https://mail.google.com/'>Go to mailbox</a>
                </Button>,
            ]}
        />
    )

};