// prettier-ignore
import mac            ,{ frontMatter as meta_mac             } from './mac.mdx';
import sip            ,{ frontMatter as meta_sip             } from './sip.mdx';

const data = {
  'mac'              : { Content: mac            , meta:  meta_mac           },
  'sip'              : { Content: sip            , meta:  meta_sip           },
};

export default data;
