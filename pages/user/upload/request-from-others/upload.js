import RequestFromOthers from "@/components/RequestFromOthers/RequestFromOthers";
import RequestFromOthersHeader from "@/components/RequestFromOthers/RequestFromOthersHeader";
import RequestFromOthersUploader from "@/components/RequestFromOthers/RequestFromOthersUploader";
import UserLayout from "@/components/UserLayout";
import { useRouter } from "next/router";

function RequestFromOthersUpload() {
  const router = useRouter();

  const documentId = router?.query?.documentId;

  if (documentId) {
    return (
      <RequestFromOthersHeader current={1}>
        <RequestFromOthers id={documentId} />
      </RequestFromOthersHeader>
    );
  } else {
    return (
      <RequestFromOthersHeader>
        <RequestFromOthersUploader />
      </RequestFromOthersHeader>
    );
  }
}

RequestFromOthersUpload.Auth = {
  role: "USER",
};

RequestFromOthersUpload.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default RequestFromOthersUpload;
