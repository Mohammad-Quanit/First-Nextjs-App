import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';

const User: NextPage = ({ user }: any) => {
  console.log(user)
  const router: NextRouter = useRouter();
  const { id } = router.query;

  return (
    <div>
      <div>Name: {id}</div>
    </div>
  );
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Call an external API endpoint to get users
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  // Get the paths we want to pre-render based on users
  const paths = users.map((user) => ({
    user: { id: user.id },
  }));
  console.log(paths);
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This also gets called at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params contains the user `id`.
  // If the route is like /users/1, then user.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params?.id}`
  );
  const user = await res.json();

  // Pass user data to the page via props
  return { props: { user } };
};

export default User;
