import { Button } from "antd";
import { signIn, getProviders } from "next-auth/react";

const SignInPages = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider?.name}>
          <Button onClick={() => signIn(provider?.id)}>
            Masuk menggunakan {provider?.name}
          </Button>
        </div>
      ))}
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default SignInPages;
