const pt = require('puppeteer');

module.exports = async function (options) {
  const bs = await pt.launch(),
        pg = await bs.newPage(),
        url = options.url;
    
  await pg.goto(url, {
    waitUntil: 'networkidle2'
  });

  const result = await pg.evaluate(options.callback);

  await bs.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1000)
}