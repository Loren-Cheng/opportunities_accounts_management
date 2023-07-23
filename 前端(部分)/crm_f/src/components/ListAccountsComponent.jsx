import {SearchOutlined} from '@ant-design/icons';
import {Button, Input, Space, Table} from 'antd';
import React, {useRef, useState} from 'react';
import Highlighter from 'react-highlight-words';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Dropdown, Menu} from 'antd';
import request from 'umi-request';
import {Link} from "react-router-dom";
import {getColumnPos} from "antd/es/table/util";
import ApiBaseUrl from "../config/ApiBaseUrl";
import opportunitiesService from "../services/OpportunitiesService";
import accountsService from "../services/AccountsService";

const columns = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: 'Assigned_to',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: {text: '全部'},
      0: {
        text: '0',
        status: '0',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: 'Rating',
    dataIndex: 'rating',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      0: {
        text: '--None--',
      },
      1: {
        text: '★',
      },
      2: {
        text: '★★',
      },
      3: {
        text: '★★★',
      },
      4: {
        text: '★★★★',
      },
      5: {
        text: '★★★★★',
      },
    },
  },
  {
    disable: true,
    title: 'Category',
    dataIndex: 'category',
    filters: true,
    onFilter: true,
    valueType: 'select',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Link className="btn btn-primary" href="#" role="button" to={"read-account/" + record.id}>
        查詢/編輯
      </Link>,
      <Link className="btn btn-info" href="#" role="button" onClick={() => accountsService.deleAccount(record.id)} >
        刪除
      </Link>
    ],
  },
];

const menu = (<Menu>
  <Menu.Item key="1">1st item</Menu.Item>
  <Menu.Item key="2">2nd item</Menu.Item>
  <Menu.Item key="3">3rd item</Menu.Item>
</Menu>);

const ListAccountsComponent = () => {

  function addAccount() {
    window.location.replace('/add-account');
  }

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined/>}
            size="small"
            style={{
              width: 90,
            }}
          >Search</Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >Reset</Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >Filter</Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const actionRef = useRef();
  return (<ProTable
    columns={columns}
    actionRef={actionRef}
    cardBordered
    request={async (params = {}, sort, filter) => {
      console.log(sort, filter);
      return request(ApiBaseUrl.get()+'account', {
        // return request('http://localhost:8080/api/account', {
        params,
      });
    }} editable={{
    type: 'multiple',
  }} columnsState={{
    persistenceKey: 'pro-table-singe-demos',
    persistenceType: 'localStorage',
    onChange(value) {
      console.log('value: ', value);
    },
  }} rowKey="id" search={{
    labelWidth: 'auto',
  }} form={{
    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
    syncToUrl: (values, type) => {
      if (type === 'get') {
        return Object.assign(Object.assign({}, values), {created_at: [values.startTime, values.endTime]});
      }
      return values;
    },
  }} pagination={{
    pageSize: 10,
    onChange: (page) => console.log(page),
  }} dateFormatter="string"
    headerTitle="高级表格"
    toolBarRender={() => [
    <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={addAccount}>
      新建
    </Button>,
    <Dropdown key="menu" overlay={menu}>
      <Button>
        <EllipsisOutlined/>
      </Button>
    </Dropdown>,
  ]}/>);
};

export default ListAccountsComponent;