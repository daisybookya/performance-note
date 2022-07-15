import { showType } from "./listType";

export interface updateState {
    type: keyof showType;
    notes:string;
  }
export interface noteFormat{
    category: keyof showType;
    content: any;
}
export  interface noteState{
    isOpen: boolean;
    current: string; 
    notes: noteFormat[]
  }
