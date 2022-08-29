
class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getAuthHeader() {
    const jwt = localStorage.getItem('jwt');
    return jwt ? { Authorization: `Bearer ${jwt}` } : {};
  }
  getUserInfo() {
    return fetch(this._url +`/users/me`, {
      method: 'GET',
      headers: { ...this._headers, ...this._getAuthHeader() },
    })
    .then(this.checkResult);
  }
  getInitialCards() {
    return fetch(this._url +'/cards', {
      method: 'GET',
      headers: { ...this._headers, ...this._getAuthHeader() },})
    .then(this.checkResult);
  }
  editProfile(data){
    return fetch(this._url +`/users/me`, {
        method: 'PATCH',
        headers: { ...this._headers, ...this._getAuthHeader() },
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      })
    .then(this.checkResult);
  }
  addPlace(data){
    return fetch(this._url +'/cards', {
      method: 'POST',
      headers: { ...this._headers, ...this._getAuthHeader() },
      body: JSON.stringify(data)
    })
    .then(this.checkResult);
  }
  deletePost(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: { ...this._headers, ...this._getAuthHeader() },
    })
    .then(this.checkResult);
  }
  addLike(cardId){
    return fetch(this._url + '/cards/' + cardId+'/likes/', {
      method: 'PUT',
      headers: { ...this._headers, ...this._getAuthHeader() },
    })
    .then(this.checkResult);
  }
  deleteLike(cardId){
    return fetch(this._url + '/cards/' + cardId+ '/likes', {
      method: 'DELETE',
      headers: { ...this._headers, ...this._getAuthHeader() },
    })
    .then(this.checkResult);
  }
  addAvatar(avatar){
    return fetch(this._url +'/users/me/avatar', {
      method: 'PATCH',
      headers: { ...this._headers, ...this._getAuthHeader() },
      body: JSON.stringify(avatar)
    })
    .then(this.checkResult);
  }
  checkResult = res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

export const api = new Api({
  url:'https://api.mesto.IvanSerov.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
  },});
//https://nomoreparties.co/v1/cohort-28 // d0022a9e-a6be-4d9a-ab6e-3949875c7c34