import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import React from "react";
import { theme, Button } from "antd";
import DetailDocumentHeader from "@/components/DetailDocumentHeader";

function View() {
  const {
    theme: { colorBgContainer },
  } = theme.useToken();

  return <div>hello world</div>;
}

// auth

View.Auth = {
  role: "USER",
};

View.getLayout = (page) => (
  <UserLayout>
    <DetailDocumentHeader tabActiveKey={"view"}>{page}</DetailDocumentHeader>
  </UserLayout>
);

// custom layout

export default View;
