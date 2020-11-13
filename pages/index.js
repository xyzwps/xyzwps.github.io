import Link from 'next/link';

function HomePage() {
  return (
    <div>
      Welcome to Next.js!
      <br />
      <br />
      <Link href="/volume/story">
        <a>Home</a>
      </Link>
      <br />
      <br />
      <Link href="/tool/datetime">
        <a>Datetime</a>
      </Link>
      <br />
      <br />
      <Link href="/volume/java/concurrency/count-down-latch">
        <a>CountDownLatch</a>
      </Link>
    </div>
  );
}

export default HomePage;
