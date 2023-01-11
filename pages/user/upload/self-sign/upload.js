import SelfSignUploader from "@/components/SelfSign/SelfSignUploader";
import SelfSignUploadHeader from "@/components/SelfSignUploadHeader";
import UserLayout from "@/components/UserLayout";

function SelfSignUpload() {
  return (
    <SelfSignUploadHeader>
      <SelfSignUploader />
    </SelfSignUploadHeader>
  );
}

SelfSignUpload.Auth = {
  role: "USER",
};

SelfSignUpload.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default SelfSignUpload;
