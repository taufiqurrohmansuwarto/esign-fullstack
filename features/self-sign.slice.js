import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { stampInfo, detailDocument } from "@/services/users.services";

export const fetchSignSymbol = createAsyncThunk(
  "users/signSymbol",
  async (documentId) => {
    const currentUserStamp = await stampInfo();
    const currentDocument = await detailDocument(documentId);
    const results = {
      stamp: currentUserStamp,
      document: currentDocument,
    };
    return results;
  }
);

export const selfSignSlice = createSlice({
  name: "selfSign",
  initialState: {
    loading: "idle",
    step: 0,
    signSymbol: null,
    docUrl: undefined,
    documentData: undefined,

    // sign requirement
    documents: {
      currentPage: 1,
      totalPage: 10,
    },

    documentProperty: null,
    signs: [],
    signFilter: [],

    // sending data and show dialog
    dataPos: null,
    showDialog: false,
  },
  reducers: {
    changeDocumentProperties(state, { payload }) {
      const { signSymbol, documentData, docUrl } = payload;
      state.signSymbol = signSymbol;
      state.documentData = documentData;
      state.docUrl = docUrl;
    },
    changeStep(state, { payload }) {
      state.step = payload;
    },
    setDocumentProperty(state, { payload }) {
      state.documentProperty = payload;
    },
    changeDocumentProperty(state, { payload }) {
      state.documents = payload;
    },
    changePage(state, { payload }) {
      state.documents = payload;
    },
    changePagination(state, { payload }) {
      state.documents.currentPage = payload;
    },
    showSign(state) {
      state.signFilter = state.signs.filter(
        (sign) => sign.page === state.documents.currentPage
      );
    },
    addSign(state, { payload }) {
      state.signs.push({
        id: nanoid(),
        page: state.documents.currentPage,
        ...payload,
      });

      state.signFilter = state.signs.filter(
        (sign) => sign.page === state.documents.currentPage
      );
    },
    removeSign(state, { payload }) {
      const signIndex = state.signs.findIndex((s) => s.id === payload);
      const signFilterIndex = state.signFilter.findIndex(
        (s) => s.id === payload
      );
      if (signIndex !== -1) state.signs.splice(signIndex, 1);
      if (signFilterIndex !== -1) state.signFilter.splice(signFilterIndex, 1);
    },
    updateFrame(state, { payload }) {
      const { id, type, value } = payload;
      state.signs.find((s) => s.id === id).frame[type] = value;
      state.signFilter.find((s) => s.id === id).frame[type] = value;
    },
    resetSign(state) {
      state.signs = [];
      state.signFilter = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignSymbol.fulfilled, (state, action) => {
      state.loading = "idle";
      state.signSymbol = action.payload.stamp?.image;
      state.docUrl = action.payload.document?.document_url;
      state.documentData = action.payload.document;
      state.signs = [];
      state.signFilter = [];
    });
    builder.addCase(fetchSignSymbol.pending, (state, action) => {
      state.loading = "loading";
    });
  },
});

export const {
  changePage,
  addSign,
  removeSign,
  resetSign,
  changeDocumentProperties,
  changeDocumentProperty,
  changePagination,
  changeStep,
  setDocumentProperty,
  showSign,
  updateFrame,
} = selfSignSlice.actions;

export default selfSignSlice.reducer;
