import UserLayout from "@/components/UserLayout";

const PersonalInformation = () => {
  return <div>Personal Information</div>;
};

PersonalInformation.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default PersonalInformation;
