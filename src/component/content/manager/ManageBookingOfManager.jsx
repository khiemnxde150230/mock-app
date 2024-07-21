import { useEffect, useState } from "react";
// import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import "../../css/toolTip.css";
import { handleValidationDate } from '../../../assests/js/handleValidationDate.js'

import Footer from "../../admin/Footer";
import HeaderAdmin from "../../admin/Header";
import SiderAdmin from "../../admin/Sider";

import {
    EditOutlined,
    DeleteOutlined,
    HomeTwoTone,
    ClockCircleOutlined,
    LoginOutlined,
    HomeOutlined,
    WalletOutlined,
    LogoutOutlined,
    CheckCircleOutlined,
    CarryOutOutlined
} from "@ant-design/icons";
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Table,
    Input,
    Modal,
    Form,
    Row,
    Col,
    Card,
    Timeline,
    Tooltip,
    Select,
    notification,
} from "antd";
import { SearchOutlined, DollarOutlined} from "@ant-design/icons";
import { DatePicker, Space, Button } from "antd";
import dayjs from "dayjs";

const { Content, Sider } = Layout;

export default function ManageBookingOfManager() {
    const dayFormat = "YYYY-MM-DD";

    //Div view Detail khi hover từng record
    const customTooltip = (data) => {
        const getStatusText = (status) => {
            if (status == 0) {
                return "Unpaid";
            } else if (status == 1) {
                return "Paid";
            } else {
                return "Cancel";
            }
        };
        const refundOrUnpaidLabel = (priceDifference) => {
            if(priceDifference < 0){
                return "Refund"
            } else{
                return "Unpaid"
            } 
        } 
        const priceDifferenceChildren = (priceDifference) => {
            if (priceDifference < 0){
                return priceDifference * (-1)
            } else if (priceDifference > 0) {
                return priceDifference
            } else {
                return "0";
            }
        }
        return (
            <Card
                style={{
                    width: "400px",
                }}
                title="Booking Details"
            >
                <Timeline
                    mode={"left"}
                    items={[
                        {
                            label: "Create Date",
                            children: data.createDate,
                            dot: <ClockCircleOutlined />,
                            color: "blue",
                        },
                        {
                            label: "Check In",
                            children: data.checkIn,
                            dot: <LoginOutlined />,
                            color: "orange",
                        },
                        {
                            label: "Check Out",
                            children: data.checkOut,
                            dot: <LogoutOutlined />,
                            color: "purple",
                        },
                        {
                            label: "Room Name",
                            children: data.roomName.map((item) => {
                                return <div>{item}</div>;
                            }),
                            dot: <HomeOutlined />,
                            color: "black",
                        },
                        {
                            label: "Paid",
                            children: "$" + data.totalPrice,
                            dot: <WalletOutlined />,
                            color: "green",
                        },
                        {
                            label: refundOrUnpaidLabel(data.priceDifference),
                            children: "$" + priceDifferenceChildren(data.priceDifference),
                            dot: <DollarOutlined />,
                            color: "purple",
                        },
                        {
                            label: "Booking Status",
                            children: getStatusText(data.status),
                            dot: <CheckCircleOutlined />,
                            color: "red",
                        },
                    ]}
                />
            </Card>
        );
    };
    const CustomRow = (properties) => {
        if (properties.children[0] != undefined) {
            let rowData = properties.children[0].props.record;
            let tooltip = customTooltip(rowData);
            return (
                <Tooltip
                    title={tooltip}
                    color={"#fff"}
                    key={"#fff"}
                    placement="topLeft"
                >
                    <tr {...properties} />
                </Tooltip>
            );
        }
        return <tr {...properties} />;
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //Hien thi thong bao khi update/changestatus
    const [api, contextHolder] = notification.useNotification();
    const openNotificationUpdate = (placement) => {
        api.success({
            message: `Notification`,
            description: "Update Booking Status Successfully",
            placement,
        });
    };
    // const openNotificationCancel = (placement) => {
    //     api.error({
    //         message: `Notification`,
    //         description: "Booking Status has been canceled",
    //         placement,
    //     });
    // };

    //Khai bao cot trong table
    const columns = [
        {
            title: "ID",
            width: 100,
            dataIndex: "bookingId",
            key: 1,
            fixed: "left",
        },
        {
            title: "Customer Name",
            width: 100,
            dataIndex: "fullName",
            key: "2",
            fixed: "left",
            width: 180,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        placeholder="Type fullname"
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
            title: "Email",
            width: 150,
            dataIndex: "email",
            key: 3,
            fixed: "left",
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
            width: 150,
            dataIndex: "phone",
            key: 4,
            fixed: "left",
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
                return record.phone.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "Create Date",
            dataIndex: "createDate".toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }),
            key: 5,
            width: 150,
        },
        {
            title: "Check In",
            dataIndex: "checkIn",
            key: 6,
            width: 150,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        type="date"
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
                return record.checkIn.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "Check Out",
            dataIndex: "checkOut",
            key: 7,
            width: 150,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <Input
                        autoFocus
                        type="date"
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
                return record.checkOut.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: 8,
            width: 150,
            render: (record) => {
                if (record == "0") {
                    return "Unpaid";
                } else if (record == "1") {
                    return "Paid";
                } else {
                    return "Cancel";
                }
            },
        },
        {
            title: "Action",
            key: 10,
            fixed: "right",
            width: 100,
            render: (record) => {
                return (
                    <>
                        <Button
                            style={{ display: record.style }}
                            onClick={() => handleEdit(record)}
                            type="primary"
                            icon={<EditOutlined />}
                        ></Button>
                        &nbsp;
                        {record.status === "0" ? (
                            <Button
                                onClick={() => handleChangeStatus(record)}
                                type="primary"
                                style={{ background: 'green' }}
                                icon={<CarryOutOutlined />}
                            ></Button>
                        ) : (
                            <></>
                        )}
                    </>
                );
            },
        },
    ];

    //Pop up/ Pop off form Modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    //useState cho ô input form Modal
    const [editData, setEditData] = useState({
        editBookingID: "",
        editCustomerName: "",
        editEmail: "",
        editPhoneNumber: "",
        editCreateDate: "",
        editCheckIn: "",
        editCheckOut: "",
        editStatus: "",
        editDisable: "",
        editTotalPrice: "",
    });

    //useState input error cho form Modal
    const [errors, setErrors] = useState({
        editCheckIn: "",
        editCheckOut: "",
    });

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const handleInputChange = (date, name) => {
        console.log(editData.disable)
        setEditData({
            ...editData,
            [name]: formatDate(date, dayFormat),
        });
    };

    //call api lay list booking
    const getData = () => {
        const url = process.env.REACT_APP_SERVER_HOST + "ManageBooking";
        const cleanedUrl = url.replace(/`/g, "");
        axios
            .get(cleanedUrl)
            .then((result) => {
                setDataSource(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //Cancel mot booking
    const handleChangeStatus = (record) => {
        const status = "1";
        const bookingId = record.bookingId;
        const url =
            process.env.REACT_APP_SERVER_HOST +
            "ManageBooking/" +
            bookingId +
            "?status=" +
            status;
        const cleanedUrl = url.replace(/`/g, "");
        // const url = `https://localhost:7023/api/ManageBooking/${bookingId}?status=${status}`

        const displayTitle = (record) => {
            if(record.priceDifference > 0) {
                return "Has customer already paid: $" + record.priceDifference + "?"
            } else if (record.priceDifference < 0) {
                return "Has hotel already refunded: $" + record.priceDifference*(-1) + "?"
            } else {
                return "Has customer already paid: $" + record.totalPrice + "?"
            }
        } 
        Modal.confirm({
            title: displayTitle(record),
            okText: "Confirm",
            okType: "default",
            onOk: () => {
                axios.post(cleanedUrl).then((result) => {
                    getData();
                    openNotificationUpdate("topRight");
                });
            },
            cancelText: "Close",
            onCancel: () => { },
        });
    };

    //Hien thi booking information
    const handleEdit = (record) => {
        const statusString = record.status == "0" ? "Unpaid" : "Paid";
        handleShow();
        setEditData({
            editBookingID: record.bookingId,
            editCustomerName: record.fullName,
            editEmail: record.email,
            editPhoneNumber: record.phone,
            editCreateDate: record.createDate,
            editCheckIn: record.checkIn,
            editCheckOut: record.checkOut,
            editStatus: statusString,
            editDisable: record.disable,
            editTotalPrice: record.totalPrice,
        });
        console.log(statusString);
    };

    //Update lai checkIn/checkOut/Status
    const handleUpdateGuest = () => {
        let errors = {};
        const id = editData.editBookingID;
        const url =
            process.env.REACT_APP_SERVER_HOST +
            "ManageBooking/" +
            id +
            "?checkIn=" +
            formatDate(editData.editCheckIn) +
            "&checkOut=" +
            formatDate(editData.editCheckOut) +
            "&status=" +
            "0" + 
            "&totalPrice="
            + editData.editTotalPrice;
        const cleanedUrl = url.replace(/`/g, "");
        handleValidationDate(editData, errors);
        if (Object.keys(errors).length === 0) {
            axios
                .put(cleanedUrl)
                .then((result) => {
                    getData();
                    setErrors([]);
                    openNotificationUpdate("topRight");
                    handleClose();
                })
                .catch((errors) => { });
        } else {
            setErrors(errors);
        }
    };

    //format Datetime with time (12:00:00:000) value
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear().toString().padStart(4, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hours = "14";
        const minutes = "00";
        const seconds = "00";
        const milliseconds = "000";

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

        return formattedDate;
    };

    //nhận giá trị status
    // const handleChange = (value) => {
    //     setEditData({
    //         editBookingID: editData.editBookingID,
    //         editCustomerName: editData.editCustomerName,
    //         editEmail: editData.editEmail,
    //         editPhoneNumber: editData.editPhoneNumber,
    //         editCreateDate: editData.editCreateDate,
    //         editCheckIn: editData.editCheckIn,
    //         editCheckOut: editData.editCheckOut,
    //         editStatus: value,
    //         editDisable: editData.disable,
    //     });
    // };


    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <SiderAdmin />
            <Layout className="site-layout">
                <HeaderAdmin />
                {contextHolder}
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
                        <Breadcrumb.Item>Manager</Breadcrumb.Item>
                        <Breadcrumb.Item>Booking</Breadcrumb.Item>
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
                                Booking List
                            </h1>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            scroll={{
                                x: 1500,
                                y: 600,
                            }}
                            components={{
                                body: {
                                    row: CustomRow,
                                },
                            }}
                        />
                        <Modal
                            title="Update booking information"
                            visible={show}
                            okText="Save Change"
                            onCancel={() => { handleClose(); setErrors([]) }}
                            onOk={() => handleUpdateGuest()}
                        >
                            <Form style={{ marginTop: "20px" }}>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Customer Name: </label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                value={editData.editCustomerName}
                                                name="editCustomerName"
                                                disabled
                                            />
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Email:</label>
                                            <Input
                                                type="email"
                                                className="form-control"
                                                value={editData.editEmail}
                                                name="editEmail"
                                                disabled
                                            />
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>PhoneNumber:</label>
                                            <Input
                                                type="phonenumber"
                                                className="form-control"
                                                value={editData.editPhoneNumber}
                                                name="editPhoneNumber"
                                                disabled
                                            />
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Create Date:</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                value={editData.editCreateDate}
                                                name="editCreateDate"
                                                disabled
                                            />
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Check In:</label>
                                            <DatePicker
                                                className="form-control"
                                                style={{ width: "100%" }}
                                                value={dayjs(editData.editCheckIn, dayFormat)}
                                                onChange={(date) =>
                                                    handleInputChange(date, "editCheckIn")
                                                }
                                                name="editCheckIn"
                                                disabled={editData.editDisable}
                                            />
                                            {errors.editCheckIn && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.editCheckIn}
                                                </div>
                                            )}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Check Out:</label>
                                            <DatePicker
                                                className="form-control"
                                                style={{ width: "100%" }}
                                                value={dayjs(editData.editCheckOut, dayFormat)}
                                                onChange={(date) =>
                                                    handleInputChange(date, "editCheckOut")
                                                }
                                                name="editCheckOut"
                                            />
                                            {errors.editCheckOut && (
                                                <div
                                                    className="invalid-feedback"
                                                    style={{ display: "block", color: "red" }}
                                                >
                                                    {errors.editCheckOut}
                                                </div>
                                            )}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <label>Status:</label> &nbsp;
                                        <Input
                                            type="text"
                                            className="form-control"
                                            value={editData.editStatus}
                                            name="editCreateDate"
                                            disabled
                                        />
                                        {/* <Select
                                            value={editData.editStatus}
                                            style={{
                                                width: 200,
                                            }}
                                            onChange={handleChange}
                                            options={[
                                                {
                                                    options: [
                                                        {
                                                            label: "Paid",
                                                            value: "1",
                                                        },
                                                        {
                                                            label: "Unpaid",
                                                            value: "0",
                                                        },
                                                    ],
                                                },
                                            ]}
                                        /> */}
                                    </Col>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
}
