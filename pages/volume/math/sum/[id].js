export default function MathSumPage({ id }) {
  return <div>{id}</div>;
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'simple' } }],
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
