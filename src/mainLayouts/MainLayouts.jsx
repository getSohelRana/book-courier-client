import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/shared/loading/Loading';

const MainLayouts = () => {
  const {state} = useNavigation();
  return (
    <div>
      {state === "loading" ? <Loading></Loading> : <Outlet></Outlet>}
      
    </div>
  );
};

export default MainLayouts;