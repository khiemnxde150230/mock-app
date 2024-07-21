import { Button, List, } from 'antd';
import { DeleteOutlined } from "@ant-design/icons"
import InfiniteScroll from 'react-infinite-scroll-component';
import '../../assests/css/client-booking-list.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


let USD = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: `USD`,
});

const BookingList = (props) => {
    const data = props.data;
    const [date, setDate] = useState([])

    useEffect(() => {
        setDate(props.date)
    }, [props.date])

    const convertDate = (str) => {
        const d = new Date(str);
        return d;
    }
    const handleDate = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        const start = convertDate(date[0])
        const end = convertDate(date[1])
        if (date.length == 2) return Math.ceil((end - start) / oneDay);
        else return 1;
    }

    const totalPrice = () => {
        let total = 0;
        data.forEach(i => {
            total += i.roomInfo.price * handleDate()
        });
        return total;
    }

    useEffect(() => {
        totalPrice()
    }, [data])

    const booking_detail_data = {
        rooms: data,
        date: date,
        totalPrice: totalPrice(),
    }

    const obj = encodeURIComponent(JSON.stringify(booking_detail_data));

    return (
        <div className='booking_list'>
            <div className='booking_list_header'>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <p>
                        {
                            date.length == 2 ?
                                (`${new Date(date[0]).toLocaleDateString("en-GB")} - ${new Date(date[1]).toLocaleDateString("en-GB")}`)
                                : 'Thu, 4 May - Fri, 5 May'
                        }
                    </p>
                    <p>{handleDate()} {handleDate() > 1 ? ' nights' : ' night'}</p>
                </div>
                {
                    data.length != 0 ?
                        <p>{data.length} {data.length > 1 ? ' rooms' : ' room'}</p>
                        : <></>
                }
            </div>
            <div
                id="scrollableDiv"
                style={{
                    height: 250,
                    overflow: 'auto',
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        style={{ border: 'none' }}
                        bordered
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                {
                                    <div className='items'>
                                        <div>
                                            <p>{item.roomInfo.roomName}</p>
                                            <p>{USD.format(item.roomInfo.price)}</p>
                                        </div>
                                        <Button type='primary' icon={<DeleteOutlined />} danger onClick={() => props.handleRemove(item.roomInfo.roomId)}></Button>
                                    </div>
                                }
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>

            {
                data.length != 0 ?
                    <div style={{ marginTop: '10px', }}>
                        <h2>Total:  {USD.format(totalPrice())}</h2>
                        <Link to={`/booking_detail?data=${obj}`} style={{ marginLeft: '70px', }}>
                            <button className="btnBookNow" style={{ marginTop: '10px', cursor: 'pointer' }} type="button">Booking Now</button>
                        </Link>
                    </div>
                    : <></>
            }


        </div>
    )
}


export default BookingList;