import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import UserLayout from "@/components/UserLayout";
import React from "react";

function Information() {
  return (
    <DetailDocumentHeader title="Information" tabActiveKey="information">
      <div>Information</div>
    </DetailDocumentHeader>
  );
}

Information.Auth = {
  role: "USER",
};

Information.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Information;
