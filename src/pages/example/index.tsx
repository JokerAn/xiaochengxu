import { FC, useState, useEffect, useRef } from 'react';
import { Form, Table, Button, message, Spin, Pagination, Input, Modal, Drawer } from 'antd';
import { TopForm } from './topForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { getExampleTableList1API } from '@src/apis/publicApis';
import { useActivate, useAliveController, useUnactivate } from 'react-activation';
import { useKeepAliveActive } from '@src/components/myUses';
import store from '@src/store/store';
import { useSelector } from 'react-redux';
import { historyPathsR } from '@src/store/baseSlice';
import { createBrowserHistory } from 'history';
export const ExampleComponent: FC = (props: any) => {
  let location: any = useLocation();
  const { pathname } = location;
  let navigate: any = useNavigate();
  const { TextArea } = Input;
  const [remarkForm] = Form.useForm();
  const searchFormRef = useRef<any>();
  const currentLineObj = useRef<any>({});
  //配置类型
  const [billingShow, setBillingShow] = useState<boolean>(false);
  const [remarkLoading, setRemarkLoading] = useState<boolean>(false);
  const [remarkPop, setRemarkPop] = useState<boolean>(false);
  const [lineDetail, setLineDetail] = useState<any>({});
  const [deptList, deptListSet] = useState<any>([
    { id: 1, name: '测试下拉一' },
    { id: 2, name: '测试下拉二' },
  ]);

  const [pageInfo, setPageInfo] = useState<any>({
    current: 1,
    size: 10,
  });
  const [pageListData, setPageListData] = useState<any>({
    model: [],
  });
  const [colums] = useState<any>([
    {
      title: '域名',
      dataIndex: 'domainName',
      key: 'domainName',
      width: 150,
    },
    {
      title: '部门名称',
      dataIndex: 'departmentName',
      key: 'departmentName',
      width: 200,
    },
    {
      title: '环境',
      dataIndex: 'domainType',
      key: 'domainType',
      width: 80,
    },
    {
      title: '系统名称',
      dataIndex: 'subSystemNameCN',
      key: 'subSystemNameCN',
      width: 100,
    },
    {
      title: '操作',
      key: 'Actions',
      width: 260,
      fixed: 'right',
      render: (text: any, record: any) => (
        <div className="tableBtns">
          <Button
            className="btn-table-action"
            type="link"
            onClick={() => {
              getDetail(record);
            }}
          >
            详情(跳转页面)
          </Button>
          <Button
            className="btn-table-action"
            type="link"
            onClick={() => {
              remarkForm.setFieldsValue({
                id: record.checkTaskNo,
                remark: record.remark,
              });
              setRemarkPop(true);
            }}
          >
            弹框
          </Button>
          <Button
            className="btn-table-action"
            type="link"
            onClick={() => {
              currentLineObj.current = {
                ...record,
              };
              console.log('开票');
              setBillingShow(true);
            }}
          >
            抽屉
          </Button>
          <Button
            className="btn-table-action"
            type="link"
            onClick={() => {
              currentLineObj.current = {
                ...record,
              };
              Modal.confirm({
                title: '告警',
                content: '确定删除此数据？',
                okButtonProps: {
                  type: 'primary',
                  danger: true,
                  size: 'large',
                },
                cancelButtonProps: {
                  danger: true,
                  size: 'large',
                },
                onOk() {
                  return new Promise((resolve: any, reject: any) => {
                    message.info('点击了确定');
                    resolve();
                  });
                },
              });
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const ajaxParams: any = useRef({});

  //点击了搜索触发
  const searchBtnF = (formValue: any) => {
    console.log('点击了搜索', formValue);
    ajaxParams.current = formValue;
    getPageList(1, ajaxParams.current.size || pageInfo.size);
  };

  //请求页面数据
  const getPageList = (current?: any, size?: any) => {
    let canshu: any = {
      ...ajaxParams.current,
    };
    canshu.current = current || ajaxParams.current.current || pageInfo.current;
    canshu.size = size || ajaxParams.current.size || pageInfo.size;
    /* 网上找的测试接口永远返回一样的数据仅供参考 https://mock.mengxuegu.com/mock/635f896affa946598c7424a0/example/getTableList1 */
    setTableLoading(true);
    getExampleTableList1API(canshu)
      .then((result: any) => {
        // console.log(result);
        setPageListData({
          model: result.data,
          current: canshu.current,
          size: canshu.size,
          total: result.count,
        });
        setPageInfo({
          current: canshu.current,
          size: canshu.size,
        });
        // console.log()
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  //分页改变触发
  const paginationChange = (pageNo: number, pageSize: any) => {
    console.log({ pageNo, pageSize });
    if (pageInfo.size === pageSize) {
      getPageList(pageNo, pageSize);
    } else {
      getPageList(1, pageSize);
    }
  };
  const showTotal = () => {
    return `${pageListData?.total || 0}条记录`;
  };
  //查看详情
  const getDetail = (lineObj: any, type: string = 'detail') => {
    navigate(`/examplePageDetails?id=${lineObj.id}`);
  };
  const exportExcel = () => {
    message.info('点击了导出按钮');
  };
  useEffect(() => {
    getPageList(1);
  }, []);
  const { dropScope, getCachingNodes, clear } = useAliveController();
  useKeepAliveActive(
    () => {},
    () => {
      console.log('卸载完毕');
    }
  );
  let history: any = createBrowserHistory();

  useEffect(() => {
    console.log(history);
    history.listen((res: any) => {
      console.log('示例页面history', res);
    });
  }, []);
  return (
    <div className="pageBox">
      <Spin spinning={tableLoading} delay={100}>
        {/* 顶部筛选条件 */}
        <TopForm ref={searchFormRef} deptList={deptList} searchBtnF={searchBtnF} />
        {/* table区域 */}
        <div className="anTableBox padd20-10 fff borderr10">
          <div className="tableBtns">
            <Button onClick={exportExcel}>导出</Button>
          </div>
          <Table
            className="tableComponents"
            scroll={{ x: '100%' }}
            dataSource={pageListData.model || []}
            columns={colums}
            rowKey={(record) => record.id || Math.random()}
            pagination={false}
          />
          <Pagination
            hideOnSinglePage={true}
            style={{ textAlign: 'right', margin: '10px 0 0 0' }}
            current={pageInfo.current}
            pageSize={pageInfo.size}
            total={pageListData?.total || 0}
            showTotal={showTotal}
            onChange={paginationChange}
            showSizeChanger
            showQuickJumper
          />
        </div>
      </Spin>
      <Modal
        width={500}
        title="备注"
        confirmLoading={remarkLoading}
        destroyOnClose={true}
        maskClosable={false}
        keyboard={false}
        visible={remarkPop}
        onCancel={() => {
          setRemarkPop(false);
        }}
        onOk={() => {
          remarkForm.validateFields().then((values: any) => {
            console.log(values);
            setRemarkLoading(true);
            setTimeout(() => {
              setRemarkLoading(false);
              setRemarkPop(false);
              message.success('成功');
            }, 1000);
          });
        }}
        okButtonProps={{
          style: { marginLeft: '16px' },
          type: 'primary',
          danger: true,
          size: 'large',
        }}
        cancelButtonProps={{
          danger: true,
          size: 'large',
        }}
      >
        <div>
          <Form
            className="anTopSearchForm fff"
            form={remarkForm}
            name="maitainSearcher"
            labelCol={{
              md: { span: 6 },
            }}
            wrapperCol={{
              md: { span: 16 },
            }}
          >
            <Form.Item label="对账任务ID" name="id" rules={[{ required: true }]}>
              <Input className="inputspan" disabled />
            </Form.Item>
            <Form.Item label="备注" name="remark">
              <TextArea autoSize={{ minRows: 2, maxRows: 4 }}></TextArea>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
