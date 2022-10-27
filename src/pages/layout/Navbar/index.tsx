import './index.less';
import { useState, useEffect, useRef } from 'react';
import avatarImg from '@src/static/imgs/joy.png';
import bigLogoImg from '@src/static/imgs/bigLogo.png';

import { useNavigate } from 'react-router-dom';
import { Layout, Menu, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeLeftCollapsed, leftCollapsedR, userInfoR } from '@src/store/baseSlice';
import { IconFont } from '@src/App';
import { getParentKey } from '@src/utils';
import { useLeftAsideSizeByResize } from '@src/components/myUses';
const { Sider } = Layout;
interface IProps {
  menuList: any[];
}
const Navbar = (props: IProps) => {
  const { menuList } = props;
  const userInfoObj: any = useSelector(userInfoR);
  let localRouter: any = menuList;
  const { SubMenu } = Menu;
  const [selectedKeys, setSelectedKeys] = useState<any>();
  const [openKey, setOpenKey] = useState(['14']);
  const pageThat = useRef<any>({
    setTimeout1: null,
  });
  let location: any = useLocation();
  const { pathname } = location;
  const [a, b] = useLeftAsideSizeByResize();

  // const [collapsed, setCollapsed] = useState(false);
  const collapsed: boolean = useSelector(leftCollapsedR);
  const navigate = useNavigate();
  const [menuNodes, setMenuNodes] = useState();

  const getMenuNodes: any = (routeArray: any) => {
    // 类型（1：菜单，2：菜单组，3：隐藏菜单，4：按钮）、

    return routeArray.map((item: any) => {
      let params: any = {
        key: item.id,
      };

      if (item.type === 2) {
        return (
          <SubMenu key={item.id} icon={<IconFont type={item.icon} />} title={item.pathName}>
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      } else if (item.type === 1) {
        if (item.icon && ['/home', '/about'].includes(item.path)) {
          params.icon = <IconFont type={item.icon} />;
        }
        return (
          <Menu.Item {...params} mypath={item.path}>
            {item.pathName}
          </Menu.Item>
        );
      } else {
        return null;
      }
    });
  };
  const getRightCurrentRouter = () => {
    let currentPage: any = getParentKey(pathname, localRouter, 'path');
    console.log(currentPage);
    if (currentPage) {
      // console.log('================');
      setSelectedKeys(currentPage.type === 1 ? currentPage.id + '' : currentPage.pid + '');
      //判断如果是收起状态则无需展开
      // message.info(collapsed ? '目前是收起状态' : '目前是展开状态');
      if (collapsed) {
        setOpenKey([]);
      } else {
        setOpenKey(currentPage.parentKey.split(','));
      }
    }
  };
  useEffect(() => {
    // console.log('localRouter', localRouter);
    // console.log({ 'getMenuNodes(localRouter)': getMenuNodes(localRouter) });
    setMenuNodes(getMenuNodes(localRouter));
    // console.log(pathname);
    getRightCurrentRouter();
  }, [pathname, menuList]);
  useEffect(() => {
    getRightCurrentRouter();
  }, [collapsed]);

  const signOut = () => {
    window.location.href = '/base/logout';
  };
  const dispatch = useDispatch();
  const collapsedChange = (res: boolean) => {
    if (pageThat.current.setTimeout1) {
      clearTimeout(pageThat.current.setTimeout1);
    }
    sessionStorage.LockLeftCollapsed = 'lock';
    pageThat.current.setTimeout1 = setTimeout(() => {
      sessionStorage.LockLeftCollapsed = '';
    }, 500);
    dispatch(changeLeftCollapsed(res));
  };
  const menuItemClick = ({ item, key, keyPath, domEvent }: any) => {
    console.log({ item, key, keyPath, domEvent });
    navigate(`${item.props.mypath}`);
    setOpenKey(keyPath);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width="256px" className="slider scroll">
      <div className="sider-menu-wrap">
        <div className={collapsed ? 'logo-wrap closed' : 'logo-wrap'}>
          <img
            src={bigLogoImg}
            alt="公司logo"
            style={{
              width: '132px',
              height: '32px',
              display: collapsed ? 'none' : '',
            }}
          />
          <div className="change">
            {collapsed ? (
              <IconFont
                className="fs24 collapsed"
                type="icon-zhankai"
                onClick={() => {
                  // setCollapsed(!collapsed);
                  collapsedChange(!collapsed);
                }}
              />
            ) : (
              <IconFont
                className="fs24 collapsed"
                type="icon-shouqi"
                onClick={() => {
                  // setCollapsed(!collapsed);
                  collapsedChange(!collapsed);
                }}
              />
            )}
          </div>
        </div>
        <Menu
          subMenuCloseDelay={0.03}
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKey}
          onOpenChange={(key) => {
            setOpenKey(key);
          }}
          onClick={menuItemClick}
        >
          {menuNodes}
        </Menu>
        {/* <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={selectedMenu}
          selectedKeys={selectedMenu}
          onClick={menuClick}
          openKeys={openSubKeys}
          onOpenChange={onOpenChange}
        >
          {menus.map((item, index) =>
            item.children?.length ? (
              <Menu.SubMenu
                key={item.path}
                title={item.pathName}
                icon={item.icon && IconFn({ componentName: item.icon })}
              >
                {item.children.map((sub: any) => (
                  <Menu.Item key={sub.path}>{sub.pathName}</Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.path} icon={item.icon && IconFn({ componentName: item.icon })}>
                {item.pathName}
              </Menu.Item>
            )
          )}
        </Menu> */}
      </div>

      <div className="v-user-control ">
        <img className="v-user-icon" src={avatarImg} />
        <div className="v-user-name" onClick={(e) => e.preventDefault()}>
          {userInfoObj?.userName}
        </div>
        <IconFont
          title="退出"
          type="icon-exit1"
          onClick={signOut}
          className="v-user-signout fs24"
        />
      </div>
    </Sider>
  );
};

export default Navbar;
