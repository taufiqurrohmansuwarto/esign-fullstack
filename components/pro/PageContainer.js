// export page container from ant design pro components using next client

import dynamic from "next/dynamic";

const PageContainer = dynamic(
  () => import("@ant-design/pro-components").then((r) => r.PageContainer),
  {
    ssr: false,
  }
);

export default PageContainer;
