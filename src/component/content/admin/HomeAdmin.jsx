import { useEffect, useState } from "react";
import { openNotificationCreate } from "./AdminService";
import { openNotificationUpdate } from "./AdminService";
import { openNotificationChangingStatus } from "./AdminService";
import Footer from "../../admin/Footer";
import HeaderAdmin from "../../admin/Header";
import SiderAdmin from "../../admin/Sider";
import axios from "axios";
import dayjs from "dayjs";
import { EditOutlined, HomeTwoTone, PoweroffOutlined, SearchOutlined } from "@ant-design/icons";
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Table,
    Input,
    Modal,
    Form,
    Button,
    DatePicker,
    notification,
} from "antd";
import {
    validateFullName,
    validateBirthday,
    validateAddress,
    validatePhoneNumber,
    validateIdCard
} from "./AdminValidation";

const { Content } = Layout;

export default function ManageManager() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [listManager, setListManager] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);
    const [updatedManager, setUpdatedManager] = useState({
        userId: null,
        password: "",
        fullName: "",
        address: "",
        phone: "",
        idcard: "",
        birthDay: "",
        email: "",
        status: "",
        avatar: "",
        role: null,
        roleId: null,
        booking: [],
    });
    const [createManager, setCreateManager] = useState({
        email: "null",
        password: "12345",
        fullName: "",
        address: "",
        phone: "",
        idcard: "",
        birthDay: "",
        roleId: 2,
        avatar:
            "https://media.istockphoto.com/id/476085198/photo/businessman-silhouette-as-avatar-or-default-profile-picture.jpg?s=612x612&w=0&k=20&c=GVYAgYvyLb082gop8rg0XC_wNsu0qupfSLtO7q9wu38=",
        status: "0",
    });
    const [api, contextHolder] = notification.useNotification();
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [errors, setErrors] = useState({});
    const [listIdCard, setListIdCard] = useState([]);
    const blankManager = {
        email: "null",
        password: "12345",
        fullName: "",
        address: "",
        phone: "",
        idcard: "",
        birthDay: "",
        roleId: 2,
        avatar:
            "https://media.istockphoto.com/id/476085198/photo/businessman-silhouette-as-avatar-or-default-profile-picture.jpg?s=612x612&w=0&k=20&c=GVYAgYvyLb082gop8rg0XC_wNsu0qupfSLtO7q9wu38=",
        status: "1",
    };
    const dateFormat = "YYYY-MM-DD";

    //# Data for collums
    const columns = [
        {
            title: "ID",
            width: 50,
            dataIndex: "userId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Avatar",
            width: 80,
            dataIndex: "avatar",
            key: "avatar",
            fixed: "left",
            render: (avatar) => (
                <img
                    src={avatar}
                    alt="Pic"
                    width={70}
                    height={70}
                    className="borederRadius50"
                />
            ),
        },
        {
            title: "FullName",
            width: 200,
            dataIndex: "fullName",
            key: 3,
            fixed: "left",
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type full name"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm();
                        }}
                    ></Input>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.fullName.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "BirthDay",
            width: 150,
            dataIndex: "birthDay",
            key: 4,
            fixed: "left",
            render: (value) => formatDate(value),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: 4,
            width: 250,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type email"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm();
                        }}
                    ></Input>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return record.email.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "PhoneNumber",
            dataIndex: "phone",
            key: 5,
            width: 100,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type phone number"
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : []);
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm();
                        }}
                    ></Input>
                );
            },
            filterIcon: () => {
                return <SearchOutlined />;
            },
            onFilter: (value, record) => {
                return (record.phone === null ? "" : record.phone)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
        },
        {
            title: "IdCard",
            dataIndex: "idcard",
            key: 6,
            width: 100,
        },
        {
            title: "Status",
            dataIndex: "status",
            fixed: "center",
            key: 7,
            width: 100,
            render: (value) => {
                return <>{value == 1 ? "Deactivated" : "Activated"}</>;
            },
        },
        {
            title: "Action",
            key: 8,
            fixed: "center",
            width: 100,
            render: (record) => {
                return (
                    <>
                    <Button type="primary" icon={<EditOutlined/>} onClick={() => handleUpdateClick(record)}></Button> {" "}
                    <Button  
                    type="primary"
                    style={
                        record.status === "1" ? { background: "red" } : { background: "green" }
                    }
                    icon={<PoweroffOutlined/>} onClick={() => handleChangeStatus(record)}></Button>
                    </>
                );
            },
        },
    ];

    //# Create Manager
    function handleInputCreate(event) {
        setCreateManager({
            ...createManager,
            [event.target.name]: event.target.value,
        });
    }
    function handleInputCreateDate(date) {
        setCreateManager({
            ...createManager,
            birthDay: date,
        });

    }
    const handleSubmitCreate = async (event) => {
        let errors = {};
        errors.name = validateFullName(createManager.fullName);
        errors.birthDay = validateBirthday(createManager.birthDay);
        // errors.address = validateAddress(createManager.address);
        errors.phone = validatePhoneNumber(createManager.phone);
        errors.idcard = validateIdCard(createManager.idcard, listIdCard);

        setErrors(errors);

        if (
            // errors.address == null &&
            errors.name == null &&
            errors.phone == null &&
            errors.birthDay == null &&
            errors.idcard == null
        ) {
            await axios.post(process.env.REACT_APP_SERVER_HOST + "manager", createManager);
            getData();
            setCreateManager(blankManager);
            setShowCreate(false);
            openNotificationCreate(api, "topRight");
        }
    };

    const showCreateForm = () => {
        setShowCreate(true);
        axios
            .get(process.env.REACT_APP_SERVER_HOST + "manager/allIdCards")
            .then((result) => {
                setListIdCard(result.data);
            });
    };

    const hideCreateForm = () => {
        setShowCreate(false);
        setCreateManager(blankManager);
        setErrors({});
    };

    //# Listing Manager
    useEffect(() => {
        getData();
    }, []);

    //# Get the table of managers
    const getData = async () => {
        await axios.get(process.env.REACT_APP_SERVER_HOST + "manager/all").then((result) => {
            setListManager(result.data);
        });
    };

    //# Update manager
    const handleUpdateClick = (manager) => {
        setSelectedManager(manager);
        handleShow();
        setUpdatedManager({
            password: manager.password,
            fullName: manager.fullName,
            address: manager.address,
            phone: manager.phone,
            idcard: manager.idcard,
            birthDay: manager.birthDay,
            email: manager.email,
            role: manager.role,
            roleId: manager.roleId,
            booking: manager.booking,
            avatar: manager.avatar,
            status: manager.status,
            userId: manager.userId,
        });
        axios
            .get(process.env.REACT_APP_SERVER_HOST + "manager/allIdCards")
            .then((result) => {
                setListIdCard(result.data);
            });

    };

    const handleInputChange = (event) => {
        setUpdatedManager({
            ...updatedManager,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        let errors = {};
        errors.name = validateFullName(updatedManager.fullName);
        errors.birthDay = validateBirthday(updatedManager.birthDay);
        // errors.address = validateAddress(updatedManager.address);
        errors.phone = validatePhoneNumber(updatedManager.phone);
        errors.idcard =
            selectedManager.idcard != updatedManager.idcard
                ? validateIdCard(updatedManager.idcard, listIdCard)
                : null;
        setErrors(errors);
        if (
            // errors.address == null &&
            errors.name == null &&
            errors.phone == null &&
            errors.birthDay == null &&
            errors.idcard == null
        ) {
            try {
                await axios.put(
                    process.env.REACT_APP_SERVER_HOST + `manager/update`,
                    updatedManager
                );
                console.log(updatedManager);
                setSelectedManager(null);
                setUpdatedManager({
                    password: "",
                    fullName: "",
                    address: "",
                    phone: "",
                    idcard: "",
                    birthDay: "",
                });
                getData();
                handleClose();
                openNotificationUpdate(api, "topRight");
            } catch (error) {
                console.error("Error updating manger:", error);
            }
        }
    };

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setErrors({});
    }

    //# update Status
    const handleSubmitStatus = async (data) => {
        try {
            await axios.put(process.env.REACT_APP_SERVER_HOST + `manager/updateStatus`, data);
            await getData();
            openNotificationChangingStatus(api, "topRight");
        } catch (error) {
            console.error("Error updating manager status:", error);
        }
    };

    const handleChangeStatus = async (record) => {
        const acctionStatus = record.status === "0" ? "Deactivate" : "Activate";
        const data = {
            userId: record.userId,
            status: record.status === "1" ? "0" : "1",
        };
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            Modal.confirm({
                title:
                    "Are you sure to " +
                    acctionStatus.toLocaleLowerCase() +
                    " account: " +
                    record.email +
                    " ?",
                okText: acctionStatus,
                okType: "default",
                onOk: () => {
                    handleSubmitStatus(data);
                },
                cancelText: "Cancel",
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    //# Format Date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    const handleChangeDate = (date, dateString) => {
        setUpdatedManager((prev) => ({
            ...prev,
            birthDay: dateString,
        }));
    };

    return (
        <>
            {contextHolder}
            <Layout
                style={{
                    minHeight: "100vh",
                }}
            >
                <SiderAdmin />
                <Layout className="site-layout">
                    <HeaderAdmin />

                    <Content
                        style={{
                            margin: "0 16px",
                        }}
                    >
                        <Breadcrumb
                            style={{
                                margin: "16px 0",
                            }}
                        >
                            <Breadcrumb.Item>
                                <HomeTwoTone className="mr-1" />
                                Home
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Manage</Breadcrumb.Item>
                            <Breadcrumb.Item>Manager</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                            }}
                        >
                            <div>
                                <h1
                                    style={{
                                        textAlign: "center",
                                        fontSize: "30px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    Manager List
                                </h1>
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <Button type="primary" onClick={() => showCreateForm()}>
                                    Create
                                </Button>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={listManager}
                                scroll={{
                                    x: 1500,
                                    y: 500,
                                }}
                            />
                            <Modal
                                title="Update Manager"
                                open={show}
                                okText="SaveChange"
                                onCancel={() => handleClose()}
                                onOk={(e) => handleSubmitUpdate(e)}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "20px",
                                    }}
                                ></div>

                                <Form>
                                    <Form.Item>
                                        <label>FullName</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={updatedManager.fullName}
                                            onChange={(e) => handleInputChange(e)}
                                            name="fullName"
                                        />
                                        <span>
                                            {errors.name && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.name}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                    <Form.Item>
                                        <label>BirthDay</label>
                                        <br></br>
                                        <DatePicker
                                            defaultValue={dayjs(updatedManager.birthDay, dateFormat)}
                                            onChange={handleChangeDate}
                                            name="birthDay"
                                        />
                                        <span>
                                            {errors.birthDay && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.birthDay}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                    <Form.Item>
                                        <label>Email</label>
                                        <Input
                                            type="email"
                                            className="form-control"
                                            value={updatedManager.email}
                                            onChange={handleInputChange}
                                            name="email"
                                            disabled
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <label>ID Card</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={updatedManager.idcard}
                                            onChange={handleInputChange}
                                            name="idcard"
                                        />
                                        <span>
                                            {errors.idcard && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.idcard}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                    <Form.Item>
                                        <label>Address</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={updatedManager.address}
                                            onChange={handleInputChange}
                                            name="address"
                                        />
                                        <span>
                                            {errors.address && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {/* {errors.address} */}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                    <Form.Item>
                                        <label>PhoneNumber</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={updatedManager.phone}
                                            onChange={handleInputChange}
                                            name="phone"
                                        />
                                        <span>
                                            {errors.phone && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.phone}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                </Form>
                            </Modal>
                            <Modal
                                title="Create Manager"
                                open={showCreate}
                                okText="Create"
                                onCancel={() => hideCreateForm()}
                                onOk={() => handleSubmitCreate()}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        marginBottom: "20px",
                                    }}
                                ></div>

                                <Form>
                                    <Form.Item>
                                        <label>FullName</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter FullName"
                                            className="form-control"
                                            name="fullName"
                                            value={createManager.fullName}
                                            onChange={handleInputCreate}
                                        />
                                        <span>
                                            {errors.name && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.name}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                    <Form.Item>
                                        <label>BirthDay</label>
                                        <DatePicker
                                            value={createManager.birthDay}
                                            placeholder="YYYY-MM-DD"
                                            onChange={handleInputCreateDate}
                                            name="birthDay"
                                            style={{ width: "100%" }}
                                        />
                                        <span>
                                            {errors.birthDay && (
                                                <div
                                                    // className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.birthDay}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                    <Form.Item>
                                        <label>ID Card</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter ID Card"
                                            className="form-control"
                                            name="idcard"
                                            value={createManager.idcard}
                                            onChange={handleInputCreate}
                                        />
                                        <span>
                                            {errors.idcard && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.idcard}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                    <Form.Item>
                                        <label>Address</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter Address"
                                            className="form-control"
                                            name="address"
                                            value={createManager.address}
                                            onChange={handleInputCreate}
                                        />
                                        <span>
                                            {errors.address && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {/* {errors.address} */}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                    <Form.Item>
                                        <label>PhoneNumber</label>
                                        <Input
                                            type="text"
                                            placeholder="Enter PhoneNumber"
                                            className="form-control"
                                            name="phone"
                                            value={createManager.phone}
                                            onChange={handleInputCreate}
                                        />
                                        <span>
                                            {errors.phone && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.phone}
                                                </div>
                                            )}
                                        </span>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </>
    );
}