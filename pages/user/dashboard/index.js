import UserLayout from "@/components/UserLayout";
import React from "react";

function Dashboard() {
  return <div>Dashborad</div>;
}

Dashboard.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Dashboard;
