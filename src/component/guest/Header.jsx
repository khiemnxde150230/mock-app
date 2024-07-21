import { Fragment } from "react";
import { Layout, Space, Dropdown } from 'antd';
import { UserOutlined, BookOutlined, LoginOutlined } from '@ant-design/icons';
import { useState } from "react";
import { json } from "react-router-dom";
import { useEffect } from "react";

const { Header } = Layout;

const onLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login';
}

const items = [
    {
        key: '1',
        label: (
            <div>
                <UserOutlined />
                <a className="text-black ml-3" href={process.env.REACT_APP_CLIENT_HOST + "/my-profile"}>My Profile</a>
            </div>
        ),
    },
    {
        key: '2',
        label: (
            <div>
                <BookOutlined />
                <a className="text-black ml-3" href={process.env.REACT_APP_CLIENT_HOST + "/view-booking-history"}>View booking history</a>
            </div>
        ),
    },
    {
        key: '3',
        label: (
            <div>
                <LoginOutlined />
                <a onClick={() => onLogout()} className="text-black ml-3">Log Out</a>
            </div>
        ),
    },
];

export default function HeaderGuest() {
    var user = localStorage.getItem('user');
    const [avatar, setAvatar] = useState('img/1x/Asset 1.png');

    useEffect(() => {
        if (user) {
            if (JSON.parse(user).avatar) {
                setAvatar(JSON.parse(user).avatar)
            }
        }
    }, [user]);

    return (
        <Fragment>
            <Space
                direction="vertical"
                style={{ width: '100%' }}
                size={[0, 48]}
            >
                <Layout>
                    <Header style={{ height: 100 + "%" }}>
                        <nav className="navbarHeader">
                            <div className="d-flex align-items-center justify-content-between" style={{ padding: "0px 20px" }}>
                                <div className="">
                                    <a href="/" className="d-flex align-items-center">
                                        <img className="borederRadius50" src="../img/Black Retro Tree Logo Template.png"
                                            width="100" height="100" alt=""
                                        />
                                        <img src="../img/textLogo.png" width="220" style={{ marginLeft: 20 }} alt="" />
                                    </a>
                                </div>
                                <div className="">
                                    <ul className="fontSize20 d-flex align-items-center">
                                        <li className="itemNavBar"><a href="/" className="fontSize16 text-white">Home</a></li>
                                        <li className="itemNavBar"><a href="/booking" className="fontSize16 text-white">Room</a></li>
                                        <li className="itemNavBar"><a href="/destinations" className="fontSize16 text-white">Destinations</a></li>
                                        <li className="itemNavBar"><a href="/culinary" className="fontSize16 text-white">Culinary</a></li>
                                        {user != undefined ?
                                            <li className="itemNavBar d-flex">
                                                <Dropdown
                                                    menu={{
                                                        items,
                                                    }}
                                                    placement="bottomRight"
                                                    trigger={['click']}
                                                >
                                                    <Space>
                                                        <a className="d-flex align-items-center" href="#">
                                                            <img src={avatar} alt="" style={{ cursor: "pointer", borderRadius: "50%" }} width="50" height="50" />
                                                        </a>
                                                    </Space>
                                                </Dropdown>
                                            </li> :
                                            <li className="itemNavBar">

                                                <a href="/login" className="fontSize16 text-white">Login</a>

                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </Header>
                </Layout>
            </Space>
        </Fragment >
    )
}