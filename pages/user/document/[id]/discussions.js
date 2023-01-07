import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import DisccussionList from "@/components/discussions/Discussions";
import UserLayout from "@/components/UserLayout";
import { Card } from "antd";

function Discussions() {
  return (
    <DetailDocumentHeader title="Discussions" tabActiveKey="discussions">
      <Card>
        <DisccussionList />
      </Card>
    </DetailDocumentHeader>
  );
}

Discussions.Auth = {
  role: "USER",
};

Discussions.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Discussions;
