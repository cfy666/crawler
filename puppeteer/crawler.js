const pt = require('puppeteer');

; (async () => {
  const bs = await pt.launch(),
    url = 'https://msiwei.ke.qq.com/#category=-1&tab=0',
    pg = await bs.newPage();

  await pg.goto(url, {
    timeout: 30 * 1000,
    waitUntil: 'networkidle2'
  })

  const result = await pg.evaluate(() => {
    const $ = window.$,
      $item = $('.agency-big-banner-ul .agency-big-banner-li');

    let data = [];

    $item.each((index, item) => {
      const el = $(item),
        $elLink = el.find('.js-banner-btnqq');
      const dataItem = {
        cid: $elLink.attr('data-id'),
        href: $elLink.prop('href'),
        imgUrl: $elLink.find('img').prop('src'),
        title: $elLink.prop('title')
      }

      data.push(dataItem);
    })

    return data;
  })


  // 关闭浏览器
  await bs.close();
  //在浏览器关闭后把子进程的消息发送过去
  process.send(result);

  //关闭子进程
  setTimeout(() => {
    process.exit(0);
  })
})();