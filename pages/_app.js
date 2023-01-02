import "antd/dist/reset.css";
import "../styles/global.css";
import id from "antd/locale/id_ID";

import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { ConfigProvider } from "antd";

const Auth = ({ children, role }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  if (status === "loading") {
    return <div>loading...</div>;
  } else {
    const { user } = session;

    if (user?.current_role === role) {
      return children;
    } else {
      return <div>Not authorized to access this resource</div>;
    }
  }
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider
      session={session}
      baseUrl="/esign"
      basePath="/esign/api/auth"
    >
      <ConfigProvider locale={id}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydrateState}>
            {Component.Auth ? (
              <Auth role={Component?.Auth?.role}>
                {getLayout(<Component {...pageProps} />)}
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Hydrate>
        </QueryClientProvider>
      </ConfigProvider>
    </SessionProvider>
  );
}

export default MyApp;
