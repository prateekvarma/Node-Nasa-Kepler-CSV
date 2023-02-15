const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('kepler-data.csv')
  .pipe(parse({
    comment: '#',
    columns: true
  }))
  .on('data', (data) => {
    results.push(data);
  })
  .on('error', (err) => {
    console.log('There has been an error: ', err);
  })
  .on('end', () => {
    console.log('Final result: ', results);
    console.log('done.');
  });
