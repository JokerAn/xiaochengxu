import { RoleTree } from '@src/components/roleTree';
import { addChildren, createParentKey } from '@src/utils';
import { Button, Checkbox, Form, Input, message, Modal, Select, Spin } from 'antd';
let { getAddRoleOptionAPI, getOnceIdAPI, getRoleDetailAPI, saveEditRoleAPI, saveRoleAPI }: any = {};
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addRole.less';
export const AddRoleComponent = (props: any) => {
  console.log(props);

  let navigate = useNavigate();
  // const [isInit, setInit] = useState(true);
  const [pageLoading, setpageLoading] = useState(false);
  const [pageOptions, setpageOptions] = useState<any>({
    auditList: [],
    menuTree: [],
    statusEnumList: [],
  });
  const pageThat = useRef<any>({
    lock: false,
  });
  const [form] = Form.useForm();
  const { Option } = Select;
  const [approvalRightList, setApprovalRightList] = useState<any>([]);
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<any>([]);
  const [rightBoxValue, setRightBoxValue] = useState<any>([]);
  const [checkedKeys, setCheckedKeys] = useState<any>([]);
  const onCheckRoleTree = (res: any, currentLine: any) => {
    console.log(res, currentLine, 'onChangeRoleTree');
    rightShowF(res);
    setCheckedKeys(res);
  };
  const rightShowF = (res: any, rightList?: any) => {
    let linshi: any = [];
    console.log(res, pageOptions);
    rightList = rightList || pageOptions.auditList;
    console.log(rightList);
    rightList?.forEach((item: any) => {
      console.log(res.includes(item.menuId), item.menuId);
      if (res.includes(item.menuId)) {
        linshi.push(item);
      }
    });
    console.log(linshi);
    let idInLinShi: any = [];
    linshi.forEach((item: any, index: number) => {
      idInLinShi = idInLinShi.concat(item.auditList?.map((item2: any) => item2.id));
    });
    setRightBoxValue((current: any) => {
      return current.filter((item: any) => idInLinShi.includes(item));
    });
    setApprovalRightList(linshi);
  };
  const save = () => {
    form.validateFields().then((values) => {
      console.log({
        ...values,
        treeValue: checkedKeys,
        rightValues: rightBoxValue,
      });
      if (checkedKeys.length === 0) {
        message.warning('路由权限最少选中一个');
        return;
      }
      if (
        approvalRightList.some((item: any) => {
          let pd: boolean = false;
          let itemIds = item.auditList.map((item2: any) => item2.id);
          let approvalRightListItemSelected: any = itemIds.filter((item3: any) => {
            return rightBoxValue.includes(item3);
          });
          if (approvalRightListItemSelected.length === 0) {
            pd = true;
            message.warning(`请勾选右侧【${item.menuName}】`);
          }
          return pd;
        })
      ) {
        return;
      }
      Modal.confirm({
        title: '提示',
        content: '确定提交该角色吗？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          return new Promise((resolve: any, reject: any) => {
            let saveAjax: any = saveEditRoleAPI;
            if (props.type === 'add') {
              saveAjax = saveRoleAPI;
            }
            saveAjax({
              ...values,
              menuIds: checkedKeys,
              auditIds: rightBoxValue,
              id: pageOptions.role?.id,
            })
              .then((result: any) => {
                if (result.success) {
                  if (props.type === 'add') {
                    message.success('角色已新增', 5);
                  } else {
                    message.success('角色已修改', 5);
                  }

                  navigate('/roleManagement');
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
    setRightBoxValue(res);
  };
  //获取页面需要用到的下拉
  const getUserDetailOptions = () => {
    setpageLoading(true);
    getAddRoleOptionAPI({})
      .then((result: any) => {
        console.log(result);
        result.data.menuTree = addChildren(result.data.menuTree);
        createParentKey(result.data.menuTree);
        setpageOptions(result.data);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setpageLoading(false);
      });
  };
  //获取角色详情
  const getRoleDetail = () => {
    setpageLoading(true);
    getRoleDetailAPI({ roleId: props.id })
      .then((result: any) => {
        console.log(result);
        result.data.menuTree = addChildren(result.data.menuTree);
        createParentKey(result.data.menuTree);
        setpageOptions(result.data);
        form.setFieldsValue({
          code: result.data.role.code,
          name: result.data.role.name,
          status: result.data.role.status,
        });
        setRightBoxValue(result.data.auditIds);
        setCheckedKeys(result.data.menuIds);
        setDefaultCheckedKeys(result.data.menuIds);
        rightShowF(result.data.menuIds, result.data.auditList);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setpageLoading(false);
      });
  };
  //获取角色代码
  const getRoleCode = () => {
    getOnceIdAPI({})
      .then((result: any) => {
        console.log(result);
        form.setFieldsValue({
          code: result.data,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log('进入页面携带的id是', props.id, ' type=' + props.type);

    // setInit(false);
    if (props.type !== 'add') {
      // getRoleDetail();
    } else {
      // getUserDetailOptions();
      // getRoleCode();
    }
  }, []);
  return (
    <Spin spinning={pageLoading} delay={100}>
      <div className="anTableBox">
        <div className="">
          <h3 className="blueTitle">基础信息</h3>
          <div>
            <Form
              className="anTopSearchForm"
              form={form}
              layout="inline"
              name="maitainSearcher"
              style={{ background: 'unset' }}
            >
              <Form.Item label="角色代码" name="code">
                <Input
                  title={form.getFieldValue('code')}
                  className="inputspan"
                  placeholder="请输入"
                  disabled={true}
                />
              </Form.Item>
              <Form.Item label="角色名称" name="name">
                <Input
                  disabled={props.type === 'see'}
                  title={form.getFieldValue('name')}
                  placeholder="请输入"
                  maxLength={50}
                  onCompositionStart={(e: any) => {
                    pageThat.current.lock = true;
                  }}
                  onCompositionEnd={(e: any) => {
                    pageThat.current.lock = false;
                  }}
                  onInput={(e: any) => {
                    setTimeout(() => {
                      if (pageThat.current.lock === false) {
                        e.target.value = e.target.value.replace(/[^a-zA-Z0-9\u4E00-\u9FA5]/g, '');
                      }
                    }, 10);
                  }}
                />
              </Form.Item>
              <Form.Item label="角色状态" name="status">
                <Select
                  disabled={props.type === 'see'}
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  placeholder="请选择"
                >
                  {pageOptions.statusEnumList?.map((item: any, index: number) => {
                    return (
                      <Option key={item.code} value={item.code}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="borderB1 marg20-0"></div>
        <div className="right-box">
          <h3 className="blueTitle">*功能配置</h3>
          <div className="approvalLevel" style={{ display: 'flex' }}>
            <RoleTree
              disabled={props.type === 'see'}
              treeData={pageOptions.menuTree}
              onCheck={onCheckRoleTree}
              defaultCheckedKeys={defaultCheckedKeys}
            ></RoleTree>
            {approvalRightList.length ? (
              <Checkbox.Group
                disabled={props.type === 'see'}
                className="rightBox"
                style={{ width: '100%' }}
                value={rightBoxValue}
                onChange={CheckboxChange}
              >
                <ul>
                  <h2>审核配置</h2>
                  {approvalRightList?.map((item: any) => {
                    return (
                      <li key={item.id + 'right'}>
                        <h3>{item.menuName}</h3>
                        {item.auditList?.map((item2: any) => {
                          return (
                            <p key={item2.id + 'right2'}>
                              <Checkbox value={item2.id}>{item2.name}</Checkbox>
                            </p>
                          );
                        })}
                      </li>
                    );
                  })}
                </ul>
              </Checkbox.Group>
            ) : null}
          </div>
        </div>

        <div className="searchBtnBox padd20 center">
          <div>
            {props.type === 'see' ? null : (
              <Button type="primary" size="large" danger className="marg0-20" onClick={save}>
                确定
              </Button>
            )}
            <Button
              size="large"
              danger
              onClick={() => {
                navigate('/roleManagement');
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
