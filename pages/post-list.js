import { doGetAllPost } from '../posts';
import Link from 'next/link';
import PageLayout from '../segments/PageLayout';

export default function PostListPage({ paths }) {
  return (
    <PageLayout>
      <pre>{JSON.stringify(paths, null, '   ')}</pre>
      <ul>
        {paths.map((it) => (
          <li key={it.params.id[0]}>
            <Link href={'/post/' + it.params.id[0]}>
              <a>{it.params.id[0]}</a>
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}

export async function getStaticPaths() {
  return await doGetAllPost();
}

export async function getStaticProps() {
  const { paths } = await doGetAllPost();
  return { props: { paths } };
}
