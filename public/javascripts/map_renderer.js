"use strict"

import { spatialAutocorrelation } from "https://episphere.github.io/spatial-autocorrelation/src/autocorrelation.js"


///attach events to dropdown
///https://stackoverflow.com/questions/55010528/how-to-listen-for-clicks-on-buttons-in-a-bootstrap-drop-down-menu-javascript
Array.from(document.getElementsByName('spaAutoCorr_button')).forEach((element) => {
    element.addEventListener('click', (event) => {
        draw_spatial_auto_correlation_results(base_data, event.target.innerText);
    });
});

// let highlight_keys = []
// let all_radios = Array.from(document.getElementsByName('higlight_checkbox'))
// all_radios.forEach(element => {
//     element.addEventListener('click', (event) => {
//         highlight_keys = radios_checked(all_radios)


//     })
// })
let slider_data = {}
let sliders = Array.from(document.getElementsByName('highlight_slider'))
sliders.forEach(slider => {
    let range
    slider.noUiSlider.on('end', (e) => {
        range = slider.noUiSlider.get()
        slider_data[slider.getAttribute('value')] = range
        console.log(slider_data)
        draw_highlights(slider_data)

    })
})

let highlight_checkboxes = Array.from(document.getElementsByName('higlight_checkbox'))
highlight_checkboxes.forEach(checkbox => {
    let slider = document.getElementById('slider_' + checkbox.value)
    checkbox.addEventListener('click', (e) => {

        if (slider.getAttribute('active') == 'true') {
            let range = slider.noUiSlider.get()
            slider_data[slider.getAttribute('value')] = range
            console.log(slider_data)
            draw_highlights(slider_data)
        }
        if (slider.getAttribute('active') == 'false') {
            delete slider_data[slider.getAttribute('value')]
            console.log(slider_data)
            draw_highlights(slider_data)
        }
    })
})

function radios_checked(all_radios) {
    let checked_keys = []
    all_radios.forEach(radio => {
        if (radio.checked == true) {
            // let slider = document.getElementById("slider_" + radio.value)
            // let range = slider.noUiSlider.get()
            // console.log(range)
            checked_keys.push(radio.value)
        }
    })
    //console.log('checked radios: ', checked_keys)
    return checked_keys
}



console.log("create map...")
// instanciate map
var map = L.map('map').setView([51, 12], 3)

//Baselayers
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var baseMaps = {
    "OSM": osm,
}
//here an layerControl is added to the map
var layerControl = L.control.layers(baseMaps).addTo(map);

if (base_data != undefined) {
    //add Data to map
    console.log(base_data.features[0].geometry)

    var geoJSONFeatureGroup_base_data = L.geoJSON(base_data).addTo(map)
    layerControl.addOverlay(geoJSONFeatureGroup_base_data, "filename")

    let referenceFeature = base_data.features[0]
    let pos = []
    if (referenceFeature.geometry.type == "Polygon") {
        pos = base_data.features[0].geometry.coordinates[0][0]
    }
    if (referenceFeature.geometry.type == "MultiPolygon") {
        pos = base_data.features[0].geometry.coordinates[0][0][0]
    }
    console.log("panning pos", pos)
    map.flyTo([pos[1], pos[0]], 5)
}


async function draw_spatial_auto_correlation_results(base_data, key) {

    //clear map
    map.eachLayer(layer => {
        map.removeLayer(layer)
    })
    osm.addTo(map)
    layerControl.remove()
    layerControl = L.control.layers(baseMaps).addTo(map);
    geoJSONFeatureGroup_base_data = L.geoJSON(base_data).addTo(map)
    layerControl.addOverlay(geoJSONFeatureGroup_base_data, "filename")


    //calculate spatial auto corr
    let results = await calculate_spatial_auto_correlation(base_data, key)
    if (results != undefined) {
        //add results data to origninal data, mapping ids
        for (var i = 0; i < base_data.features.length; i++) {
            var feature = base_data.features[i]
            //console.log("Feature ID: ", feature.id)
            for (var j = 0; j < results.length; j++)
                if (feature.id == results[j].id) {
                    //console.log(results[j].id)
                    feature.properties.spaAutoCorr_results = results[j]

                }
        }

        //define Styles for different results
        var polygonStyle_High_High = {
            "fillColor": "#d7301f", //red
            "opacity": 1,
            "fillOpacity": 1
        }
        var polygonStyle_High_Low = {
            "fillColor": "#fe9929", //orange
            "opacity": 1,
            "fillOpacity": 1,
        }
        var polygonStyle_Low_High = {
            "fillColor": "#2c7fb8", //blue
            "opacity": 1,
            "fillOpacity": 1
        }
        var polygonStyle_Low_Low = {
            "fillColor": "#253494", //dark blue
            "opacity": 1,
            "fillOpacity": 1
        }
        var polygonStyle_not_significant = {
            "fillColor": "#ece2f0", //grey
            "opacity": 1,
            "fillOpacity": 1
        }

        //filter features after results of spatial autto corr and assign a feature group
        var geoJSONFeatureGroup_High_High = L.geoJSON(base_data, {
            style: polygonStyle_High_High,
            filter: function (feature) {
                if (feature.properties.spaAutoCorr_results && feature.properties.spaAutoCorr_results.label === "High-high") return true
            },
            onEachFeature: function (feature, layer) {
                let popup = L.popup()
                    .setContent(
                        "<p>p: " + feature.properties.spaAutoCorr_results.p.toString() + "</p>" +
                        "<p>z: " + feature.properties.spaAutoCorr_results.z.toString() + "</p>"
                    )
                layer.bindPopup(popup)
            }
        }).addTo(map)
        var geoJSONFeatureGroup_High_Low = L.geoJSON(base_data, {
            style: polygonStyle_High_Low,
            filter: function (feature) {
                if (feature.properties.spaAutoCorr_results && feature.properties.spaAutoCorr_results.label === "High-low") return true
            },
            onEachFeature: function (feature, layer) {
                let popup = L.popup()
                    .setContent(
                        "<p>p: " + feature.properties.spaAutoCorr_results.p.toString() + "</p>" +
                        "<p>z: " + feature.properties.spaAutoCorr_results.z.toString() + "</p>"
                    )
                layer.bindPopup(popup)
            }
        }).addTo(map)

        var geoJSONFeatureGroup_Low_High = L.geoJSON(base_data, {
            style: polygonStyle_Low_High,
            filter: function (feature) {
                if (feature.properties.spaAutoCorr_results && feature.properties.spaAutoCorr_results.label === "Low-high") return true
            },
            onEachFeature: function (feature, layer) {
                let popup = L.popup()
                    .setContent(
                        "<p>p: " + feature.properties.spaAutoCorr_results.p.toString() + "</p>" +
                        "<p>z: " + feature.properties.spaAutoCorr_results.z.toString() + "</p>"
                    )
                layer.bindPopup(popup)
            }
        }).addTo(map)
        var geoJSONFeatureGroup_Low_Low = L.geoJSON(base_data, {
            style: polygonStyle_Low_Low,
            filter: function (feature) {
                if (feature.properties.spaAutoCorr_results && feature.properties.spaAutoCorr_results.label === "Low-low") return true
            },
            onEachFeature: function (feature, layer) {
                let popup = L.popup()
                    .setContent(
                        "<p>p: " + feature.properties.spaAutoCorr_results.p.toString() + "</p>" +
                        "<p>z: " + feature.properties.spaAutoCorr_results.z.toString() + "</p>"
                    )
                layer.bindPopup(popup)
            }
        }).addTo(map)
        var geoJSONFeatureGroup_not_significant = L.geoJSON(base_data, {
            style: polygonStyle_not_significant,
            filter: function (feature) {
                if (feature.properties.spaAutoCorr_results && feature.properties.spaAutoCorr_results.label === "Not significant") return true
            },
            onEachFeature: function (feature, layer) {
                let popup = L.popup()
                    .setContent(
                        "<p>p: " + feature.properties.spaAutoCorr_results.p.toString() + "</p>" +
                        "<p>z: " + feature.properties.spaAutoCorr_results.z.toString() + "</p>"
                    )
                layer.bindPopup(popup)
            }
        }).addTo(map)

        //add feautureGroups to layerControl
        layerControl.addOverlay(geoJSONFeatureGroup_High_High, "High-High")
        layerControl.addOverlay(geoJSONFeatureGroup_High_Low, "High-Low")
        layerControl.addOverlay(geoJSONFeatureGroup_Low_High, "Low-High")
        layerControl.addOverlay(geoJSONFeatureGroup_Low_Low, "Low-Low")
        layerControl.addOverlay(geoJSONFeatureGroup_not_significant, "not_significant")
    }
}
function draw_highlights(slider_data) {
    console.log("draw highlight...")
    //clear map
    map.eachLayer(layer => {
        map.removeLayer(layer)
    })
    osm.addTo(map)
    layerControl.remove()
    layerControl = L.control.layers(baseMaps).addTo(map);
    geoJSONFeatureGroup_base_data = L.geoJSON(base_data).addTo(map)
    layerControl.addOverlay(geoJSONFeatureGroup_base_data, "filename")

    var polygonStyle_highlight = {
        "fillColor": "#fe9929", //orange
        "opacity": 1,
        "fillOpacity": 1,
    }
    let length = Object.keys(slider_data).length
    console.log(length)

    let geoJSONFeatureGroup_highlight = L.geoJSON(base_data, {
        style: polygonStyle_highlight,
        onEachFeature: function (feature, layer) {
            let popup_content = ""
            let checkVar = 0
            Object.keys(slider_data).forEach(key => {
                let value = feature.properties[key]
                if(!value){
                    value = "undefined"
                }
                if (feature.properties[key] >= slider_data[key][0] && feature.properties[key] <= slider_data[key][1]) {
                    //console.log(feature.properties[key])
                    //console.log(true)
                    //feature.properties.highlight = true
                    
                }
                else {
                    //console.log(feature.properties[key])
                    //console.log(false)
                    //feature.properties.highlight = false
                    checkVar = + 1
                }
                
                popup_content = popup_content + "<p>" + key.toString() + ": " + value.toString() + "<p>"
            })
            if (checkVar != 0) {
                feature.properties.highlight = false
                
            }
            else{
                feature.properties.highlight = true
                console.log('highlight:', feature)
            }
            let popup = L.popup().setContent(popup_content)
            layer.bindPopup(popup)
        }
    }).addTo(map)

    geoJSONFeatureGroup_highlight.eachLayer(function (layer) {
        const feature = layer.feature;
        if (feature.properties.highlight === true) {
            layer.setStyle({ fillColor: 'yellow' }); // or apply your style for highlighted features
        } else {
            layer.setStyle({ fillColor: 'gray' }); // apply default style
        }
    });

    //console.log(geoJSONFeatureGroup_highlight)
    layerControl.addOverlay(geoJSONFeatureGroup_highlight, "Highlieght")
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function calculate_spatial_auto_correlation(base_data, key) {
    //measuring execution time
    const startTime = performance.now()
    //calculate spatial autocorrelation
    try {
        //throw error
        console.log("calculate Spatial Auto Correlation...")
        //console.log(spatialAutocorrelation)
        //Originaler Testdatensatz der Anwendung funktioniert (siehe github):
        var results = await spatialAutocorrelation(base_data, key, {
            method: 'local_moran_i'
        })
        // var results = spatialAutocorrelation(base_data,keyValue,{
        //     method: "local_moran_i"
        // })
        console.log('spatial auto correlation results of ', key, ': ', results)
        const endTime = performance.now()
        //make results global
        //window.results = results
        console.log('Execution time:', endTime - startTime, ' millisec')
        return results
    }
    catch (err) {
        console.log("something went wrong: ", err)
    }
}

