import { doGetAllPost, doPostByPath } from '../../posts';

export default function PostPage({ id, docInfo }) {
  return (
    <div>
      {id}
      {JSON.stringify(docInfo) || '[]'}
    </div>
  );
}

export async function getStaticPaths() {
  return await doGetAllPost();
}

export async function getStaticProps({ params }) {
  console.log('props: ' + JSON.stringify(params, null, '   '));
  const adocInfo = await doPostByPath(params.id.join('/'));
  console.log(JSON.stringify(adocInfo, null, '----'));
  return {
    props: {
      id: params.id,
      docInfo: adocInfo,
    },
  };
}
