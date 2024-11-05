export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
    this._id = "";
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobSelector.textContent,
      _id: this._id,
    };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobSelector.textContent = data.job;
    this._id = data._id || this._id;
  }
}
