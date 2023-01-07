import { Card, Steps } from "antd";
import { useRouter } from "next/router";
import PageContainer from "./pro/PageContainer";

function SelfSignUploadHeader({
  children,
  current = 0,
  title = "Self Sign",
  subTitle = "Workflow",
}) {
  const router = useRouter();

  const handleBack = () => router.push("/user/dashboard");

  const items = [
    { title: "Upload Document" },
    { title: "Sign Document" },
    { title: "Finish" },
  ];

  return (
    <PageContainer title={title} subTitle={subTitle} onBack={handleBack}>
      <Card>
        <Steps current={current} size="small" items={items} />
      </Card>
      {children}
    </PageContainer>
  );
}

export default SelfSignUploadHeader;
