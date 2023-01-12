import SelfSignAction from "@/components/SelfSign/SelfSignAction";
import SelfSignUploader from "@/components/SelfSign/SelfSignUploader";
import SelfSignUploadHeader from "@/components/SelfSignUploadHeader";
import UserLayout from "@/components/UserLayout";
import { useRouter } from "next/router";

function SelfSignUpload() {
  const router = useRouter();

  // ini kalau dia ada documentid maka searching informasinya
  if (router?.query?.documentId) {
    return (
      <SelfSignUploadHeader current={1}>
        <SelfSignAction documentId={router?.query?.documentId} />
      </SelfSignUploadHeader>
    );
  }

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
