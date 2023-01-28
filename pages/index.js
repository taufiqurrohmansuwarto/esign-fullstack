import LoadingScreen from "@/components/LoadingScreen";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function index() {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  const router = useRouter();

  useEffect(() => {
    if (data?.user?.role === "USER") {
      router.push("/user/dashboard");
    }
    if (data?.user?.role === "ADMIN") {
      router.push("/admin/dashboard");
    }
  }, [data, status]);

  if (status === "loading") return <LoadingScreen/>;

  return null;
}

export default index;
