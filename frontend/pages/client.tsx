import { parseCookies } from 'nookies';
import React from 'react';
import { fetchAPI } from '../lib/api';

const client = ({user}) => {
  return <div>{JSON.stringify(user)}  d</div>;
};

export default client;



export async function getServerSideProps(ctx) {
  const jwt = parseCookies(ctx).jwt

  const user = await fetchAPI("/users/me",{jwt})

  return {
    props: {
      user,
    },
  }
}
