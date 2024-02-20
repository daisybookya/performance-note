import React from 'react';
import { useAppSelector,useAppDispatch } from '../../app/hooks';
import { selectShowList,changePage } from './listSlice';
import { selectNote,addToNote } from '../note/noteSlice';
import { showType } from '../../types/listType';
import { allAreaType,filterKeyword,filterArea } from '../../features/list/listObj';
import { List, Card,Button, Popover,message } from 'antd';
import type { PaginationProps } from 'antd';
import '../../css/ListBox.less'

function ListBox() {
  const dispatch = useAppDispatch();
    const { list,loading,type,page,city,area } = useAppSelector(selectShowList)
    const { notes } = useAppSelector(selectNote)
    const changeListPage:PaginationProps['onChange'] = (page,size)=>{
        dispatch(changePage({current:page,size:size}))
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    //處理展演票價
    const handlePrice = (price:string,sale:'Y'|'N')=>{
      if(price === ''){
        return sale === 'Y' ? '無提供資訊，請至官網查詢':'無需購票'
      }else{
        return (
          <Popover placement="topLeft" title="票價（台幣）" content={price}>
            <Button size="small">查看票價</Button>
          </Popover>
        )
      }
    }
    //處理其他場次列表
    const handleShowInfo = (info:any[],time:string)=>{
      const otherTime = info.filter(item=> item.time !== time)
      if(!otherTime.length) return false
      const lis = otherTime.map((item,i)=> {
        return <li key={i}>{formatTime(item.time)} - 
          {item.location.slice(0,3)}</li>
      })
      return (
        <>
          <ul className='list-info'>{lis}
          </ul>
          <p>詳細資訊，請查看官網</p>
        </>
      )
    }
    //處理展演的官方連結
    const sourceLink = (item:any)=>{
      let sourceWeb = '';
      if(item.sourceWebPromote === ''&& item.webSales === ''){
        sourceWeb = `https://www.google.com.tw/search?q=${item.title}`
      }else{
        sourceWeb = item.sourceWebPromote !== '' ?
        item.sourceWebPromote: item.webSales
      }
      return <a  href={sourceWeb} rel="noreferrer noopener" target="_blank">官方網站</a>
    }
    const addInfor = (item:any,kind:keyof showType)=>{
      const _kind = kind
      const _content = {...item}
      const inforObj = {category:_kind, content:_content}
      //檢查是否重複加入資訊(UID為api裡的屬性)
      const hasAdd = notes.findIndex(v=> v.content.UID === item.UID)
      if(hasAdd > -1){
        message.warning('此資訊已重複添加！請到筆記本查看');
      }else{
        message.success('成功添加到筆記本！');
        dispatch(addToNote(inforObj))
      }
    }
    function filterCity(data:any){
      let newList = [...data]
      if(city !== 'none'){
        newList = data.filter((item:any) =>{
          const hasItem = filterKeyword(item.showInfo,city)
         return hasItem.length > 0
       })
      }
      newList.sort((a,b)=> a.showInfo[0].time < b.showInfo[0].time ? -1:1)
      return newList
    }
    function filterShowInfo(infoArr:any[]){
      if(infoArr.length === 1) return infoArr[0]
      if(area !== 'none' && city === 'none'){
        const hasArea = filterArea(infoArr,allAreaType[area])
        return hasArea.length ? hasArea[0]:infoArr[0]
      }
      if(city !== 'none'){
        const hasCity = filterKeyword(infoArr,city)
        return hasCity.length ? hasCity[0]:infoArr[0]
      }
      return infoArr[0]
    }
  return (
    <div className="card-container">
             <List
                locale={{emptyText: '無展演資訊'}}
                grid={{ gutter: 24, xs: 1,sm:2,md:2,lg: 2, xl: 3, xxl: 4,  }}
                loading={loading}
                dataSource={filterCity(list)}
                pagination={{
                    current:page.current,
                    pageSize: page.size,
                    onChange:changeListPage
                  }}
                renderItem={(item:any) => {
                  const {time,locationName,location,
                    onSales,price} = filterShowInfo(item.showInfo)
                  return (
                    <List.Item>
                    <Card className="card-txt"  actions={[
                    sourceLink(item),<span onClick={(e)=>addInfor(item,type)}>加入筆記</span>]}
                    title={<span>{item.title}</span>}>
                    <p>日期時間 ： {formatTime(time)} {
                      item.showInfo.length>1 ? 
                      <Popover placement="topLeft" title="其他場次列表" 
                        content={handleShowInfo(item.showInfo,time)}>
                        <Button size="small">＋其他場次</Button>
                      </Popover>:''
                    }
                    </p>
                    <p>展演地點 ： {locationName} </p>
                    <p>展演地址 ： {location}</p>
                    <p>門票價格(元) ： {handlePrice(price,onSales)}</p>
                    <p>是否販售中 ： {onSales === 'Y'? '熱烈販售中':'免費入場'}</p>
                    </Card>
                </List.Item>
                  )
                }}
            />
        </div>
  );
}
function formatTime(time:string){
  if(time !== ''){
    return time.slice(0,-3)
  }
  return time
}
export default ListBox;