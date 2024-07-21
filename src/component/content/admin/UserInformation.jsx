import { React, useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Col, Row, Typography, notification, Layout, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserAvatar from '../../userInformation/UserAvatar';
import UserInfoForm from '../../userInformation/UserInforForm';
import Footer from "../../admin/Footer"
import HeaderAdmin from "../../admin/Header"
import SiderAdmin from "../../admin/Sider";

const { Content } = Layout;

const UserInformation = () => {
    const [fileList, setFileList] = useState([]);
    const [disableButtonSave, setDisableButtonSave] = useState(true);
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const [userInfor, setUserInfo] = useState([
        { name: ['email'], value: null },
        { name: ['password'], value: null },
        { name: ['confirmPassword'], value: null },
        { name: ['fullName'], value: null },
        { name: ['address'], value: null },
        { name: ['phone'], value: null },
        { name: ['idcard'], value: null },
        { name: ['birthday'], value: null },
        { name: ['roleId'], value: null },
        { name: ['avatar'], value: null },
        { name: ['bookingTimes'], value: null },
        { name: ['moneySpend'], value: null },
        { name: ['cancelBooking'], value: null },
    ]);

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, title, content, placement = 'topRight') => {
        api[type]({
            message: title,
            description: content,
            placement: placement
        });
    };

    useEffect(() => {
        try {
            axios.get(process.env.REACT_APP_SERVER_HOST + 'User/GetUserInformation?userId=' + userId)
                .then((response) => {
                    let tempData = [
                        { name: ['email'], value: response.data.email },
                        { name: ['password'], value: response.data.password },
                        { name: ['confirmPassword'], value: null },
                        { name: ['fullName'], value: response.data.fullName },
                        { name: ['address'], value: response.data.address },
                        { name: ['phone'], value: response.data.phone },
                        { name: ['idcard'], value: response.data.idcard },
                        { name: ['birthday'], value: (response.data.birthday != null && response.data.birthday != "") ? dayjs(response.data.birthday) : ""},
                        { name: ['roleId'], value: response.data.roleId },
                        { name: ['avatar'], value: response.data.avatar },
                        { name: ['bookingTimes'], value: response.data.bookingTimes },
                        { name: ['moneySpend'], value: response.data.moneySpend },
                        { name: ['cancelBooking'], value: response.data.cancelBookings },
                    ]
                    setUserInfo([...tempData]);

                    if(response.data.avatar != null){
                        let tempImage = [{
                            uid: response.data.avatar,
                            name: response.data.avatar,
                            status: 'done',
                            url: response.data.avatar,
                        }];
                        setFileList([...tempImage]);
                    }                    
                })
        } catch (error) {
            let notiProps = {
                type: 'error',
                title: 'Something went wrong!',
                content: error
            };
            openNotification(notiProps.type, notiProps.title, notiProps.content);
        }
    }, []);

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SiderAdmin />
            <Layout className="site-layout">
                <HeaderAdmin />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item><UserOutlined className="mr-1" />User Information</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row gutter={16}>
                            <Col className="gutter-row" span={5}>
                                <UserAvatar
                                    userInfor={userInfor}
                                    setUserInfo={setUserInfo}
                                    setDisableButtonSave={setDisableButtonSave}
                                    fileList={fileList}
                                    setFileList={setFileList}
                                />
                            </Col>
                            <Col className="gutter-row" span={19}>
                                <UserInfoForm
                                    userInfor={userInfor}
                                    setUserInfo={setUserInfo}
                                    setDisableButtonSave={setDisableButtonSave}
                                    disableButtonSave={disableButtonSave}
                                    setFileList={setFileList}
                                />
                            </Col>
                        </Row>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    )
};

export default UserInformation;