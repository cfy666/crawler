const Crawler = require('../libs/crawler'),
      { crawler } = require('../config/config');

Crawler({
  url: crawler.url.course,
  callback () {
    const $ = window.$,
          $item = $('.course-tab-filter li');

    const data = [];

    $item.each((index, item) => {
      const $el = $(item),
            $itemLk = $el.find('.course-tab-filter-item'),
            title = $itemLk.text().replace('促', '');

      const dataItem = {
        cid: index,
        title
      }

      data.push(dataItem);
    });

    return data;
  }
})