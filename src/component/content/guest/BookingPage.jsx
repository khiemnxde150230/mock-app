import { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import RoomType from "../../guest/RoomType";
import BookingRoom from "../../guest/BookingRoom";
import BookingList from "../../guest/BookingList";
import HeaderGuest from "../../guest/Header";
import '../../../assests/css/client-booking.css'
import { useParams } from "react-router-dom";

import { DatePicker } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const dateFormat = "DD/MM/YYYY"
const currentDate = new Date(year, month, day)
const nextDate = new Date(year, month, day + 1)

const BookingTime = (props) => {
    return (
        <RangePicker
            allowClear={false}
            size={'large'}
            defaultValue={[dayjs(currentDate.toLocaleDateString("en-GB"), dateFormat), dayjs(nextDate.toLocaleDateString("en-GB"), dateFormat)]}
            disabledDate={(current) => {
                return dayjs(currentDate.toLocaleDateString("en-GB"), dateFormat).add(-1, 'days') >= current
            }}
            onCalendarChange={(val) => props.setCurrent(val)}
            style={{ width: '34vw' }}
        />
    );
};

export default function BookingPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const [current, setCurrent] = useState([currentDate, nextDate]);

    const handleCurrent = (current) => {
        setCurrent(current)
    }

    const [roomtypes, setRoomtypes] = useState([]);

    const roomTypeAPI = async () => {
        const url = process.env.REACT_APP_SERVER_HOST + `Guest/getRoomTypes`;
        await axios.get(url)
            .then(res => {
                const roomtypes = []
                res.data.map((item) => roomtypes.push(item));
                setRoomtypes(roomtypes);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        roomTypeAPI();
    }, [])

    let { idCategoryName } = useParams();

    // const [roomType, setRoomType] = useState("Double")
    const [roomType, setRoomType] = useState(idCategoryName == undefined ? "Double" : idCategoryName)

    const handleRoomtype = (rt) => {
        setRoomType(rt);
    }

    const [rooms, setRooms] = useState([])

    const roomsAPI = async () => {
        const sd = dayjs(current[0])
        const ed = dayjs(current[1])
        const url = process.env.REACT_APP_SERVER_HOST + `Guest/getRoomsByRoomType?roomType=${roomType}&sd=${sd}&ed=${ed}`;
        await axios.get(url)
            .then(res => {
                const rooms = [];
                res.data.map((item) => rooms.push(item));
                setRooms(rooms);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        roomsAPI()
    }, [roomType, current])

    const [bookingRoomIds, setBookingRoomIds] = useState([])
    const [bookingRooms, setBookingRooms] = useState([])

    const handleSelect = (roomId) => {
        if (!bookingRoomIds.includes(roomId)) {
            setBookingRoomIds([...bookingRoomIds, roomId])
        }
    }

    const handleRemove = (roomId) => {
        setBookingRoomIds(bookingRoomIds.filter(id => id != roomId))
    }

    const bookingListAPI = async () => {
        const url = process.env.REACT_APP_SERVER_HOST + `Guest/getBookingRooms`;
        if (bookingRoomIds.length > 0) {
            await axios.post(url, bookingRoomIds)
                .then(res => {
                    const bookingList = []
                    res.data.map((item) => bookingList.push(item));
                    setBookingRooms(bookingList);
                })
                .catch(error => console.log(error));
        }
        else {
            setBookingRooms([])
        }    
    }

    useEffect(() => {
        bookingListAPI()
    }, [bookingRoomIds])

    return (
        <Fragment>
            <HeaderGuest />
            <div className="header_img">

            </div>
            <div className='time_roomtype_sticky'>
                <BookingTime date={current} setCurrent={handleCurrent} />
                <RoomType roomtypes={roomtypes} handleRoomtype={handleRoomtype} />
                <h1 style={{fontFamily: "'Playfair Display', serif", color: "var(--mainColor--)", marginTop: 10}}>{roomType}</h1>

            </div>
            <div className='list_sticky'>
                <BookingList data={bookingRooms} handleRemove={handleRemove} date={current} />
            </div>


            {rooms.map(room => {
                return (
                    <BookingRoom data={room} handleSelect={handleSelect} key={room.roomId} />
                )
            })}


            <footer style={{ padding: "20px" }}></footer>

        </Fragment >
    )
}