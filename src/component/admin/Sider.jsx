import { useState } from "react";
import { UserOutlined, DesktopOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function SiderAdmin() {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    function getItem(label, key, icon, path, children) {
        return {
            key,
            icon,
            path,
            children,
            label,
        };
    }

    const idRole = JSON.parse(localStorage.getItem('user')).roleId;

    const managerMenu = [
        getItem('Revenue Analysis', '/manager/statistic', <DesktopOutlined />, '', null),
        getItem('Manage', 'sub1', <UserOutlined />, null, [
            getItem('Guest', '/manager/manageGuest', null, '', null),
            getItem('Booking', '/manager/manageBooking', null, '', null),
            getItem('Room', '/manager/room', null, '', null),
            getItem('Room Type', '/manager/roomtype', null, '', null),
        ])
    ];

    const receptionMenu = [
        getItem('Manage', 'sub1', <UserOutlined />, null, [
            getItem('Guest', "/reception/manageGuest", null, '', null),
            getItem('Booking', '/reception/manageBooking', null, '', null),
        ]),
    ];

    const adminMenu = [
        getItem('Manage', 'sub2', <UserOutlined />, null, [
            getItem('Manager', '/admin/manager', null, "", null),
            getItem('Reception', '/admin/reception', null, "", null),
        ]),
    ];

    const items = idRole == "3" ? receptionMenu : idRole == "2" ? managerMenu : adminMenu;

    const onClick = (value) => {
        // console.log(value.key);
        window.location.href = process.env.REACT_APP_CLIENT_HOST + value.key;
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            // style={{background:'var(--mainColor--)'}}
        >
            <div style={{ padding: "20px 12px" }}>
                <a href="" className="d-flex align-items-center">
                    <img
                        className="borederRadius50"
                        src="../img/Black Retro Tree Logo Template.png"
                        style={{ background: "#fff" }}
                        width="50"
                        height="50"
                        alt=""
                    />
                    <span className="ml-3 text-white titleRoomFont" style={{ fontSize: 13 }}>Four Season Hotel</span>
                </a>
            </div>
            <Menu
                onClick={(key) => onClick(key)}
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
            />
        </Sider>
    )
}