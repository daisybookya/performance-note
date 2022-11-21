import React from 'react';
import Category from './Category';
import Area from './SortArea'
import City from './SortCity'
import { Col, Row } from 'antd';
function ShowMenu() {
  return (
    <div className='show-menu'>
        <Row gutter={[8, 24]}>
            <Col xs={24} sm={24} md={20} lg={20} xl={11}>
                類別：<Category/>
            </Col>
            <Col xs={24} sm={17} md={14} lg={12} xl={9}>
                區域：<Area/>
            </Col>
            <Col xs={24} sm={7} md={8} lg={10} xl={4}>
                縣市：<City/>
            </Col>
        </Row>
    </div>
  );
}

export default ShowMenu;
