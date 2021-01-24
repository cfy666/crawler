const router = require('koa-router')(),
      crawlerController = require('../controllers/Crawler');

router.prefix('/crawler');

router.get('/crawl_slider_data', crawlerController.crawlSliderData);
router.get('/crawl_agency_info', crawlerController.crawlAgencyInfo);


module.exports = router;
