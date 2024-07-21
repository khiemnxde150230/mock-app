import {  Route, Navigate } from 'react-router-dom';

import HomeAdmin from '../component/content/admin/HomeAdmin';
import ManageReception from '../component/content/admin/MangeReception';
const AdminLayout = () => {
    return (
        <>
            <Route path="/admin" element={<HomeAdmin />}></Route>
            <Route path="/admin/manager" element={<HomeAdmin />}></Route>
            <Route path="/admin/reception" element={<ManageReception />}></Route>
            <Route path="/*" element={<Navigate to="/admin" />} />
        </>
    )
}
export default AdminLayout