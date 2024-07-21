import HeaderGuest from "../../guest/Header";
import Footer from "../../guest/Footer";
import { Fragment } from "react";

import { Carousel, Row, Col } from 'antd';

export default function Culinary() {

    const styleImgTop = {
        width: '100%',
        height: '500px',
        objectFit: 'cover',
    }

    const content = {
        background: 'rgb(252, 252, 252)',
        textAlign: 'center',
        padding: '100px 554px',
        lineHeight: '22px',
    }

    const contentStyle = {
        height: '500px',
        // color: '#212121',
        color: '#fff',
        background: 'var(--mainColor--)',
        opacity: '0.9'
    };

    const borderNone = {
        border: 'none',
        padding: '20px'
    }

    return (
        <Fragment>
            <HeaderGuest />

            <main style={{ marginBottom: "2rem" }}>
                <div style={{ position: "relative" }}>
                    <img src="./img/food.jpg" style={styleImgTop} />
                    <h2 className="text-uppercase centerPosition text-white fontSize40 titleHeaderContent">Culinary</h2>
                </div>

                <div style={content}>
                    <p className="fontSize14" style={{ marginBottom: "20px", color: "#212121" }}>The resort’s culinary experience features a mixture of the authentic and locally inspired Vietnamese, Asian,
                        Italian and other European cuisines plus the best imported steaks.</p>

                    <p className="fontSize14" style={{ color: "#212121" }}>
                        The resort presents guests with varied gastronomic venues
                        – the hip and breezy bar overlooking the beach, the exclusive Lagoon pool surrounded by a tropical garden, the true Italian flare offered at the Don Cipriani’s, the refined Asian touch at Café Indochine or the authentic central Vietnam cuisine at the Danaksara.
                    </p>
                </div>

                <Carousel autoplay>
                    <div>
                        <div style={contentStyle}>
                            <Row>
                                <Col span={12}>
                                    <img style={styleImgTop} src="./img/Food/delicious-asian-food-assortment.jpg" />
                                </Col>
                                <Col span={12} className="d-flex align-items-center">
                                    <div className="item ml-3" style={borderNone}>
                                        <h2 className="titleRoomFont fontSize40" style={{ textAlign: 'initial' }}>Infrastructure</h2>
                                        <p className="noneText mt-3 fontSize16">
                                            The ideal setting for “al fresco” pool-side dining or
                                            in air conditioned comfort offers traditional Italian cuisine in a stylish and artistic arrangement. Our experienced chefs choose to use the very best of local and imported ingredients
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                    <div>
                        <div style={contentStyle}>
                            <Row>
                                <Col span={12}>
                                    <img style={styleImgTop} src="./img/Food/spicy-mixed-seafood-salad-with-thai-food-ingredients.jpg" />
                                </Col>
                                <Col span={12} className="d-flex align-items-center">
                                    <div className="item ml-3" style={borderNone}>
                                        <h2 className="titleRoomFont fontSize40" style={{ textAlign: 'initial' }}>Variety Culinary</h2>
                                        <p className="noneText mt-3 fontSize16">
                                        Guests enjoy cocktails and light snacks in a very relaxed colonial setting decorated with cane chairs and carved Vietnamese furniture. Don’t miss out the daily unique Afternoon Tea and Dessert Buffet with the selection of 20 local herbal tea. 
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>

                </Carousel>

            </main>

            <Footer />
        </Fragment>
    )
}