import HeaderGuest from "../../guest/Header";
import Footer from "../../guest/Footer";
import CollapseGuest from "../../guest/Collapse";
import { Fragment } from "react";
import { Row, Col } from 'antd';

export default function Destinations() {

    const styleImgTop = {
        width: '100%',
        height: '500px',
        objectFit: 'cover',
    }

    const text = {
        fontSize: '14px',
        lineHeight: '22px',
        textAlign: 'justify',
        marginBottom: '20px',
        color: '#000',
    }

    return (
        <Fragment>
            <HeaderGuest />

            <main style={{ marginBottom: "2rem" }}>
                <div style={{ position: "relative" }}>
                    <img src="./img/Travel/cau-rong-da-nang-1.jpg" style={styleImgTop} />
                    <h2 className="text-uppercase centerPosition text-white fontSize40 titleHeaderContent">DESTINATIONS</h2>
                </div>

                <div className="grid wide" style={{ marginTop: 100 }}>
                    <Row>
                        <Col span={12} style={{ paddingRight: 15 }}>
                            <h2 className="titleRoomFont" style={{ fontSize: 32, textAlign: 'initial', padding: "20px 0", borderBottom: "1px solid #EBEBEB", marginBottom: '20px' }}>Da Nang: Gateway to central Viet Nam</h2>
                            <div>
                                <p style={text}>
                                    This busy seaport of nearly one million people is an important trading and transport link between the capital of
                                    Hanoi in the north and the thriving commercial centre of Ho Chi Minh City in the south. Danang is the gateway within 100 km of World Heritage Sites, including the Imperial City of Hue, the Old Town of Hoi An, and the My Son Holy Land.
                                </p>
                                <p style={text}>
                                    Today, Danang has own the charm as one of leading tourism cities of the Central Vietnam with the exceptional
                                    and incredible beauty of the coastline and the crystal blue seas as well as luxurious, tropical hinterland to experience. Danang is renowned for numerous tourist attractions which worth time to spend from historical and religious storing Marble mountains, the miniature of Da Lat – Ba Na hills is to Son Tra Peninsula – an very ideal site of pristine beaches.
                                </p>
                                <p style={text}>
                                    Da Nang with its reputation for the best place for authentic local cuisines, offers the visitors unforgettable tastes
                                    from the traditional food to the rich variety of delectable seafood, promising a memorable gourmet journey.
                                </p>
                            </div>
                        </Col>
                        <Col span={12}>
                            <img src="./img/Travel/DES-DANANG.jpg" style={styleImgTop} className="borderImg" />
                        </Col>
                    </Row>

                    <CollapseGuest title='MARBLE MOUNTAINS' key='1' img='./img/Travel/DES-MOUTAIN-3.jpg'
                        text1='Five miles (8km) south of Da Nang, a cluster of five hills is known as Marble Mountains or “Mountains of the Five Elements”.'
                        text2='Mysterious caves within the mountains conceal elaborate altars dedicated to Buddha, Bodhisattvas
                        and the different genies of local folklore. Dating back centuries, they still serve as religious sanctuaries.'
                        text3='The mountains also provide a valuable source of red, white and blue-green marble, and at the foot of the mountain,
                        skilled marble carvers chisel out an interesting variety of objets d’art which make ideal souvenirs.'/>

                    <CollapseGuest title='BA NA HILL STATION' key='2' img='./img/Travel/DES-BANA-2.jpg'
                        text1='45 minutes drive from Danang or around 40km west of Danang, Ba Na is located 1,487 meters above sea level in the Truong Son mountain range.'
                        text2='Ba Na was formerly a 1920’s French resort and once boasted 200 villas, restaurants, and clubs. It is well known as the 
                        second Da Lat or Sa Pa in central Vietnam. Its temperate climate, unspoiled forest, and spectacular views over the South Bac My An sea and the Lao mountain range made Ba Na a popular retreat for both the French and the wealthy Vietnamese.'
                        text3='Today the area still attracts locals and tourists alike, 
                        although extra effort and a four-wheel drive are required to reach Ba Na as the roads are quite rough. 
                        Come to Ba Na Hill! Visit this exclusive hidden gem of Central Vietnam! And go to the top of Mount Chua
                         by a new cable system that was officially opened on 25th March 2009 and set two Guinness World Records for its height and length!'/>

                    <CollapseGuest title='HOI AN (UNESCO WORLD HERITAGE SITE)' key='3' img='./img/Travel/DES-HOIAN-3.jpg'
                        text1='Established in the 15th century, the ancient town of Hoi An was once one of the most important trading ports in Southeast Asia and an important centre of East–West cultural exchange.'
                        text2='Its ancient past is superbly preserved in fascinating temples, pagodas, shop houses and homes which make up the town’s old quarter. Hoi An is 15 miles (25km) southeast of Da Nang.'
                        text3='' />

                    <CollapseGuest title='MY SON VALLEY (UNESCO WORLD HERITAGE SITE)' key='4' img='./img/Travel/DES-MYSON-3.jpg'
                        text1='My Son Valley was the spiritual centre of the ancient Cham civilisation, in the same way as Angkor Wat in Cambodia, Borobudur in Indonesia and Pagan in Myanmar. A religious sanctuary since the 4th century, its history is reflected in the temples and towers that remain.'
                        text2='It is also the home of the Museum of Cham Sculpture, which records the development of the culture and history of the Cham people through their elaborate sculptures and carvings.'
                        text3='My Son Valley is 42 miles (70km) southwest of Da Nang.' />

                    <CollapseGuest title='HUE (UNESCO WORLD HERITAGE SITE)' key='5' img='./img/Travel/DES-HUE-3.jpg'
                        text1='The Complex of Hué Monuments is an unique example of a planned and fully defended feudal capital city in southeast Asia. Hué was the imperial capital of Vietnam between 1802 and 1945.'
                        text2='The site consists of the Capital City in Hué, and associated monuments outside of the city. The latter includes the tombs of the emperors Gia Long, Minh Mang, Thieu Tri, Tu Doc, Duc Duc, Dong Khanh, and Khai Dinh. And a string of temples, pagodas and other spiritual sites.'
                        text3='The Capital City is a complex enclosed within defensive walls. It holds residences, palaces, gates, with the Forbidden Purple City at its heart.' />
                    
                    <CollapseGuest title='PHONG NHA CAVES (UNESCO WORLD HERITAGE SITE)' key='6' img='./img/Travel/DES-PHONGNHA-1.jpg'
                        text1='Phong Nha-Ke Bang National Park, a giant mountain reserve which stretches to the border of Laos, is renowned for the spectacular Phong Nha Caves – buried within Vietnam’s largest primeval jungle. Phong Nha’s grottos and passages extend for 44.5 kilometres into a limestone mountain.'
                        text2='Discovered in 1935, the underground system was opened to tourists three years ago, with stalactite and stalagmite-adorned abysses romantically named ‘Roads to Hell’ and ‘Roads to Heaven’. Phong Nha-Ke Bang National Park is around 350 kms north of Danang.'
                        text3='' />
                </div>
            </main>
            <Footer />
        </Fragment>
    )
}