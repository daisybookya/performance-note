import React,{useState,useEffect} from 'react';
import { useAppSelector,useAppDispatch } from '../../app/hooks';
import { initNote,selectNote,toggleNote,removeNote,updateCurrent } from './noteSlice';
import { typeBkItem,typeDateItem,getDateStr } from '../list/listObj';
import { showType } from '../../types/listType';
import { typeShow } from '../list/listObj';
import { noteFormat } from '../../types/notesType';
import { DeleteOutlined } from '@ant-design/icons';
import '../../css/Note.less'
import { Drawer,List,Avatar,Button,Collapse,Segmented,Radio,Col, Row } from 'antd';
const { Panel } = Collapse;
function Notes() {
  const dispatch = useAppDispatch()
  const myNote = useAppSelector(selectNote)
  const [ delOpen ,setDelOpen ] = useState('none');
  const [ sortDate, setSortDate ] = useState('up')
  const {isOpen,notes,current} = myNote

  useEffect(()=> {
    //載入localstorage的筆記資料
    dispatch(initNote())
  },[dispatch])
  const closeNote = ()=>{
    dispatch(toggleNote(false))
  }
  //筆記的分類選項
  const handleOpt = ()=>{
    let result = [{label:'全部',value:'none'}]
    let temp:Set<keyof showType> = new Set()
      notes.forEach(item=> temp.add(item.category))
      temp.forEach(v=> result.push({label:typeShow[v],value:v})) 
    return result
  }
  //筆記的日期遠近選項
  const handleDateOpt = ()=>{
    const result = []
      for(const[key,value] of Object.entries(typeDateItem)){
        result.push({label:value,value:key})
      }
    return result
  }
  const cardInfor = (item:any)=>{
    return (
      <>
        <li>時間：{item.time.slice(0,-3)}</li>
        <li>場地：{item.locationName}</li>
        <li>地址：{item.location}</li>
      </>
    )
  }
  //其他場次
  const handleManyInfor = (item:any) => {
    const otherTime = [...item]
    otherTime.shift()
    return(
      <>
        <li>時間：{item[0].time.slice(0,-3)}</li>
        <li>場地：{item[0].locationName}</li>
        <li>地址：{item[0].location}</li>
        <Collapse accordion style={{marginTop:'20px'}}>
          <Panel header="其他場次" key="1">
            {
              otherTime.map((v:any,i:number)=>
              <p key={i}>{v.time.slice(0,-3)}-{v.location.slice(0,3)}</p>)
            }
          </Panel>
        </Collapse>
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
    return <a href={sourceWeb} rel="noreferrer noopener" target="_blank">官方網站</a>
  }
  const deleteNote = (item:any)=>{
    dispatch(removeNote(item.UID))
  }
  const toggleDel = ()=>{
    const delIsOpen = delOpen === 'none'? 'inline-block':'none'
    setDelOpen(delIsOpen)
  }
  const changeNoteType = (v:keyof showType|'none')=>{
    dispatch(updateCurrent(v))
  }
  const changeSortDate = (e:any)=>{
    setSortDate(e.target.value)
  }
  //過濾筆記內容
  function filterNote(data:noteFormat[]){
    let result = [...data]
    if(current !== 'none'){
      result = result.filter(item=> item.category === current)
    }
    if(sortDate === 'up'){
      return result.sort((a,b)=> a.content.showInfo[0].time < b.content.showInfo[0].time ? -1:1)
    }else{
      return result.sort((a,b)=> b.content.showInfo[0].time > a.content.showInfo[0].time ? 1:-1)
    }
  }
  return (
    <Drawer title="展演筆記本" placement="right" size='large'
        onClose={closeNote} visible={isOpen}>
        <div className="note-menu">
        <Row gutter={[8, 24]}>
            <Col>
              <Segmented value={current} className='note-type'
                options={handleOpt()} onChange={(e:any)=>changeNoteType(e)}/>
            </Col>
            <Col>
                日期：
                <Radio.Group value={sortDate} onChange={(e) => changeSortDate(e)}>
                    {
                      handleDateOpt().map((item,i)=>
                        <Radio.Button value={item.value} key={i}>{item.label}</Radio.Button>)
                    }
                    
                  </Radio.Group>
            </Col>
            <Col>
                <Button type="primary" shape="round" style={{marginLeft:'20px'}}
                onClick={toggleDel}><DeleteOutlined /></Button>
            </Col>
        </Row>
            
            
            
          
        </div>
        <div className="note-content">
        <List
            locale={{emptyText: '筆記本是空的～趕快加入筆記吧'}}
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={filterNote(notes)}
            renderItem={item => (
              <List.Item
                actions={[sourceLink(item.content),
                <Button style={{display: delOpen}} onClick={(e)=>deleteNote(item.content)}>刪除</Button>]}
              >
                  <List.Item.Meta
                    avatar={<Avatar style={{background:typeBkItem[item.category].color}}>
                      {typeShow[item.category].slice(0,1)}</Avatar>}
                    title={item.content.title}
                    description={
                      <>
                        <ul style={{margin:'20px 0'}}>
                          {item.content.showInfo.length > 1 ? 
                          handleManyInfor(item.content.showInfo) :
                          cardInfor(item.content.showInfo[0])
                          }
                        </ul>
                        <p style={{textAlign:'right'}}>加入筆記時間：{getDateStr()}</p>
                      </>
                    }
                  />
              </List.Item>
            )}
          />
        </div>
      </Drawer>
  );
}

export default Notes;
