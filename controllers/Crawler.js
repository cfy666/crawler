const { startProcess, qiniuUpload } = require('../libs/utils'),
      { addSliderData } = require('../services/Slider'),
      { addAgencyInfo } = require('../services/AgencyInfo'),
      { addRecomCourse } = require('../services/RecomCourse'),
      { addCollection } = require('../services/Collection'),
      { addTeacher } = require('../services/Teacher'),
      { addStudentData } = require('../services/Student'),
      { addCourseTab } = require('../services/CourseTab'),
      { addCourseData } = require('../services/Course'),
      { addAboutus } = require('../services/Aboutus'),
      { qiniu } = require('../config/config');

class Crawler {
  async crawlSliderData() {
    startProcess({
      file: 'slider',
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
      file: 'agencyInfo',
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

  async crawlAboutus () {
    startProcess({
      file: 'aboutus',
      async message(data) {
        if(data.posterUrl && !data.posterKey) {
    
          try {
            const posterData = await qiniuUpload({
              url: data.posterUrl,
              bucket: qiniu.bucket.tximg.bucket_name,
              ext: '.jpg'
            })

            if (posterData.key) {
              data.posterKey = posterData.key;
            }

            const result = await addAboutus(data);

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
      file: 'recomCourse',
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
      file: 'collection',
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

  async crawlTeacher () {
    startProcess({
      file: 'teacher',
      async message(data) {
        data.map(async item => {
          if (item.teacherImg && !item.teacherImgKey) {

            try {
              const imgData = await qiniuUpload({
                url: item.teacherImg,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              })

              if (imgData.key) {
                item.teacherImgKey = imgData.key;
              }

              const result = await addTeacher(item);

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

  async crawlStudent () {
    startProcess({
      file: 'student',
      async message(data) {
        data.map(async item => {
          if (item.studentImg && !item.studentImgKey) {

            try {
              const imgData = await qiniuUpload({
                url: item.studentImg,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              })

              if (imgData.key) {
                item.studentImgKey = imgData.key
              }

              const result = await addStudentData(item);

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

  async crawlCourseTab () {
    startProcess({
      file: 'courseTab',
      async message(data) {
        data.map(async item => {
          const result = await addCourseTab(item);

          if(result) {
            console.log('Data create OK');
          } else {
            console.log('Data create failed');
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

  async crawlCourse () {
    startProcess({
      file: 'course',
      async message(data) {
        data.map(async item => {
          if (item.posterUrl && !item.posterKey) {

            try {
              const posterData = await qiniuUpload({
                url: item.posterUrl,
                bucket: qiniu.bucket.tximg.bucket_name,
                ext: '.jpg'
              })

              if (posterData.key) {
                item.posterKey = posterData.key
              }

              const result = await addCourseData(item);

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