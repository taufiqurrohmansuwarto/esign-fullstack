import {
  changePage, changePagination, fetchDocuments, removeSign, setDocumentProperty, showSign,
  updateFrame
} from '@/features/request-from-others.slice';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RequestFromOthersActions from "./RequestFromOthersActions";

function RequestFromOthers({ id }) {
  const data = useSelector((state) => state.requestFromOthers);
  const dispatch = useDispatch();

  const changePageDocument = (payload) => {
    dispatch(changePage(payload));
  };

  const loadPageSuccess = (payload) => {
    dispatch(setDocumentProperty(payload));
  };

  const changePaginations = (payload) => {
    dispatch(changePagination(payload));
    dispatch(showSign());
  };

  const updateFrameDocument = (payload) => {
    dispatch(updateFrame(payload));
  };

  const removeSignDocument = (id) => {
    dispatch(removeSign(id));
  };

  useEffect(() => {
    dispatch(fetchDocuments(id));
  }, []);

  return (
    <>
      <RequestFromOthersActions
        changePageDocument={changePageDocument}
        loadPageSuccess={loadPageSuccess}
        changePagination={changePaginations}
        updateFrame={updateFrameDocument}
        removeSign={removeSignDocument}
        {...data}
      />
    </>
  );
}

export default RequestFromOthers;
