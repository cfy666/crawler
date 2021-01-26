const router = require('koa-router')(),
      crawlerController = require('../controllers/Crawler');

router.prefix('/crawler');

router.get('/crawl_slider_data', crawlerController.crawlSliderData);
router.get('/crawl_agency_info', crawlerController.crawlAgencyInfo);
router.get('/crawl_recom_course', crawlerController.crawlRecomCourse);
router.get('/crawl_collection', crawlerController.crawlCollection);
router.get('/crawl_teacher', crawlerController.crawlTeacher);
router.get('/crawl_student', crawlerController.crawlStudent);
router.get('/crawl_course_tab', crawlerController.crawlCourseTab);
router.get('/crawl_course', crawlerController.crawlCourse);
router.get('/crawl_aboutus', crawlerController.crawlAboutus);


module.exports = router;
