import { LoginOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const SignInPages = ({ providers }) => {
  return (
    <Row
      gutter={[40, 40]}
      style={{ minHeight: "100vh" }}
      align="middle"
      justify="center"
    >
      <Col span={8}>
        <Typography.Title>E-Sign BKD</Typography.Title>
        <Space>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button
                icon={<LoginOutlined />}
                type="primary"
                onClick={() => signIn(provider.id)}
              >
                Login with {provider.name}
              </Button>
            </div>
          ))}
        </Space>
        <Divider />
        <Space>
          <Typography.Text>
            <Link href="/check">Check Document ?</Link>
          </Typography.Text>
        </Space>
      </Col>
      <Col span={6}>
        {/* object fit */}
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <Image
            alt="Mountains"
            src="https://siasn.bkd.jatimprov.go.id:9000/public/desktop.png"
            // layout="fill"
            // width="auto"
            width={650}
            height={500}
            // objectFit="contain"
          />
        </div>
      </Col>
    </Row>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default SignInPages;
