//data transfer object
module.exports = class UserDto {
  email;
  id;
  isActivated;
  name;
  periodLength;
  cycleLength;
  periodDates;

  constructor(model) {
    this.email = model.email,
    this.id = model._id,
    this.isActivated = model.isActivated,
    this.name = model.name,
    this.periodLength = {
      average: model.periodLength.average,
      times: model.periodLength.times
    }
    this.cycleLength = model.cycleLength,
    this.periodDates = model.periodDates
  }
}