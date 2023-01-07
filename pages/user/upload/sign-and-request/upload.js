import UserLayout from "@/components/UserLayout";

function SignAndRequestUpload() {
  return <div>upload</div>;
}

SignAndRequestUpload.Auth = {
  role: "USER",
};

SignAndRequestUpload.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default SignAndRequestUpload;
