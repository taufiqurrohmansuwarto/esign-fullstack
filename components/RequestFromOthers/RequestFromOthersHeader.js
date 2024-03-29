import { Card, Steps } from "antd";
import { useRouter } from "next/router";
import PageContainer from "../pro/PageContainer";

function RequestFromOthersHeader({
  children,
  current,
  title = "Request From Others",
  subTitle = "Workflow",
}) {
  const router = useRouter();

  const handleBack = () => router.push(`/user/dashboard`);

  const items = [
    { title: "Upload Document" },
    { title: "Add Recipients" },
    { title: "Finisih" },
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

export default RequestFromOthersHeader;
