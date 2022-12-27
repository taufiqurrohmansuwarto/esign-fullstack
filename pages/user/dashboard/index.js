import UserLayout from "@/components/UserLayout";
import React from "react";

function Dashboard() {
  return <div>Berisi Informasi User (nama, email, nip, jabatan)</div>;
}

Dashboard.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Dashboard;
