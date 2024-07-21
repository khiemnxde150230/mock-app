
// validate fullName
export function validateFullName(fullName) {
	let nameRegex = /^[A-Za-z ]+$/;
	if (!fullName.trim()) {
	  return "Name can not be blank";
	} else if (!nameRegex.test(fullName)) {
	  return "Name cannot contain numbers or special characters";
	} else if (fullName.length < 2) {
	  return "Invalid Name";
	}
	return null;
  }
  // validate birthDay
  export function validateBirthday(birthday) {
	// Calculate age based on birthday
	const today = new Date();
	const birthDate = new Date(birthday);
	const age = today.getFullYear() - birthDate.getFullYear();
  
	if (!birthday) {
	  return "Birthday cannot be blank.";
	} else if (age < 18 || age > 60) {
	  return "Employee must be older than 18 and younger than 60";
	}
	return null; // No error
  }
  export function validateAddress(address) {
	let addressRegex = "/^[A-Za-z ]+$/";
	const addressRegex2 = /^[a-zA-Z0-9\s]*$/;
	if (!address.trim()) {
	  return "Address can not be blank";
	} else if (!addressRegex2.test(address)) {
	  return "Address cannot contain special characters.";
	}
	return null;
  }
  export function validatePhoneNumber(phoneNumber) {
	// Implement Vietnam Phone Number validation rules here
	const phoneRegex =
	  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
	if (!phoneNumber.trim()) {
	  return "Phone number can not be blank";
	} else if (!phoneRegex.test(phoneNumber)) {
	  return "Invalid phone number"; // No error
	}
	return null; // No error
  }
  export function validateIdCard(idcard, listIdCard) {
  
	// Implement Vietnam Phone Number validation rules here
  
	const IdcardRegex = /^[A-Za-z0-9]{1,10}$/;
	if (!idcard.trim()) {
	  return "IdCard number can not be blank";
	} else if (!IdcardRegex.test(idcard)) {
	  return "ID Card must be 8 to 12 digits"; // No error
	} else if (idcard.length > 12 || idcard.length < 8) {
	  return "ID Card must be 8 to 12 digits";
	} else if (listIdCard.includes(idcard)) {
	  return "This ID Card was already registered";
	}
	return null; // No error
  }
  