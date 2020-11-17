import { doGetAllPost, doPostByPath } from '../../posts';
import Adoc from '../../components/adoc';
import Toc from '../../components/toc';

export default function PostPage({ id, postInfo }) {
  return (
    <div>
      {id}
      <pre>
        {(() => {
          if (postInfo) {
            const { type, doc } = postInfo;
            switch (type) {
              case 'adoc':
                return <Adoc adocInfo={doc.adocInfo} content={doc.content} />;
              case 'index':
                return <Toc doc={doc} />;
            }
          }
        })()}
      </pre>
    </div>
  );
}

export async function getStaticPaths() {
  return await doGetAllPost();
}

export async function getStaticProps({ params }) {
  const postInfo = await doPostByPath(params.id.join('/'));
  return { props: { id: params.id, postInfo } };
}
