import { Fragment } from "react";
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    SendOutlined
} from '@ant-design/icons';

export default function Footer() {
    return (
        <Fragment>
            <footer className="footer-04">
                <div className="grid wide">
                    <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: "column" }}>
                        <img className="borederRadius50 mr-1" src="../img/Black Retro Tree Logo Template.png" style={{ background: "#fff" }} width="50" height="50" alt="" />
                        <h2 className="footer-heading mt-3">
                            <img src="../img/textLogo.png" width="260" style={{ marginLeft: 20 }} alt="" />
                            {/* <a href="#" className="d-flex align-items-center text-white text-capitalize titleRoomFont" style={{ fontSize: "28px" }}>
                                Four season
                            </a> */}
                        </h2>
                    </div>
                    <div className="row sm-gutter d-flex justify-content-around align-items-center">
                        <div className="col">
                            <ul className="list-unstyled">
                                <li><a href="#" className="py-1 d-block text-capitalize fontSize16 text-white">Address: 163 Nguyen Luong Bang, Da Nang city</a></li>
                                <li><a href="#" className="py-1 d-block text-capitalize fontSize16 text-white">Tel: +84 999 999</a></li>
                                <li><a href="#" className="py-1 d-block text-capitalize fontSize16 text-white">Email: fourSeason_hotels@gmail.com</a></li>
                            </ul>
                        </div>
                        <div className="col">
                            <ul className="list-unstyled">
                                <li><a href="#" className="py-1 d-block text-capitalize fontSize16 text-white">About us</a></li>
                                <li><a href="#" className="py-1 d-block text-capitalize fontSize16 text-white">Contact</a></li>
                                <li><a href="#" className="py-1 d-block text-capitalize fontSize16 text-white">Terms & Conditions</a></li>
                            </ul>
                        </div>
                        <div className="col">
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#" className="py-1 d-block text-capitalize fontSize16 text-white">
                                        <FacebookOutlined className="mr-1" />Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="py-1 d-block text-capitalize fontSize16 text-white">
                                        <TwitterOutlined className="mr-1" />Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="py-1 d-block text-capitalize fontSize16 text-white">
                                        <InstagramOutlined className="mr-1" />Instagram
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col">
                            <h2 className="footer-heading fontSize12">Subscribe to our newsletter</h2>
                            {/* <form action="#" className="subscribe-form">
                                <div className="form-group d-flex">
                                    <input type="text" className="form-control rounded-left" placeholder="Enter email address" style={{ paddingLeft: 8 + "px" }} />
                                    <button type="submit" className="form-control submit rounded-right"><SendOutlined /></button>
                                </div>
                            </form> */}
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}