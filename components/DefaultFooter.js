// using dynamic import to load the component
import dynamic from "next/dynamic";
const DefaultFooter = dynamic(
  () => import("@ant-design/pro-components").then((r) => r.DefaultFooter),
  {
    ssr: false,
  }
);

export default DefaultFooter;
