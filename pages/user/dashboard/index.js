import UserLayout from "@/components/UserLayout";
import { Button } from "antd";
import { signOut } from "next-auth/react";
import React from "react";

function Dashboard() {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}

Dashboard.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Dashboard;
