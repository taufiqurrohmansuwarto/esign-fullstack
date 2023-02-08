import { LoginOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const SignInPages = ({ providers }) => {
  return (
    <Row style={{ minHeight: "100vh" }} align="middle" justify="center">
      <Col span={8}>
        <Typography.Title>E-Sign BKD</Typography.Title>
        <Space>
          {Object?.values(providers).map((provider) => (
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
        <div
          style={{
            marginBottom: 10,
          }}
        >
          <Space size="small">
            <Image
              alt="pemprov"
              src="https://siasn.bkd.jatimprov.go.id:9000/public/pemprov.png"
              width={15}
              height={20}
            />
            <Image
              alt="logobkd"
              src="https://siasn.bkd.jatimprov.go.id:9000/public/logobkd.jpg"
              width={30}
              height={40}
            />
            <Image
              alt="logobsre"
              src="https://siasn.bkd.jatimprov.go.id:9000/public/logobsre.png"
              width={50}
              height={20}
            />
          </Space>
        </div>
        <Space direction="vertical" size="small">
          <Typography.Text>
            <Link href="/check">Check Document?</Link>
          </Typography.Text>
          <span>&#169; 2023 BKD Provinsi Jawa Timur</span>
          <Link
            href="https://github.com/taufiqurrohmansuwarto/esign-fullstack"
            passHref
            target="_blank"
          >
            This code available on github
          </Link>
          <Typography.Text>Version 1.0.alpha.4 - 08-02-2023</Typography.Text>
        </Space>
      </Col>
      <Col span={6}>
        <Image
          alt="Mountains"
          src="https://siasn.bkd.jatimprov.go.id:9000/public/desktop.png"
          width={550}
          height={400}
        />
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
