// export page container from ant design pro components using next client

import dynamic from "next/dynamic";

const PageHeader = dynamic(
  () => import("@ant-design/pro-components").then((r) => r.PageHeader),
  {
    ssr: false,
  }
);

export default PageHeader;
