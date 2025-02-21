'use strict'

//convert base_data.geojson to data_object with just properties
class Data_Point{
    constructor(x,y){
        this.x = x
        this.y = y
    }
}
if(base_data != undefined){
//////////////////////////////////////////////////////////////////////////////////////
//Generate Keyset for properties, first data entry as reference
const keys = Object.keys(base_data.features[0].properties)
console.log("Keys: ", keys)


let properties_data = []
for(var i=0; i<base_data.features.length;i++){
    var property_entry = base_data.features[i].properties
    properties_data.push(property_entry)
}
console.log("dataset: ", properties_data)
/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//calculate dimension of scatterplot matrix
let dimension = 0 

//numerical already defined by UI, take those
let keys_numerical = []
for(var i=0; i<keys.length;i++){
    console.log(properties_data[0][keys[i]])
    if(typeof properties_data[0][keys[i]] == 'number'){
        dimension++
        keys_numerical.push(keys[i])
    }
}
//console.log("Dimension of scatterplot matrix: " + dimension + " x " + dimension)
console.log("Keys for numerical values: ", keys_numerical)
/////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// generate numerical data tuples, also containing undefined values
/////////////////////////////////////////////////////////////////////////////////////
var numerical_data = []



properties_data.forEach(element =>{
    let i = 0
    var numerical_data_entry = new Object
    keys_numerical.forEach(key => {
        if(element[key] != undefined){
            Object.defineProperty(numerical_data_entry,key.toString(),{
                value: element[key]
            })
        }
        else{
            //console.log("missing data at ", element)
        }  
    })
    numerical_data.push(numerical_data_entry)  
})
console.log('numerical data: ', numerical_data)


function hasUndefined(object,keys){
    var check
    keys.forEach(key => {
       check = +object[key] //for c = + undefined => c = undefined, else: c has some value
    })
    if(!check){
        return true
    }
    else{
        return false
    }
}

function createDatasets(data,keys){
    //var datasetsArr = []
    var bin_undefined = []
    var dataObj = new Object
    keys.forEach(key =>{
        var keySet = []
        data.forEach(element =>{
            if(hasUndefined(element,keys)){
                bin_undefined.push(element)
            }
            else{

                keySet.push(element[key])
            }
        })
        //datasetsArr.push(keySet)
        Object.defineProperty(dataObj,key.toString(),{
            value: keySet
        })
        
    })
    return {
        fullData: dataObj,
        undefinedObjects: bin_undefined}
}


//////////////////////////////////////////////////////7
//data (obj) as {prop1: [], prop2[], prop3[].....}
//////////////////////////////////////////////////////

function createDataTuple(obj,keys){
    
    let datasetObj={}
    let ids = []
    for(var i=0;i<keys.length;i++){
        //let result = {label: label, data: []}
        let row1=obj[keys[i]]
        let surlabel1=keys[i]
    
        for(var j=0;j<keys.length;j++){
            let row2=obj[keys[j]]
            let surlabel2=keys[j]
            let label = surlabel1 + " / " + surlabel2
            let result = {label: label, data: []}
            
            for(var z=0;z<row1.length;z++){
                let dataPoint = {x: row1[z], y: row2[z]}
                result.data.push(dataPoint)   
            }
            //console.log(result)
            let id = i.toString() + j.toString()
            ids.push(id)
            Object.defineProperty(datasetObj,id,{
                value: result
            })
        } 
    }
    return {ids: ids, processed_data: datasetObj}
}


const datasets = createDatasets(numerical_data,keys_numerical)
const dataTuples = createDataTuple(datasets.fullData,keys_numerical)
const data_processed = dataTuples.processed_data
const ids = dataTuples.ids
console.log("Datasets: " ,datasets.fullData)
console.log("dataset function: ", data_processed)
console.log(ids)
/////////////////////////////////////////////////////////////////////////////////////////////
// draw charts
/////////////////////////////////////////////////////////////////////////////////////////////

function createChart(datasetObj){
    //console.log("createCharts data:",dataset["00"])
    const ids = datasetObj.ids
    const dataset = datasetObj.processed_data
    ids.forEach(id =>{
        var ctx = document.getElementById(id)
        const data = {
            datasets: [{
                label: dataset[id].label,
                data: dataset[id].data
            }]
        }
        //console.log(ctx)
        
        //console.log(data)
        var scatter = new Chart(ctx, {
            type: 'scatter',
            data: data,
            options:{
                responsive: true,
            }
        })
        //console.log(scatter)
    })
}
createChart(dataTuples)
}