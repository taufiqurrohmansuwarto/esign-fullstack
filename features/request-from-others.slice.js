import { detailDocument } from "@/services/users.services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const fetchDocuments = createAsyncThunk(
  "users/documents",
  async (documentId) => {
    const currentDocument = await detailDocument(documentId);
    return currentDocument;
  }
);

export const shareSignSlice = createSlice({
  name: "requestFromOthers",
  initialState: {
    loading: "idle",
    dataUser: [],
    dataSign: [],
    signSymbol: null,
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
      state.dataUser = [];
      state.dataSign = [];
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

    addRecipients(state, { payload }) {
      const isExists = state.dataUser.findIndex(
        (e) => e.pegawai_id === payload.pegawai_id
      );

      if (isExists < 0) {
        state.dataUser.push({
          id: nanoid(),
          ...payload,
          role: "reviewer",
        });
      }
    },
    removeRecipients(state, { payload }) {

      const currentUser = state?.dataUser?.find(user => user?.id === payload)?.pegawai_id
      const result = state.dataUser.filter((e) => e.id !== payload);
      state.dataUser = result;


      // ini harus dihapus juga tanda tangannya
      const newDataSign = state.dataSign.filter((e) => e.userId !== currentUser);
      state.dataSign = newDataSign;
      state.dataSignFilter = newDataSign.filter(
        (d) => d.page === state.documents.currentPage
      );
    },
    changeRole(state, { payload }) {
      const current = state.dataUser.findIndex((e) => e.id === payload);
      const currentUser = state.dataUser[current].pegawai_id;
      const { role } = state.dataUser[current];
      let currentRole;
      if (role === "reviewer") {
        currentRole = "signer";
      } else {
        currentRole = "reviewer";
        const newDataSign = state.dataSign.filter((e) => e.userId !== currentUser);
        state.dataSign = newDataSign;
        state.dataSignFilter = newDataSign.filter(
          (d) => d.page === state.documents.currentPage
        );
      }

      state.dataUser[current].role = currentRole;
    },
    // tanda tangan
    addSigntoSigner(state, { payload }) {
      // can cause motherfucker bug
      const { id, ...data } = payload;
      // harus ada userId
      state.dataSign.push({
        id: nanoid(),
        page: state.documents.currentPage,
        ...data,
      });

      state.signSymbol = payload.image;
      state.dataSignFilter = state.dataSign.filter(
        (sign) => sign.page === state.documents.currentPage
      );
    },
    removeSign(state, { payload }) {
      const signIndex = state.dataSign.findIndex((s) => s.id === payload);
      const signFilterIndex = state.dataSignFilter.findIndex(
        (s) => s.id === payload
      );
      if (signIndex !== -1) state.dataSign.splice(signIndex, 1);
      if (signFilterIndex !== -1)
        state.dataSignFilter.splice(signFilterIndex, 1);
    },
    showSign(state, { payload }) {
      state.dataSignFilter = state.dataSign.filter(
        (sign) => sign.page === state.documents.currentPage
      );
    },
    updateFrame(state, { payload }) {
      const { id, type, value } = payload;
      state.dataSign.find((s) => s.id === id).frame[type] = value;
      state.dataSignFilter.find((s) => s.id === id).frame[type] = value;
    },
    resetRecipients(state, { payload }) {
      state.dataUser = [];
      state.dataSign = [];
      state.dataSignFilter = [];
    },
  },
});

export const {
  addRecipients,
  addSigntoSigner,
  changePage,
  changeDocumentProperty,
  changePagination,
  setDocumentProperty,
  showSign,
  updateFrame,
  changeRole,
  removeRecipients,
  removeSign,
  resetRecipients,
} = shareSignSlice.actions;

export default shareSignSlice.reducer;
