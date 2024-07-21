import { Fragment } from 'react';
import './App.css';

//#region GUEST ROUTES
import HomePage from './component/content/guest/HomePage';
import Destinations from './component/content/guest/Destinations';
import Culinary from './component/content/guest/Culinary';
import UserInformationGuest from './component/content/guest/UserInformation';
import ViewBookingHistory from './component/content/guest/ViewBookingHistory';
import BookingPage from './component/content/guest/BookingPage';
import BookingDetail from './component/content/guest/BookingDetail';
//#endregion

//#region ADMIN/MANAGER/RECEPTION ROUTES
import HomeAdmin from './component/content/admin/HomeAdmin';
import UserInformationAdmin from './component/content/admin/UserInformation';
import StatisticManager from './component/content/manager/Statistic';
import ManageReception from './component/content/admin/MangeReception';
import ManageGuestOfManager from './component/content/manager/ManageGuestOfManager';
import ManageBookingOfManager from './component/content/manager/ManageBookingOfManager';
import ManageGuestOfReception from './component/content/reception/ManageGuestOfReception';
import ManageBookingOfReception from './component/content/reception/ManageBookingOfReception';
import ManageRoom from './component/content/manager/ManageRoom';
import ManageRoomType from './component/content/manager/ManageRoomType';
//#endregion

//#region AUTH ROUTES
import Login from "./component/content/auth/Login"
import Register from "./component/content/auth/Register"
import ForgotPassword from "./component/content/auth/ForgotPassword"
import ConfirmEmail from "./component/content/auth/ConfirmEmail"
//#endregion

//#region OTHER IMPORTS
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import UserContextProvider from './contexts/UserContext';
//#endregion

//#region  ERROR PAGE
import Page403 from './component/errors/403';
import Page404 from './component/errors/404';
import Page500 from './component/errors/500';
//#endregion
//#region  LAYOUT
import AnonymousLayout from "./Layout/AnonymousLayout";
import GuestLayout from './Layout/ManageLayout';
import ManageLayout from "./Layout/ManageLayout"
//#endregion
function App() {
    const token = JSON.parse(sessionStorage.getItem('token'));
    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <UserContextProvider>
            <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage />}></Route>
                        <Route path="/404" element={<Page404 />}></Route>
                        <Route path="/403" element={<Page403 />}></Route>
                        <Route path="/500" element={<Page500 />}></Route>
                        <Route path="/destinations" element={<Destinations />}></Route>
                        <Route path="/culinary" element={<Culinary />}></Route>

                        {!token ?
                            <>
                                <Route path="/login" element={<Login />}></Route>
                                <Route path="/confirm" element={<ConfirmEmail />} />
                                <Route path="confirm/:id" element={<ConfirmEmail />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forgot" element={<ForgotPassword />} />
                                <Route path="/*" element={<Navigate to="/login" />} />

                            </> :
                            <>
                                {
                                    user.roleId == '4' ?
                                        <>
                                            <Route path="/my-profile" element={<UserInformationGuest />}></Route>
                                            <Route path="/view-booking-history" element={<ViewBookingHistory />}></Route>
                                            <Route path="/booking/:idCategoryName" element={<BookingPage />}></Route>
                                            <Route path="/booking" element={<BookingPage />}></Route>
                                            <Route path="/booking_detail" element={<BookingDetail />}></Route>

                                            <Route path="/*" element={<Navigate to="/" />} />
                                        </> :
                                        <>
                                            {
                                                user.roleId == '3' ?
                                                    <>
                                                        <Route path='/reception/manageGuest' element={<ManageGuestOfReception />}></Route>
                                                        <Route path='/reception/manageBooking' element={<ManageBookingOfReception />}></Route>
                                                        <Route path="/*" element={<Navigate to="/reception/manageBooking" />} />
                                                    </> :
                                                    user.roleId == '2' ?
                                                        <>
                                                            <Route path="/manager/statistic" element={<StatisticManager />}></Route>
                                                            <Route path='/manager/manageGuest' element={<ManageGuestOfManager />}></Route>
                                                            <Route path="/manager/room" element={<ManageRoom />}></Route>
                                                            <Route path="/manager/roomtype" element={<ManageRoomType />}></Route>
                                                            <Route path='/manager/manageBooking' exact element={<ManageBookingOfManager />}></Route>
                                                            <Route path="/*" element={<Navigate to="/manager/statistic" />} />
                                                        </> :
                                                        <>
                                                            <Route path="/admin" element={<HomeAdmin />}></Route>
                                                            <Route path="/admin/manager" element={<HomeAdmin />}></Route>
                                                            <Route path="/admin/reception" element={<ManageReception />}></Route>
                                                            <Route path="/*" element={<Navigate to="/admin" />} />
                                                        </>
                                            }
                                            <Route path="/four-season/user-profile" element={<UserInformationAdmin />}></Route>
                                        </>
                                }
                            </>}
                    </Routes>
                </BrowserRouter>
            </Fragment>
        </UserContextProvider>
    );
}

export default App;
