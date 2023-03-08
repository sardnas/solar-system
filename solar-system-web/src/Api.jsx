//will get a breed from the webapi based on breed id
export async function GetPlanets() {
  return await fetch(GetBasePath() + '/api/solardata/planets', {
    method: 'GET',
  });
}

//get orbits based on name
export async function GetOrbitsByPlanetName(planetname) {
  return await fetch(
    GetBasePath() + `/api/solardata/orbits?name=${planetname}`
  );
}

const publishedBasePath = 'https://';
//emil 44364
// https://localhost:7087
const localBasePath = 'https://localhost:7087';

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
//
