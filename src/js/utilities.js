'use strict';

export function createTable (position, id, inputList, headers) {
  const tbl = document.createElement('table');
  tbl.setAttribute('id', id);
  tbl.classList.add('table');

  const thd = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headers.forEach((h) => {
    const headerItem = document.createElement('th');
    headerItem.setAttribute('scope', 'col');
    headerItem.innerHTML = h;
    headerRow.appendChild(headerItem);
  });
  thd.appendChild(headerRow);
  tbl.appendChild(thd);

  const tbody = document.createElement('tbody');
  console.log(inputList);
  inputList.forEach((row) => {
    const trow = document.createElement('tr');
    row.forEach((col) => {
      const tcol = document.createElement('th');
      tcol.innerHTML = col;
      trow.appendChild(tcol);
    });
    tbody.appendChild(trow);
  });
  tbl.appendChild(tbody);
  document.getElementById(position).innerHTML = '';
  document.getElementById(position).appendChild(tbl);
}
// Posts data to the server
export async function postData (url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}
// Checks cookie on user to see if it matches, otherwise returns user back to login page
export function authorization () {
  const cookie = document.cookie.split(':')[1];
  if (cookie === undefined || cookie.length !== 23 || cookie === null) {
    document.location.href = '/login';
  }
}
// Get current date for forum and resources
export function getDate () {
  const currentDate = new Date();
  const minutes = (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();
  const seconds = (currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds();
  const ending = currentDate.getHours() >= 12 ? 'PM' : 'AM';
  const date = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours() % 12}:${minutes}:${seconds} ${ending}`;
  return date;
}
