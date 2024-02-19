import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, } from '../../app/store';
import { noteState,noteFormat } from '../../types/notesType';
import { showType } from "../../types/listType";

const initialState: noteState = {
    isOpen:false,
    current:'none',
    notes:[],
};

function updateStorage(data:noteFormat[]){
  const strInfor = JSON.stringify([...data])
  localStorage.setItem('showNotes',strInfor)
}

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    initNote: (state)=>{
      const strData = localStorage.getItem('showNotes')
      if(strData !== null) {
        const objData = JSON.parse(strData)
        state.notes = objData;
      }
      //console.log('init note...')
    },
    addToNote: (state, action: PayloadAction<noteFormat>) => {
      state.notes.push(action.payload)
      updateStorage(state.notes)
    },
    removeNote: (state, action: PayloadAction<string>) =>{
        const theIndex = state.notes.findIndex(item=> 
        item.content.UID === action.payload)
        const copyNote = [...state.notes]
        copyNote.splice(theIndex,1)
        state.notes = copyNote
        updateStorage(copyNote)
    },
    toggleNote:(state,action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    updateCurrent:(state,action: PayloadAction<keyof showType|'none'>) => {
      state.current = action.payload
    },
  },
});

export const { initNote,updateCurrent,removeNote,addToNote,toggleNote } = noteSlice.actions;

export const selectNote = (state: RootState) => state.noteList;

export default noteSlice.reducer;
