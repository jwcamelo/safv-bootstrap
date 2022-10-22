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


