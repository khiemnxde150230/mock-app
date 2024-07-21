const Notification = (api, type, detail) => {
    api[type]({
        message: 'Notification',
        description: detail,
    });
};
export default Notification