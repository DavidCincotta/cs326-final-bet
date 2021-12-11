import { createTable, postData, authorization, getDate } from './utilities.js';

async function afterLoad () {
  authorization();
  // This means we are viewing the list of resources for the course with "course"
  if (window.location.pathname.split('/')[1] === 'resources') {
    const course = window.location.pathname.split('/')[2];
    document.getElementById('resource btn').addEventListener('click', async () => {
      window.location.pathname = `/addResource/${course}`;
    });
    const resources = await getResources(course);
    const params = [];
    for (const resource of resources) {
      const param = [`<a href="http://${resource.link}" target="_blank">${resource.name}</a>`, `${resource.description}`, `${resource.date}`];
      params.push(param);
    }
    createTable('table-placement', 'new-table', params,
      ['Resource', 'Description', 'Date']);
  } else if (window.location.pathname.split('/')[1] === 'addResource') {
    const course = window.location.pathname.split('/')[2];
    document.getElementById('resource btn').addEventListener('click', async () => {
      const title = document.getElementById('title').value;
      const link = document.getElementById('link').value;
      const desc = document.getElementById('description').value;
      const date = getDate();
      await addResource(title, link, desc, date, course);
      window.location.pathname = `/resources/${course}`;
    });
  }
}

window.addEventListener('load', afterLoad);

// Get the list of resources related to course from the database
async function getResources (course) {
  const resources = await fetch(`/getResources/${course}`);
  const json = await resources.json();
  return json;
}

// Add a new resources pertaining to course to the database
async function addResource (title, link, description, date, course) {
  const body = { title: title, link: link, description: description, date: date };
  await postData(`/addNewResource/${course}`, body);
}
