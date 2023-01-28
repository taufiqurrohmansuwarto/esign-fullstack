import { Spin, Row, Col, Space } from 'antd';
import Image  from 'next/image';

const LoadingScreen = () => {
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
                    <Space direction='vertical' align='center'>
                        <Image
                            src="https://siasn.bkd.jatimprov.go.id:9000/public/logobkd.jpg"
                            width={110}
                            height={100}
                        />
                        <Spin size="large"  style={{
                            marginTop: 10
                        }} />
                        </Space>
                    
                </Col>
            </Row>
        </div>
    );
}

export default LoadingScreen;