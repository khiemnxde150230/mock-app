import { Route, Navigate } from 'react-router-dom';
import UserInformationGuest from '../component/content/guest/UserInformation';
import ViewBookingHistory from '../component/content/guest/ViewBookingHistory';
import BookingPage from '../component/content/guest/BookingPage';
import BookingDetail from '../component/content/guest/BookingDetail';
const GuestLayout = () => {
    return (
        <>
            <Route path="/my-profile" element={<UserInformationGuest />}></Route>
            <Route path="/view-booking-history" element={<ViewBookingHistory />}></Route>
            <Route path="/booking/:idCategoryName" element={<BookingPage />}></Route>
            <Route path="/booking" element={<BookingPage />}></Route>
            <Route path="/booking_detail" element={<BookingDetail />}></Route>
            <Route path="/*" element={<Navigate to="/" />} />


        </>
    )
}
export default GuestLayout;