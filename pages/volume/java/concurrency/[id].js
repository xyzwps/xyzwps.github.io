export default function JavaConcurrencyPage({ id }) {
  return <div>{id}</div>;
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'count-down-latch' } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      id: params.id,
    },
  };
}
