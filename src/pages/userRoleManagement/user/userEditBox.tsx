import { useGetUrlParams } from '@src/components/myUses';
import { useEffect } from 'react';
import { AddUserComponent } from './addUser';

export const UserEditBox = (props: any) => {
  let [searchObj] = useGetUrlParams();
  useEffect(() => {
    console.log(searchObj);
    if (!searchObj.id) {
      props.history.push('/roleManagement');
    }
  }, []);
  return (
    <>
      <AddUserComponent type="edit" id={searchObj.id} />
    </>
  );
};
