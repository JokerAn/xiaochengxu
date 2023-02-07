import { FC, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { KeepAlive, AliveScope, useAliveController } from 'react-activation';

import Navbar from '@src/pages/layout/Navbar';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Link,
  useLocation,
  useParams,
  useNavigate,
} from 'react-router-dom';
import './index.less';
import { Breadcrumb, Button, Input, Layout, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { localRouter } from '@src/utils/publicJson';
import { leftCollapsedR, userInfoF, userInfoR, zhezhaoceng0ShowR } from '@src/store/baseSlice';
import { IconFont } from '@src/App';
import { createParentKey, deepClone, getCookie, getTreeItemByPath } from '@src/utils';
import { gongGaoEnum } from '@src/utils/enumList';

import { useGetUrlParams } from '@src/components/myUses';
// import { RedisComponent } from '../serviceResourcess/redis';
// import { SystemListComponent } from '../system/systemList';
// import { ApplicationListComponent } from '../application/applicationList';
// import { ViewPorts } from '../application/applicationList/viewPorts';
// import { HomeComponent } from '../home';
// import { MysqlComponent } from '../serviceResourcess/Mysql';
// import { DomainNameComponent } from '../serviceResourcess/domainName';
// import { AnalysisDetails } from '../serviceResourcess/domainName/analysisDetails';
// import { EsPageComponent } from '../serviceResourcess/esPage';
// import { MongoDBComponent } from '../serviceResourcess/mongoDB';
// import { CloudHostComponent } from '../serviceResourcess/cloudHost';
// import { CloudDiskComponent } from '../serviceResourcess/cloudDisk';
// import { BareMetalComponent } from '../serviceResourcess/bareMetal';
// import { SubnetComponent } from '../serviceResourcess/subnet';
// import { StorageDetails } from '../serviceResourcess/cloudHost/storageDetails';
// import { ServicesOverview } from '../topNav/servicesOverview';
// import { baseUserInfoAPI } from '@src/apis/publicApis';
import { RoleManagement } from '../userRoleManagement/role';
import { UserManagement } from '../userRoleManagement/user';
import { RoleAddBox } from '../userRoleManagement/role/roleAddBox';
import { RoleEditBox } from '../userRoleManagement/role/roleEditBox';
import { RoleSeeBox } from '../userRoleManagement/role/roleSeeBox';
import { UserAddBox } from '../userRoleManagement/user/userAddBox';
import { UserEditBox } from '../userRoleManagement/user/userEditBox';
import { UserSeeBox } from '../userRoleManagement/user/userSeeBox';
import { ExampleComponent } from '../example';
import { ExamplePageDetails } from '../example/examplePageDetails';
import { RrwebPlayer } from '../rrweb/player';
import { Rrweb } from '../rrweb/rrweb';
// import { ResourcesOccupiedByDepartmentsComponent } from '../resourceUse/resourcesOccupiedByDepartments';
// import { ResourcesOccupancyTrendComponent } from '../resourceUse/resourcesOccupiedByDepartments/resourcesOccupancyTrend';
// import { ExpenseDetailsComponent } from '../resourceUse/resourcesOccupiedByDepartments/expenseDetails';
// import { FixedAssetComponent } from '../topNav/fixedAsset';
// import { NonPublicBoothFeeDetail } from '../resourceUse/resourcesOccupiedByDepartments/nonPublicBoothFeeDetail';
export const JustTestPage: FC = (props: any) => {
  //方便开发环境的一个假页面
  return <div className="pageBottomBox">{props.children || '请联系管理员开通'}</div>;
};
const { Content } = Layout;
const notLeftRouter: any = {
  // '/servicesOverview': <ServicesOverview />, //顶部导航-服务概览
  // '/fixedAsset': <FixedAssetComponent />, //顶部导航-服务概览
};
const pathAndComponent: any = {
  // '路由单词': 组件,
  '/roleManagement': <RoleManagement />, //角色管理
  '/userManagement': <UserManagement />, //用户管理
  '/roleAddBox': <RoleAddBox />, //权限管理-角色管理-新增
  '/roleEditBox': <RoleEditBox />, //权限管理-角色管理-编辑
  '/roleSeeBox': <RoleSeeBox />, //权限管理-角色管理-查看
  '/userAddBox': <UserAddBox />, //权限管理-用户管理-新增
  '/userEditBox': <UserEditBox />, //权限管理-用户管理-编辑
  '/userSeeBox': <UserSeeBox />, //权限管理-用户管理-查看
  '/examplePage': <ExampleComponent />, //快速示例-示例页面
  '/examplePageDetails': <ExamplePageDetails />, //快速示例-示例页面-详情
  '/home': <RrwebPlayer />, //首页
  // '/redis': <RedisComponent />, //服务资源-redis
  // '/mySql': <MysqlComponent />, //服务资源-Mysql
  // '/domainName': <DomainNameComponent />, //服务资源-域名
  // '/analysisDetails': <AnalysisDetails />, //服务资源-域名-解析详情
  // '/esPage': <EsPageComponent />, //服务资源-esPage
  // '/mongoDB': <MongoDBComponent />, //服务资源-mongoDB
  // '/cloudHost': <CloudHostComponent />, //服务资源-云主机
  // '/storageDetails': <StorageDetails />, //服务资源-云主机-储存详情
  // '/cloudDisk': <CloudDiskComponent />, //服务资源-云磁盘
  // '/bareMetal': <BareMetalComponent />, //服务资源-裸金属
  // '/subnet': <SubnetComponent />, //服务资源-子网
  // '/systemList': <SystemListComponent />, //系统-系统列表
  // '/applicationList': <ApplicationListComponent />, //应用-应用列表
  // '/viewPorts': <ViewPorts />, //应用-应用列表-查看端口
  // /* 资源使用 */
  // '/resourcesOccupiedByDepartments': <ResourcesOccupiedByDepartmentsComponent />, //资源使用-部门占用资源
  // '/resourcesOccupancyTrend': <ResourcesOccupancyTrendComponent />, //资源使用-部门占用资源-占用趋势
  // '/expenseDetails': <ExpenseDetailsComponent />, //资源使用-部门占用资源-费用明细
  // '/nonPublicBoothFeeDetail': <NonPublicBoothFeeDetail />, //资源使用-部门占用资源-费用明细-非公摊费用明细
};

export const LayOut: FC = () => {
  const pageThat = useRef<any>({
    ajaxRouter: [],
  });
  const navigator: any = useNavigate();
  const [searchObj] = useGetUrlParams();
  const location: any = useLocation();
  const { pathname } = location;
  const [pathRoute, setPathRoute] = useState<any>([]);
  const needCachePages: any = ['/examplePage'];
  const needCache = (currentPath: string) => {
    return needCachePages.includes(currentPath);
  };
  const getRouteF = (arrays: any) => {
    let pathRoutes: any = [];
    const fun = (passArrays: any) => {
      passArrays.forEach((item: any) => {
        if (item?.path?.startsWith('/')) {
          let linshi = <JustTestPage />;
          if (pathAndComponent[item.path]) {
            if (needCache(item.path)) {
              linshi = (
                <KeepAlive autoFreeze={false} name={item.path} cacheKey={item.path} id={item.path}>
                  {pathAndComponent[item.path]}
                </KeepAlive>
              );
            } else {
              linshi = pathAndComponent[item.path];
            }
          }
          pathRoutes.push(<Route path={item.path} key={item.path} element={linshi} />);
        }
        if (item.children?.length > 0) {
          fun(item.children);
        }
      }, pathRoutes);
    };
    if (arrays.length) {
      fun(arrays);
    } else {
      alert('暂无页面权限请联系管理员开通');
    }
    let firstPathString = '';
    //自动寻找返回值中的第一个可以访问的页面当做默认页面
    const getFirstPath = (passArrays: any) => {
      passArrays.some((item: any) => {
        if (item.type === 2) {
          if (item.children?.length > 0) {
            let pageObjCaidan: any = item.children.filter((item: any) => item.type === 1);
            if (pageObjCaidan.length !== 0) {
              firstPathString = pageObjCaidan[0].path;
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        } else if (item.type === 1) {
          firstPathString = item.path;
          return true;
        } else {
          return false;
        }
      });
    };
    getFirstPath(arrays);
    let notInLeftRouter: any = [];
    for (let key in notLeftRouter) {
      // console.log(key);
      notInLeftRouter.push(<Route path={key} key={key} element={notLeftRouter[key]} />);
    }
    if (pathRoutes.length) {
      return [
        <Route path="*" key={'af89sg8fs'} element={<Navigate to={firstPathString} />}></Route>,
        ...pathRoutes,
        ...notInLeftRouter,
      ];
    }

    return pathRoutes;
  };
  const collapsed: boolean = useSelector(leftCollapsedR);
  const [breadcrumbItems, setBreadcrumbItems] = useState<any>();
  const getTrueName = (routerObj: any) => {
    // console.log(routerObj);
    const pathMapF: any = {
      '/MaintainDetail': () => {
        if (searchObj.type === 'preview') {
          return '查看';
        }
        if (searchObj.type === 'edit') {
          return '编辑';
        } else {
          return '新增';
        }
      },
    };
    if (Object.keys(pathMapF).includes(routerObj.path)) {
      return pathMapF[routerObj.path]();
    } else {
      return routerObj.pathName;
    }
  };
  const [noBreadcrumb, noBreadcrumbSet] = useState<any>([]);

  const [flatRouter, setFlatRouter] = useState<any>([]);
  const getFlatRouter = (res: any = []) => {
    let flatRouter: any[] = [];
    const dg = (passRoute: any = []) => {
      passRoute.forEach((item: any) => {
        if (item.type !== 4) {
          flatRouter.push({ ...item });
        }
        if (item.children?.length) {
          dg(item.children);
        }
      });
    };
    dg(res);
    setFlatRouter(flatRouter);
    return flatRouter;
  };
  const dispatch = useDispatch();
  const getUserInfo = () => {
    setTimeout(() => {
      let data: any = {
        data: {
          menuList: deepClone(localRouter),
        },
      };
      if (data.data) {
        createParentKey(data.data.menuList);
        let menuListNoParetn: any = deepClone(data.data.menuList);
        setParentObj(data.data.menuList, null);
        dispatch(
          userInfoF({
            menuList: menuListNoParetn,
          })
        );
        pageThat.current.ajaxRouter = data.data.menuList;
        getFlatRouter(data.data.menuList);
        setPathRoute(getRouteF(data.data.menuList));
      }
    }, 200);
    /* baseUserInfoAPI()
      .then((result: any) => {
        console.log(result.data);
        dispatch(userInfoF(result.data));
        // if (result.data.status === 1) {
        //   dispatch(userInfoF({}));
        // } else {
        //   console.log('用户权限不是启用状态,只能进入特定页面');
        //   // dispatch(userInfoF(['noRole']));
        // }
      })
      .catch((err: any) => {
        console.log(err);
      }); */
  };
  useEffect(() => {
    if (isInit) {
      isInitSet(false);
    }
    getUserInfo();
  }, []);
  const cachePages: any = {
    '/examplePageDetails': ['/examplePage'],
  };
  const [isInit, isInitSet] = useState<boolean>(true);
  useEffect(() => {
    if (isInit) {
      return;
    }
    let saveCachePages: any = cachePages[pathname];
    if (saveCachePages?.length) {
      setTimeout(() => {
        if (saveCachePages?.length) {
          console.log(getCachingNodes());
          let allCachePages = getCachingNodes();
          allCachePages
            .filter((item: any) => !saveCachePages.includes(item))
            .forEach((item: any) => {
              dropScope(item);
            });
        }
      }, 100);
    }
  }, [pathname]);
  useEffect(() => {
    console.log(1);
    let showBreadcrumb: any = [];
    // console.log('------pathname=', pathname, searchObj);
    const pathSnippets = pathname.split('/').filter((i: any) => i);
    // console.log(pathname, pathSnippets, flatRouter);
    if (pathSnippets.length && flatRouter.length) {
      const menu = flatRouter.filter((item: any) => {
        return pathSnippets.includes(item.path?.slice(1));
      });
      // console.log(menu);
      if (menu.length) {
        showBreadcrumb.push(
          menu[0].type === 1 ? (
            <Breadcrumb.Item key={menu[0].id}>
              <Link to={menu[0].path}>{getTrueName(menu[0])}</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={menu[0].id}>
              <span>{getTrueName(menu[0])}</span>
            </Breadcrumb.Item>
          )
        );
        let menuParent: any = menu[0].parentObj;

        while (menuParent) {
          showBreadcrumb.unshift(
            menuParent.type === 1 ? (
              <Breadcrumb.Item key={menuParent.id}>
                <Link to={menuParent.path}>{getTrueName(menuParent)}</Link>
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item key={menuParent.id}>
                <span>{getTrueName(menuParent)}</span>
              </Breadcrumb.Item>
            )
          );
          menuParent = menuParent.parentObj;
          // console.log(showBreadcrumb);
        }
        // console.log(showBreadcrumb);
      }
    }
    setBreadcrumbItems([...showBreadcrumb]);
  }, [pathname, flatRouter]);
  const setParentObj = (ress: any = [], parents: any) => {
    ress.forEach((item: any) => {
      item.parentObj = parents;
      if (item.children?.length) {
        setParentObj(item.children, item);
      }
    });
  };
  const { dropScope, getCachingNodes, clear } = useAliveController();

  const zhezhaoceng0Show = useSelector(zhezhaoceng0ShowR);

  return (
    <Layout style={{ minHeight: '100vh' }} id="layoutComponent">
      <div style={{ display: 'none' }}></div>
      <Rrweb></Rrweb>
      <Navbar menuList={pageThat.current.ajaxRouter} />
      <div
        className={
          collapsed ? 'box-collapsed box-collapsed-true' : 'box-collapsed box-collapsed-false'
        }
      >
        <Layout
          className={
            collapsed
              ? 'site-layout scroll site-layout-collapsed-true'
              : 'site-layout scroll site-layout-collapsed-false'
          }
          style={{ background: '#F4F7FC' }}
        >
          <div id="topNavbar">
            <div className="mianbaoxie">
              <Breadcrumb
                className="BreadcrumbImportant"
                style={{
                  margin: '16px 0',
                  display: noBreadcrumb.includes(pathname) ? 'none' : 'block',
                }}
                separator={
                  <IconFont
                    style={{ display: 'inline-block', padding: 0 }}
                    type="icon-select_arrow_right"
                  ></IconFont>
                }
              >
                {breadcrumbItems}
              </Breadcrumb>
            </div>
            <ul className="topNavbarIconBox">
              <li onClick={() => {}}>
                <IconFont type="icon-fuwugailan" />
                <span>公告</span>
                <i></i>
              </li>
              <li
                className={pathname === '/servicesOverview' ? 'bold' : ''}
                onClick={() => {
                  navigator('/servicesOverview');
                }}
              >
                <IconFont type="icon-fuwugailan2" />
                <span>服务概览</span>
                <i></i>
              </li>
              <li
                className={pathname === '/fixedAsset' ? 'bold' : pathname}
                onClick={() => {
                  navigator('/fixedAsset');
                }}
              >
                <IconFont type="icon-gudingzichan2" />
                <span>固定资产</span>
              </li>
            </ul>
          </div>
          <Content style={{ margin: '20px 32px' }}>
            <div className="list_product">
              <AliveScope>
                <Routes>{pathRoute}</Routes>
              </AliveScope>
            </div>
          </Content>
        </Layout>
      </div>
      {zhezhaoceng0Show ? <div className="zhezhaoceng0"></div> : null}
    </Layout>
  );
};
