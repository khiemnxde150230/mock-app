import { useEffect, useState } from "react";
import axios from "axios";
import { handleValidation } from "../../../assests/js/handleValidation";

import Footer from "../../admin/Footer"
import HeaderAdmin from "../../admin/Header"
import SiderAdmin from "../../admin/Sider";

import { EditOutlined, DeleteOutlined, HomeTwoTone, RadiusUprightOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Table, Input, Modal, Form, notification, Button  } from 'antd';
import { SearchOutlined } from '@ant-design/icons'

const { Content } = Layout;

export default function ManageGuestOfReception() {
    //Hien thi thong bao khi update/changestatus
    const [api, contextHolder] = notification.useNotification();
    const openNotificationUpdate = (placement) => {
      api.success({
          message: `Notification`,
          description: "Update Successfully",
          placement,
      });
  };
  const openNotificationEnable = (placement) => {
      api.success({
          message: `Notification`,
          description: "Change Status Successfully",
          placement,
      });
  };
  const openNotificationDisable = (placement) => {
      api.error({
          message: `Notification`,
          description: "Change Status Successfully",
          placement,
      });
  };

  
    const {
      token: { colorBgContainer },
    } = theme.useToken();
  
    //Khai bao cot trong table
    const columns = [
      {
        title: "ID",
        width: 100,
        dataIndex: "userId",
        key: 1,
        fixed: "left",
      },
      {
        title: "Avatar",
        width: 100,
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
        width: 150,
        dataIndex: "fullName",
        key: 3,
        fixed: "left",
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
            if(record.fullName != null){
                return record.fullName.toLowerCase().includes(value.toLowerCase());
            }
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        key: 4,
        width: 150,
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
        width: 150,
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
            if(record.phone != null){
                return record.phone.toLowerCase().includes(value.toLowerCase());
            }
        },
      },
      {
        title: "IdCard",
        dataIndex: "idcard",
        key: 6,
        width: 150,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: 7,
        width: 150,
        render: (record) => {
          if (record == "0") {
            return "Activated";
          } else if (record == "1") {
            return "Deactivated";
          } else {
            return "Verifying";
          }
        },
      },
      {
        title: "Action",
        key: 8,
        fixed: "right",
        width: 100,
        render: (record) => {
          return (
            <>
              <Button
                onClick={() => handleEdit(record)}
                type="primary"
                icon={<EditOutlined />}
              ></Button>{" "}
            </>
          );
        },
      },
    ];
  
    //Pop up/ Pop off Modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  
    //useState input cho form Modal
    const [editData, setEditData] = useState({
      editID: "",
      editAvatar: "",
      editFullName: "",
      editEmail: "",
      editPhoneNumber: "",
      editIdCard: "",
      editPassword: "",
      editIsActive: "",
    });
  
    //useState input error cho form Modal
    const [errors, setErrors] = useState({
      editFullName: "",
      editPhoneNumber: "",
      editIdCard: "",
    });
  
    //Nhận giá trị thay đổi trong ô input
    const handleInputChange = (event) => {
      const field = event.target.name;
      const value = event.target.value;
  
      setEditData((preData) => ({ ...preData, [field]: value }));
    };
  
    const [dataSource, setDataSource] = useState([]);
  
    useEffect(() => {
      getData();
    }, []);
  
    //call api lấy danh sách guest
    const getData = () => {
      const url = process.env.REACT_APP_SERVER_HOST + "ManageGuest";
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
  
    //hiển thị thông tin chi tiết guest
    const handleEdit = (record) => {
      handleShow();
      setEditData({
        editID: record.userId,
        editAvatar: record.avatar,
        editFullName: record.fullName,
        editEmail: record.email,
        editPhoneNumber: record.phone,
        editIdCard: record.idcard,
        editIsActive: record.status,
        editPassword: record.password,
      });
    };
  
    //chỉnh sửa thông tin guest
    const handleUpdateGuest = () => {
      let errors = {};
      const url =
        process.env.REACT_APP_SERVER_HOST + "ManageGuest/" + editData.editID;
      const cleanedUrl = url.replace(/`/g, "");
      // const url = `https://localhost:7023/api/ManageGuest/${editData.editID}`;
      const data = {
        userID: editData.editID,
        fullName: editData.editFullName,
        email: editData.editEmail,
        phone: editData.editPhoneNumber,
        idCard: editData.editIdCard,
        password: editData.editPassword,
        status: editData.editIsActive,
      };
      handleValidation(editData, errors);
      if (Object.keys(errors).length === 0) {
        axios
          .put(cleanedUrl, data)
          .then((result) => {
            getData();
            setErrors([]);
            openNotificationUpdate("topRight");
            handleClose();
          })
          .catch((error) => {});
      } else {
        setErrors(errors);
      }
    };
  
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
          {/* <ToastContainer /> */}
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
              <Breadcrumb.Item>Guest</Breadcrumb.Item>
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
                  Guest List
                </h1>
              </div>
              <Table
                columns={columns}
                dataSource={dataSource}
                scroll={{
                  x: 1500,
                  y: 500,
                }}
              />
              <Modal
                title="Update Guest's Information"
                visible={show}
                okText="Save Change"
                onCancel={() => {handleClose(); setErrors([])}}
                onOk={() => handleUpdateGuest()}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        textAlign: "center",
                        marginBottom: "10px",
                        fontSize: "15px",
                        fontWeight: "600",
                      }}
                    >
                      Avatar
                    </p>
                    <img
                      src={editData.editAvatar}
                      alt="Pic"
                      width={70}
                      height={70}
                      className="borederRadius50"
                    />
                  </div>
                </div>
  
                <Form>
                  <Form.Item>
                    <label>FullName</label>
                    {/* <Input type="text" placeholder="Enter FullName" className="form-control" value={editFullName} onChange={(e) => setEditFullName(e.target.value)} /> */}
                    <Input
                      type="text"
                      placeholder="Enter FullName"
                      className="form-control"
                      value={editData.editFullName}
                      name="editFullName"
                      onChange={handleInputChange}
                    />
                    {errors.editFullName && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block", color: "red" }}
                      >
                        {errors.editFullName}
                      </div>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <label>Email</label>
                    {/* <Input type="email" placeholder="Enter Email" className="form-control" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} disabled /> */}
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      className="form-control"
                      value={editData.editEmail}
                      disabled
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>PhoneNumber</label>
                    {/* <Input type="phonenumber" placeholder="Enter PhoneNumber" className="form-control" value={editPhoneNumber} onChange={(e) => setEditPhoneNumber(e.target.value)} /> */}
                    <Input
                      type="phonenumber"
                      placeholder="Enter PhoneNumber"
                      className="form-control"
                      value={editData.editPhoneNumber}
                      name="editPhoneNumber"
                      onChange={handleInputChange}
                    />
                    {errors.editPhoneNumber && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block", color: "red" }}
                      >
                        {errors.editPhoneNumber}
                      </div>
                    )}
                  </Form.Item>
                  <Form.Item>
                    <label>ID Card</label>
                    {/* <Input type="text" placeholder="Enter ID Card" className="form-control" value={editIdCard} onChange={(e) => setEditIdCard(e.target.value)} /> */}
                    <Input
                      type="text"
                      placeholder="Enter ID Card"
                      className="form-control"
                      name="editIdCard"
                      value={editData.editIdCard}
                      onChange={handleInputChange}
                    />
                    {errors.editIdCard && (
                      <div
                        className="invalid-feedback"
                        style={{ display: "block", color: "red" }}
                      >
                        {errors.editIdCard}
                      </div>
                    )}
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