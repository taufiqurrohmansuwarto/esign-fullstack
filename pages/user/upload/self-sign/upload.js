import UserLayout from "@/components/UserLayout";
import React from "react";

function Upload() {
  return <div>upload</div>;
}

Upload.Auth = {
  role: "USER",
};

Upload.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Upload;
