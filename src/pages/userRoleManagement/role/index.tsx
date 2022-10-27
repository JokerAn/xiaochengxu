import { useState, useEffect, useRef } from 'react';
import { Table, Button, Spin, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RoleManagementSearchForm } from './filterSearch';
let { getRoleStatusAPI, getRoleTableAPI }: any = {};
// 服务商审核页面
export const RoleManagement: any = (props: any) => {
  let navigate = useNavigate();
  const [pageInfo, setPageInfo] = useState<any>({
    pageIndex: 1,
    pageSize: 10,
  });
  //筛选条件-角色状态
  const [roleNameList, setRoleNameList] = useState<any>([]);
  const [roleStatusList, setRoleStatusList] = useState<any>([]);
  const [pageListData, setPageListData] = useState<any>({ model: [] });
  const [colums] = useState<any>([
    {
      title: '序号',
      dataIndex: 'rowNum',
      key: 'rowNum',
      fixed: 'left',
      width: 60,
      ellipsis: true,
    },
    {
      title: '角色代码',
      dataIndex: 'code',
      key: 'code',
      width: 180,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: '角色状态',
      dataIndex: 'statusCHS',
      key: 'statusCHS',
      width: 100,
      render: (text: any, record: any) => (
        <div>
          {record.statusCHS === '无效' ? (
            <i className="falseCircular circular margR5"></i>
          ) : (
            <i className="trueCircular circular margR5"></i>
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 170,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 170,
    },
    {
      // 查看、编辑、删除；已使用过的发票不可以编辑和删除；
      title: '操作',
      key: 'Actions',
      width: 130,
      fixed: 'right',
      render: (text: any, record: any) => (
        <div className="tableConfig">
          <Button
            type="link"
            onClick={() => {
              // 跳转页面
              navigate(`/roleSeeBox?id=${record.id}`);
            }}
          >
            查看
          </Button>
          {record.code !== 'gly' ? (
            <Button
              type="link"
              onClick={() => {
                // 跳转页面
                navigate(`/roleEditBox?id=${record.id}`);
              }}
            >
              编辑
            </Button>
          ) : null}
        </div>
      ),
    },
  ]);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const ajaxParams: any = useRef({});
  const searchBtnF = (formValue: any) => {
    console.log('点击了搜索', formValue);
    ajaxParams.current = formValue;
    getPageList(1, ajaxParams.current.pageSize || pageInfo.pageSize);
  };
  const getRoleStatus = () => {
    getRoleStatusAPI({})
      .then((result: any) => {
        console.log(result);
        setRoleStatusList(result.data.roleStatusList);
        setRoleNameList(result.data.roleNameList);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const getPageList = (pageIndex?: any, pageSize?: any) => {
    let canshu: any = {
      ...ajaxParams.current,
    };
    canshu.pageIndex = pageIndex || ajaxParams.current.pageIndex || pageInfo.pageIndex;
    canshu.pageSize = pageSize || ajaxParams.current.pageSize || pageInfo.pageSize;
    setTableLoading(true);

    getRoleTableAPI(canshu)
      .then((result: any) => {
        console.log(result);
        if (
          /*如果后台返回值没有数据 并且并非是在第一页*/
          result.data?.dataList?.length === 0 &&
          result.data?.pageIndex !== 1
        ) {
          getPageList(1, canshu.pageSize);
          return;
        }
        setPageListData(result.data);
        setPageInfo({
          pageIndex: result.data.pageIndex,
          pageSize: result.data.pageSize || canshu.pageSize,
        });
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  const paginationChange = (pageNo: number, pageSize: any) => {
    console.log('pageNo=' + pageNo, 'pageSize=' + pageSize);
    getPageList(pageNo, pageSize);
  };
  const addRole = () => {
    navigate('/roleAddBox');
  };
  const showTotal = () => {
    return `${pageListData?.totalCount || 0}条记录`;
  };
  useEffect(() => {
    // getRoleStatus();
  }, []);
  return (
    <div>
      <Spin spinning={tableLoading} delay={100}>
        <RoleManagementSearchForm
          roleNameList={roleNameList}
          roleStatusList={roleStatusList}
          searchBtnF={searchBtnF}
          addRole={addRole}
        />
        <div className="anTableBox">
          <Table
            className="tableComponents"
            scroll={{ x: '100%' }}
            dataSource={pageListData.dataList || []}
            columns={colums}
            rowKey={(record) => record.id}
            pagination={false}
          />
          <Pagination
            style={{ textAlign: 'right', margin: '10px 0 0 0' }}
            current={pageInfo.pageIndex}
            pageSize={pageInfo.pageSize}
            total={pageListData?.totalCount || 0}
            showTotal={showTotal}
            onChange={paginationChange}
            showSizeChanger
            showQuickJumper
          />
        </div>
      </Spin>
    </div>
  );
};
