// import { createSlice } from "@reduxjs/toolkit";

// const formSlice = createSlice({
//   name: "form",
//   initialState: {
//     values: {
//       name: "",
//       description: "",
//       images: [],
//     },
//   },
//   reducers: {
//     setFormValues: (state, action) => {
//       state.values = action.payload;
//     },

//     updateImage: (state, action) => {
//       const { url, name } = action.payload;
//       state.values.images.push({ url, name });
//     },
//   },
// });

// export const { setFormValues, updateImage } = formSlice.actions;
// export default formSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Components/Firebase/Firebase";

export const fetchformData = createAsyncThunk(
  "form/fetchformData",
  async (formData, { rejectWithValue }) => {
    try {
      const equiposRef = collection(db, "equipos");
      const docRef = await addDoc(equiposRef, {
        ...formData,
        nameLowerCase: formData.name.toLowerCase(),
      });

      return { id: docRef.id, ...formData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const formSlice = createSlice({
  name: "form",
  initialState: {
    name: "",
    description: "",
    images: [],
  },
  reducers: {
    setFormValues: (state, action) => {
      Object.assign(state, action.payload);
    },
    updateImage: (state, action) => {
      state.images.push(action.payload);
    },
    resetForm: () => ({
      name: "",
      description: "",
      images: [],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchformData.fulfilled, (state) => {
      state.images = [];
    });
  },
});

export const { setFormValues, updateImage, resetForm } = formSlice.actions;
export default formSlice.reducer;

