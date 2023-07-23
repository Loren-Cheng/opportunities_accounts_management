import React, {Component} from 'react';
import OpportunitiesService from "../services/OpportunitiesService";
import {Button} from 'antd';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Dropdown, Menu} from 'antd';
import request from 'umi-request';
import {Link} from "react-router-dom";
import ApiBaseUrl from "../config/ApiBaseUrl";
import opportunitiesService from "../services/OpportunitiesService";

const columns = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'name',
    dataIndex: 'name',
    width: 120,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此項為必填項',
        },
      ],
    },
  },
  {
    title: 'Stage',
    dataIndex: 'stage',
    filters: true,
    onFilter: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此項為必填項',
        },
      ],
    },
  },
  {
    title: 'Close date',
    dataIndex: 'closes_on',
    ellipsis: true,
    valueType: 'date',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此項為必填項',
        },
      ],
    },
  },
  {
    title: 'Probability',
    dataIndex: 'probability',
    align: 'right',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此項為必填項',
        },
      ],
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    valueType: 'digit',
    align: 'right',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此項為必填項',
        },
      ],
    },
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    valueType: 'digit',
    align: 'right',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此項為必填項',
        },
      ],
    },
  },
  {
    title: 'Assigned to',
    dataIndex: 'assigned_to',
    filters: true,
    onFilter: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此項為必填項',
        },
      ],
    },
  },
  {
    title: 'account',
    dataIndex: 'account.name',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此項為必填項',
        },
      ],
    },
  },
  {
    title: 'user_id',
    dataIndex: 'user_id',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此項為必填項',
        },
      ],
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    width: 300,
    render: (text, record, _, action) => [

      <Link className="btn btn-primary" href="#" role="button" to={"read-opportunity/" + record.id}>
        查詢/編輯
      </Link>,
      <Link className="btn btn-info" href="#" role="button" onClick={() => opportunitiesService.deleOpportunity(record.id)} >
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

class ListOpportunitiesComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opportunities: []
    }
    this.addOpportunity = this.addOpportunity.bind(this);
  }

  componentDidMount() {
    OpportunitiesService.getOpportunities().then((res) => {
      this.setState({opportunities: res.data});
      console.log(res);
    });
  }

  addOpportunity() {
    this.props.history.push('/add-opportunity');
    window.location.replace('/add-opportunity');
  }

  state = {visible: false};

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };


  render() {
    return (
      <div>
        <div>
          <ProTable columns={columns} actionRef={this.actionRef} cardBordered request={
            async (params = {},
                   sort,
                   filter) => {
              let url = ApiBaseUrl.get() + 'opportunity';
              return request(url, {params,});
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
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return Object.assign(Object.assign({}, values), {created_at: [values.startTime, values.endTime]});
              }
              return values;
            },
          }} pagination={{
            pageSize: 10,
            onChange: (page) => console.log(page),
          }} dateFormatter="string" headerTitle="高级表格" toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={this.addOpportunity}>
              新建
            </Button>,
            <Dropdown key="menu" overlay={menu}>
              <Button>
                <EllipsisOutlined/>
              </Button>
            </Dropdown>,
          ]}/>
        </div>
      </div>
    )
  }
}

export default ListOpportunitiesComponent;