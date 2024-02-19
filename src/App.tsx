import React from 'react';
import './css/App.less';
import ShowHeader from './components/ShowHeader';
import ShowMenu from './components/ShowMenu';
import ListBox from './features/list/ListBox';
import Notes from './features/note/Notes';
import { useAppSelector } from './app/hooks';
import { selectShowList } from './features/list/listSlice';
import { typeBkItem } from './features/list/listObj';
import { Layout,BackTop } from 'antd';
const { Footer, Content } = Layout;

function App() {
  //const { type } = useAppSelector(selectShowList)
  const list = useAppSelector(selectShowList).type;
  const listBk = typeBkItem[list].img
  //backgroundImage:`url(${process.env.PUBLIC_URL}/images/${listBk})`
  return (
    <>
        <Layout className='layout' style={{backgroundImage:`url(${process.env.PUBLIC_URL}/images/${listBk})`}}>
          <ShowHeader/>
          <Notes/>
          <BackTop />
          <Content className='layout-content'>
            <ShowMenu></ShowMenu>
            <ListBox/>
          </Content>
          <Footer className='layout-footer'>
          cheng cheng Design ©2022 Created by cheng / ver 1.1
          </Footer>
        </Layout>
    </>
  );
}

export default App;
