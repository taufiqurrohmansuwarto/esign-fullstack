import UserLayout from "@/components/UserLayout";

function RequestFromOthersUpload() {
  return <div>upload</div>;
}

RequestFromOthersUpload.Auth = {
  role: "USER",
};

RequestFromOthersUpload.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default RequestFromOthersUpload;
