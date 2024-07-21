// import axios from "axios";

export function handleValidation(editData, errors) {
    if (!/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(editData.editPhoneNumber)) {
        errors.editPhoneNumber = 'PhoneNumber must be 10 digits';
    }
    if (editData.editPhoneNumber == '') {
        errors.editPhoneNumber = "Phone Number can not be blank ";
    }
    if (editData.editFullName == '') {
        errors.editFullName = "FullName must be blank";
    }
    const length = editData.editFullName.length;
    if (length < 2 || length > 255) {
        errors.editFullName = "Length of fullname must be from 2 to 255";
    }
    if (!/^[a-zA-Z\s-]+$/.test(editData.editFullName)) {
        errors.editFullName = "Name can not contain numbers or special characters ";
    }
    if (!/^\d{8,12}$/.test(editData.editIdCard)) {
        errors.editIdCard = 'ID Card must be from 8 to 12 digits';
    }
    if (editData.editIdCard == '') {
        errors.editIdCard = "ID Card can not be blank";
    }
}