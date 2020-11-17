import { doGetAllPost } from '../../posts';

export default function PostPage({ id, content }) {
  return (
    <div>
      {id}
      {content || '[]'}
    </div>
  );
}

export async function getStaticPaths() {
  return await doGetAllPost();
}

export async function getStaticProps({ params }) {
  console.log('props: ' + JSON.stringify(params, null, '   '));
  return {
    props: {
      id: params.id,
    },
  };
}
