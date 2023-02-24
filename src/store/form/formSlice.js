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
  error: null,
  errors: {},
  touch: false,
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
    setError: (state, action) => ({
      ...state,
      errors: action.payload,
    }),
    clearError: state => {
      state.error = {};
    },
    changeTouch: state => {
      state.touch = true;
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

export const {updateFormValue, setError, clearError, changeTouch} = formSlice.actions;
export default formSlice.reducer;

export const validateForm = () => (dispatch, getState) => {
  const form = getState().form;
  const errors = {};

  if (!form.name) {
    errors.name = 'Поле Имя обязательно для заполнения!';
  }
  if (!form.phone) {
    errors.phone = 'Поле Телефон обязательно для заполнения!';
  }
  if (!form.address && form.format === 'delivery') {
    errors.address = 'Поле Адрес обязательно для заполнения!';
  }
  if (!form.floor && form.format === 'delivery') {
    errors.floor = 'Поле Этаж обязательно для заполнения!';
  }
  if (!form.intercom && form.format === 'delivery') {
    errors.intercom = 'Поле Домофон обязательно для заполнения!';
  }

  if (form.format === 'pickup') {
    dispatch(updateFormValue({field: 'address', value: ''}))
    dispatch(updateFormValue({field: 'floor', value: ''}))
    dispatch(updateFormValue({field: 'intercom', value: ''}))
  }

  if (Object.keys.length) {
    dispatch(setError(errors));
  } else {
    dispatch(clearError())
  }
};