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
  const { type } = useAppSelector(selectShowList)
  return (
    <>
        <Layout className='layout'>
          <ShowHeader/>
          <Notes/>
          <BackTop />
          <Content className='layout-content' 
          style={{backgroundColor: typeBkItem[type].color}}>
            <ShowMenu></ShowMenu>
            <ListBox/>
          </Content>
          <Footer className='layout-footer'>
          cheng cheng Design ©2022 Created by cheng
          </Footer>
        </Layout>
    </>
  );
}

export default App;
