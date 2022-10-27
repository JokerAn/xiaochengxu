import { RoleTree } from '@src/components/roleTree';
import { Button, Checkbox, Form, Input, message, Select, Spin } from 'antd';
let { getAddRoleOptionAPI, getRoleCodeAPI, getRoleDetailAPI, saveRoleAPI }: any = {};
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { addChildren, createParentKey } from '@src/utils';
import './addRole.less';
export const AddRoleComponent = (props: any) => {
  let navigate = useNavigate();
  const [isInit, setInit] = useState(true);
  const [pageLoading, setpageLoading] = useState(false);
  const [saveLoading, setsaveLoading] = useState(false);
  const [pageOptions, setpageOptions] = useState<any>({
    auditConfig: [],
    menuTree: [],
    statusEnumList: [],
  });
  const [form] = Form.useForm();
  const { Option } = Select;
  // const [treeData, setTreeData] = useState<any>([...localRouter]);
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<any>([
    '777',
    '77701',
    '77702',
    '77703',
    '77704',
  ]);
  const [rightBoxValue, setRightBoxValue] = useState<any>([1, 2, 3, 5, 6]);
  const [checkedKeys, setCheckedKeys] = useState<any>(['777', '77701', '77702', '77703', '77704']);
  //服务商审核
  const [serviceProviderApprovedShow, setserviceProviderApprovedShow] = useState<boolean>(false);
  //协议审核
  const [agreementApprovedShow, setagreementApprovedShow] = useState<boolean>(false);
  //结算单内部
  const [statementInsideApprovedShow, setstatementInsideApprovedShow] = useState<boolean>(false);
  //结算单外部
  const [statementOutSideApprovedShow, setstatementOutSideApprovedShow] = useState<boolean>(false);
  const onCheckRoleTree = (res: any, currentLine: any) => {
    console.log(res, currentLine, 'onChangeRoleTree');
    setCheckedKeys(res);
    //判断如果审核管理中的某些选项被选中就再出现一个弹框，一进页面也需要根据defaultCheckedKeys来判断是否展示
    //服务商审核
    const serviceProviderApproved: any = currentLine.selectedIdDatas.filter(
      (item: any) => item.path === '/serviceProviderApproved'
    );
    //协议审核
    const agreementApproved: any = currentLine.selectedIdDatas.filter(
      (item: any) => item.path === '/agreementApproved'
    );
    //结算单内部
    const statementInsideApproved: any = currentLine.selectedIdDatas.filter(
      (item: any) => item.path === '/statementInsideApproved'
    );
    //结算单外部
    const statementOutSideApproved: any = currentLine.selectedIdDatas.filter(
      (item: any) => item.path === '/statementOutSideApproved'
    );
    setserviceProviderApprovedShow(serviceProviderApproved.length > 0);
    setagreementApprovedShow(agreementApproved.length > 0);
    setstatementInsideApprovedShow(statementInsideApproved.length > 0);
    setstatementOutSideApprovedShow(statementOutSideApproved.length > 0);
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
        (serviceProviderApprovedShow && !rightBoxValue.includes(1)) ||
        (agreementApprovedShow && !rightBoxValue.includes(2)) ||
        (statementInsideApprovedShow &&
          !rightBoxValue.includes(3) &&
          !rightBoxValue.includes(4) &&
          !rightBoxValue.includes(5)) ||
        (statementOutSideApprovedShow && !rightBoxValue.includes(6))
      ) {
        message.warning('请勾选正确的审核配置');
        return;
      }
      setsaveLoading(true);
      saveRoleAPI({
        ...values,
        treeValue: checkedKeys,
        rightValues: rightBoxValue,
      })
        .then((result: any) => {
          console.log(result);
        })
        .catch((err: any) => {
          console.log(err);
        })
        .finally(() => {
          setsaveLoading(false);
        });
    });
  };
  const CheckboxChange = (res: any) => {
    console.log(res);
    setRightBoxValue(res);
  };
  useEffect(() => {
    if (!serviceProviderApprovedShow && !isInit) {
      setRightBoxValue((current: any = []) => {
        return current.filter((item: any) => {
          return item !== 1;
        });
      });
    }
  }, [serviceProviderApprovedShow]);
  useEffect(() => {
    if (!agreementApprovedShow && !isInit) {
      setRightBoxValue((current: any = []) => {
        return current.filter((item: any) => {
          return item !== 2;
        });
      });
    }
  }, [agreementApprovedShow]);
  useEffect(() => {
    if (!statementInsideApprovedShow && !isInit) {
      setRightBoxValue((current: any = []) => {
        return current.filter((item: any) => {
          return ![3, 4, 5].includes(item);
        });
      });
    }
  }, [statementInsideApprovedShow]);
  useEffect(() => {
    if (!statementOutSideApprovedShow && !isInit) {
      setRightBoxValue((current: any = []) => {
        return current.filter((item: any) => {
          return item !== 6;
        });
      });
    }
  }, [statementOutSideApprovedShow]);
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
    getRoleDetailAPI({})
      .then((result: any) => {
        console.log(result);
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
    getRoleCodeAPI({})
      .then((result: any) => {
        console.log(result);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log('进入页面携带的id是', props.id, ' type=' + props.type);

    setInit(false);
    getUserDetailOptions();
    if (props.type !== 'add') {
      getRoleDetail();
    } else {
      getRoleCode();
    }
    //根据请求获取到数据
    form.setFieldsValue({
      角色名称: 'xxxxx',
      角色代码: 'xxxxx',
      角色状态: 1,
    });

    if (defaultCheckedKeys.includes('77702')) {
      setagreementApprovedShow(true);
    }
    if (defaultCheckedKeys.includes('77703')) {
      setstatementInsideApprovedShow(true);
    }
    if (defaultCheckedKeys.includes('77704')) {
      setstatementOutSideApprovedShow(true);
    }
    if (defaultCheckedKeys.includes('77701')) {
      setserviceProviderApprovedShow(true);
    }
  }, []);
  return (
    <Spin spinning={pageLoading} delay={100}>
      <div className="border1">
        <h3 className="blueTitle">基础信息</h3>
        <div>
          <Form className="anTopSearchForm" form={form} layout="inline" name="maitainSearcher">
            <Form.Item label="角色代码" name="角色代码">
              <Input className="inputspan" placeholder="请输入" disabled={true} />
              {/* <span>{form.getFieldValue("角色代码")}</span> */}
            </Form.Item>
            <Form.Item label="角色名称" name="角色名称">
              <Input
                placeholder="请输入"
                maxLength={12}
                onInput={(e: any) => {
                  e.target.value = e.target.value.replace(/[^\d]/g, '');
                }}
              />
            </Form.Item>
            <Form.Item label="角色状态" name="角色状态">
              <Select showSearch allowClear optionFilterProp="children" placeholder="请选择">
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
      <div className="border1  border1none right-box">
        <h3 className="blueTitle">*功能配置</h3>
        <div className="approvalLevel" style={{ display: 'flex' }}>
          <RoleTree
            treeData={pageOptions.menuTree}
            onCheck={onCheckRoleTree}
            defaultCheckedKeys={defaultCheckedKeys}
          ></RoleTree>
          {serviceProviderApprovedShow ||
          agreementApprovedShow ||
          statementInsideApprovedShow ||
          statementOutSideApprovedShow ? (
            <Checkbox.Group
              className="rightBox"
              style={{ width: '100%' }}
              value={rightBoxValue}
              onChange={CheckboxChange}
            >
              <ul>
                <h2>审核配置</h2>
                {/* {pageOptions.auditConfig?.map((item:any)=>{

                })} */}
                {serviceProviderApprovedShow ? (
                  <li>
                    <h3>服务商审核</h3>
                    <p>
                      <Checkbox value={1}>服务商一级审核</Checkbox>
                    </p>
                  </li>
                ) : null}
                {agreementApprovedShow ? (
                  <li>
                    <h3>服务协议审核</h3>
                    <p>
                      <Checkbox value={2}>服务协议一级审核</Checkbox>
                    </p>
                  </li>
                ) : null}
                {statementInsideApprovedShow ? (
                  <li>
                    <h3>结算单内部审核</h3>
                    <p>
                      <Checkbox value={3}>结算单内部一级审核</Checkbox>
                    </p>
                    <p>
                      <Checkbox value={4}>结算单内部二级审核</Checkbox>
                    </p>
                    <p>
                      <Checkbox value={5}>结算单内部三级审核</Checkbox>
                    </p>
                  </li>
                ) : null}
                {statementOutSideApprovedShow ? (
                  <li>
                    <h3>结算单外部审核</h3>
                    <p>
                      <Checkbox value={6}>结算单外部一级审核</Checkbox>
                    </p>
                  </li>
                ) : null}
              </ul>
            </Checkbox.Group>
          ) : null}
        </div>
      </div>

      <div className="searchBtnBox padd20 center">
        <div>
          {props.type === 'see' ? null : (
            <Button loading={saveLoading} type="primary" className="marg0-20" onClick={save}>
              确定
            </Button>
          )}
          <Button
            onClick={() => {
              navigate('/roleManagement');
            }}
          >
            取消
          </Button>
        </div>
      </div>
    </Spin>
  );
};
