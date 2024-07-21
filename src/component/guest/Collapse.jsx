import { Collapse, Divider, Row, Col } from 'antd';
import { Fragment } from 'react';

const { Panel } = Collapse;

export default function CollapseGuest(props) {

    const styleImgTop = {
        width: '100%',
        height: '500px',
        objectFit: 'cover',
    }

    const text = {
        fontSize: '14px',
        lineHeight: '22px',
        textAlign: 'justify',
        marginBottom: '20px',
        color: '#000',
    }

    return (
        <Fragment>
            <Divider orientation="left"></Divider>
            <Collapse size="large">
                <Panel header={props.title} key={props.key}
                    style={{ textAlign: 'initial', fontWeight: 'initial' }}>

                    <Row style={{ marginBottom: 20 }}>
                        <Col>
                            <img src={props.img} style={styleImgTop} />
                        </Col>
                    </Row>

                    <p style={text}>
                        {props.text1}
                    </p>
                    <p style={text}>
                        {props.text2}
                    </p>
                    <p style={text}>
                        {props.text3}
                    </p>
                </Panel>
            </Collapse>
        </Fragment>
    )
}