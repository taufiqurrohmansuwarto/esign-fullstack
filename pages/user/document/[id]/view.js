import Container from "@/components/Container";
import DetailDocumentHeader from "@/components/DetailDocumentHeader";
import UserLayout from "@/components/UserLayout";
import {
  addSign,
  changePage,
  changePagination,
  fetchSignSymbol,
  removeSign,
  setDocumentProperty,
  showLine,
  hideLine,
  showSign,
  updateFrame,
} from "features/self-sign.slice";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

// signselfactions to client
const SelfSignActions = dynamic(
  () => import("../../../../components/SelfSign/SelfSignActions"),
  {
    ssr: false,
  }
);

function View() {
  const router = useRouter();
  const data = useSelector((state) => state?.selfSign, shallowEqual);
  const dispatch = useDispatch();

  const changePageDocument = (payload) => {
    dispatch(changePage(payload));
  };

  const showLineStamp = () => {
    dispatch(showLine());
  };

  const hideLineStamp = () => {
    dispatch(hideLine());
  };

  const loadPageSuccess = (payload) => {
    dispatch(setDocumentProperty(payload));
  };

  const changePaginations = (payload) => {
    dispatch(changePagination(payload));
    dispatch(showSign());
  };

  const addSignDocument = () => {
    dispatch(
      addSign({
        frame: {
          height: 175,
          width: 350,
          translate: [0, 0, 0],
        },
      })
    );
  };

  const updateFrameDocument = (payload) => {
    dispatch(updateFrame(payload));
  };

  const removeSignDocument = (id) => {
    dispatch(removeSign(id));
  };

  useEffect(() => {
    dispatch(fetchSignSymbol(router?.query?.id));
  }, [router?.query?.id]);

  return (
    <Container>
      <SelfSignActions
        changePageDocument={changePageDocument}
        loadPageSuccess={loadPageSuccess}
        changePagination={changePaginations}
        addSign={addSignDocument}
        updateFrame={updateFrameDocument}
        showLineStamp={showLineStamp}
        hideLineStamp={hideLineStamp}
        removeSign={removeSignDocument}
        {...data}
      />
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
