import { Row } from "antd";
import Image from "next/image";

const Loading = () => {
  return (
    <Row align="middle" justify="center">
      <Image
        src="https://siasn.bkd.jatimprov.go.id:9000/public/logobkd.jpg"
        alt="logo bkd"
        width={100}
        height={100}
      />
    </Row>
  );
};

export default Loading;
