import React,{useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { changePage,getListAsync,changeType,changeArea,changeCity,selectShowList } from '../features/list/listSlice';
import { categoryOpt } from '../features/list/listObj';
import '../css/Category.less'
import { Segmented } from 'antd';
const Category = () =>{
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectShowList).type;

  useEffect(()=>{
    dispatch(getListAsync(list)) 
   },[dispatch,list])

  
  //切換大分類
  const handleCategory = (value:any)=>{
      dispatch(changeType(value))
      dispatch(changeArea('none'))
      dispatch(changeCity('none'))
      dispatch(getListAsync(value))
      dispatch(changePage({current:1,size:15}))

  }
  return (
        <Segmented value={list} 
        options={categoryOpt()} onChange={handleCategory}/>
  );
}

export default Category;
