const SliderModel = require('../db/models/slider');

class SliderService {
  async addSliderData (data) {
    const cid = data.cid;

    const result = await SliderModel.findOne({
      where: { cid }
    });

    if (result) {
      return await SliderModel.update(data, {
        where: { cid }
      });
    } else {
      return await SliderModel.create(data);
    }
  }
}

module.exports = new SliderService();