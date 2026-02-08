import React from 'react';
import useRole from '../hooks/useRole';
import Loading from '../components/shared/loading/Loading';
import { Navigate, Outlet } from 'react-router';

const UserRoute = () => {
  const {role , roleLoading} = useRole();
  if(roleLoading) return <Loading></Loading>
  return role === "user" ? <Outlet></Outlet> : <Navigate to="/"></Navigate>
};

export default UserRoute;