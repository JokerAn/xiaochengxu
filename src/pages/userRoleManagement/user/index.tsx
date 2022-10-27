import { useState, useEffect, useRef } from 'react';
import { Table, Button, Spin, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserManagementSearchForm } from './filterSearch';
// 服务商审核页面
export const UserManagement: any = (props: any) => {
  const navigate = useNavigate();

  const [pageInfo, setPageInfo] = useState<any>({
    pageIndex: 1,
    pageSize: 10,
  });
  //筛选条件-用户状态
  const [userStatusList, setUserStatusList] = useState<any>([]);
  //筛选条件-用户角色
  const [userRoleList, setUserRoleList] = useState<any>([]);
  const [pageListData, setPageListData] = useState<any>({ dataList: [] });
  const [colums] = useState<any>([
    {
      title: '序号',
      dataIndex: 'rowNum',
      key: 'rowNum',
      fixed: 'left',
      width: 60,
    },
    {
      title: 'ERP',
      dataIndex: 'erp',
      key: 'erp',
      width: 120,
    },
    {
      title: '用户角色',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 120,
      render: (text: any, record: any) => {
        return (
          <span title={record.roleName}>
            {record.roleName?.length > 19 ? `${record.roleName.slice(0, 19)}...` : record.roleName}
          </span>
        );
      },
    },
    {
      title: '用户状态',
      dataIndex: 'statusCHS',
      key: 'statusCHS',
      width: 80,
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
      title: '添加时间',
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
      width: 120,
      fixed: 'right',
      render: (text: any, record: any) => (
        <div className="tableConfig">
          <Button
            type="link"
            onClick={() => {
              // 跳转页面
              navigate(`/userSeeBox?id=${record.id}`, {
                state: { xxx: 'xxx' },
              });
            }}
          >
            查看
          </Button>
          <Button
            type="link"
            onClick={() => {
              // 跳转页面
              navigate(`/userEditBox?id=${record.id}`, {
                state: { xxx: 'xxx' },
              });
            }}
          >
            编辑
          </Button>
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
  const getPageList = (pageIndex?: any, pageSize?: any) => {
    let canshu: any = {
      ...ajaxParams.current,
    };
    canshu.pageIndex = pageIndex || ajaxParams.current.pageIndex || pageInfo.pageIndex;
    canshu.pageSize = pageSize || ajaxParams.current.pageSize || pageInfo.pageSize;
    setTableLoading(true);
    let getUserTableAPI: any;
    getUserTableAPI(canshu)
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
        ajaxParams.current.pageIndex = result.data.pageIndex;
        ajaxParams.current.pageSize = canshu.pageSize;
        setPageListData(result.data);
        setPageInfo({
          pageIndex: result.data.pageIndex,
          pageSize: canshu.pageSize,
        });
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };
  const addUser = () => {
    console.log('addUser');
    navigate('/userAddBox');
  };

  const paginationChange = (pageNo: number, pageSize: any) => {
    console.log('pageNo=' + pageNo, 'pageSize=' + pageSize);
    getPageList(pageNo, pageSize);
  };

  const showTotal = () => {
    return `${pageListData?.totalCount || 0}条记录`;
  };
  const getUserFilterOptions = () => {
    let getUserFilterOptionsAPI: any;
    getUserFilterOptionsAPI({})
      .then((result: any) => {
        console.log(result);
        setUserStatusList(result.data.userStatusEnumList);
        setUserRoleList(result.data.roleList);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // getUserFilterOptions();
  }, []);
  return (
    <div>
      <Spin spinning={tableLoading} delay={100}>
        <UserManagementSearchForm
          userStatusList={userStatusList}
          userRoleList={userRoleList}
          searchBtnF={searchBtnF}
          addUser={addUser}
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
