import { React, useState } from 'react';
import { Row, Col, Form, DatePicker, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const SearchArea = (props) => {
    const [formValue, setFormValue] = useState({
        checkIn: null,
        checkOut: null,
        endOpen: false
    });

    const onValuesChange = (changedValues, allValues) => {
        try {
            const values = {
                ...allValues,
                'checkin': allValues['checkin'] != undefined ? allValues['checkin'].format('YYYY-MM-DD') : "",
                'checkout': allValues['checkout'] != undefined ? allValues['checkout'].format('YYYY-MM-DD') : "",
                'bookingDate': allValues['bookingDate'] != undefined ? allValues['bookingDate'].format('YYYY-MM-DD') : "",
            };
    
            //call search api
            const url = process.env.REACT_APP_SERVER_HOST 
            + 'Guest/SearchBookingHistory?userId=' + props.userId 
            + "&checkin=" + values.checkin
            + "&checkout=" + values.checkout
            + "&bookingDate=" + values.bookingDate;
    
            axios.get(url)
                .then(async(response) => {  
                    await props.setTableData(response.data)
                });
        } catch (error) {
            console.log('error', error);
        }  
    };

    const disabledStartDate = (startValue) => {
        if(!startValue || !formValue.checkOut){
            return false;
        }
        return startValue.valueOf() > formValue.checkOut.valueOf();
    }

    const disabledEndDate = (endValue) => {
        if(!formValue.checkIn || !endValue){
            return false;
        }
        return endValue.valueOf() <= formValue.checkIn.valueOf();
    }

    const onStartChange = (value) => {
        setFormValue((prev) => ({
            ...prev,
            checkIn: value
        }));
    }

    const onEndChange = (value) => {
        setFormValue((prev) => ({
            ...prev,
            checkOut: value
        }));
    }

    const handleStartOpenChange = (open) => {
        if(!open){
            setFormValue((prev) => ({
                ...prev,
                endOpen: true
            }));
        }
    }

    const handleEndOpenChange = (open) => {
        setFormValue((prev) => ({
            ...prev,
            endOpen: open
        }));
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 18,
            }}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            autoComplete="off"
        >
            <Title level={4}>Search</Title>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Date Checkin"
                        name="checkin"
                    >
                        <DatePicker
                            disabledDate={disabledStartDate}
                            format="YYYY-MM-DD"
                            placeholder="Checkin"
                            value={formValue.checkIn}
                            onChange={onStartChange}
                            onOpenChange={handleStartOpenChange}
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Date Checkout"
                        name="checkout"
                    >
                        <DatePicker
                            disabledDate={disabledEndDate}
                            format="YYYY-MM-DD"
                            placeholder="Checkout"
                            value={formValue.checkOut}
                            onChange={onEndChange}
                            open={formValue.endOpen}
                            onOpenChange={handleEndOpenChange}
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Booking Date"
                        name="bookingDate"
                    >
                        <DatePicker style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                </Col>
            </Row>         
        </Form>
    )
};

export default SearchArea;