import UserLayout from "@/components/UserLayout";

const Signatures = () => {
  return <div>Signatures</div>;
};

Signatures.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default Signatures;
