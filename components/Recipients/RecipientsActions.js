import {
    changePage, changePagination, fetchDocuments, setDocumentProperty, showSign
} from '@/features/request-from-others-view.slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const RecipientsActions = ({ id }) => {
    const data = useSelector(state => state?.requestFromOthersView)
    const dispatch = useDispatch()


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




    useEffect(() => {
        dispatch(fetchDocuments(id));
    }, []);


    return <div>
        {JSON.stringify(data)}
    </div>
}

export default RecipientsActions;