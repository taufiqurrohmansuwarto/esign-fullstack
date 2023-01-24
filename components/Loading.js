import { Row } from "antd";
import Image from "next/image";

const Loading = () => {
  return (
    <Row align="middle">
      <Image
        src="https://siasn.bkd.jatimprov.go.id:9000/public/logobkd.jpg"
        alt="logo bkd"
      />
    </Row>
  );
};

export default Loading;
