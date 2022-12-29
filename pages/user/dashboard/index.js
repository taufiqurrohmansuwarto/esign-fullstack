import UserLayout from "@/components/UserLayout";
import { Button } from "antd";
import { signOut } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";

function Dashboard() {
  const { data, status } = useSession();
  return (
    <div>
      {JSON.stringify(data)}
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}

Dashboard.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Dashboard;
