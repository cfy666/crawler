const { startProcess, qiniuUpload } = require('../libs/utils'),
      { addSliderData } = require('../services/Slider'),
      { addAgencyInfo } = require('../services/AgencyInfo'),
      { addRecomCourse } = require('../services/RecomCourse'),
      { addCollection } = require('../services/Collection'),
      { qiniu } = require('../config/config');

class Crawler {
  async crawlSliderData() {
    startProcess({
      path: '../crawlers/slider',
      async message(data) {
        data.map(async item => {
          if (item.imgUrl && !item.img_key) {

            try {
              const imgData = await qiniuUpload({
                url: item.imgUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              })

              if (imgData.key) {
                item.imgKey = imgData.key
              }

              const result = await addSliderData(item);

              if(result) {
                console.log('Data create OK');
              } else {
                console.log('Data create failed');
              }

            } catch (error) {
              console.log(error);
            }
          }

        })
      },
      async exit(code) {
        console.log(code);
      },
      async error(error) {
        console.log(error);
      }
    })
  }

  async crawlAgencyInfo () {
    startProcess({
      path: '../crawlers/agencyInfo',
      async message(data) {
        if(data.logoUrl && !data.logoKey) {

          try {
            const logoData = await qiniuUpload({
              url: data.logoUrl,
              bucket: qiniu.bucket.tximg.bucket_name,
              ext: '.jpg'
            })

            if (logoData.key) {
              data.logoKey = logoData.key;
            }

            const result = await addAgencyInfo(data);

            if(result) {
              console.log('Data create OK');
            }else {
              console.log('Data create failed');
            }

          } catch (error) {
            console.log(error);
          }
        }
      },
      async exit(code) {
        console.log(code);
      },
      async error(error) {
        console.log(error);
      }
    });
  }

  async crawlRecomCourse () {
    startProcess({
      path: '../crawlers/recomCourse',
      async message(data) {
        data.map(async (item) => {
          try {

            if (item.posterUrl && !item.posterKey) {
              const posterData =  await qiniuUpload({
                url: item.posterUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              })

              if (posterData.key) {
                item.posterKey = posterData.key;
              }
            }

            if (item.teacherImg && !item.teacherImgKey) {
              const teacherData = await qiniuUpload({
                url: item.teacherImg,
                bucket: qiniu.bucket.tximg.bucket_name,
                exit: '.jpg'
              });

              if (teacherData.key) {
                item.teacherImgKey = teacherData.key;
              }
            }

            const result = await addRecomCourse(item);

            if(result) {
              console.log('Data create OK');
            }else {
              console.log('Data create failed');
            }

          } catch (error) {
            console.log(error);
          }
        })
      },
      async exit(code) {
        console.log(code);
      },
      async error(error) {
        console.log(error);
      }
    })
  }

  async crawlCollection () {
    startProcess({
      path: '../crawlers/collection',
      async message(data) {
        data.map(async item => {
          if(item.posterUrl && !item.posterKey) {
            try {
              const posterData = await qiniuUpload({
                url: item.posterUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              })

              if (posterData.key) {
                item.posterKey = posterData.key;
              }

              const result = await addCollection(item);

              if(result) {
                console.log('Data create OK');
              } else {
                console.log('Data create failed');
              }

            } catch (error) {
              console.log(error);
            }
          }
        })
      },
      async exit(code) {
        console.log(code);
      },
      async error(error) {
        console.log(error);
      }
    })
  }
}

module.exports = new Crawler();