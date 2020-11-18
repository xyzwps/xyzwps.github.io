import Link from 'next/link';

function Header() {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <br />
      <br />
      <Link href="/tool/datetime">
        <a>Datetime</a>
      </Link>
      <br />
      <br />
      <Link href="/post-list">
        <a>Post list</a>
      </Link>
    </div>
  );
}

export default Header;
