// notification for creating successfully
export const openNotificationCreate = (api, placement) => {
	api.success({
		message: `Notification`,
		description: "A new User has been created",
		placement,
	});
};

export const openNotificationCreateUnsuccessfully = (api, placement) => {
	api.error({
		message: `Notification`,
		description: "A new Manager has been created unsuccessfully",
		placement,
	});
};

// notification for updating
export const openNotificationUpdate = (api, placement) => {
	api.success({
		message: `Notification`,
		description: "The User information has been updated successfully",
		placement,
	});
};

export const openNotificationUpdateUnsuccessfully = (api, placement) => {
	api.error({
		message: `Notification`,
		description: "The User information has been updated unsuccessfully",
		placement,
	});
};
export const openNotificationChangingStatus = (api, placement) => {
	api.success({
		message: `Notification`,
		description: "The User status has been updated successfully",
		placement,
	});
};