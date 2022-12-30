import UserLayout from "@/components/UserLayout";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton, Typography } from "antd";
import { signOut } from "next-auth/react";
import { detailUser } from "services/users.services";

function Dashboard() {
  const { data, isLoading } = useQuery(["user"], () => detailUser());

  return (
    <div>
      <Skeleton loading={isLoading}>
        <Typography.Text>Selamat datang {data?.name || "User"}</Typography.Text>
        <div />
        <Typography.Text>
          Status BSRE anda saat ini adalah {data?.status || "Tidak ada data"}
        </Typography.Text>
      </Skeleton>
      <div></div>
      <Button type="primary" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}

Dashboard.Auth = {
  role: "USER",
};

Dashboard.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Dashboard;
