import { useState, useEffect } from "react"
import axios from "axios";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import FooterManager from "../../admin/Footer"
import HeaderManager from "../../admin/Header"
import SiderManager from "../../admin/Sider";
import '../../../assests/css/ant-custom.css'
import ImgCrop from "antd-img-crop";

import { EditOutlined, DeleteOutlined, HomeTwoTone, HomeOutlined, FullscreenOutlined, CheckCircleOutlined, MinusOutlined, UploadOutlined, FileImageOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Table, Input, Modal, Form, Row, Col, Card, Timeline, Tooltip, Select, Button, Image, InputNumber, Upload, notification } from 'antd';
import TextArea from "antd/es/input/TextArea";

const { Content, Sider } = Layout;

export default function ManageRoomType() {

    const [imageData, setImageData] = useState({
        status: false,
        originFileObj: '',
    })

    const [fileList, setFileList] = useState([])

    const uploadProps = {
        name: 'file',
        maxCount: 1,
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload: (file) => {
            return false;
        },
        onChange(info) {
            console.log(info);
            if (info.fileList.length !== 0) {
                setImageData({
                    status: true,
                    originFileObj: info.file,
                })
                setFileList(info.fileList)
            }
            else {
                setImageData({
                    status: false,
                    originFileObj: '',
                })
                setFileList([])
                setEditData((preData) => ({ ...preData, image: '' }));
            }
        },
    };

    const [editData, setEditData] = useState({
        categoryId: '',
        categoryName: '',
        maxPeople: '',
        size: '',
        image: '',
        description: '',
        status: '',
        rooms: []
    });

    const [errors, setErrors] = useState({
        categoryId: '',
        categoryName: '',
        maxPeople: '',
        size: '',
        image: '',
        description: '',
        status: '',
    })
    //Div view Detail
    const customTooltip = (data) => {
        return (
            <Card
                style={{
                    width: '500px',
                }}
                title="Room Type Details"
            >
                <Timeline
                    mode={'left'}
                    items={[
                        {
                            label: "Room Type Id",
                            children: data.categoryId,
                            dot: <MinusOutlined />,
                            color: 'blue',
                        },
                        {
                            label: "Room Type Name",
                            children: data.categoryName,
                            dot: <HomeOutlined />,
                            color: 'orange',
                        },
                        {
                            label: "Max People",
                            children: data.maxPeople,
                            dot: <MinusOutlined />,
                            color: 'purple',
                        },
                        {
                            label: `Room Size`,
                            children: data.size,
                            dot: <FullscreenOutlined />,
                            color: 'black',
                        },
                        {
                            label: 'Room Image',
                            children: <Image
                                width={50}
                                src={data.image}
                            />,
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
    //

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
        if (editData.categoryName == '') {

            errors.categoryName = "Room Type name can not be blank";

        }

        else {

            if (editData.categoryName.length < 3) errors.categoryName = "Invalid Room Type Name";

            if (editData.categoryName.length > 20) errors.categoryName = "Invalid Room Type Name";

            if (!regex.test(editData.categoryName)) errors.categoryName = "Room Type Name can not contain special chracters";

        }

        if (editData.maxPeople == '') {

            errors.maxPeople = "Max quantity of guest can not be blank";

        }

        else {

            if (editData.maxPeople < 2) errors.maxPeople = "Invalid quantity, minimum is 2";

            if (editData.maxPeople > 10) errors.maxPeople = "Invalid quantity, maximum is 10";

        }

        if (editData.size == '') {

            errors.size = "Room Size can not be blank";

        }

        else {

            if (editData.size < 25) errors.size = "Invalid room size, minimum is 25";

            if (editData.size > 100) errors.size = "Invalid room size, maximum is 100";

        }

        if (editData.status === '') {

            errors.status = "Status must be non-empty";

        }

        if (editData.image == '' && imageData.status == false) {

            errors.image = "Image must be non-empty";

        }

    }

    //Hien thi thong bao khi update/changestatus
    const openNotificationUpdate = (placement) => {
        notification.success({
            message: `Notification`,
            description:
                'Room Type Information has been updated',
            placement,
            duration: 2
        });
    };

    const openNotificationCreate = (placement) => {
        notification.success({
            message: `Notification`,
            description:
                'Successful create new Room Type',
            placement,
            duration: 2
        });
    };

    const openNotificationDisable = (placement) => {
        notification.success({
            message: `Notification`,
            description:
                'Room type Status has been disable',
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
            title: 'Room Type Id',
            width: 100,
            dataIndex: 'categoryId',
            key: 'categoryId',
            fixed: 'left',
        },
        {
            title: 'Room Type Name',
            width: 150,
            dataIndex: 'categoryName',
            key: 'categoryName',
            fixed: 'left',
        },
        {
            title: 'Max People',
            dataIndex: 'maxPeople',
            key: 'maxPeople',
            width: 100,
        },
        {
            title: 'Room size',
            dataIndex: 'size',
            key: 'size',
            width: 150,
        },
        {
            title: 'Status',
            width: 150,
            render: (record) => {
                return (
                    <>
                        {record.status === true ? "Enable" : "Disable"}
                    </>
                )
            }
        },
        {
            title: 'Action',
            key: 10,
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
                        {record.status === true ? <Button type='primary' icon={<DeleteOutlined />} danger onClick={() => handleChangeStatus(record)}></Button>: <></>}

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
        if (event == true || event == false) {
            setEditData((preData) => ({ ...preData, status: event }));
        }
        else {
            const field = event.target.name;
            const value = event.target.value;

            setEditData((preData) => ({ ...preData, [field]: value }));
        }
    }

    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        getData();
    }, [])

    //call api lấy danh sách room type
    const getData = () => {
        const url = process.env.REACT_APP_SERVER_HOST + 'Manager/GetCategories'
        axios.get(url)
            .then((result) => {
                setDataSource(result.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleChangeStatus = (record) => {

        const data = {
            'categoryId': record.categoryId,
            'categoryName': record.categoryName,
            'status': record.status
        }

        const url = process.env.REACT_APP_SERVER_HOST + `Manager/DeleteCategory/${data.categoryId}`;

        Modal.confirm({
            title: "Are you sure to disable room type: " + data.categoryName + " ?",
            okText: "Disable",
            okType: "danger",
            onOk: () => {
                axios.patch(url, data).then((result) => {
                    getData();
                    openNotificationDisable('topRight')
                }).catch((error) => {
                    console.log(error);
                })
            },
            cancelText: "Cancel",
            onCancel: () => {
            }
        });
    }

    const handleEdit = (record) => {
        handleShow();
        setEditData({
            categoryId: record.categoryId,
            categoryName: record.categoryName,
            maxPeople: record.maxPeople,
            size: record.size,
            image: record.image,
            description: record.description,
            status: record.status,
        })
        setFileList([{
            uid: record.image,
            name: record.categoryName,
            status: 'done',
            url: record.image
        }])
    }

    const handleCreateRoomType = async () => {
        const formData = new FormData();
        let errors = {};
        handleValidation(editData, errors);
    
        if (imageData.status && Object.keys(errors).length === 0) {
            const imageFile = imageData.originFileObj;
    
            try {
                // Upload to Firebase Storage
                const storageRef = ref(storage, `images/${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                const imgUrl = await getDownloadURL(snapshot.ref);
    
                const data = {
                    'categoryName': editData.categoryName,
                    'maxPeople': editData.maxPeople,
                    'size': editData.size,
                    'image': imgUrl,
                    'description': editData.description,
                    'status': editData.status
                };
    
                const url = process.env.REACT_APP_SERVER_HOST + `Manager/AddCategory`;
    
                axios.post(url, data)
                    .then((result) => {
                        getData();
                        setErrors([]);
                        openNotificationCreate('topRight');
                    }).catch((error) => {
                        getData();
                        openNotificationError('topRight');
                    });
    
                handleCloseCreate();
            } catch (e) {
                console.log(e);
            }
        } else {
            setErrors(errors);
        }
    };
    
    const handleUpdateRoomType = async () => {
        const formData = new FormData();
        let errors = {};
        handleValidation(editData, errors);
    
        if (imageData.status && Object.keys(errors).length === 0) {
            const imageFile = imageData.originFileObj;
    
            try {
                // Upload to Firebase Storage
                const storageRef = ref(storage, `images/${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                const imgUrl = await getDownloadURL(snapshot.ref);
    
                const data = {
                    'categoryId': editData.categoryId,
                    'categoryName': editData.categoryName,
                    'maxPeople': editData.maxPeople,
                    'size': editData.size,
                    'image': imgUrl,
                    'description': editData.description,
                    'status': editData.status,
                    'rooms': []
                };
    
                const url = process.env.REACT_APP_SERVER_HOST + `Manager/UpdateCategory/${data.categoryId}`;
    
                axios.patch(url, data)
                    .then((result) => {
                        getData();
                        setErrors([]);
                        openNotificationUpdate('topRight');
                    }).catch((error) => {
                        getData();
                        openNotificationError('topRight');
                    });
    
                handleClose();
            } catch (e) {
                console.log(e);
            }
        } else if (editData.image !== '' && Object.keys(errors).length === 0) {
            const data = {
                'categoryId': editData.categoryId,
                'categoryName': editData.categoryName,
                'maxPeople': editData.maxPeople,
                'size': editData.size,
                'image': editData.image,
                'description': editData.description,
                'status': editData.status,
                'rooms': []
            };
    
            const url = process.env.REACT_APP_SERVER_HOST + `Manager/UpdateCategory/${data.categoryId}`;
    
            axios.patch(url, data)
                .then((result) => {
                    getData();
                    setErrors([]);
                    openNotificationUpdate('topRight');
                }).catch((error) => {
                    getData();
                    openNotificationError('topRight');
                });
    
            handleClose();
        } else {
            setErrors(errors);
        }
    };

    const handleCloseModal = () => {
        setEditData({
            categoryId: '',
            categoryName: '',
            maxPeople: '',
            size: '',
            image: '',
            description: '',
            status: '',
        })
        setImageData({
            status: false,
            originFileObj: '',
        })
        setErrors({
            categoryId: '',
            categoryName: '',
            maxPeople: '',
            size: '',
            image: '',
            description: '',
            status: '',
        })
    }

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <SiderManager />
            <Layout className="site-layout">
                <HeaderManager />
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
                        <Breadcrumb.Item>Room Type</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <div>
                            <h1 style={{ textAlign: "center", fontSize: "30px", marginBottom: "20px" }}>Manage Room Type</h1>
                        </div>
                        <Button type="primary" onClick={handleShowCreate} style={{marginBottom:'10px'}}>
                            Create new room type
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
                            title="Modify / Update room type information"
                            visible={show}
                            okText="Save Changes"
                            onCancel={() => handleClose()}
                            onOk={() => handleUpdateRoomType()}
                            style={{ marginTop: "-90px" }}
                        >
                            <Form style={{ marginTop: "20px" }}>
                                <Form.Item>
                                    <Col>
                                        <Row>
                                            <label>Room Type Id: </label>
                                            <Input type="text" className="form-control" value={editData.categoryId} disabled />
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label>Room Type Name:</label>
                                            <Input type="text" className="form-control" value={editData.categoryName} name="categoryName" onChange={handleInputChange} />
                                            {errors.categoryName && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.categoryName}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label style={{ marginRight: '20px' }}>Max People: </label>
                                            <Input
                                                type="number"
                                                value={editData.maxPeople}
                                                name="maxPeople"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                style={{ width: '100%', }}
                                            />
                                            {errors.maxPeople && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.maxPeople}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label style={{ marginRight: '20px' }}>Room Size: </label>
                                            <Input
                                                type="number"
                                                value={editData.size}
                                                name="size"
                                                className="form-control"
                                                addonAfter={<p>m<sup>2</sup></p>}
                                                onChange={handleInputChange}
                                                style={{ width: '100%', }}
                                            />
                                            {errors.size && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.size}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'start', width: '100%', flexDirection: 'column' }}>
                                            <label>Room Type Image: </label>
                                            <ImgCrop rotationSlider>
                                                <Upload {...uploadProps}
                                                    listType="picture"
                                                    fileList={[...fileList]}
                                                >
                                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
                                                style={{ width: '100%', }}
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
                            title="Create a new room type information"
                            visible={showCreate}
                            okText="Create"
                            onCancel={() => handleCloseCreate()}
                            onOk={() => handleCreateRoomType()}
                            style={{ marginTop: "-50px" }}
                        >
                            <Form style={{ marginTop: "20px" }}>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label>Room Type Name:</label>
                                            <Input type="text" className="form-control" name="categoryName" value={editData.categoryName} onChange={handleInputChange} />
                                            {errors.categoryName && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.categoryName}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label style={{ marginRight: '20px' }}>Max People: </label>
                                            <Input
                                                type="number"
                                                value={editData.maxPeople}
                                                className="form-control"
                                                onChange={handleInputChange}
                                                style={{ width: '100%', }}
                                                name="maxPeople"
                                            />
                                            {errors.maxPeople && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.maxPeople}</div>}
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label style={{ marginRight: '20px' }}>Room Size: </label>
                                            <Input
                                                type="number"
                                                value={editData.size}
                                                className="form-control"
                                                name="size"
                                                addonAfter={<p>m<sup>2</sup></p>}
                                                onChange={handleInputChange}
                                                style={{ width: '100%', }}
                                            />
                                            {errors.size && <div className="invalid-feedback" style={{ display: "block", color: "red" }}>{errors.size}</div>}

                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'start', width: '100%', flexDirection: 'column' }}>
                                            <label>Room Type Image: </label>
                                            <ImgCrop rotationSlider>

                                                <Upload {...uploadProps}
                                                    listType="picture"
                                                >
                                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
                                            <TextArea rows={3} className="form-control" name="description" value={editData.description} onChange={handleInputChange} />
                                        </Row>
                                    </Col>
                                </Form.Item>
                                <Form.Item>
                                    <Col>
                                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                                            <label style={{ marginRight: '20px' }}>Status:</label>
                                            <Select
                                                style={{ width: '100%', }}
                                                value={editData.status}
                                                name="status"
                                                onChange={handleInputChange}
                                                options={[
                                                    {
                                                        options: [
                                                            {
                                                                label: 'Enable',
                                                                value: true,
                                                            },
                                                            {
                                                                label: 'Disable',
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
                <FooterManager />
            </Layout>
        </Layout >
    )
}