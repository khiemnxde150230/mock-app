import { Fragment, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Receipt from "../../guest/Receipt";
import HeaderGuest from "../../guest/Header";
import { PayPalScriptProvider, PayPalButtons, BraintreePayPalButtons, } from "@paypal/react-paypal-js";
import { Image, Card, notification } from 'antd';
import '../../../assests/css/client-room.css'
import '../../../assests/css/client-booking.css'
import axios from "axios";

export default function BookingDetail() {

    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const obj = params.get('data');
    const data = JSON.parse(decodeURIComponent(obj));

    let USD = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const CreateBooking = () => {

        const user = JSON.parse(localStorage.getItem('user'));

        const roomIds = []

        data.rooms.forEach(i => {

            roomIds.push({

                roomId: i.roomInfo.roomId

            });

        });

        const bookingData = {

            booking: {

                checkIn: data.date[0],

                checkOut: data.date[1],

                totalPrice: data.totalPrice,

                status: "1",

                user: {

                    userId: user.userId,

                    email: "",

                    status: "",

                    password: ""

                }

            },
            listBooking: roomIds

        }

        const url = process.env.REACT_APP_SERVER_HOST + 'booking/order';

        axios.post(url, bookingData)

            .then((res) => {

                if (res.data.message == "Booking success!") {

                    notification.success({

                        message: "Successful booking!",

                        duration: 3

                    })

                    setTimeout(() => {

                        window.location.href = "/"

                    }, 3000);

                }

            })

            .catch(error => {

                notification.success({

                    message: "Something is wrong, try it later!",

                    duration: 3

                })

            });

    }

    const RoomPayment = (props) => (
        <>
            <div className='room_card'>
                <Image
                    width={260}
                    src={props.data.images[0].image}
                />
                <Card bordered={false} className='room_content'>
                    <h3>{props.data.roomInfo.roomName}</h3>
                    <p>
                        {props.data.roomInfo.description}
                    </p>

                    <div className="booking_row" style={{ float: 'right' }}>
                        <h3>{USD.format(props.data.roomInfo.price)}</h3>
                    </div>
                </Card>

            </div>
        </>
    );

    const Payment = (props) => {
        const totalPrice = props.data.totalPrice
        return (
            <>
                <div className="payment">
                    <h2 style={{ marginBottom: '30px' }}>Payment method</h2>
                    <PayPalScriptProvider
                        options={{
                            "client-id": "test",
                            components: "buttons",
                            currency: "USD"
                        }}>
                        <PayPalButtons
                            style={{ layout: "horizontal" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: totalPrice
                                            }
                                        }
                                    ]
                                })
                            }}
                            onApprove={async (data, actions) => {
                                const order = await actions.order.capture();
                                if (order.status == 'COMPLETED') {
                                    CreateBooking();
                                }
                            }}
                        />
                    </PayPalScriptProvider>
                </div>

            </>
        )
    }

    return (
        <Fragment>
            <HeaderGuest />

            <div className='list_sticky'>
                <Receipt data={data} />
            </div>

            <div className="room_detail_list">
                <Link style={{ marginLeft: '20px', }} to="/booking">
                    <button className="btnBookNow" style={{ cursor: 'pointer' }}>
                        Back
                    </button>
                </Link>

                {data.rooms.map(room => {
                    return (
                        <RoomPayment data={room} />
                    )
                })}
            </div>

            <Payment data={data} />

            <footer style={{ padding: "20px" }}></footer>

        </Fragment >
    )
}