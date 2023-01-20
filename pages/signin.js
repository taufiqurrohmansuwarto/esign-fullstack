import { Button, Col, Divider, Row, Space, Typography } from "antd";
import { getProviders, signIn } from "next-auth/react";
import Link from "next/link";

const SignInPages = ({ providers }) => {
  return (
    <Row style={{ minHeight: "100vh" }} justify="center">
      <Col xs={{ span: 24 }} md={{ span: 12 }}>
        <Typography.Title>E-Sign</Typography.Title>
        <Space>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button type="primary" onClick={() => signIn(provider.id)}>
                Masuk dengan akun {provider.name}
              </Button>
            </div>
          ))}
        </Space>

        <Divider />
        <Space>
          <Typography.Text>
            <Link href="/check-document">Ingin Check Dokumen</Link>
          </Typography.Text>
        </Space>
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
