export const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';

    if (data) xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onload = () => {
      resolve(xhr.response);
    };

    xhr.onerror = () => {
      reject('Algo deu errado...')
    }


    xhr.send(JSON.stringify(data));
  });

  return promise;

}

export const getData = (url) => {
  sendHttpRequest('GET', url).then(responseData => {

    return responseData
  })
}

export const sendData = (method, url, data) => {
  sendHttpRequest(method, url,).then(responseData => { console.log(responseData) }).catch(err => { console.log(err) });
}
