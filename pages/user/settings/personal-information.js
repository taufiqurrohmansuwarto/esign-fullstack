import UserLayout from "@/components/UserLayout";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { detailUser } from "services/users.services";

const PersonalInformation = () => {
  const { data, isLoading } = useQuery(["user"], () => detailUser());

  if (isLoading) {
    return <div>loading..</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

PersonalInformation.getLayout = (page) => {
  return (
    <UserLayout active="/user/settings/personal-information">{page}</UserLayout>
  );
};

PersonalInformation.Auth = {
  role: "USER",
};

export default PersonalInformation;
