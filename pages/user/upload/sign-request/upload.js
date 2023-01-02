import UserLayout from "@/components/UserLayout";

function SignAndRequest() {
  return <div>upload</div>;
}

SignAndRequest.Auth = {
  role: "USER",
};

SignAndRequest.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default SignAndRequest;
