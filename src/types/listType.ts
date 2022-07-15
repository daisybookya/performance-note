// A mock function to mimic making an async request for data
export interface showType{
    indie:string;
    classic:string;
    dance:string;
    drama:string;
    mix:string;
}

export type typeArea = {
    north:string;
    middle:string;
    south:string;
    east:string;
    none:string;
}
export type typeDate = {
    up:string,
    down:string,
}
export type bkData={
    img:string;
    color:string;
}
export type typeOpt = {
    label:string;
    value:string;
}
export type typeBk={
    indie:bkData;
    classic:bkData;
    dance:bkData;
    drama:bkData;
    mix:bkData;
}

