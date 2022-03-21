const fs = require('fs')

fs.readFile('./datasets.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const obj = JSON.parse(data)
  const converted = obj.Datasets.map(dataset => {
    return { id: Object.keys(dataset)[0], data: dataset[Object.keys(dataset)[0]] }
  })
  fs.writeFileSync("dataset_converted.json", JSON.stringify(converted, null, 2))
})

