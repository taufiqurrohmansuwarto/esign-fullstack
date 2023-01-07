import SelfSignUploadHeader from "@/components/SelfSignUploadHeader";
import UserLayout from "@/components/UserLayout";

function SelfSignUpload() {
  return <SelfSignUploadHeader>hello world</SelfSignUploadHeader>;
}

SelfSignUpload.Auth = {
  role: "USER",
};

SelfSignUpload.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default SelfSignUpload;
