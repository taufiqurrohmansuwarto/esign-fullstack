import UserLayout from "@/components/UserLayout";

const DigitalCertificate = () => {
  return <div>Digital Certificate</div>;
};

DigitalCertificate.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default DigitalCertificate;
