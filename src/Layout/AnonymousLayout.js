import {  Route, Navigate, Routes } from 'react-router-dom';
import Login from "../component/content/auth/Login"
import Register from "../component/content/auth/Register"
import ForgotPassword from "../component/content/auth/ForgotPassword"
import ConfirmEmail from "../component/content/auth/ConfirmEmail"
const AnonymousLayout = () => {
    return (
        <>
            <Route path="/login" element={<Login />}/>
            <Route path="/confirm" element={<ConfirmEmail />} />
            <Route path="confirm/:id" element={<ConfirmEmail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/*" element={<Navigate to="/login" />} />

        </>
    )
}
export default AnonymousLayout;