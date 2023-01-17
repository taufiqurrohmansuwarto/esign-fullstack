import Container from "@/components/Container";
import {
  addSign,
  changePage,
  changePagination,
  fetchSignSymbol,
  hideLine,
  removeSign,
  setDocumentProperty,
  showLine,
  showSign,
  updateFrame,
} from "@/features/self-sign.slice";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SelfSignActions from "./SelfSignActions";

function SelfSignView({ documentId }) {
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
    dispatch(fetchSignSymbol(documentId));
  }, [documentId]);

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

export default SelfSignView;
