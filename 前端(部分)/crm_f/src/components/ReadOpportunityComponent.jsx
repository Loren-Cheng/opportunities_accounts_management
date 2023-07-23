import {
  ProForm,
  ProFormDigit,
  ProFormDatePicker,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {message, Row, Col, Form} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import OpportunitiesService from "../services/OpportunitiesService";
import ApiBaseUrl from "../config/ApiBaseUrl";
import {useParams} from 'react-router-dom';
import moment from "moment";

//含修改功能OpportunitiesService.updateOpportunity()
const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const nameRef = useRef();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const {id} = useParams();
  useEffect(() => {
    fetch(ApiBaseUrl.get() + "opportunity/" + `${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.closes_on != null)
          data.data.closes_on = moment(data.data.closes_on)
        //在setFieldsValue前，將timestamp轉為日期格式字串
        setFormData(data.data)
        form.setFieldsValue(data.data);
      })

  }, []);
  console.log(formData)

  return (
    <Row>
      <Col span={18} offset={3}>
        查詢/編輯商機
        <ProForm form={form}
                 onFinish={
                   async (values) => {
                     var _a, _b, _c;
                     await waitTime(2000);
                     OpportunitiesService.updateOpportunity(formData.id, values).then(res => {
                         message.success('提交成功');
                         window.location.replace('/opportunities');
                       }
                     )
                   }} formKey="base-form-use-demo"
                 dateFormatter={(value, valueType) => {
                   return value.format('YYYY-MM-DD');
                 }} autoFocusFirstInput>
          <ProForm.Group>
            <ProFormText width="md" name="name" required
                         label="Name" tooltip="最長為24位，如新北國泰醫院標案" placeholder="請輸入名稱"
                         rules={[{required: true, message: '這是必填項'}]} ref={nameRef}/>
            <ProFormSelect
              name="stage"
              label="Stage"
              request={async () => [
                {label: 'Prospecting', value: 'Prospecting'},
                {label: 'Analysis', value: 'Analysis'},
                {label: 'Presentation', value: 'Presentation'},
                {label: 'Proposal', value: 'Proposal'},
                {label: 'Negotiation', value: 'Negotiation'},
                {label: 'Final Review', value: 'FinalReview'},
                {label: 'Closed/Won', value: 'ClosedWon'},
                {label: 'Closed/Lost', value: 'ClosedLost'},
                {label: 'Other', value: 'Other'},
              ]}
              placeholder="Please select an opportunity stage"
              rules={[{required: true, message: 'Please select an opportunity stage!'}]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormDatePicker name="closes_on" label="Close date:" placeholder="請選擇"/>
            <ProFormDigit label="Probability (%)" name="probability" min={0} max={100}
                          fieldProps={{precision: 2}} placeholder="請輸入"
            />
            <ProFormMoney
              label="Amount ($)"
              name="amount"
              locale="en-US"
              // initialValue={formData.data.data.amount}
              // // initialValue={formRef.current.getFieldValue('code')}
              // initialValue={0}
              fieldProps={{precision: 2}}
              min={0}
            />
            <ProFormMoney

              label="Discount ($)"
              name="discount"
              locale="en-US"
              fieldProps={{precision: 2}}
              initialValue={0}
              min={0}
            />

          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              name="accountiId"
              label="Account (select existing):"
              showSearch
              debounceTime={300}
              request={async ({keyWords}) => {
                await waitTime(1000);
                return fetch(ApiBaseUrl.get() + '/account')
                  .then((response) => response.json())
                  .then((body) =>
                    body.data.map((account) => ({
                      label: `${account.name}`,
                      value: account.id,
                    })),
                  );
              }}
              placeholder="Please select a account"
              rules={[{required: true, message: 'Please select your account!'}]}
            />
            <ProFormSelect
              name="assigned_to"
              label="Assigned to:"
              request={async () => [
                {label: 'Unassigned', value: '0'},
                {label: 'Linda', value: '1'},
                {label: 'John', value: '2'},
                {label: 'Jill', value: '3'},
                {label: 'May', value: '4'},
                {label: 'Denise', value: '5'},
              ]}
              placeholder="Unassigned"
              rules={[{required: false, message: 'Please select an opportunity stage!'}]}
            />
          </ProForm.Group>
          <ProFormSelect
            name="select_campaign"
            label="Campaign: "
            request={async () => [
              {label: '杜拜展', value: '杜拜展'},
            ]}
            placeholder="Please select an opportunity stage"
            rules={[{required: false, message: 'Please select an opportunity stage!'}]}
          />
        </ProForm>
      </Col>
    </Row>);
};
