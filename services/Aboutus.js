const AboutusModel = require('../db/models/aboutus');

class AboutService {
  async addAboutus (data) {
    const aid = data.aid;

    const result = await AboutusModel.findOne({
      where: { aid }
    });

    if (result) {
      return await AboutusModel.update(data, {
        where: { aid }
      });
    } else {
      return await AboutusModel.create(data);
    }
  }
}

module.exports = new AboutService();