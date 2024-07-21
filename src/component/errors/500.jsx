import { Button, Result } from 'antd';
const Page500 = () => (
    <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary"><a href='/'>Back Home</a></Button>}
    />
);
export default Page500;