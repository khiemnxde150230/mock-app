import {  Route, Navigate } from 'react-router-dom';
import StatisticManager from '../component/content/manager/Statistic';
import ManageGuestOfManager from '../component/content/manager/ManageGuestOfManager';
import ManageBookingOfManager from '../component/content/manager/ManageBookingOfManager';
import ManageRoom from '../component/content/manager/ManageRoom';
import ManageRoomType from '../component/content/manager/ManageRoomType';
const GuestLayout = () => {
    return (
        <>
            <Route path="/manager/statistic" element={<StatisticManager />}></Route>
            <Route path='/manager/manageGuest' element={<ManageGuestOfManager />}></Route>
            <Route path="/manager/room" element={<ManageRoom />}></Route>
            <Route path="/manager/roomtype" element={<ManageRoomType />}></Route>
            <Route path='/manager/manageBooking' exact element={<ManageBookingOfManager />}></Route>
            <Route path="/*" element={<Navigate to="/manager/statistic" />} />
        </>
    )
}
export default GuestLayout;