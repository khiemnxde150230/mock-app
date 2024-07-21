import { React } from 'react';
import { 
    Table, 
    Typography, 
    Button, 
    Tooltip, 
    Timeline, 
    Card,
    Modal
} from 'antd';
import { 
    ClockCircleOutlined, 
    LoginOutlined, 
    LogoutOutlined, 
    HomeOutlined, 
    WalletOutlined,
    ExclamationCircleFilled,
    DeleteOutlined
} from '@ant-design/icons';
import axios from 'axios';
import '../../assests/css/viewBookingHistory.css'

const { Title } = Typography;

const { confirm } = Modal;

const customTooltip = (data) => {
    return (
        <Card
            style={{
                width: '400px',
            }}
            title="Booking Details"
        >
            <Timeline
                mode={'left'}
                items={[
                    {
                        label: data.bookingDate,
                        children: 'Booking Date',
                        dot: <ClockCircleOutlined />,
                        color: 'blue',
                    },
                    {
                        label: data.checkIn,
                        children: 'Your check-in date',
                        dot: <LoginOutlined />,
                        color: 'orange',
                    },
                    {
                        label: data.checkOut,
                        children: 'Your check-out date',
                        dot: <LogoutOutlined />,
                        color: 'purple',
                    },
                    {
                        label: 'Booking status',
                        children: data.status == "0" ? "UnPaid" : data.status == "1" ? "Paid" : "Canceled",
                        dot: <WalletOutlined />,
                        color: 'yellow',
                    }
                ]}
            />
        </Card>
    );
};

const TableBookingHistory = (props) => {
    const showConfirm = (bookingId) => {
        confirm({
            title: 'Are you sure to cancel this booking? If canceled, the paid money will not refund!',
            icon: <ExclamationCircleFilled />,
            onOk() {
                handleCancelBooking(bookingId);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const columns = [
        {
            title: 'Booking Date',
            dataIndex: 'bookingDate',
        },
        {
            title: 'Date Check-in',
            dataIndex: 'checkIn',
        },
        {
            title: 'Date Check-out',
            dataIndex: 'checkOut',
        },
        {
            title: 'Total Money ($)',
            dataIndex: 'totalPrice',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) =>
                record.status == "0" ? "UnPaid" : record.status == "1" ? "Paid" : "Canceled"
        },
        {
            title: 'Action',
            key: 'operation',
            render: (_, record) =>
                record.cancelAvailable ? (
                <Button type='primary' icon={<DeleteOutlined />} danger onClick={() => showConfirm(record.key)}></Button>
                ) : null,
        },
    ];

    const CustomRow = (properties) => {
        if(properties.children[0] != undefined){
            let rowData = properties.children[0].props.record;
            let tooltip = customTooltip(rowData);
            return (
                <Tooltip title={tooltip} color={'#fff'} key={'#fff'} placement="topLeft">
                    <tr {...properties} />
                </Tooltip>
            );
        }
        return(<tr {...properties} />);
    }
  
    const handleCancelBooking = (bookingId) => {
        const url = process.env.REACT_APP_SERVER_HOST + 'Guest/CancelBooking';
        axios.put(url, {
            bookingId: bookingId,
            userId: 1
        }, {
            headers: {
                accept: 'application/json'
            }            
        })
            .then(function (response) {
                props.setTableData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <Title level={4}>Result</Title>
            <Table
                className='tbl-booking-history'
                columns={columns}
                dataSource={props.tableData}
                components={{
                    body: {
                        row: CustomRow
                    }
                }}
            />
        </>        
    )
};

export default TableBookingHistory;