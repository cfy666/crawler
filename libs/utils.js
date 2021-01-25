const cp = require('child_process'),
      { resolve } = require('path'),
      nanoId = require('nanoid'),
      Qiniu = require('qiniu'),

      { qiniu } = require('../config/config')

module.exports = {
  startProcess (options) {
    const script = resolve(__dirname, '../crawlers/' + options.file),
          child = cp.fork(script, []);

    let invoked = false;

    child.on('message', (data) => {
      options.message(data);
    })

    child.on('exit', (code) => {
      if (invoked) {
        return;
      }

      invoked = true;
      options.exit(code);
    })

    child.on('error', (error) => {
      if (invoked) {
        return;
      }

      invoked = true;
      options.error(error);
    })
  },

  //上传七牛
  qiniuUpload (options) {
    const mac = new Qiniu.auth.digest.Mac(qiniu.keys.ak, qiniu.keys.sk),
          conf = new Qiniu.conf.Config(),
          client = new Qiniu.rs.BucketManager(mac, conf),
          key = nanoId() + options.ext;

    return new Promise((resolve, reject) => {
      client.fetch(options.url, options.bucket, key, (error, ret, info) => {
        if (error) {
          reject(error)
        } else {
          if (info.statusCode === 200) {
            resolve({ key });
          } else {
            reject(info);
          }
        }
      })
    })
  }
}