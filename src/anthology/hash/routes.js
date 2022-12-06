// prettier-ignore
import mac  ,{ frontMatter as meta_mac  } from './mac.mdx';
import sip  ,{ frontMatter as meta_sip  } from './sip.mdx';
import how1 ,{ frontMatter as meta_how1 } from './how-to-securely-store-password-in-db.mdx';

const data = {
  'mac' : { Content: mac , meta: meta_mac },
  'sip' : { Content: sip , meta: meta_sip },

  'how-to-securely-store-password-in-db' : { Content: how1, meta:  meta_how1 },
};

export default data;
