import { useGetUrlParams } from '@src/components/myUses';
import { useEffect } from 'react';
import { AddUserComponent } from './addUser';

export const UserSeeBox = (props: any) => {
  let [searchObj] = useGetUrlParams();
  useEffect(() => {
    console.log(searchObj);
    if (!searchObj.id) {
      props.history.push('/roleManagement');
    }
  }, []);
  return (
    <>
      <AddUserComponent type="see" id={searchObj.id} />
    </>
  );
};
