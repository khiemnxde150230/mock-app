import { useEffect, useState } from "react";
import {
    openNotificationCreate,
    openNotificationUpdate,
    openNotificationChangingStatus
} from "./AdminService";
import Footer from "../../admin/Footer";
import HeaderAdmin from "../../admin/Header";
import SiderAdmin from "../../admin/Sider";
import axios from "axios";
import dayjs from "dayjs";
import {
    EditOutlined,
    HomeTwoTone,
    PoweroffOutlined,
    SearchOutlined
} from "@ant-design/icons";
import {
    Breadcrumb,
    Layout,
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

export default function ManageReception() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [listReception, setListReception] = useState([]);
    const [selectedReception, setSelectedReception] = useState(null);
    const [updatedReception, setUpdatedReception] = useState({
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
    const [createReception, setCreateReception] = useState({
        email: "null",
        password: "12345",
        fullName: "",
        address: "",
        phone: "",
        idcard: "",
        birthDay: "",
        roleId: 3,
        avatar:
            "https://media.istockphoto.com/id/476085198/photo/businessman-silhouette-as-avatar-or-default-profile-picture.jpg?s=612x612&w=0&k=20&c=GVYAgYvyLb082gop8rg0XC_wNsu0qupfSLtO7q9wu38=",
        status: "1",
    });
    const [api, contextHolder] = notification.useNotification();
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [errors, setErrors] = useState({});
    const [listIdCard, setListIdCard] = useState([]);

    const blankReception = {
        email: "null",
        password: "12345",
        fullName: "",
        address: "",
        phone: "",
        idcard: "",
        birthDay: "",
        roleId: 3,
        avatar:
            "https://media.istockphoto.com/id/476085198/photo/businessman-silhouette-as-avatar-or-default-profile-picture.jpg?s=612x612&w=0&k=20&c=GVYAgYvyLb082gop8rg0XC_wNsu0qupfSLtO7q9wu38=",
        status: "0",
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
                return <>{value == 1 ? "Activated" : "Deactivated"}</>;
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
                        <Button type="primary" icon={<EditOutlined />} onClick={() => handleUpdateClick(record)}></Button> {" "}
                        <Button
                            type="primary"
                            style={
                                record.status === "1" ? { background: "red" } : { background: "green" }
                            }
                            icon={<PoweroffOutlined />} onClick={() => handleChangeStatus(record)}></Button>
                    </>
                );
            },
        },
    ];

    //# Create Reception
    function handleInputCreate(event) {
        setCreateReception({
            ...createReception,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmitCreate = async (event) => {
        let errors = {};
        errors.name = validateFullName(createReception.fullName);
        errors.birthDay = validateBirthday(createReception.birthDay);
        // errors.address = validateAddress(createReception.address);
        errors.phone = validatePhoneNumber(createReception.phone);
        errors.idcard = validateIdCard(createReception.idcard, listIdCard);

        setErrors(errors);
        if (
            // errors.address == null &&
            errors.name == null &&
            errors.phone == null &&
            errors.birthDay == null &&
            errors.idcard == null
        ) {
            await axios.post(process.env.REACT_APP_SERVER_HOST + "reception", createReception);
            getData();
            setCreateReception(blankReception);
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
        setCreateReception(blankReception);
        setErrors({});
    };

    //# Listing Reception
    useEffect(() => {
        getData();
    }, []);

    //# Get the table of receptions
    const getData = async () => {
        await axios
            .get(process.env.REACT_APP_SERVER_HOST + "reception/all")
            .then((result) => {
                setListReception(result.data);
            });
    };

    //# Update reception
    const handleUpdateClick = (user) => {
        setSelectedReception(user);
        handleShow();
        setUpdatedReception({
            password: user.password,
            fullName: user.fullName,
            address: user.address,
            phone: user.phone,
            idcard: user.idcard,
            birthDay: user.birthDay,
            email: user.email,
            role: user.role,
            roleId: user.roleId,
            booking: user.booking,
            avatar: user.avatar,
            status: user.status,
            userId: user.userId,
        });
        axios
            .get(process.env.REACT_APP_SERVER_HOST + "manager/allIdCards")
            .then((result) => {
                setListIdCard(result.data);
            });
    };

    const handleInputChange = (event) => {
        setUpdatedReception({
            ...updatedReception,
            [event.target.name]: event.target.value,
        });
    };
    function handleInputCreateDate(date) {
        setCreateReception({
            ...createReception,
            birthDay: date,
        });
    }

    const handleSubmitUpdate = async (event) => {
        event.preventDefault();
        let errors = {};
        errors.name = validateFullName(updatedReception.fullName);
        errors.birthDay = validateBirthday(updatedReception.birthDay);
        // errors.address = validateAddress(updatedReception.address);
        errors.phone = validatePhoneNumber(updatedReception.phone);
        errors.idcard =
            selectedReception.idcard != updatedReception.idcard
                ? validateIdCard(updatedReception.idcard, listIdCard)
                : null;
        setErrors(errors);
        if (
            // // errors.address == null &&
            errors.name == null &&
            errors.phone == null &&
            errors.birthDay == null &&
            errors.idcard == null
        ) {
            try {
                await axios.put(
                    process.env.REACT_APP_SERVER_HOST + `reception/update`,
                    updatedReception
                );
                setSelectedReception(null);
                setUpdatedReception({
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
                console.error("Error updating reception:", error);
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
            await axios.put(
                process.env.REACT_APP_SERVER_HOST + `reception/updateStatus`,
                data
            );
            await getData();
            openNotificationChangingStatus(api, "topRight");
        } catch (error) {
            console.error("Error updating manager status:", error);
        }
    };

    const handleChangeStatus = async (record) => {
        const acctionStatus = record.status === "1" ? "Deactivate" : "Activate";
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
        setUpdatedReception((prev) => ({
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
                            <Breadcrumb.Item>Receptionist</Breadcrumb.Item>
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
                                    Receptionist List
                                </h1>
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <Button type="primary" onClick={() => showCreateForm()}>
                                    Create
                                </Button>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={listReception}
                                scroll={{
                                    x: 1500,
                                    y: 500,
                                }}
                            />
                            <Modal
                                title="Update Receptionist"
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
                                            value={updatedReception.fullName}
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
                                            defaultValue={dayjs(
                                                updatedReception.birthDay,
                                                dateFormat
                                            )}
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
                                            value={updatedReception.email}
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
                                            value={updatedReception.idcard}
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
                                            value={updatedReception.address}
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
                                            value={updatedReception.phone}
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
                                title="Create Receptionist"
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
                                            value={createReception.fullName}
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
                                            value={createReception.birthDay}
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
                                            value={createReception.idcard}
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
                                            value={createReception.address}
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
                                            value={createReception.phone}
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
