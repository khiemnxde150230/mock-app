import { Route, Navigate } from 'react-router-dom';
import ManageGuestOfReception from '../component/content/reception/ManageGuestOfReception';
import ManageBookingOfReception from '../component/content/reception/ManageBookingOfReception';

const ReceptionLayout = () => {
    return (
        <>
            <Route path='/reception/manageGuest' element={<ManageGuestOfReception />}></Route>
            <Route path='/reception/manageBooking' element={<ManageBookingOfReception />}></Route>
            <Route path="/*" element={<Navigate to="/reception/manageBooking" />} />
        </>
    )
}
export default ReceptionLayout;