import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ORDER_URL} from "../../const.js";
import {closeModal} from "../modalDelivery/modalDeliverySlice.js";
import {clearOrder} from "../order/orderSlice.js";

const initialState = {
  name: '',
  phone: '',
  format: 'delivery',
  address: '',
  floor: '',
  intercom: '',
};

export const submitForm = createAsyncThunk(
  'form/submit',
  async (data, {dispatch, rejectWithValue}) => {
    try {
      const response = await fetch(`${ORDER_URL}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка! ${response.statusText}`);
      }

      dispatch(clearOrder());
      dispatch(closeModal());

      return await response.json();
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'Loading...';
        state.response = null;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = 'Successfully loaded';
        state.response = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'Failed loading';
        state.error = action.payload;
      })
  },
});

export const {updateFormValue} = formSlice.actions;
export default formSlice.reducer;