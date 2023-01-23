import Container from "@/components/Container";
import UserLayout from "@/components/UserLayout";
import { Result } from 'antd';

function SignAndRequestUpload() {
  return <Container>
    <Result status={404} title='Page Not Found' subTitle='Feature Not Implemented' />
  </Container>
}

SignAndRequestUpload.Auth = {
  role: "USER",
};

SignAndRequestUpload.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default SignAndRequestUpload;
