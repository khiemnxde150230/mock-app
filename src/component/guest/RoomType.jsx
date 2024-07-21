import { Card, Row, Button, Space } from 'antd';
import { useEffect, useState } from 'react';

const gridStyle = {
    width: 'fit-content',
    textAlign: 'center',
    margin: '0.3rem',
    cursor: 'pointer',
    padding: "0.5rem",
    border: "2px solid #4096ff",
    borderRadius: "1.5rem"
};
const contentCard = {
    fontSize: "1rem",
}

const RoomType = (props) => {
    const [roomtypes, setRoomtypes] = useState(['double']);

    useEffect(() => {
        setRoomtypes(props.roomtypes)
    }, [props.roomtypes])

    return (
        <Row style={{marginTop: 20}}>
            <Space direction="horizontal">
                {roomtypes.map(item => {
                    return (
                        <>
                            <Button style={{background: "var(--mainColor--)", minWidth: 120}} type="primary" onClick={() => props.handleRoomtype(item.categoryName)}>{item.categoryName}</Button> {" "}
                        </>
                    )
                })}
            </Space>
        </Row>


        // <Card style={{ border: "none", marginTop: '1rem', }}>
        //     {roomtypes.map(item => {
        //         return (
        //             <Card.Grid style={gridStyle} key={item.categoryId}>
        //                 <span style={contentCard} onClick={() => props.handleRoomtype(item.categoryName)}>{item.categoryName}</span>
        //             </Card.Grid>
        //         )
        //     })}
        // </Card>

    );
}
export default RoomType;