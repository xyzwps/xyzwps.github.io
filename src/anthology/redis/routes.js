// prettier-ignore
import aof            ,{ frontMatter as meta_aof             } from './aof.mdx';
import durability     ,{ frontMatter as meta_durability      } from './durability.mdx';
import hyperloglog    ,{ frontMatter as meta_hyperloglog     } from './hyperloglog.mdx';
import install        ,{ frontMatter as meta_install         } from './install.mdx';
import persistence    ,{ frontMatter as meta_persistence     } from './persistence.mdx';
import zset           ,{ frontMatter as meta_zset            } from './zset.mdx';
import bitmap         ,{ frontMatter as meta_bitmap          } from './bitmap.mdx';
import geo            ,{ frontMatter as meta_geo             } from './geo.mdx';
import key_and_string ,{ frontMatter as meta_key_and_string  } from './key-and-string.mdx';
import pipeline       ,{ frontMatter as meta_pipeline        } from './pipeline.mdx';
import select         ,{ frontMatter as meta_select          } from './select.mdx';
import blogs          ,{ frontMatter as meta_blogs           } from './blogs.mdx';
import hash           ,{ frontMatter as meta_hash            } from './hash.mdx';
import index          ,{ frontMatter as meta_index           } from './index.mdx';
import list           ,{ frontMatter as meta_list            } from './list.mdx';
import rdb            ,{ frontMatter as meta_rdb             } from './rdb.mdx';
import set            ,{ frontMatter as meta_set             } from './set.mdx';

const data = {
  'aof'              : { Content: aof            , meta: meta_aof            },
  'durability'       : { Content: durability     , meta: meta_durability     },
  'hyperloglog'      : { Content: hyperloglog    , meta: meta_hyperloglog    },
  'install'          : { Content: install        , meta: meta_install        },
  'persistence'      : { Content: persistence    , meta: meta_persistence    },
  'zset'             : { Content: zset           , meta: meta_zset           },
  'bitmap'           : { Content: bitmap         , meta: meta_bitmap         },
  'geo'              : { Content: geo            , meta: meta_geo            },
  'key-and-string'   : { Content: key_and_string , meta: meta_key_and_string },
  'pipeline'         : { Content: pipeline       , meta: meta_pipeline       },
  'select'           : { Content: select         , meta: meta_select         },
  'blogs'            : { Content: blogs          , meta: meta_blogs          },
  'hash'             : { Content: hash           , meta: meta_hash           },
  'index'            : { Content: index          , meta: meta_index          },
  'list'             : { Content: list           , meta: meta_list           },
  'rdb'              : { Content: rdb            , meta: meta_rdb            },
  'set'              : { Content: set            , meta: meta_set            },
};

export default data;
