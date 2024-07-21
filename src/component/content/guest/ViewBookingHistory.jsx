import { React, useState, useEffect } from 'react';
import { Divider, Typography, notification } from 'antd';
import axios from 'axios';

import Header from "../../guest/Header";
import Footer from "../../guest/Footer";
import SearchArea from '../../viewBookingHistory/SearchArea';
import TableBookingHistory from '../../viewBookingHistory/TableBookingHistory';

const style = {
    padding: 20
};

const styleCommon = {
    backgroundColor: '#f5f5f5',
    height: '100%',
    padding: 20,
    marginTop: 40
}

const mainStyle = {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 7,
}

const { Title } = Typography;

const ViewBookingHistory = () => {
    const [tableData, setTableData] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user")).userId;

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, title, content, placement = 'topRight') => {
        api[type]({
            message: title,
            description: content,
            placement: placement
        });
    };

    useEffect(() => {
        try {
            axios.get(process.env.REACT_APP_SERVER_HOST + 'Guest/GetUserBookingHistory?userId=' + userId)
            .then(async(response) => {  
                await setTableData(response.data);
            })
        } catch (error) {
            let notiProps = {
                type: 'error',
                title: 'Something went wrong!',
                content: error
            };
            openNotification(notiProps.type, notiProps.title, notiProps.content);
        }        
    }, []);

    return (
        <>
            {contextHolder}
            <Header/>
            <div style={styleCommon}>
                <Title style={style} level={3}>Booking History</Title>
                <div style={mainStyle}>
                    <SearchArea 
                        setTableData={setTableData} 
                        userId={userId}
                    />
                    <Divider />
                    <TableBookingHistory 
                        tableData={tableData}
                        setTableData={setTableData}
                    />
                </div>                
            </div>
            <Footer/>
        </>        
    )
};

export default ViewBookingHistory;