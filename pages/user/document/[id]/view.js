import Container from "@/components/Container";
import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import PdfView from "@/components/PdfView";
import RecipientsActions from '@/components/Recipients/RecipientsActions';
import RequestFromOthers from '@/components/RequestFromOthers/RequestFromOthers';
import SelfSignView from "@/components/SelfSign/SelfSignView";
import UserLayout from "@/components/UserLayout";
import { isOwner } from '@/lib/client-utils';
import { detailDocument } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";


// request from others : diperlukan beberapa komponen untuk ini 
// 1. komponen pemilik request from others ketika belum dilakukan aksi / pemilihan user
const CheckRequestFromOthers = ({ data, user }) => {
  const { status, id } = data;
  const checkOwner = isOwner(data, user?.id);

  const ownerNotFinished = status === 'DRAFT' && checkOwner;
  const ownerFinishCheck = status === 'ONGOING' && checkOwner;


  if (ownerNotFinished) {
    return (
      <RequestFromOthers id={id} />
    )
  }

  if (ownerFinishCheck) {
    return (
      <RecipientsActions id={id} />
    )
  }


  return (
    <>
      {JSON.stringify({
        checkOwner
      })}
    </>
  )
}

// 2. komponen pemilik request from others ketika sudah dilakukan aksi / pemilihan user
// 3. komponen user yang dipilih untuk melakukan tanda tangan
// 4. komponen user yang dipilih ketika role nya sudah selesai




const CheckView = ({ data, user }) => {
  const { status, workflow, id } = data;

  // self sign
  const selfSignAction = status === "DRAFT" && workflow === "selfSign";
  const selfSignView = status === "COMPLETED" && workflow === "selfSign";

  // request from others
  const requestFromOthers = workflow === "requestFromOthers";


  if (selfSignAction) {
    return <SelfSignView documentId={id} />
  }

  if (requestFromOthers) {
    return <CheckRequestFromOthers data={data} user={user} />
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

  const { data: session } = useSession();

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
        <CheckView data={data} user={session?.user} />
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
