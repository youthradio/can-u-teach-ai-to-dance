const util = require('util')
const exec = require('child_process').exec
const fs = require('fs')
const { csvParse } = require('d3-dsv')
const folder = 'data'

const downloadFile = async (url, fname) => {
  const child = exec(`wget ${url} -O ${folder}/${fname}`, (error, stdout, stderr) => {
    // console.log('stdout: ' + stdout);
    // console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}

const data = csvParse(
  fs.readFileSync('./songs.csv', 'utf-8')
);

const downloadFiles = (data) => {
  data.forEach(e => {
    const artist = e.artistName.trim().replace(/\ /g, '_')
    downloadFile(e.trackPreview, `${artist}.mp3`)
    downloadFile(e.albumImageURL, `${artist}.jpg`)
  })
}

const saveJson = (data) => {
  const newData = data.map(e => {
      delete e['']
      const artist = e.artistName.trim().replace(/\ /g, '_') // make song machine like name
      e.trackFile = `${artist}.mp3` // current song file name
      e.albumImageFile = `${artist}.jpg` // current album file name
      e.id = e.uri.split(':')[2] // spotify ID broke into spotify:track:ID
      return e
  })
  // console.log(newData)
  fs.writeFile(`${folder}/data.json`, JSON.stringify(newData), (err) => {
      if(err) return console.log(err)
  });
}
downloadFiles(data)
saveJson(data)
