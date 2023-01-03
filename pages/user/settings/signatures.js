import UserLayout from "@/components/UserLayout";
import { stampInfo } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Image } from "antd";

const Signatures = () => {
  const { data } = useQuery(["stamps"], () => stampInfo(), {
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <Image src={`data:image/jpeg;base64,${data?.image}`} />
    </div>
  );
};

Signatures.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

Signatures.Auth = {
  role: "USER",
};

export default Signatures;
