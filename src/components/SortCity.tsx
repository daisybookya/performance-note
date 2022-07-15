import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { changeCity,selectShowList } from '../features/list/listSlice';
import {typeOpt,typeArea} from '../types/listType'
import { allAreaType } from '../features/list/listObj';
import '../css/Category.less'
import { Select } from 'antd';


const { Option } = Select;
const City = () =>{
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShowList);
  const {area,city} = show
  
  //區域的選項
  const cityOpt = (area:keyof typeArea)=>{
    let result:typeOpt[] = [{label:'請選擇',value:'none'}]
    if(area === 'none') return result
    let cityArray = allAreaType[area].replace(/臺/g,'台').split('|')
    let newCityList = cityArray.filter((v,i,arr)=> arr.indexOf(v) === i)
    newCityList.forEach((v)=> result.push({label:v,value:v}))
    return result
    
  }
  //切換區域分類
  const handleCity = (value:any)=>{
      dispatch(changeCity(value))
  }
  return (
    <Select value={city} onChange={handleCity}
    style={{ width: 100 }} size="middle">
    {
        cityOpt(area).map((v:any,index:number)=> 
        <Option value={v.value} key={index}>{v.label}</Option>)
    }
  </Select>
  );
}

export default City;
