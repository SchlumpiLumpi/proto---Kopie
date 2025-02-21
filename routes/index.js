"use strict"

var express = require('express');
var router = express.Router();
const fs = require("fs");
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const turf = require("turf");
const math = require("mathjs")
//const simplify = require('simplify-geojson')

// Multer - File Upload
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }) // creates temporary folder for uploaded files


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { base_data: undefined })
});

router.post('/uploadLocalFile', upload.single('file_upload'), (req, res) => {

  try {
    console.log("receiving data...")
    let filename = req.file.originalname
    let filesize_in_KB = req.file.size / 1024
    console.log("Filesize ", Math.round(filesize_in_KB), " KB")

    //test for fileExtension .json || .geojson
    let filenameSplit = filename.split(".")
    //console.log(splitURL)
    let extension = filenameSplit[filenameSplit.length - 1]
    //console.log(extension.toLowerCase())
    if (extension.toLowerCase() !== "json" && extension.toLowerCase() !== "geojson") {
      console.log("file extension has to be .json OR .geojson")
      res.render('index')
    }
    else {
      console.log("received: ", filename)
      let path = req.file.path
      fs.readFile(path, 'utf-8', async function (err, data) {
        if (err) {
          console.log("cannot read file")
          res.render('index')
          throw err;
        }
        const content = data;
        unlinkAsync(path)

        //throws error if file isnt in .json format
        try {
          let base_data
          let dataJSON = JSON.parse(content)

          //simplify geometry of geoJSON for larger files
          if (filesize_in_KB >= 1000) {
            try {
              base_data = turf.simplify(data, 0.1)
              console.log("data simplified")
            }
            catch (err) {
              //base_data = JSON.stringify(dataJSON)
              console.log("error in simplifiying data", err)
            }
          }
          else {
            //console.log("YourData:", dataJSON)
            //console.log(filename + " added to Database: ", dataJSON)
            base_data = await JSON.stringify(dataJSON)
          }
          //console.log("polygon length", base_data.features[0].geometry.length)
          //const result_as_fc = turf.featureCollection(result);

          const keys = Object.keys(dataJSON.features[0].properties)
          // console.log(keys)

          //console.log("keys", keys)
          let keys_numerical = await get_numerical_keys(dataJSON, keys)
          // console.log(keys_numerical)

          let scatter_dataset = await get_scatterplot_dataset(dataJSON, keys_numerical)
          //console.log(scatter_dataset)
          

          let statistics = await get_statistics(scatter_dataset,keys_numerical)
          console.log(statistics)
          res.render('index',
            { base_data: base_data, keys: JSON.stringify(keys), keys_numerical: JSON.stringify(keys_numerical), scatter_dataset: JSON.stringify(scatter_dataset), statistics: JSON.stringify(statistics) })

        }
        catch (error) {
          console.log("something went wrong", error)
          res.render('index')
        }
      });
    }
  }
  catch (error) {
    console.log("form is empty")
    res.render('index')
  }

})
async function get_numerical_keys(dataJSON, keys) {
  let keys_numerical = []
  for (var i = 0; i < keys.length; i++) {
    if (typeof dataJSON.features[0].properties[keys[i]] == 'number') {
      keys_numerical.push(keys[i])
    }
  }
  return keys_numerical
}

async function get_scatterplot_dataset(dataJSON, keys_numerical) {
  let properties_data = await get_properties_data(dataJSON)
  let numerical_data = await get_numerical_data(properties_data, keys_numerical)


  var bin_undefined = []
  var dataObj = Object.create(null)
  
  keys_numerical.forEach(key => {
    var keySet = []
    numerical_data.forEach(element => {
      if (hasUndefined(element, keys_numerical)) {
        bin_undefined.push(element)
      }
      else {

        keySet.push(element[key])
      }
    })
    dataObj[key] = keySet
  })
  
  return {
    fullData: dataObj,
    undefinedObjects: bin_undefined
  }
}

async function get_properties_data(dataJSON) {
  let properties_data = []
  for (var i = 0; i < dataJSON.features.length; i++) {
    var property_entry = dataJSON.features[i].properties
    properties_data.push(property_entry)
  }
  return properties_data
}

async function get_numerical_data(properties_data, keys_numerical) {
  let numerical_data = []

  properties_data.forEach(element => {
    var numerical_data_entry = Object.create(null)
    keys_numerical.forEach(key => {
      if (element[key] != undefined) {
        numerical_data_entry[key] = element[key]
        // console.log('Checking element:', element);
        // console.log('Checking key:', key);
        // console.log('Value:', element[key]);
      }
      else {
        //console.log("missing data at ", element)
      }
    })
    numerical_data.push(numerical_data_entry)
  })
  return numerical_data
}
async function get_statistics(scatter_data,keys){
  const data = scatter_data.fullData
  let statistics = {}
  keys.forEach(key =>{
    statistics[key] = {
      min: math.min(data[key]),
      max: math.max(data[key]),
      mean: math.mean(data[key]),
    }
  })
  
  return statistics
}
function hasUndefined(object, keys) {
  var check
  keys.forEach(key => {
    check = +object[key] //for c = + undefined => c = undefined, else: c has some value
  })
  if (!check) {
    return true
  }
  else {
    return false
  }
}
module.exports = router;
