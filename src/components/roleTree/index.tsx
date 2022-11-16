import { useEffect, useRef, useState } from 'react';
import './index.less';
// var cloneDeep = require("lodash/cloneDeep");
//数据中 是否展开 lineOpen =true、false
//数据中 是否选中 checkedNumber='0'未选中、'1'选中、'05'半选
interface propsTypes {
  treeData: any[]; //默认的tree数据
  disabled?: boolean; //组件是否禁用
  onCheck?: any; //选中触发回调
  onChange?: any; //选中触发回调方便form表单
  defaultCheckedKeys?: any; //默认选中的id集合 注意不要在要在onChangeonCheck中更改defaultCheckedKeys的值！！
  on不要在onChangeonCheck中更改defaultCheckedKeys的值?: any; //仅仅是个警告
}
export const RoleTree = (props: propsTypes) => {
  let propsDefaultCheckedKeys: any = props.defaultCheckedKeys;
  const that: any = useRef({ currentLine: {} });
  const changeType = useRef('useEffect'); //useEffect\checked\openClose
  const initTreeData = (ress: any, parents: any) => {
    let linshi: any = [];
    const initValue = (res: any, parent: any) => {
      linshi = res.map((item: any) => {
        item.lineOpen = props.disabled ? true : item.lineOpen || false;
        item.checkedNumber = item.checkedNumber || '0';
        item.checkedNumber = propsDefaultCheckedKeys.includes(item.id) ? '1' : '0';

        item.parent = parent;
        if (item.children?.length) {
          initValue(item.children, item);
        }
        return item;
      });
    };
    initValue(ress, parents);
    const initCheckedArray = (res: any) => {
      res.forEach((item: any) => {
        item.childrensLengt = getChildrensLength(item);

        if (item.children?.length) {
          initCheckedArray(item.children);
        }
        return item;
      });
    };
    initCheckedArray(linshi);

    const initCurrentChildrenCheckedArray = (res: any) => {
      res?.forEach((item: any) => {
        item.currentChildrensCheckedArray = getCurrentChildrenCheckedArrayF(item);

        if (item.children?.length) {
          initCurrentChildrenCheckedArray(item.children);
        }
      });
    };
    initCurrentChildrenCheckedArray(linshi);

    //根据选中状态推理出半选状态
    const fun = (passData: any) => {
      for (let index = 0; index < passData.length; index++) {
        let item: any = passData[index];
        if (item.currentChildrensCheckedArray.length) {
          if (item.currentChildrensCheckedArray.length === item.childrensLengt) {
            item.checkedNumber = '1';
            //子级也要全选
            changeChildrenF(item.children, '1');
            continue;
          } else {
            item.checkedNumber = '05';
            if ((item.children?.length === 0 || !item.children) && item.checkedNumber !== '0') {
              item.checkedNumber = '1';
            }
          }
          if (item.children?.length) {
            fun(item.children);
          }
        } else {
          if (item.checkedNumber !== '0') {
            if (item.children?.length) {
              //本身是选中状态 但是子级一个都没选中 说明是本身是半选
              // 预计当时操作为 选中了本级后，将子级逐一取消选中 导致最终只剩下自己一个半选状态
              item.checkedNumber = '05';
            } else {
              //最后一级currentChildrensCheckedArray=[]也没有children 但是自身checkedNumber!==0所以是全选状态
              item.checkedNumber = '1';
            }
          } else {
            item.checkedNumber = '0';
          }
          //子级要全部为0
          changeChildrenF(item.children, '0');

          continue;
        }
      }
      // passData.forEach((item: any) => {
      //   if (item.currentChildrensCheckedArray.length) {
      //     console.log(
      //       item.pathName,
      //       item.childrensLengt,
      //       item.currentChildrensCheckedArray.length
      //     );
      //     if (
      //       item.currentChildrensCheckedArray.length === item.childrensLengt
      //     ) {
      //       item.checkedNumber = "1";
      //     } else {
      //       item.checkedNumber = "05";
      //       if (
      //         (item.children?.length === 0 || !item.children) &&
      //         item.checkedNumber !== "0"
      //       ) {
      //         item.checkedNumber = "1";
      //       }
      //     }
      //     if (item.children?.length) {
      //       fun(item.children);
      //     }
      //   } else {
      //     console.log(
      //       "0",
      //       item.pathName,
      //       item.childrensLengt,
      //       item.currentChildrensCheckedArray.length
      //     );
      //     item.checkedNumber = "0";
      //     // if (item.children?.length === 0 && item.checkedNumber !== "0") {
      //     //   item.checkedNumber = "1";
      //     // }
      //   }
      // });
    };
    fun(linshi);
    // console.log(linshi);
    return linshi;
  };
  //获取当前数据的children中被选中的id集合不含自己
  const getCurrentChildrenCheckedArrayF = (obj: any) => {
    let currentLineArrays: any = [...obj.currentChildrensCheckedArray];
    const initAllChildrenCheckedArray = (res: any) => {
      if (res.children?.length) {
        res.children.forEach((item: any) => {
          currentLineArrays = [...currentLineArrays, ...item.currentChildrensCheckedArray];
          initAllChildrenCheckedArray(item);
        });
      }
    };
    initAllChildrenCheckedArray(obj);
    return Array.from(new Set(currentLineArrays));
  };
  //获取当前数据下一共有多少个children
  const getChildrensLength = (Obj: any) => {
    let finallyNum: number = 0;
    const fun2 = (passObj: any, num: number) => {
      let childrenLen = passObj.children?.length || 0;
      finallyNum += childrenLen;

      let currentChildrensCheckedArray: any[] = Obj.children?.length
        ? Obj.children
            .filter((item: any) => ['05', '1'].includes(item.checkedNumber))
            .map((item: any) => item.id)
        : [];
      // console.log(Obj.pathName, "", currentChildrensCheckedArray);
      Obj.currentChildrensCheckedArray = currentChildrensCheckedArray;

      if (childrenLen > 0) {
        passObj.children.forEach((item: any) => {
          fun2(item, finallyNum);
        });
      }
    };
    fun2(Obj, finallyNum);
    return finallyNum;
  };
  const [treeData, setTreeData] = useState<any>([]);
  //展开合住
  const roleTreeLiJianTouClic = (currentLine: any) => {
    currentLine.lineOpen = !currentLine.lineOpen;
    setTreeData([...treeData]);
  };
  //设置子级跟着自己变化
  const changeChildrenF = (childrens: any = [], checkedNumber: string) => {
    childrens?.forEach((item: any) => {
      item.checkedNumber = checkedNumber;
      if (item.children?.length) {
        changeChildrenF(item.children, checkedNumber);
      }
    });
  };
  //设置父级跟着自己变化
  const changeParentF = (parent: any = [], checkedNumber: string) => {
    //设置父级
    //注意 在权限系统中 子集的取消只会让父级变为半选状态，不能变为取消状态，即使最后一个子集也被取消了父级仍是半选状态
    // (如：发票管理页面下边只有一个导出按钮  当导出按钮被取消选中 发票管理页面应为半选状态：可访问发票管理页面 只是页面中没有导出按钮了)
    // 子集的选中会正常影响父级
    // console.log(checkedNumber, 'checkedNumber');
    let parents: any = parent;

    if (checkedNumber === '0') {
      while (parents) {
        parents.checkedNumber = '05';
        parents = parents.parent;
        // console.log(parents);
      }
    } else if (checkedNumber === '1') {
      while (parents) {
        let checkedNumber05: any =
          parents.children.findIndex((item: any) => item.checkedNumber === '05') > -1;
        let checkedNumber0: any =
          parents.children.findIndex((item: any) => item.checkedNumber === '0') > -1;
        let checkedNumber1: any =
          parents.children.findIndex((item: any) => item.checkedNumber === '1') > -1;
        // console.log({
        //   checkedNumber05,
        //   checkedNumber0,
        //   checkedNumber1,
        //   parents: cloneDeep(parents),
        // });
        if (checkedNumber05 || (checkedNumber1 && checkedNumber0)) {
          parents.checkedNumber = '05';
        } else if (checkedNumber1 && !checkedNumber0) {
          parents.checkedNumber = '1';
        } else if (!checkedNumber1 && checkedNumber0) {
          parents.checkedNumber = '0';
        }
        parents = parents.parent;
        console.log(parents);
      }
    }
  };

  //选中取消选中
  const roleTreeCheckBoxClick = (currentLine: any) => {
    if (currentLine.checkedNumber === '1') {
      currentLine.checkedNumber = '0';
    } else {
      currentLine.checkedNumber = '1';
    }
    changeChildrenF(currentLine.children, currentLine.checkedNumber);
    changeParentF(currentLine.parent, currentLine.checkedNumber);
    setTreeData([...treeData]);
    that.current.currentLine = currentLine;
  };
  const MyTreeComponent = ({ treeData }: any) => {
    return (
      <>
        {treeData?.map((items: any, index: number) => {
          return (
            <ul
              className={`roleTreeUl roleTreeUl${items.lineOpen ? 'Open' : 'Close'}`}
              key={items.id}
            >
              <li
                className="roleTreeLi"
                style={{
                  display: [1, 2].includes(items.type) ? 'block' : 'none',
                }}
              >
                <div>
                  {items.children?.length &&
                  items.children?.filter((i: any) => [1, 2].includes(i.type)).length ? (
                    <i
                      className={`roleTreeLiJianTou roleTreeLiJianTou${
                        items.lineOpen ? 'Open' : 'Close'
                      }`}
                      onClick={() => {
                        changeType.current = 'openClose';
                        roleTreeLiJianTouClic(items);
                      }}
                    ></i>
                  ) : (
                    <i style={{ width: '20px' }}></i>
                  )}
                  <i
                    className={`${props.disabled ? 'disabled pngs' : 'pngs'} png${
                      items.checkedNumber || 0
                    }`}
                    onClick={() => {
                      if (props.disabled) {
                        return;
                      }
                      changeType.current = 'checked';
                      roleTreeCheckBoxClick(items);
                    }}
                  ></i>
                  <span>
                    {/* {items.name}-{items.checkedNumber} */}
                    {items.name}
                  </span>
                </div>
                {items.children?.length ? <MyTreeComponent treeData={items.children} /> : null}
              </li>
            </ul>
          );
        })}
      </>
    );
  };
  useEffect(() => {
    setTreeData(initTreeData(props.treeData, null));
  }, [props.treeData, propsDefaultCheckedKeys]);
  useEffect(() => {
    if (changeType.current === 'checked') {
      let selectedIds: any = [];
      let selectedIdDatas: any[] = [];
      const fun = (passData: any = []) => {
        passData?.forEach((item: any) => {
          if (item.checkedNumber && item.checkedNumber !== '0') {
            selectedIds.push(item.id);
            selectedIdDatas.push(item);
          }
          if (item.children?.length) {
            fun(item.children);
          }
        });
      };
      fun(treeData);
      that.current.selectedIdDatas = selectedIdDatas;
      selectedIds.__proto__.origionData = selectedIdDatas;
      props.onCheck?.(selectedIds, that.current);
    }
  }, [treeData]);
  return (
    <div className="roleTree" key={new Date().getTime()}>
      <MyTreeComponent treeData={[...treeData]} />
    </div>
  );
};
