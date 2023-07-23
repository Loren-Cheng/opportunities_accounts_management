import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {message, Row, Col} from 'antd';
import React, {useRef} from 'react';
import AccountsService from "../services/AccountsService";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef();
  const nameRef = useRef();

  return (
    <Row>
      <Col span={18} offset={3}>
        客户
        <ProForm onFinish={async (values) => {
          var _a, _b, _c;
          await waitTime(2000);
          console.log(values);
          const val1 = await ((_a = formRef.current) === null || _a === void 0 ? void 0 : _a.validateFields());
          console.log('validateFields:', val1);
          const val2 = await ((_c = (_b = formRef.current) === null || _b === void 0 ? void 0 : _b.validateFieldsReturnFormatValue) === null || _c === void 0 ? void 0 : _c.call(_b));
          console.log('validateFieldsReturnFormatValue:', val2);
          AccountsService.createAccount(val2).then(res => {
            message.success('提交成功');
            window.location.replace('/account');
          })
        }} formRef={formRef} params={{id: '100'}} formKey="base-form-use-demo" dateFormatter={(value, valueType) => {
          console.log('---->', value, valueType);
          return value.format('YYYY-MM-DD');
        }} request={async () => {
          await waitTime(100);
          return {
            name: '',
            useMode: 'chapter',
          };
        }} autoFocusFirstInput>
          <ProForm.Group>
            <ProFormText
              // width="xl"
                         name="name"
                         required
                         label="Name"
                         // tooltip="最長為24位，如新北國泰醫院標案"
                         placeholder="請輸入客户名"
                         rules={[{required: true, message: '這是必填項'}]}
                         ref={nameRef}/>
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
              placeholder="客戶指派給誰處理?"
              rules={[{required: false, message: 'Please select an opportunity stage!'}]}
            />
            <ProFormSelect
              name="category"
              label="Category"
              request={async () => [
                {label: 'Other', value: 'Other'},
                {label: 'Affiliate', value: 'Affiliate'},
                {label: 'Competitor', value: 'Competitor'},
                {label: 'Customer', value: 'Customer'},
                {label: 'Partner', value: 'Partner'},
                {label: 'Reseller', value: 'Reseller'},
                {label: 'Vendor', value: 'Vendor'},
              ]}
              placeholder="客戶類型"
              rules={[{required: true, message: 'Please select an opportunity stage!'}]}
            />
            <ProFormSelect
              name="rating"
              label="Rating"
              request={async () => [
                {label: '--None--', value: '0'},
                {label: '★', value: '1'},
                {label: '★★', value: '2'},
                {label: '★★★', value: '3'},
                {label: '★★★★', value: '4'},
                {label: '★★★★★', value: '5'},
              ]}
              placeholder="客戶評價"
              rules={[{required: true, message: 'Please select an opportunity stage!'}]}
            />

          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              // width="xl"
              name="toll_free_phone"
              label="Toll-free"
              placeholder="受話方付費電話"
              rules={[{required: false, message: '這是必填項'}]}
              ref={nameRef}/>
            <ProFormText
              // width="xl"
              name="phone"
              // required
              label="Phone"
              // tooltip="最長為24位，如新北國泰醫院標案"
              placeholder="電話"
              rules={[{required: true, message: '這是必填項'}]}
              ref={nameRef}/>
            <ProFormText
              // width="xl"
              name="fax"
              // required
              label="Fax"
              // tooltip="最長為24位，如新北國泰醫院標案"
              placeholder="電話"
              rules={[{required: true, message: '這是必填項'}]}
              ref={nameRef}/>

          </ProForm.Group>
          <ProForm.Group>
            <ProFormText
              // width="xl"
              name="website"
              label="Website"
              placeholder="網址"
              rules={[{required: false, message: '這是必填項'}]}
              ref={nameRef}/>
            <ProFormText
              // width="xl"
              name="email"
              // required
              label="Email"
              // tooltip="最長為24位，如新北國泰醫院標案"
              placeholder="電子信箱"
              rules={[{required: true, message: '這是必填項'}]}
              ref={nameRef}/>
          </ProForm.Group>
        </ProForm>
      </Col>
    </Row>);
};
