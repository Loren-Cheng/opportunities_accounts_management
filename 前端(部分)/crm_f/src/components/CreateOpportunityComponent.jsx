import {
  ProForm,
  ProFormDigit,
  ProFormDatePicker,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {message, Row, Col} from 'antd';
import React, {useEffect, useRef} from 'react';
import OpportunitiesService from "../services/OpportunitiesService";
import ApiBaseUrl from "../config/ApiBaseUrl";

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

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        ApiBaseUrl.get() + "opportunity"
      );
      const responseData = await response.json();
      let loadedMeals;

      console.log(responseData)
      JSON.parse(responseData, loadedMeals);
      console.log(loadedMeals);

    };
    fetchMeals();
  }, []);


  return (
    <Row>
      <Col span={18} offset={3}>
        新建商機

        <ProForm onFinish={async (values) => {
          var _a, _b, _c;
          await waitTime(2000);
          console.log(values);
          const val1 = await ((_a = formRef.current) === null || _a === void 0 ? void 0 : _a.validateFields());
          console.log('validateFields:', val1);
          const val2 = await ((_c = (_b = formRef.current) === null || _b === void 0 ? void 0 : _b.validateFieldsReturnFormatValue) === null || _c === void 0 ? void 0 : _c.call(_b));
          console.log('validateFieldsReturnFormatValue:', val2);
          OpportunitiesService.createOpportunity(val2).then(res => {
            message.success('提交成功');
            window.location.replace('/opportunities');
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
            {/*<ProFormText width="md" name="name" required addonBefore={<a>Name</a>} addonAfter={<a>點擊查看更多</a>}*/}
            {/*             label="Name" tooltip="最長為24位，如新北國泰醫院標案" placeholder="請輸入名稱"*/}
            {/*             rules={[{required: true, message: '這是必填項'}]} ref={nameRef}/>  */}
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
              initialValue={0}
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
                return fetch(ApiBaseUrl.get() + 'account')
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