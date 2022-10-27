import { Button, Checkbox, Form, Input, message, Modal, Select, Spin } from 'antd';
let {
  getErpUserListAPI,
  getUserDetailInfoAPI,
  getUserDetailOptionsAPI,
  saveUserAddAPI,
  saveUserDetailAPI,
}: any = {};
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import './addUser.less';
export const AddUserComponent = (props: any) => {
  let navigate = useNavigate();
  const [pageOptions, setpageOptions] = useState<any>({
    departmentTree: [],
    roleList: [],
    userStatusEnumList: [],
  });
  const [erpLoading, erpLoadingSet] = useState<boolean>(false);
  const [erpLists, setErpLists] = useState<any[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [departmentIdList, setdepartmentIdList] = useState<any[]>([
    {
      name: '总部',
      id: 1,
      children: [
        {
          name: '意健险部',
          id: 10,
        },
        {
          name: '直销平台部',
          id: 11,
        },
        {
          name: '直销平台部-本部门名称非常的长倡导无法想象',
          id: 12,
        },
        {
          name: '业务支持部',
          id: 13,
        },
        {
          name: '互联网保险部',
          id: 14,
        },
        {
          name: '运营支持部',
          id: 15,
        },
      ],
    },
    {
      name: '广东分公司',
      id: 2,
      children: [
        {
          name: '广东分公司',
          id: 21,
        },
      ],
    },
  ]);
  const [pageLoading, setpageLoading] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  const save = () => {
    form.validateFields().then((values) => {
      console.log({
        ...values,
      });
      Modal.confirm({
        title: '提示',
        content: '确定提交该用户吗？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          return new Promise((resolve: any, reject: any) => {
            let saveAjax: any = saveUserDetailAPI;
            if (props.type === 'add') {
              saveAjax = saveUserAddAPI;
            }
            saveAjax({
              ...values,
              id: pageOptions.user?.id,
            })
              .then((result: any) => {
                if (result.success) {
                  if (props.type === 'add') {
                    message.success('用户已新增', 5);
                  } else {
                    message.success('修改成功', 5);
                  }

                  navigate('/userManagement');
                  resolve();
                } else {
                  message.error(result.message);
                  reject();
                }
              })
              .catch((err: any) => {
                console.log(err);
                reject();
              });
          });
        },
        okButtonProps: {
          type: 'primary',
          danger: true,
          size: 'large',
        },
        cancelButtonProps: {
          danger: true,
          size: 'large',
        },
      });
    });
  };
  const CheckboxChange = (res: any) => {
    console.log(res);
  };
  //获取页面需要用到的下拉
  const getUserDetailOptions = () => {
    setpageLoading(true);
    getUserDetailOptionsAPI({})
      .then((result: any) => {
        setpageOptions(result.data);
        getAllDepartmentIdList(result.data?.departmentTree);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setpageLoading(false);
      });
  };

  //获取全部的所属部门
  const getAllDepartmentIdList = (res: any = []) => {
    let finallyData: any = [];
    const fun = (passArray: any = []) => {
      passArray.forEach((item: any) => {
        finallyData.push(item.id);
        if (item.childList?.length) {
          fun(item.childList);
        }
      });
    };
    res.forEach((item: any) => {
      fun(item.childList);
    });

    setdepartmentIdList(finallyData);
    return finallyData;
  };
  //获取用户详情
  const getUserDetail = () => {
    setpageLoading(true);
    getUserDetailInfoAPI({ userId: props.id })
      .then((result: any) => {
        setpageOptions(result.data);
        let treeFlatData: any = getAllDepartmentIdList(result.data?.departmentTree);
        form.setFieldsValue({
          erp: result.data.user.pin,
          name: result.data.user.nick,
          email: result.data.user.email,
          status: result.data.user.status,
          roleIds: result.data.roleIds,
          departmentIds: result.data.departmentIds,
        });
        console.log(treeFlatData);
        if (result.data.departmentIds.length === treeFlatData.length && treeFlatData.length !== 0) {
          setCheckAll(true);
        } else {
          setCheckAll(false);
          console.log('取消全选');
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setpageLoading(false);
      });
  };
  const pageThat: any = useRef({
    timer1: null,
  });
  //获取erp下拉
  const getErpOptions = (res: any) => {
    if (pageThat.current.timer1) {
      clearTimeout(pageThat.current.timer1);
    }
    pageThat.current.timer1 = setTimeout(() => {
      if (!res) {
        setErpLists([]);
        return;
      }
      setErpLists([]);
      erpLoadingSet(true);
      getErpUserListAPI({ keyword: res })
        .then((result: any) => {
          console.log(result);
          setErpLists(result.data);
        })
        .catch((err: any) => {
          setErpLists([]);
        })
        .finally(() => {
          erpLoadingSet(false);
        });

      // setTimeout(() => {
      //   setErpLists([
      //     {
      //       erp: res + Math.random(),
      //       name: res + "用户名称",
      //       email: res + "aaa@aaa.com",
      //     },
      //   ]);
      //   erpLoadingSet(false);
      // }, 500);
    }, 400);
  };
  useEffect(() => {
    console.log('进入页面携带的id是', props.id, ' type=' + props.type);
    if (props.type === 'add') {
      // getUserDetailOptions();
    } else {
      // getUserDetail();
    }
    //根据请求获取到数据
    form.setFieldsValue({
      status: 1,
    });
  }, []);
  return (
    <Spin spinning={pageLoading} delay={100}>
      <div className="anTableBox">
        <div className="">
          <h3 className="blueTitle">基础信息</h3>
          <div>
            <Form
              className="formLineOne pad20"
              form={form}
              layout="horizontal"
              name="maitainSearcher"
              onValuesChange={(res: any) => {
                if (res.hasOwnProperty('departmentIds')) {
                  console.log(res['departmentIds']);
                  console.log(departmentIdList);
                  if (
                    res['departmentIds'].length === departmentIdList.length &&
                    departmentIdList.length !== 0
                  ) {
                    setCheckAll(true);
                  } else {
                    setCheckAll(false);
                    console.log('取消全选');
                  }
                } else if (res.hasOwnProperty('erp')) {
                  let erpObj = erpLists.filter((item: any) => item.erp === res.erp)[0];
                  form.setFieldsValue({
                    name: erpObj.name,
                    email: erpObj.email,
                  });
                }
              }}
            >
              <Form.Item label="ERP" name="erp" rules={[{ required: true }]}>
                <Select
                  placeholder="请输入"
                  notFoundContent={erpLoading ? <Spin size="small" /> : null}
                  disabled={props.type !== 'add'}
                  showSearch
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={getErpOptions}
                  onChange={() => {}}
                >
                  {erpLists?.map((item: any) => {
                    return (
                      <Option key={item.erp} value={item.erp}>
                        {item.erp}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="用户邮箱" name="email" rules={[{ required: true }]}>
                <Input disabled={true} placeholder="请输入" />
              </Form.Item>
              <Form.Item label="用户名称" name="name" rules={[{ required: true }]}>
                <Input disabled={true} placeholder="请输入" />
              </Form.Item>
              <Form.Item label="用户状态" name="status" rules={[{ required: true }]}>
                <Select
                  disabled={props.type === 'see'}
                  optionFilterProp="children"
                  placeholder="请选择"
                >
                  {pageOptions.userStatusEnumList?.map((item: any) => {
                    return (
                      <Option key={item.code} value={item.code}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="角色名称" name="roleIds" rules={[{ required: true }]}>
                <Select
                  disabled={props.type === 'see'}
                  mode="multiple"
                  showSearch
                  optionFilterProp="children"
                  placeholder="请选择"
                >
                  {pageOptions.roleList?.map((item: any) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="所属部门" required>
                <Form.Item className="rightBox">
                  <div>
                    <Checkbox
                      disabled={props.type === 'see'}
                      checked={checkAll}
                      onChange={(res: any) => {
                        setCheckAll(res.target.checked);
                        if (res.target.checked) {
                          form.setFieldsValue({
                            departmentIds: departmentIdList,
                          });
                        } else {
                          form.setFieldsValue({
                            departmentIds: [],
                          });
                        }
                      }}
                    >
                      全选
                    </Checkbox>
                  </div>
                  <Form.Item
                    name="departmentIds"
                    rules={[{ required: true, message: '请选择所属部门' }]}
                  >
                    <Checkbox.Group style={{ width: '100%' }} onChange={CheckboxChange}>
                      <ul>
                        {pageOptions.departmentTree?.map((item: any) => {
                          return (
                            <li key={item.id + 'asdf'}>
                              <h3>{item.name}</h3>
                              <div className="departmentBox">
                                {item.childList?.map((item2: any) => {
                                  return (
                                    <p key={item2.id}>
                                      <Checkbox disabled={props.type === 'see'} value={item2.id}>
                                        {item2.name}
                                      </Checkbox>
                                    </p>
                                  );
                                })}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </Checkbox.Group>
                  </Form.Item>
                </Form.Item>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="searchBtnBox padd20 center">
          <div>
            {props.type === 'see' ? null : (
              <Button size="large" danger type="primary" className="marg0-20" onClick={save}>
                确定
              </Button>
            )}
            <Button
              size="large"
              danger
              onClick={() => {
                navigate('/userManagement');
              }}
            >
              取消
            </Button>
          </div>
        </div>
      </div>
    </Spin>
  );
};
