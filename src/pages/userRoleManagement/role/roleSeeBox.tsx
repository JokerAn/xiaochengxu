import { useGetUrlParams } from '@src/components/myUses';
import { useEffect } from 'react';
import { AddRoleComponent } from './addRole';

export const RoleSeeBox = (props: any) => {
  let [searchObj] = useGetUrlParams();
  useEffect(() => {
    console.log(searchObj);
    if (!searchObj.id) {
      props.history.push('/roleManagement');
    }
  }, []);
  return (
    <>
      <AddRoleComponent type="see" id={searchObj.id} />
    </>
  );
};
