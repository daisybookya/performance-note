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
  //console.log(show)
  //區域的選項
  const cityOpt = (area:keyof typeArea)=>{
    let result:typeOpt[] = [{label:'請選擇',value:'none'}]
    if(area === 'none'||show.list.length === 0) return result
    let box:Set<string> = new Set([])
    show.list.forEach(item=>{
      item.showInfo.forEach((data:any)=>{
        const location = data.location.slice(0,2).replace(/臺/g,'台')
        if(allAreaType[area].includes(location)){
          box.add(location)
        }
      })
    })
    let hasItem:typeOpt[] = Array.from(box,(item)=> ({label:item,value:item}))
    return result.concat(hasItem)
  }
  //切換區域分類
  const handleCity = (value:any)=>{
      dispatch(changeCity(value))
  }
  const hasList = ()=>{
    if(show.area === 'none' || show.list.length === 0){
      return ''
    }
    return <>
    縣市：
  <Select value={city} onChange={handleCity}
  style={{ width: 100 }} size="middle">
  {
      cityOpt(area).map((v:any,index:number)=> 
      <Option value={v.value} key={index}>{v.label}</Option>)
  }
</Select>
    </>
  }
  return (
    <>{
      hasList()
    }
  </>
  );
}

export default City;
