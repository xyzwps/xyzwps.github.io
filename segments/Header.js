import Link from 'next/link';

function Header() {
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
      <Link href="/volume/math/sum/simple">
        <a>简单和式</a>
      </Link>
    </div>
  );
}

export default Header;
