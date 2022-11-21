import React from 'react';
import '../css/Header.less';
import { useAppSelector,useAppDispatch } from '../app/hooks';
import { selectNote,toggleNote } from '../features/note/noteSlice';
import { selectShowList } from '../features/list/listSlice';
import { typeBkItem,typeShow } from '../features/list/listObj';
import { PageHeader,Layout,Typography,Affix, Button,notification  } from 'antd';
import { UnorderedListOutlined,ExclamationOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Title } = Typography;
function ShowHeader() {
  const dispatch = useAppDispatch()
  const list = useAppSelector(selectShowList).type;
  const open = useAppSelector(selectNote).isOpen
  const listBk = typeBkItem[list].img

  const openNote = ()=>{
    if(!open) dispatch(toggleNote(true))
  }
  const openInfor = ()=>{
    notification['info']({
      placement:'top',
      message: '關於Performance note',
      description:
      <>
      <p>* 網站提供全台各式類型展演資訊，並提供筆記本可收藏表演訊息至localstorage，
        資訊內容皆由文化資料開放服務網https://opendata.culture.tw/frontsite提供
        </p>
        <p>* 網站使用react + Create react app + Redux + Redux Toolkit + TypeScript + (ui框架) Ant Design + Less等工具搭建</p>
      </>,
    });
  }
  return (
    <Header className='layout-header' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/images/${listBk})`}}>
            <PageHeader
                className="site-page-header"
                title="Performance Note"
                tags={<Button size="small" shape='circle' type="primary" onClick={openInfor} className='btn-infor'>
                <ExclamationOutlined />
              </Button>}
            />
            
            <Affix offsetTop={30} className="affix-note">
              <Button shape='circle' size="large" type="primary" onClick={openNote} className='btn-note'>
                <UnorderedListOutlined className='btn-icon' />
              </Button>
            </Affix>
            
            <Title className='title'>{typeShow[list]}展演資訊</Title>
    </Header>
  );
}

export default ShowHeader;
