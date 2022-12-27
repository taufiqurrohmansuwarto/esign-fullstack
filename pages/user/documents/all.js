import UserLayout from "@/components/UserLayout";

const AllDocuments = () => {
  return <div>All Documenst</div>;
};

AllDocuments.getLayout = (page) => {
  return <UserLayout active="/user/settings">{page}</UserLayout>;
};

export default AllDocuments;
