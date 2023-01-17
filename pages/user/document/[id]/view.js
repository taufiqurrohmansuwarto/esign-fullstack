import Container from "@/components/Container";
import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import PdfView from "@/components/PdfView";
import SelfSignView from "@/components/SelfSign/SelfSignView";
import UserLayout from "@/components/UserLayout";
import { detailDocument } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useRouter } from "next/router";

const SignView = ({ data }) => {
  const { status, workflow, id } = data;

  const selfSignAction = status === "DRAFT" && workflow === "selfSign";
  const selfSignView = status === "COMPLETED" && workflow === "selfSign";

  if (selfSignAction) {
    return <SelfSignView documentId={id} />;
  }

  if (selfSignView) {
    return (
      <PdfView
        data={data}
        url={{
          url: data?.document_url,
        }}
      />
    );
  }
};

function View() {
  const router = useRouter();
  const documentId = router.query.id;

  const { data, isLoading } = useQuery(
    ["document-detail", documentId],
    () => detailDocument(documentId),
    {
      enabled: !!documentId,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container>
      <Skeleton loading={isLoading}>
        <SignView data={data} />
      </Skeleton>
    </Container>
  );
}

View.Auth = {
  role: "USER",
};

View.getLayout = (page) => (
  <UserLayout>
    <DetailDocumentHeader tabActiveKey={"view"}>{page}</DetailDocumentHeader>
  </UserLayout>
);

export default View;
