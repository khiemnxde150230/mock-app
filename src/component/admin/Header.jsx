import { Fragment, useState, useEffect } from "react";
import { UserOutlined, DesktopOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, theme, Dropdown, Space } from 'antd';

const { Header } = Layout;

export default function HeaderAdmin() {
    var user = localStorage.getItem('user');
    const [avatar, setAvatar] = useState('../img/1x/Asset 1.png');

    useEffect(() => {
        setAvatar(JSON.parse(user).avatar);
    }, [user]);

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    
    const onLogOut = () =>{
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = '/login';
    }
    const items = [
        getItem(<a href={process.env.REACT_APP_CLIENT_HOST + "/four-season/user-profile"}>View Profile</a>,'1', <UserOutlined />),
        // getItem('Manager', '2', <DesktopOutlined />),
        getItem(<a onClick={() =>onLogOut()}>Log out</a>, '3', <LogoutOutlined />),
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Fragment>
            <Header
                style={{
                    paddingRight: "12px",
                    background: colorBgContainer,
                }}
                className="d-flex justify-content-end"
            >
                <Dropdown
                    menu={{
                        items,
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                >
                    <Space>
                        <a className="d-flex align-items-center" href="#">
                            <img src={avatar} alt="" style={{ cursor: "pointer", borderRadius: "50%"  }} width="50" height="50"
                                className="" />                            
                        </a>
                    </Space>
                </Dropdown>
            </Header>
        </Fragment>
    )
}