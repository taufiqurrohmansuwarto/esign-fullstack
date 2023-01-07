import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import UserLayout from "@/components/UserLayout";
import React from "react";

function Discussions() {
  return (
    <DetailDocumentHeader title="Discussions" tabActiveKey="discussions">
      <div>recipients</div>
    </DetailDocumentHeader>
  );
}

Discussions.Auth = {
  role: "USER",
};

Discussions.getLayout = (page) => <UserLayout>{page}</UserLayout>;

export default Discussions;
