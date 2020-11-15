import Link from 'next/link';
import Header from './Header';

function PageLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default PageLayout;
