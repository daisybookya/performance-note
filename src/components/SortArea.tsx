import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { changePage,changeArea,changeCity,filterList,selectShowList } from '../features/list/listSlice';
import { typeAreaItem,allAreaType } from '../features/list/listObj';
import { typeArea, typeOpt } from '../types/listType'
import '../css/Category.less'
import { Segmented } from 'antd';
const Area = () =>{
  const dispatch = useAppDispatch();
  const {area,initList} = useAppSelector(selectShowList);
  
  //區域的選項
  const areaOpt = ()=>{
    let result:typeOpt[] = []
    for (const [key,value] of Object.entries(typeAreaItem)){
        result.push({label:value,value:key})
    }
    return result
  }
  //切換區域分類
  const handleArea = (value:keyof typeArea)=>{
    dispatch(changePage({current:1,size:15}))
    dispatch(changeArea(value))
    dispatch(changeCity('none'))

    let newList = []
    if(value === 'none'){
      newList = [...initList]
    }else{
      const regex = RegExp(`/${allAreaType[value]}/g`)
      newList = initList.filter((item,i)=>{
        const foundIndex = item.showInfo.findIndex((i:any)=> i.location.search(regex)>-1)
        return foundIndex > -1
      })
    }
    
    dispatch(filterList(newList))
  }
  return (
        <Segmented value={area} 
        options={areaOpt()} onChange={(v:any)=>handleArea(v)}/>
  );
}

export default Area;
