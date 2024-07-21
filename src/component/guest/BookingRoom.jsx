import { Image, Card, Carousel } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import "../../assests/css/client-room.css"
const BookingRoom = (props) => {
    const room = props.data.roomInfo;
    const [imgs, setImgs] = useState(props.data.images);
    // const imgs = props.data.images;
    let USD = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    useEffect(() => {
        setImgs(props.data.images);
    }, [props.data.images]);

    // console.log(props.data.images);

    return (
        <>
            <div className='room_card'>
                <Carousel
                    autoplay autoplaySpeed={3000} 
                    style={{ width: '260px' }}>
                    {
                        imgs.map(img => {
                            return (
                                <Image
                                    width={340}
                                    height={200}
                                    src={img.image}
                                />
                            )
                        })
                    }

                </Carousel>
                <Card bordered={false} className='room_content' style={{ boxShadow: 'none' }}>
                    <h3>{room.roomName}</h3>
                    <p>
                        {room.description}
                    </p>

                    <div className="booking_row">
                        <h3>{USD.format(room.price)}</h3>
                        <button type="primary" className='btnBookNow' onClick={() => props.handleSelect(room.roomId)}>Select</button>
                    </div>
                </Card>

            </div>
        </>
    )
}


export default BookingRoom;
