import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import React from 'react';

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

const Users: NextPage = ({ users }: any) => {
  return (
    <main>
      <h1>Fetching Users</h1>
      <ul>
        {users.map((user: IUser) => (
          <Link
            key={user.id}
            href={`/user/${encodeURIComponent(user.id)}`}
            passHref
          >
            <li>{user.name}</li>
          </Link>
        ))}
      </ul>
    </main>
  );
};

// This function gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  // Call an external API endpoint to get users
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  // By returning { props: { users } }, the Users component
  // will receive `users` as a prop at build time
  return {
    props: {
      users,
    },
  };
};


export default Users;
