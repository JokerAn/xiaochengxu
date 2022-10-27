import { Form, Input, Button, Select } from 'antd';
import qs from 'qs';
import { useState, forwardRef, useImperativeHandle } from 'react';
export const UserManagementSearchForm = forwardRef((props: any, ref) => {
  const { searchBtnF, userStatusList, userRoleList, addUser } = props;
  const { Option } = Select;
  useImperativeHandle(ref, () => ({
    formRef: form,
    searchFormInit,
  }));
  const searchFormInit = (res: any = {}) => {
    form.setFieldsValue(res);
    setResetButtonDisabled(!qs.stringify(form.getFieldsValue()));
  };
  const [form] = Form.useForm();
  const [resetButtonDisabled, setResetButtonDisabled] = useState<boolean>(true);

  const onReset = () => {
    form.resetFields();
    setResetButtonDisabled(true);
  };
  const onFinish = async (values: any) => {
    searchBtnF(values);
  };
  const onValuesChange = () => {
    setResetButtonDisabled(!qs.stringify(form.getFieldsValue()));
  };
  return (
    <>
      <Form
        className="anTopSearchForm"
        form={form}
        layout="inline"
        name="maitainSearcher"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Form.Item label="ERP" name="pin">
          <Input placeholder="请输入" maxLength={50} />
        </Form.Item>
        <Form.Item label="用户状态" name="status">
          <Select showSearch allowClear optionFilterProp="children" placeholder="请选择">
            {userStatusList?.map((item: any, index: number) => {
              return (
                <Option key={item.code} value={item.code}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="用户角色" name="roleId">
          <Select showSearch optionFilterProp="children" placeholder="请选择">
            {userRoleList?.map((item: any, index: number) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item className="h0"></Form.Item>
        <Form.Item className="h0"></Form.Item>
        <Form.Item className="h0"></Form.Item>
        <Form.Item className="h0"></Form.Item>
        <div className="searchBtnBox">
          <div>
            <Button type={'primary'} onClick={addUser}>
              新增用户
            </Button>
            <Button className="marg0-20" type={'primary'} htmlType="submit">
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
