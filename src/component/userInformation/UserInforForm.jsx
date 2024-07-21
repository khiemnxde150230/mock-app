import { React } from 'react';
import { 
    Button, 
    Form, 
    Input, 
    DatePicker, 
    Row, 
    Col, 
    Typography, 
    InputNumber, 
    Modal, 
    notification
} from 'antd';
import {ExclamationCircleFilled} from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

const colStyle = {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 7,
}

const { confirm } = Modal;
const { Title } = Typography;

const UserInfoForm = (props) => {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, title, content, placement = 'topRight') => {
        api[type]({
            message: title,
            description: content,
            placement: placement
        });
    };
    
    const showConfirm = (values) => {
        confirm({
            title: 'Do you want to update your information?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                onUpdate(values);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const disabledDate = (current) => {
        return current 
        && current >= moment().subtract(18, "years");
    };

    const onUpdate = (values) => {
        // call update api
        let url = process.env.REACT_APP_SERVER_HOST + 'User/UpdateUser';
        axios.put(url, {
            password: values.password,
            fullName: values.fullName,
            address: values.address,
            phone: values.phone,
            idcard: values.idcard,
            birthday: (values.birthday != null && values.birthday != "") ? values.birthday.format('YYYY-MM-DD') : null,
            avatar: props.userInfor[9].value,
            userId: JSON.parse(localStorage.getItem("user")).userId
        }, {
            headers: {
                accept: 'application/json'
            }            
        })
            .then(function (response) {
                let notiProps = {
                    type: 'success',
                    title: 'Update successfully!'
                };
                openNotification(notiProps.type, notiProps.title, "");
                props.setDisableButtonSave(true);
                localStorage.setItem('user', JSON.stringify(response.data));
            })
            .catch(function (error) {
                let notiProps = {
                    type: 'error',
                    title: 'Something went wrong!',
                    content: error
                };
                openNotification(notiProps.type, notiProps.title, notiProps.content);
            });
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    };

    const onChange = (changeValue, fields) => {    
        props.setDisableButtonSave(false);                
    };

    return (        
        <Form
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 20,
            }}
            onFinish={showConfirm}
            onFinishFailed={onFinishFailed}
            onValuesChange={onChange}
            autoComplete="off"
            style={colStyle}
            fields={props.userInfor}
        >
            {contextHolder}
            <Row>
                <Col span={14} style={{padding: 20}}>
                    <Title level={4}>Basic Info</Title>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input disabled/>
                    </Form.Item>                    

                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                pattern: new RegExp(/^[A-Za-z]+$/),
                                message: 'Full name should not contain special characters and number!'
                            },
                            {
                                required: true,
                                message: 'Full name is required!',
                            },                            
                        ]}
                    >
                        <Input maxLength={255} />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input maxLength={255}/>
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                pattern: new RegExp(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/),
                                message: 'Phone number is not correct!'
                            },
                            {
                                required: true,
                                message: 'Phone number is required!',
                            },                            
                        ]}                        
                    >
                        <Input min={0} maxLength={10} style={{width: '40%'}}/>
                    </Form.Item>

                    <Form.Item
                        label="ID Card"
                        name="idcard"
                        rules={[
                            {
                                pattern: new RegExp(/^.{8,}$/),
                                message: 'ID number lenght must from 8 to 12 characters!'
                            },
                            {
                                required: true,
                                message: 'ID Card is required!',
                            },
                            {
                                pattern: new RegExp(/^[0-9]*$/),
                                message: 'ID number is not correct!'
                            },                            
                        ]}
                    >
                        <Input maxLength={12} style={{width: '40%'}}/>
                    </Form.Item>

                    <Form.Item
                        label="Birthday"
                        name="birthday"
                    >
                        <DatePicker
                            disabledDate={disabledDate}
                        />
                    </Form.Item>
                </Col>
                <Col span={10} style={{padding: 20, borderLeft: '1px solid #eee'}}>
                    <Title level={4}>Change Password</Title>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Password is required!',
                            },
                            {
                                pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,20}$)/),
                                message: 'Password is minimum 10 characters, at least one upper letter, one number and one special character!'
                            },
                        ]}
                    >
                        <Input.Password maxLength={50}/>
                    </Form.Item>

                    <Form.Item
                        label="Confirm"
                        name="confirmPassword"
                        dependencies={['password']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                            {
                                pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,20}$)/),
                                message: 'Password is minimum 10 characters, at least one upper letter, one number and one special character!'
                            },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                wrapperCol={{
                    offset: 11,
                    span: 13,
                }}
                style={{marginTop: 20}}
            >
                <Button className='btn-save-user-infor' disabled={props.disableButtonSave} type="primary" htmlType="submit">
                    Save changes
                </Button>
            </Form.Item>
        </Form>
    )
};

export default UserInfoForm;