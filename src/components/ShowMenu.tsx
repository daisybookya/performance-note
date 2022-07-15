import React from 'react';
import Category from './Category';
import Area from './SortArea'
import City from './SortCity'
import { Col, Row } from 'antd';
function ShowMenu() {
  return (
    <div className='show-menu'>
        <Row gutter={[8, 24]}>
            <Col xs={24} sm={24} md={14} lg={12} xl={10}>
                類別：<Category/>
            </Col>
            <Col xs={24} sm={16} md={10} lg={12} xl={10}>
                區域：<Area/>
            </Col>
            <Col xs={24} sm={8} md={12} lg={12} xl={4}>
                縣市：<City/>
            </Col>
        </Row>
    </div>
  );
}

export default ShowMenu;
