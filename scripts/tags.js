/* global hexo */

'use strict';

hexo.extend.tag.register(
  'note',
  (args, content) => {
    const className = args.shift();
    let header = '';
    let result = '';

    if (args.length) {
      header += `<strong class="note-title">${args.join(' ')}</strong>`;
    }

    result += `<blockquote class="note ${className}">${header}`;
    result += hexo.render.renderSync({ text: content, engine: 'markdown' });
    result += '</blockquote>';

    return result;
  },
  true
);

hexo.extend.tag.register('bilibili', ([bvid]) => {
  const segments = [
    '<div class="bilibili-container">TODO: 还有点问题',
    `<iframe src="//player.bilibili.com/player.html?bvid=${bvid}"`,
    ' scrolling="no" border="0" frameborder="no" width="800" height="600" allowfullscreen> </iframe>',
    '</div>',
  ];
  return segments.join('');
});
