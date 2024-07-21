import { List, } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../../assests/css/client-booking-list.css'
import { useState } from 'react';

const Receipt = (props) => {

    const data = useState(props.data)
    const convertDate = (str) => {
        const d = new Date(str);
        return d;
    }

    console.log(data);

    let USD = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: `USD`,
    });

    const handleDate = (sd, ed) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const start = convertDate(sd)
        const end = convertDate(ed)
        return Math.ceil((end - start) / oneDay);
    }

    const user = JSON.parse(localStorage.getItem("user"))

    return (

        <div className='booking_list'>

            <div className='booking_list_header'>

                <div style={{ display: "flex", justifyContent: 'space-between' }}>

                    <p>

                        {`${new Date(data[0].date[0]).toLocaleDateString("en-GB")} - ${new Date(data[0].date[1]).toLocaleDateString("en-GB")}`}

                    </p>

                    <p>
                        {
                            handleDate(data[0].date[0], data[0].date[1])

                        }

                        {

                            handleDate(data[0].date[0], data[0].date[1]) > 1 ? ' nights' : ' night'

                        }

                    </p>

                </div>

                <p>

                    {

                        data[0].rooms.length

                    }

                    {

                        data[0].rooms.length > 1 ? ' rooms' : ' room'

                    }

                </p>

                <hr></hr>

                <p style={{ marginTop: '10px' }}>Customer Name: {user.fullName}</p>

                <p style={{ marginTop: '5px' }}>Phone Number: {user.phone}</p>

                <p style={{ marginTop: '5px' }}>Email: {user.email}</p>

            </div>

            <div

                id="scrollableDiv"

                style={{

                    height: 320,

                    overflow: 'auto',

                }}

            >

                <InfiniteScroll

                    dataLength={data[0].rooms.length}

                    scrollableTarget="scrollableDiv"

                >

                    <List

                        style={{ border: 'none' }}

                        bordered

                        dataSource={data[0].rooms}

                        renderItem={(item) => (

                            <List.Item>

                                {

                                    <div className='items'>

                                        <div>

                                            <p>{item.roomInfo.roomName}</p>

                                            <p>{USD.format(item.roomInfo.price)}</p>

                                        </div>

                                    </div>

                                }

                            </List.Item>

                        )}

                    />

                </InfiniteScroll>

            </div>



            <div>

                <h2>Total:  {USD.format(data[0].totalPrice)}</h2>

            </div>



        </div>

    )



}


export default Receipt;