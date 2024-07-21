import { useState, useEffect } from "react"
import axios from "axios";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Footer from "../../admin/Footer"
import HeaderAdmin from "../../admin/Header"
import SiderAdmin from "../../admin/Sider";
import '../../../assests/css/ant-custom.css'
import ImgCrop from "antd-img-crop";
import { EditOutlined, DeleteOutlined, HomeTwoTone, HomeOutlined, WalletOutlined, CheckCircleOutlined, MinusOutlined, UploadOutlined, SearchOutlined, FileImageOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Table, Input, Modal, Form, Row, Col, Card, Timeline, Tooltip, Select, Button, Upload, Image, notification } from 'antd';
import TextArea from "antd/es/input/TextArea";

const { Content, Sider } = Layout;

export default function ManageRoom() {

    const [imagesStatus, setImagesStatus] = useState(false)

    const [fileList, setFileList] = useState([]);

    const uploadProps = {
        name: 'file',
        maxCount: 3,
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            return false;
        },
        onChange(info) {
            setImagesStatus(true)
            setFileList(info.fileList)
        },
        fileList: fileList
    };

    const [editData, setEditData] = useState({
        categoryId: '',
        categoryName: '',
        roomId: '',
        roomName: '',
        price: '',
        image: '',
        description: '',
        status: ''
    });

    const [errors, setErrors] = useState({
        categoryId: '',
        categoryName: '',
        roomId: '',
        roomName: '',
        price: '',
        image: '',
        description: '',
        status: ''
    })

    //Div view Detail
    const customTooltip = (_data) => {
        const data = _data.roomInfo;
        return (
            <Card
                style={{
                    width: '300px',
                }}
                title="Room Details"
            >
                <Timeline
                    mode={'left'}
                    items={[
                        {
                            label: "Room Id",
                            children: data.roomId,
                            dot: <MinusOutlined />,
                            color: 'blue',
                        },
                        {
                            label: "Room Name",
                            children: data.roomName,
                            dot: <HomeOutlined />,
                            color: 'orange',
                        },
                        {
                            label: "Room Type",
                            children: data.categoryName,
                            dot: <MinusOutlined />,
                            color: 'purple',
                        },
                        {
                            label: 'Price',
                            children: data.price,
                            dot: <WalletOutlined />,
                            color: 'black',
                        },
                        {
                            label: 'Image',
                            children:
                                _data.images.map(i =>
                                    <Image
                                        width={50}
                                        src={i.image}
                                    />)
                            ,
                            dot: <FileImageOutlined />,
                            color: 'black',
                        },
                        {
                            label: "Status",
                            children: data.status ? "Enable" : "Disable",
                            dot: <CheckCircleOutlined />,
                            color: 'red',
                        }
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
                <Tooltip title={tooltip} color={'#fff'} key={'#fff'} placement="topLeft">
                    <tr {...properties} />
                </Tooltip>
            );
        }
        return <tr {...properties} />;
    }

    function handleValidation(editData, errors) {

        const regex = /^[a-zA-Z0-9\s]+$/u;

        if (editData.roomName == '') {

            errors.roomName = "Room name can not be blank";

        }

        else {

            if (editData.roomName.length < 3) errors.roomName = "Invalid Room Name";

            if (editData.roomName.length > 20) errors.roomName = "Invalid Room Name";

            if (!regex.test(editData.roomName)) errors.roomName = "Room Name can not contain special chracters";

        }

        if (editData.price == '') {

            errors.price = "Price can not be blank";

        }

        else {

            if (editData.price < 10) errors.price = "The lowest price for the room is 10 USD";

            if (editData.price > 10000) errors.price = "The maximum price of the room is 10000 USD";

        }

        if (editData.categoryId == '') {

            errors.categoryId = "Room type can not be blank";

        }

        if (editData.status === '') {

            errors.status = "Status can not be blank";

        }

        if (editData.description > 200) {

            errors.description = "The maximum length of description is 200 characters";

        }

        // if (fileList.length == 0) {

        //     errors.image = "Image can not be blank";

        // }

        if (editData.categoryName == "" || editData.categoryName == undefined) {
            errors.categoryName = "Room type can not be blank"
        }

    }

    //Hien thi thong bao khi update/changestatus
    const openNotificationUpdate = (placement) => {
        notification.success({
            message: `Notification`,
            description:
                'Room Information has been updated',
            placement,
            duration: 2
        });
    };

    const openNotificationCreate = (placement) => {
        notification.success({
            message: `Notification`,
            description:
                'Successful create new Room',
            placement,
            duration: 2
        });
    };

    const openNotificationDisable = (placement) => {
        notification.success({
            message: `Notification`,
            description:
                'Room Status has been disable',
            placement,
            duration: 2
        });
    };

    const openNotificationError = (placement) => {
        notification.error({
            message: `Have something wrong. Try it later`,
            placement,
            duration: 2
        });
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    //Khai bao cot trong table
    const columns = [
        {
            title: 'Room Id',
            width: 100,
            dataIndex: ['roomInfo', 'roomId'],
            key: 'roomId',
            fixed: 'left',
        },
        {
            title: 'Room Name',
            width: 100,
            dataIndex: ['roomInfo', 'roomName'],
            key: 'roomName',
            fixed: 'left',
        },
        {
            title: 'Room Type',
            dataIndex: ['roomInfo', 'categoryName'],
            key: 'categoryName',
            width: 150,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return <Select
                    value={selectedKeys[0]}
                    style={{
                        width: 150,
                    }}
                    onChange={(e) => {
                        setSelectedKeys(e ? [e] : [])
                        confirm()
                    }}
                    onBlur={() => { confirm() }}
                    options={[
                        {
                            label: "All",
                            name: "All",
                            value: "All",
                        }
                        ,
                        {
                            options: roomTypes.map(item => {
                                return {
                                    label: item.categoryName,
                                    name: item.categoryName,
                                    value: item.categoryId,
                                }
                            })
                        }
                    ]}
                />
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, _record) => {
                const record = _record.roomInfo
                if (value == "All") return record.categoryName
                return record.categoryId == value ? record.categoryName : ''
            },
        },
        {
            title: 'Price',
            dataIndex: ['roomInfo', 'price'],
            key: 'price',
            width: 150,
        },
        {
            title: 'Status',
            width: 150,
            render: (record) => {
                return (
                    <>
                        {record.roomInfo.status === true ? "Enable" : "Disable"}
                    </>
                )
            }
        },
        {
            title: 'Action',
            fixed: 'right',
            width: 100,
            render: (record) => {
                return (
                    <>
                        {/* <EditOutlined onClick={() => handleEdit(record)} /> &nbsp; */}
                        <Button
                            onClick={() => handleEdit(record)}
                            type="primary"
                            icon={<EditOutlined />}
                        ></Button>&nbsp;
                        {record.roomInfo.status === true ? <Button type='primary' icon={<DeleteOutlined />} danger onClick={() => handleChangeStatus(record)}></Button>: <></>}
                    </>
                )
            }
        }
    ];

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        handleCloseModal();
    }

    const [showCreate, setShowCreate] = useState(false);
    const handleShowCreate = () => setShowCreate(true);
    const handleCloseCreate = () => {
        setShowCreate(false);
        handleCloseModal();
    }

    const handleInputChange = (event) => {
        if (event === true || event === false) {
            setEditData((preData) => ({ ...preData, status: event }));
        }
        else {
            if (event.target === undefined) {
                setEditData((preData) => ({ ...preData, categoryId: event }));
                roomTypes.forEach(item => {
                    if (item.categoryId == event)
                        setEditData((preData) => ({ ...preData, categoryName: item.categoryName }));
                });
            }
            else {
                const field = event.target.name;
                const value = event.target.value;
                setEditData((preData) => ({ ...preData, [field]: value }));
            }
        }
    }

    const [roomTypes, setRoomTypes] = useState([])
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        getData();
        getRoomType()
    }, [])

    //call api lấy danh sách room 
    const getData = () => {
        const url = process.env.REACT_APP_SERVER_HOST + 'Manager/GetRooms'
        axios.get(url)
            .then((result) => {
                setDataSource(result.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getRoomType = () => {
        const url = process.env.REACT_APP_SERVER_HOST + 'Manager/GetCategories'
        axios.get(url)
            .then((result) => {
                const _roomtypes = []
                result.data.map((item) => {
                    _roomtypes.push(item)
                })
                setRoomTypes(_roomtypes);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleChangeStatus = (_record) => {

        const record = _record.roomInfo
        const data = {
            'roomId': record.roomId,
            'roomName': record.roomName,
            'status': record.status
        }

        const url = process.env.REACT_APP_SERVER_HOST + `Manager/DeleteRoom/${data.roomId}`;

        Modal.confirm({
            title: "Do you want to disable room: " + data.roomName + " ?",
            okText: "Disable",
            okType: "danger",
            onOk: () => {
                axios.patch(url, data).then((result) => {
                    getData();
                    if (result.data.status) openNotificationError('topRight')
                    else openNotificationDisable('topRight')
                }).catch((error) => {
                    console.log(error);
                })
            },
            cancelText: "Close",
            onCancel: () => {
            }
        });
    }

    const handleEdit = (_record) => {
        var record = _record.roomInfo;
        handleShow();
        setEditData({
            roomId: record.roomId,
            roomName: record.roomName,
            categoryId: record.categoryId,
            categoryName: record.categoryName,
            price: record.price,
            description: record.description,
            status: record.status,
        })
        setFileList(roomImgsSelected(_record.images))
    }

    const handleCreateRoom = async () => {
    const formData = new FormData();
    let errors = {};
    handleValidation(editData, errors)
    const imgs_url = [];
    if (fileList.length != 0 && Object.keys(errors).length === 0) {
        await Promise.all(fileList.map(async (item) => {
            const storageRef = ref(storage, `images/${item.originFileObj.name}`);
            await uploadBytes(storageRef, item.originFileObj)
                .then(async (snapshot) => {
                    const imgUrl = await getDownloadURL(snapshot.ref);
                    imgs_url.push(imgUrl);
                })
                .catch((err) => {
                    console.log(err);
                });
        }));

        const data = {
            'room': {
                'categoryId': editData.categoryId,
                'roomName': editData.roomName,
                'price': editData.price,
                'description': editData.description,
                'status': editData.status
            },
            'images': imgs_url,
        };

        const url = process.env.REACT_APP_SERVER_HOST + `Manager/AddRoom`;

        setTimeout(() => {
            axios.post(url, data)
                .then((result) => {
                    getData();
                    setErrors([])
                    openNotificationCreate('topRight')
                }).catch((error) => {
                    getData();
                    openNotificationError('topRight')
                });
            handleCloseCreate();
        }, 3000);
    } else {
        setErrors(errors);
    }
};

    const UpdateRoomAPI = async (url, data) => {

        await axios.patch(url, data)

            .then((result) => {

                getData();

                setErrors([])

                openNotificationUpdate('topRight')

            }).catch((error) => {

                getData();

                openNotificationError('topRight')

            })

        handleClose()

    }

    const handleUpdateRoom = async () => {
        const formData = new FormData();
        let errors = {};
        handleValidation(editData, errors);
        const imgs_url = [];
    
        if (imagesStatus == true && Object.keys(errors).length === 0) {
            await Promise.all(fileList.map(async (item) => {
                if (!item.originFileObj) {
                    imgs_url.push(item.url);
                } else {
                    const storageRef = ref(storage, `images/${item.originFileObj.name}`);
                    await uploadBytes(storageRef, item.originFileObj)
                        .then(async (snapshot) => {
                            const imgUrl = await getDownloadURL(snapshot.ref);
                            imgs_url.push(imgUrl);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }));
    
            const data = {
                'room': {
                    'roomId': editData.roomId,
                    'categoryId': editData.categoryId,
                    'roomName': editData.roomName,
                    'price': editData.price,
                    'description': editData.description,
                    'status': editData.status
                },
                'images': imgs_url,
            };
    
            const url = process.env.REACT_APP_SERVER_HOST + `Manager/UpdateRoom/${editData.roomId}`;
    
            setTimeout(() => {
                UpdateRoomAPI(url, data);
            }, 3000);
    
        } else if (imagesStatus == false && Object.keys(errors).length === 0) {
            fileList.forEach((item) => {
                if (!item.originFileObj) {
                    imgs_url.push(item.url);
                }
            });
            const data = {
                'room': {
                    'roomId': editData.roomId,
                    'categoryId': editData.categoryId,
                    'roomName': editData.roomName,
                    'price': editData.price,
                    'description': editData.description,
                    'status': editData.status
                },
                'images': imgs_url,
            };
    
            const url = process.env.REACT_APP_SERVER_HOST + `Manager/UpdateRoom/${editData.roomId}`;
    
            setTimeout(() => {
                UpdateRoomAPI(url, data);
            }, 3000);
        } else {
            setErrors(errors);
        }
    };

    const handleCloseModal = () => {
        setEditData({
            roomId: '',
            roomName: '',
            categoryName: '',
            price: '',
            image: '',
            description: '',
            status: '',
        })
        setImagesStatus(false)
        setFileList([])
        setErrors({
            roomId: '',
            roomName: '',
            categoryName: '',
            price: '',
            image: '',
            description: '',
            status: '',
        })
    }

    const roomTypeSelect = () => {
        var arr = [];
        roomTypes.map(item => {
            arr.push({
                label: item.categoryName,
                name: 'categoryName',
                value: item.categoryId,
            });
        })
        return arr;
    }

    const roomImgsSelected = (data) => {
        var arr = [];
        data.map(item => {
            arr.push({
                label: item.roomId,
                name: 'Room Image',
                url: item.image,
            });
        })
        return arr;
    }

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
                        <Breadcrumb.Item><HomeTwoTone className="mr-1" />Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Manager</Breadcrumb.Item>
                        <Breadcrumb.Item>Room</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <div>
                            <h1 style={{ textAlign: "center", fontSize: "30px", marginBottom: "20px" }}>Manage Room</h1>
                        </div>
                        <Button type="primary" onClick={handleShowCreate} style={{marginBottom:'10px'}}>
                            Create new room
                        </Button>
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            components={{
                                body: {
                                    row: CustomRow
                                }
                            }}
                        />
                        <Modal
                            title="Modify / Update room information"
                            visible={show}
                            okText="Save Changes"
                            onCancel={() => handleClose()}
                            onOk={handleUpdateRoom}
                            style={{ marginTop: "-90px" }}
                        >
                            <Form style={{ marginTop: "20px" }}>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Room Id: </label>
                                            <Input type="text" className="form-control" value={editData.roomId} disabled />
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Room Name:</label>
                                            <Input type="email" className="form-control" value={editData.roomName} name="roomName" onChange={handleInputChange} />
                                            {errors.roomName && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.roomName}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label>Room Type:</label>
                                            <Select
                                                value={editData.categoryName}
                                                name="categoryName"
                                                style={{
                                                    width: '100%',
                                                }}
                                                onChange={handleInputChange}
                                                options={[
                                                    {
                                                        options: roomTypeSelect()
                                                    }
                                                ]}
                                            />
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label>Price: </label>
                                            <Input
                                                type="number"
                                                name="price"
                                                value={editData.price}
                                                className="form-control"
                                                onChange={handleInputChange}
                                                style={{ width: '100%' }}
                                            />
                                            {errors.price && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.price}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'start', width: '100%', flexDirection: 'column' }}>
                                            <label>Room Image: </label>
                                            <ImgCrop rotationSlider>
                                                <Upload {...uploadProps}
                                                    listType="picture"
                                                    fileList={[...fileList]}
                                                >
                                                    {fileList.length < 3 ? <Button icon={<UploadOutlined />}>Click to Upload</Button> : <></>}
                                                </Upload>

                                            </ImgCrop>

                                            {errors.image && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.image}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Description: </label>
                                            <TextArea rows={3} className="form-control" value={editData.description} name="description" onChange={handleInputChange} />
                                            {errors.description && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.description}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label style={{ marginRight: '20px' }}>Status:</label>
                                            <Select
                                                name="status"
                                                value={editData.status}
                                                style={{
                                                    width: '100%',
                                                }}
                                                onChange={handleInputChange}
                                                options={[
                                                    {
                                                        options: [
                                                            {
                                                                label: 'Enable',
                                                                name: "status",
                                                                value: true,
                                                            },
                                                            {
                                                                label: 'Disable',
                                                                name: "status",
                                                                value: false,
                                                            },
                                                        ],
                                                    }
                                                ]}
                                            />
                                            {errors.status && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.status}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                            </Form>
                        </Modal>

                        <Modal
                            title="Create a new room information"
                            visible={showCreate}
                            okText="Create"
                            onCancel={() => handleCloseCreate()}
                            onOk={handleCreateRoom}
                            style={{ marginTop: "-50px" }}
                        >
                            <Form style={{ marginTop: "20px" }}>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Room Name:</label>
                                            <Input type="email" className="form-control" value={editData.roomName} name="roomName" onChange={handleInputChange} />
                                            {errors.roomName && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.roomName}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label>Room Type:</label>
                                            <Select
                                                value={editData.categoryName}
                                                name="categoryName"
                                                style={{
                                                    width: '100%',
                                                }}
                                                onChange={handleInputChange}
                                                options={[
                                                    {
                                                        options: roomTypeSelect()
                                                    }
                                                ]}
                                            />
                                            {errors.categoryName && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.categoryName}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label>Price: </label>
                                            <Input
                                                type="number"
                                                name="price"
                                                value={editData.price}
                                                className="form-control"
                                                onChange={handleInputChange}
                                                style={{ width: '100%' }}
                                            />
                                            {errors.price && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.price}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'start', width: '100%', flexDirection: 'column' }}>
                                            <label>Room Image: </label>
                                            <ImgCrop rotationSlider>
                                                <Upload {...uploadProps}
                                                    listType="picture"
                                                    fileList={[...fileList]}
                                                >
                                                    {fileList.length < 3 ? <Button icon={<UploadOutlined />}>Click to Upload</Button> : <></>}
                                                </Upload>
                                            </ImgCrop>
                                            {errors.image && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.image}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Description: </label>
                                            <TextArea rows={3} className="form-control" value={editData.description} name="description" onChange={handleInputChange} />
                                            {errors.description && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.description}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label style={{ marginRight: '20px' }}>Status:</label>
                                            <Select
                                                name="status"
                                                value={editData.status}
                                                style={{
                                                    width: '100%',
                                                }}
                                                onChange={handleInputChange}
                                                options={[
                                                    {
                                                        options: [
                                                            {
                                                                label: 'Enable',
                                                                name: "status",
                                                                value: true,
                                                            },
                                                            {
                                                                label: 'Disable',
                                                                name: "status",
                                                                value: false,
                                                            },
                                                        ],
                                                    }
                                                ]}
                                            />
                                            {errors.status && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.status}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </Content>
                <Footer />
            </Layout>
        </Layout >
    )
}
