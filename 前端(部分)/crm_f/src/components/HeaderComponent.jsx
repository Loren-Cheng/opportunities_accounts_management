import React from 'react';
import 'antd/dist/antd.min.css'
import '../index.css';
import {Layout, Menu} from 'antd';

import {
  DashboardOutlined,
  CheckSquareOutlined,
  BarChartOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
  BranchesOutlined, CommentOutlined, HomeOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}


const {Header} = Layout;

const HeaderComponent = () => (
  <Layout className="layout">
    <Header>
      <div className="logo"/>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        breakpoint="xxl"
        onClick={onclick}
        const items={[
        {
          label: (
            <a href="https://user-images.githubusercontent.com/73529790/255388355-2229e54b-b01b-48c8-b015-aabe20c3e0c4.jpg">
              Dashboard
              {/*task*/}
            </a>
          ),
          // label: 'Dashboard/儀表板',
          key: 'mail',
          icon: <DashboardOutlined/>,
        },
        {
          label: (
            <a href="https://user-images.githubusercontent.com/73529790/255388355-2229e54b-b01b-48c8-b015-aabe20c3e0c4.jpg">
              task
              {/*task*/}
            </a>
          ),
          key: 'crm0',
          icon: <CheckSquareOutlined/>
        },
        {
          label: (
            <a href="https://user-images.githubusercontent.com/73529790/255388355-2229e54b-b01b-48c8-b015-aabe20c3e0c4.jpg" target="_blank" rel="noopener noreferrer">
              Campaign
              {/*Campaign*/}
            </a>
          ),
          key: 'crm1',
          icon: <BarChartOutlined/>
        },
        {
          label: (
            <a href="https://user-images.githubusercontent.com/73529790/255388355-2229e54b-b01b-48c8-b015-aabe20c3e0c4.jpg" target="_blank" rel="noopener noreferrer">
              Leads
              {/*Leads/潛在客戶資訊*/}
            </a>
          ),
          key: 'crm2',
          icon: <BranchesOutlined/>
        }, {
          label: (
            // <a href="http://localhost:3000/accounts">
            //<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            <a href="http://localhost:3000/account">
              Accounts
              {/*Accounts/客戶*/}
            </a>
            // <a href="http://localhost:3000/accounts">
            //   Accounts
            //   {/*Accounts/客戶*/}
            // </a>
          ),
          key: 'crm3',
          icon: <UsergroupAddOutlined/>
        }, {
          label: (
            // <li>Contacts/聯絡<link to={"http://localhost:3000/opportunities"}/></li>
            <a href="https://user-images.githubusercontent.com/73529790/255388355-2229e54b-b01b-48c8-b015-aabe20c3e0c4.jpg" target="_blank" rel="noopener noreferrer">
              Contacts
              {/*Contacts/聯絡*/}
            </a>
          ),
          key: 'crm4',
          // eslint-disable-next-line react/jsx-no-undef
          icon: <CommentOutlined/>
        },
        {
          label:
            (<a href="http://localhost:3000/opportunities" >
              Opportunities
              {/*Opportunities/商機*/}
            </a>),
          key: 'crm5',
          icon: <DollarOutlined/>
        },
        {
          label: (
            <a href="http://localhost:3000/employees">
              Team
              {/*Team/團隊成員*/}
            </a>
          ),
          key: 'crm6',
          icon: <HomeOutlined/>
        }
      ]}
      />
    </Header>
  </Layout>
)
export default HeaderComponent;