import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';

import { IUser } from '../users';

const User: NextPage = ({ user }: any) => {
  // const router: NextRouter = useRouter();
  // const { id } = router.query;
  return (
    <div>
      <h1>User {user.id} Details</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get users
  const res: Response = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  const users = await res.json();
  // Get the paths we want to pre-render based on users
  const paths = users.map((user: IUser) => ({
    params: { id: user.id.toString() },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id: string = context?.params?.id as string;
  const res: Response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const user: IUser = await res.json();
  return { props: { user } };
};

export default User;
