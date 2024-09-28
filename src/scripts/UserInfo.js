export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobSelector = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobSelector.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
