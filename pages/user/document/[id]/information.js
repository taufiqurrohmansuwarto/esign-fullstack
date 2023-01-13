import Container from "@/components/Container";
import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import UserLayout from "@/components/UserLayout";
import { Card } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Histories = ({ documentId }) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    type: "DOCUMENT",
  });

  return <div>{documentId}</div>;
};

function Information() {
  const router = useRouter();
  const { id: documentId } = router.query;

  return (
    <DetailDocumentHeader title="Information" tabActiveKey="information">
      <Container>
        <Card title="Detail">
          <div>Information</div>
          <Histories documentId={documentId} />
        </Card>
      </Container>
    </DetailDocumentHeader>
  );
}

Information.Auth = {
  role: "USER",
};

Information.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Information;
