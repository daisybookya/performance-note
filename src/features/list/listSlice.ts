import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, } from '../../app/store';
import { fetchListByType } from './listAPI';
import { showType,typeArea } from '../../types/listType';

export interface pageState{
  current:number;
  size:number;
}
export interface listState {
    list:any[];
    initList:any[];
    loading:boolean;
    type:keyof showType;
    area:keyof typeArea;
    city:string;
    sortUp:boolean;
    page:pageState;
}

const initialState: listState = {
  list:[],
  initList:[],
  loading:false,
  type: 'mix',
  area: 'none',
  city: 'none',
  sortUp: true,
  page:{current:1,size:15}
};

export const getListAsync = createAsyncThunk(
  'counter/fetchCount',
  async (type:keyof showType) => {
    try{
        const fetchUrl = await fetchListByType(type);
        const response = await fetchUrl.json()
        //console.log('fetching...')
        return response
    }catch(err){
        console.error(err)
    }
  }
);

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    changeType: (state, action: PayloadAction<keyof showType>) => {
      state.type = action.payload
    },
    changeArea: (state, action: PayloadAction<keyof typeArea>) => {
      state.area = action.payload
    },
    changeCity: (state, action: PayloadAction<string>) => {
        state.city = action.payload
    },
    changeSortUp: (state, action: PayloadAction<boolean>) => {
        state.sortUp = action.payload
    },
    filterList:(state, action: PayloadAction<any>)=>{
      //console.log('this is slice 1:',state.list)
      state.list = action.payload
    },
    changePage:(state, action: PayloadAction<pageState>)=>{
      state.page = action.payload;
    }
  },
  extraReducers:(builder)=>{
      builder
      .addCase(getListAsync.pending,(state)=>{
        state.loading = true;
    })
      .addCase(getListAsync.fulfilled,(state,action)=>{
          state.list = action.payload;
          state.initList = action.payload;
          state.loading = false;
      })
      .addCase(getListAsync.rejected,(state)=>{
        state.loading = false;
    })
  }
});

export const { changePage,filterList,changeType,changeArea,changeCity,changeSortUp } = listSlice.actions;

export const selectShowList = (state: RootState) => state.showList;

export default listSlice.reducer;
