import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Header from "../../guest/Header";
import Footer from "../../guest/Footer";
import { Card, Row, Col, Carousel } from 'antd';

export default function HomePage() {
    const [data, setData] = useState([])
    const { Meta } = Card;

    console.log(data);

    const contentStyle = {
        height: '800px',
        color: '#fff',
        lineHeight: '160px',
    };

    const imgStyle = {
        width: '100%',
        height: '800px',
        objectFit: 'cover',
        backGround: 'rgba(20, 39, 74, 0.5)',
    }

    const textHeader = {
        position: 'absolute',
        top: '0',
        zIndex: '2',
        marginLeft: '88px',
        marginTop: '40px',
    }

    const getData = () => {
        axios.get(process.env.REACT_APP_SERVER_HOST + 'Guest/GetAllCategories')
            .then(result => {
                setData(result.data)
            })
            .catch(error => {
                console.error(error)
            })
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <Fragment>
            <Header />
            <main>
                <Carousel style={{ marginTop: "4rem" }} autoplay autoplaySpeed={2000}>
                    <div >
                        <div style={contentStyle} className="view" >
                            <img style={imgStyle} src="img/aerial-shot-aria-hotel-las-vegas-min.jpg" />
                            <div style={textHeader}>
                                <h3 className="text-white"
                                    style={{ fontSize: 40 }}
                                >WELCOME TO</h3>
                                <h1 className="text-white"
                                    style={{ fontSize: 50 }}
                                >FOUR SEASON Hotel Luxury</h1>
                                <hr className="" />
                                <h6 className=""
                                    style={{ fontSize: 30 }}
                                >
                                    <p className="text-white" style={{ color: "#fff" }}>Book your stay and enjoy</p>
                                    <p className="text-white">redefined at the most afforrdable rates.</p>
                                </h6>
                                <a href="#bookNowRoom" className="btnBookNow fontSize20">
                                    {/* <HomeOutlined className="mr-1" /> */}
                                    Book now</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img style={imgStyle} src="img/swimming-pool-with-relaxing-seats-min.jpg" />
                            <div style={textHeader}>
                                <h3 className="text-white"
                                    style={{ fontSize: 40 }}
                                >WELCOME TO</h3>
                                <h1 className="text-white"
                                    style={{ fontSize: 50 }}
                                >FOUR SEASON Hotel Luxury</h1>
                                <hr className="" />
                                <h6 className=""
                                    style={{ fontSize: 30 }}
                                >
                                    <p className="text-white" style={{ color: "#fff" }}>Book your stay and enjoy</p>
                                    <p className="text-white">redefined at the most afforrdable rates.</p>
                                </h6>
                                <a href="#bookNowRoom" className="btnBookNow fontSize20">
                                    {/* <HomeOutlined className="mr-1" /> */}
                                    Book now</a>
                            </div>
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img style={imgStyle} src="img/sunglasses-burgers-juice-table-with-exotic-lunch-swimming-pool-min.jpg" />
                            <div style={textHeader}>
                                <h3 className="text-white"
                                    style={{ fontSize: 40 }}
                                >WELCOME TO</h3>
                                <h1 className="text-white"
                                    style={{ fontSize: 50 }}
                                >FOUR SEASON Hotel Luxury</h1>
                                <hr className="" />
                                <h6 className=""
                                    style={{ fontSize: 30 }}
                                >
                                    <p className="text-white" style={{ color: "#fff" }}>Book your stay and enjoy</p>
                                    <p className="text-white">redefined at the most afforrdable rates.</p>
                                </h6>
                                <a href="#bookNowRoom" className="btnBookNow fontSize20">
                                    {/* <HomeOutlined className="mr-1" /> */}
                                    Book now</a>
                            </div>
                        </h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>
                            <img style={imgStyle} src="img/luxury-dinner-table-hotel-min.jpg" />
                            <div style={textHeader}>
                                <h3 className="text-white"
                                    style={{ fontSize: 40 }}
                                >WELCOME TO</h3>
                                <h1 className="text-white"
                                    style={{ fontSize: 50 }}
                                >FOURSEASONS Hotel Luxury</h1>
                                <hr className="" />
                                <h6 className=""
                                    style={{ fontSize: 30 }}
                                >
                                    <p className="text-white" style={{ color: "#fff" }}>Book your stays and enjoy</p>
                                    <p className="text-white">Redefine at the most afforrdable rates.</p>
                                </h6>
                                <a href="#bookNowRoom" className="btnBookNow fontSize20">
                                    Book now</a>
                            </div>
                        </h3>
                    </div>
                </Carousel>

                <div id="bookNowRoom"></div>
                <div className="grid wide"
                    style={{ marginTop: "3rem" }}
                >
                    <div style={{ marginBottom: "1rem", flexDirection: "column" }} className="d-flex justify-content-center align-items-center">
                        <h2 className="text-center text-uppercase titleHeaderContent">Room & Suites</h2>
                        <p className="text-center mt-3 fontSize15" style={{ maxWidth: "820px", fontWeight: 500 }}>It is a long established fact that a reader will be distracted by the readable content of a page when
                            looking at its layout.
                            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                            as opposed to using 'Content here, content here', making it look like readable English.</p>
                    </div>

                    {data.length > 0 ? data.map(item => {
                        return (
                            <Row key={item.categoryId} style={{ marginTop: "3rem" }} className="align-items-center">
                                <Col span={12}>
                                    <div className="item mr-3">
                                        <h2 className="text-uppercase titleRoomFont" style={{ textAlign: 'inherit' }}>{item.categoryName}</h2>
                                        <p className="noneText mt-3 fontSize15" style={{ fontWeight: 500 }}>
                                            {item.description}
                                        </p>
                                        <button className="btnBookNow mt-3"><a href={`/booking/${item.categoryName}`} className="text-white">Book now</a></button>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <img src={item.image} width="100%" height="300" alt="" style={{ borderRadius: "8px" }} />
                                </Col>
                            </Row>
                        )
                    }) : ""}

                    <div style={{ marginTop: "8rem", marginBottom: "4rem", flexDirection: "column" }} className="d-flex justify-content-center align-items-center">
                        <h2 className="text-center text-uppercase titleHeaderContent">JOINING OUR CULINARY & RECREATIONAL EXPERIENCE</h2>
                        <p className="text-center mt-3 fontSize15" style={{ maxWidth: "820px", fontWeight: 500 }}>It is a long established fact that a reader will be distracted by the readable content of a page when
                            looking at its layout.
                            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                            as opposed to using 'Content here, content here', making it look like readable English.</p>
                    </div>

                    <Row gutter={16} style={{ marginBottom: '3rem' }}>
                        <Col span={12}>
                            <Card bordered={false}
                                style={{
                                    fontSize: "20px"
                                }}
                                cover={
                                    <img
                                        alt="Beach"
                                        src="img/beach.jpg"
                                    />
                                }
                                actions={[
                                    <a href="/destinations" className="btnBookNow text-uppercase text-white" style={{ padding: "12px", width: "20%" }}>read more</a>
                                ]}
                            >
                                <div style={{ padding: 20, minHeight: 240 }}>
                                    <h2 className="text-uppercase titleHeaderContent" style={{ textAlign: "inherit" }}>Destinations</h2>
                                    <p className="mt-3 fontSize15" style={{ fontWeight: 500, textAlign: "justify" }}>
                                        This busy seaport of nearly one million people is an important trading and transport link between the capital of
                                        Hanoi in the north and the thriving commercial centre of Ho Chi Minh City in the south. Danang is the gateway within 100 km of World Heritage Sites, including the Imperial City of Hue, the Old Town of Hoi An, and the My Son Holy Land.
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}
                                style={{
                                    fontSize: "20px"
                                }}
                                cover={
                                    <img
                                        alt="Food"
                                        src="img/food.jpg"
                                    />
                                }
                                actions={[
                                    <a href="/culinary" className="btnBookNow text-uppercase text-white" style={{ padding: "12px", width: "20%" }}>read more</a>
                                ]}
                            >
                                <div style={{ padding: 20, minHeight: 240 }}>
                                    <h2 className="text-uppercase titleHeaderContent" style={{ textAlign: "inherit" }}>CULINARY</h2>
                                    <p className="mt-3 fontSize15" style={{ fontWeight: 500, textAlign: "justify" }}>
                                        The resort’s culinary experience features a mixture of the authentic and locally inspired Vietnamese, Asian,
                                        Italian and other European cuisines plus the best imported steaks. The resort presents guests with varied gastronomic
                                        venues – the hip and breezy bar overlooking the beach, the exclusive Lagoon pool surrounded by a tropical garden,
                                        the true Italian flare offered at the Don Cipriani’s, the refined Asian touch at Café Indochine or the authentic central Vietnam cuisine at the Danaksara.
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </main>

            <Footer />

        </Fragment>
    )
}