import DocumentsList from "@/components/DocumentsList";
import UserLayout from "@/components/UserLayout";

const AllDocuments = () => {
  return <DocumentsList type="all" />;
};

AllDocuments.Auth = {
  role: "USER",
};

AllDocuments.getLayout = (page) => {
  return <UserLayout active="/user/documents/all">{page}</UserLayout>;
};

export default AllDocuments;
