const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] > 1.11
    && planet['koi_prad'] < 1.6; // for a planet to be habitable, the koi_insol shold be between 0.36 & 1.11 & radius ratio shold be less than 1.6
}

fs.createReadStream('kepler-data.csv')
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.log('There has been an error: ', err);
  })
  .on('end', () => {
    console.log(`${habitablePlanets.length} habitable planets found!`);
    console.log('done.');
  });
