const { startProcess, qiniuUpload } = require('../libs/utils'),
      config = require('../config/config'),
      { addSliderData } = require('../services/Slider'),
      { addAgencyInfo } = require('../services/AgencyInfo');

class Crawler {
  crawlSliderData() {
    startProcess({
      path: '../crawlers/slider',
      async message(data) {
        data.map(async item => {
          if (item.imgUrl && !item.img_key) {
            const qiniu = config.qiniu;

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
          const qiniu = config.qiniu;

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
}

module.exports = new Crawler();