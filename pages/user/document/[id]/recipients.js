import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import UserLayout from "@/components/UserLayout";
import React from "react";

function Recipients() {
  return (
    <DetailDocumentHeader title="Recipients" tabActiveKey="recipients">
      <div>recipients</div>
    </DetailDocumentHeader>
  );
}

Recipients.Auth = {
  role: "USER",
};

Recipients.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Recipients;
