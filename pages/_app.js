import "antd/dist/reset.css";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider, signIn, useSession } from "next-auth/react";

const Auth = ({ children }) => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  if (status === "loading") return null;

  return children;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider session={session} baseUrl="/esign" basePath="/esign/auth">
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydrateState}>
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
