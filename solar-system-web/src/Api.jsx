//will get a breed from the webapi based on breed id
export async function GetPlanets() {
  return await fetch(GetBasePath() + '/api/solardata/planets', {
    method: 'GET',
  });
}

const publishedBasePath = 'https://';
const localBasePath = 'https://localhost:44364';

let requestBasePath = null;

export function CreateBasePath() {
  requestBasePath = publishedBasePath; //this should be the path to the api when it is published

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    requestBasePath = localBasePath;
  }
}

export function GetBasePath() {
  if (!requestBasePath) {
    CreateBasePath();
  }

  return requestBasePath;
}
