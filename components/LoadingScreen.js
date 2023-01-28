import { Spin, Row, Col } from 'antd';
import {Image } from 'next/image';

function LoadingScreen() {
    return (
        <div style={{
            position: 'fixed',
            top : 0,
            left : 0,
            width : '100%',
            height : '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <Row>
                <Col span={24}>
                    <Image
                        src="https://siasn.bkd.jatimprov.go.id:9000/public/logobkd.jpg"
                        width={410}
                        height={400}
                    />
                    <Spin size="large" tip="Loading..." style={{
                        marginTop: 10
                    }} />
                </Col>
            </Row>
        </div>
    );
}

export default LoadingScreen;