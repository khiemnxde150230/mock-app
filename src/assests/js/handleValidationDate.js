export function handleValidationDate(editData, errors) {
    //Get DateTime Now
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const current = `${year}-${month}-${day}`;

    if ((editData.editCreateDate > editData.editCheckIn) == true) {
        errors.editCheckIn = "Check In date must be more than or equal to creation date";
    }
    if ((editData.editCheckIn > editData.editCheckOut) == true) {
        errors.editCheckOut = "CheckOut date must be greate than CheckIn date at least one day";
    }
    const start = new Date(editData.editCheckIn);
    const end = new Date(editData.editCheckOut);

    const instance = Math.abs(end - start);
    const days = Math.floor(instance / (1000 * 60 * 60 * 24));
    if (days < 1) {
        errors.editCheckOut = ("CheckOut date must be greate than CheckIn date at least one day")
    }
    if(editData.editCheckIn < current && editData.editDisable == false){
        errors.editCheckIn = "Check In must be greate than or equal current date";
    }
}