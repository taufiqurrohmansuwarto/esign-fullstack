import { Button } from "antd";
import { SignIn, getProviders } from "next-auth/react";
export default SignIn = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider?.name}>
          <Button onClick={() => SignIn(provider?.id)}>
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
