export const IsEmail = value => {
    const emailRegex =
        new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    return /^[A-Za-z0-9_.+-]+\@(gmail|hotmail)+\.[A-Za-z0-9_.+-]+$/.test(value);
}
export const IsPhone = (value) => {
    const regex = new RegExp("^[0-9\-\+]{10}$");
    return regex.test(value);
}
export const IsPassword = (value) => {
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,20}$)")
    return regex.test(value);
}
export const IsIDCard = (value) => {
    return /^\d{8,12}$/.test(value);
}



export const IsConfirmPassword = (value_1, value_2) => {
    return value_1 === value_2
}
export const IsFullName = (value) => {
    return /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+/.test(value);
}



export const IsValues = (values) => {
    if (!IsEmail(values.email)) {
        return {
            status: 0,
            message: 'Invalid email!'
        }
    }
    if (!IsPassword(values.password)) {
        return {
            status: 0,
            message: 'Password is minimum 10 characters, at least one upper letter, one number and one special character!'
        }
    }
    if (!IsConfirmPassword(values.password, values.passwordconfirm)) {
        return {
            status: 0,
            message: 'Confirm password does not match!'
        }
    }
    if (!IsPhone(values.phone)) {
        return {
            status: 0,
            message: 'Invalid phone number!'
        }
    }
    if (!IsIDCard(values.idCard)) {
        return {
            status: 0,
            message: 'ID Card is a 8-12 digit national identification number!'
        }
    }
    if (values.remember === false) {
        return {
            status: 0,
            message: 'Please agree to our terms!'
        }
    }
    if (!IsFullName(values.name)) {
        return {
            status: 0,
            message: 'Full name consist of only letters and are less than 100 in length !'
        }
    }
    return {
        status: 1,
        message: 'Ok'
    }
}