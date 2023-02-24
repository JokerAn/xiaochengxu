import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Popconfirm, Switch, Table, Typography } from 'antd';

interface Item {
  [others: string]: any;
}

const originData: any[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: 'id' + i.toString(),
    name: false,
    age: i,
    address: `London Park no. ${i}`,
  });
}
const EditableCell: any = ({
  lineData,
  setData,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}: any) => {
  // if (lineData) {
  //   console.log({
  //     lineData,
  //     dataIndex,
  //     inputType,
  //     record,
  //     children,
  //     ...restProps,
  //   });
  // }
  const form = Form.useFormInstance();
  return (
    <td {...restProps}>
      {lineData?.dataIndex === 'age' ? (
        <Form.Item
          name={[record.key, 'age']}
          validateTrigger={['onChange']}
          rules={[
            {
              required: true,
              message: `请填写`,
            },
          ]}
        >
          <InputNumber
            onBlur={() => {
              let formValue = form.getFieldsValue();
              console.log({ formValue });
              setData((current: any) => {
                current.forEach((item: any) => {
                  console.log(item);
                  item.age = formValue[item.key]?.age ?? item.age;
                  item.name = formValue[item.key]?.name ?? item.name;
                  return item;
                });
                return [...current];
              });
              console.log(form.getFieldsValue());
            }}
          />
        </Form.Item>
      ) : (
        <>
          {lineData?.dataIndex === 'name' ? (
            <Form.Item name={[record.key, 'name']} valuePropName="checked">
              <Switch checkedChildren="启用" unCheckedChildren="禁用" />
            </Form.Item>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </td>
  );
};

export const TableInput: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {};

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <span>Cancel</span>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        lineData: col,
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        setData: setData,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
      <Button
        onClick={() => {
          console.log(data);
        }}
      >
        确定
      </Button>
    </Form>
  );
};
