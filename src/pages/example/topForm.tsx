import { Form, Input, Button, Select, AutoComplete, DatePicker } from 'antd';
import qs from 'qs';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { chinaDate } from '@src/utils';
import moment from 'moment';
let dates: any = chinaDate();
const initialValues: any = {
  dates: [moment().set('month', dates.yue - 3), moment().set('month', dates.yue - 1)],
};
export const TopForm: any = forwardRef((props: any, ref) => {
  const { searchBtnF, deptList } = props;
  useImperativeHandle(ref, () => ({
    formRef: form,
    searchFormInit,
  }));
  const searchFormInit = (res: any = {}) => {
    form.setFieldsValue(res);
  };
  const [form] = Form.useForm();
  const [resetButtonDisabled, setResetButtonDisabled] = useState<boolean>(true);

  const onReset = () => {
    form.resetFields();
    setResetButtonDisabled(true);
    let dates: any = chinaDate();
    form.setFieldsValue(initialValues);
    console.log(form.getFieldsValue());
  };
  const onFinish = (values: any) => {
    let { dates, ...linshi }: any = values;
    if (values.dates?.length === 2) {
      linshi.billMonthS = chinaDate(values.dates[0]).ny;
      linshi.billMonthE = chinaDate(values.dates[1]).ny;
    }
    searchBtnF(linshi);
  };
  const onValuesChange = (currentObj: any) => {
    setResetButtonDisabled(qs.stringify(form.getFieldsValue()) === qs.stringify(initialValues));
  };
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, []);
  return (
    <>
      <Form
        className="anTopSearchForm pageTopForm"
        form={form}
        layout="inline"
        name="maitainSearcher"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="数据统计时间维度" name="dates">
          <DatePicker.RangePicker
            disabledDate={(current: any) => {
              return current && current > moment().endOf('day');
            }}
            allowClear={false}
            locale={locale}
            picker="month"
          />
        </Form.Item>
        <Form.Item label="部门名称" name="departmentName">
          <Select showSearch placeholder="请选择" optionFilterProp="children">
            {deptList?.map((item: any) => (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="手机号" name="phone">
          <Input placeholder="请输入手机号"></Input>
        </Form.Item>
        <Form.Item className="h0"></Form.Item>
        <Form.Item className="h0"></Form.Item>
        <Form.Item className="h0"></Form.Item>
        <Form.Item className="h0"></Form.Item>
        <div className="searchBtnBox">
          <div>
            <Button type={'primary'} htmlType="submit">
              搜索
            </Button>
            <Button disabled={resetButtonDisabled} onClick={onReset}>
              重置
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
});
