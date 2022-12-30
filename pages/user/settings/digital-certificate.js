import UserLayout from "@/components/UserLayout";

const DigitalCertificate = () => {
  return <div>Digital Certificate</div>;
};

DigitalCertificate.Auth = {
  role: "USER",
};

DigitalCertificate.getLayout = (page) => {
  return (
    <UserLayout active="/user/settings/digital-certificate">{page}</UserLayout>
  );
};

export default DigitalCertificate;
