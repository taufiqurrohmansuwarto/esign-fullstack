import { flattenDeep } from '@/lib/client-utils';
import { detailDocument } from "@/services/users.services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDocuments = createAsyncThunk(
    "users/documents",
    async (documentId) => {
        const currentDocument = await detailDocument(documentId);
        return currentDocument;
    }
);

const signers = (data) => {
    return data?.Recipient?.filter(d => d?.role === 'SIGNER')?.map(x => x?.sign_properties)
}

export const requestFromOthersViewSlice = createSlice({
    name: "requestFromOthersView",
    initialState: {
        loading: "idle",
        dataSign: [],
        dataSignFilter: [],
        docUrl: null,
        documentData: null,
        documentProperty: null,
        documents: {
            currentPage: 1,
            totalPage: 10,
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDocuments.fulfilled, (state, { payload }) => {
            state.docUrl = {
                url: payload.document_url
            };
            state.documentData = payload;
            state.dataSign = flattenDeep(signers(payload));
            state.documents.currentPage = 1;
            state.documents.totalPage = payload?.document_pages
            state.dataSignFilter = [];
        });
    },
    reducers: {
        // dokumen reducer
        changePage(state, { payload }) {
            state.documents = payload;
        },
        setDocumentProperty(state, { payload }) {
            state.documentProperty = payload;
        },
        changeDocumentProperty(state, { payload }) {
            state.documents = payload;
        },
        changePagination(state, { payload }) {
            state.documents.currentPage = payload;
        },
        showSign(state, { payload }) {
            state.dataSignFilter = state.dataSign.filter(
                (sign) => sign.page === state.documents.currentPage
            );
        },
    },
});

export const {
    changePage,
    setDocumentProperty,
    changeDocumentProperty,
    changePagination,
    showSign,
} = requestFromOthersViewSlice.actions;

export default requestFromOthersViewSlice.reducer;
