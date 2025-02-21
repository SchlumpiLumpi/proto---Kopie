'use strict'

if (base_data != undefined) {
    ///get menu elements
    let dropdown = document.getElementById("dropdown_menu")
    let radiobuttons = document.getElementById("checkbox_menu")
    let highlight_menu = document.getElementById("highlight_menu")
    
    
    

    keys_numerical.forEach(key => {
        var label = key.toString()
        var li = document.createElement('li')

        ////////////////////////////////////////
        // create dropdown items for numerical keys --> calc spatial auto corr
        ////////////////////////////////////////
        var button = document.createElement('button')
        button.setAttribute('class', "dropdown-item")
        button.setAttribute('type', "button")
        button.setAttribute('name', 'spaAutoCorr_button')
        button.innerHTML = label

        li.appendChild(button)
        dropdown.appendChild(li)
        ///////////////////////////////////////////////
        //create highlight menu, checkboxes, range , number inputs
        //////////////////////////////////////////////
        
        let highlight_form = document.createElement("div")
        // highlight_form.setAttribute('class', 'input-group')

        //checkbox
        let highlight_radio = document.createElement('input')
        let highlight_label = document.createElement('label')
        highlight_radio.setAttribute('id', 'highlight' + label)
        highlight_radio.setAttribute('class', 'form-check-input my-1')
        highlight_radio.setAttribute('type', 'checkbox')
        highlight_radio.setAttribute('value', label)
        highlight_radio.setAttribute('name','higlight_checkbox')
        highlight_label.setAttribute('class', 'form-check-label')
        highlight_label.setAttribute('for', 'highlight' + label)
        
        highlight_label.innerHTML = label

        highlight_radio.addEventListener('click',(e)=>{
            let slider = document.getElementById('slider_' + label)
            if(highlight_radio.checked){
                slider.noUiSlider.enable()
                slider.setAttribute('active', 'true')
                
            }
            else{
                slider.noUiSlider.disable()
                slider.setAttribute('active', 'false')
            }

        })
        //number input x * std
        // let std_multiplicator = document.createElement('input')
        // std_multiplicator.setAttribute('name', 'multiplicator_' + label)
        // std_multiplicator.setAttribute('class', 'form-control my-1')
        // std_multiplicator.setAttribute('type', 'number')
        // std_multiplicator.setAttribute('value', '1')
        // std_multiplicator.setAttribute('step', '0.1')
        // std_multiplicator.setAttribute('min', '0')
        // std_multiplicator.setAttribute('max', '3')
        // std_multiplicator.setAttribute('disabled', 'true')
        
        //range
        let min = statistics[key].min
        let max = statistics[key].max
        let diff = max - min
        let handle_pos1 = diff*0.25 + min
        let handle_pos2 = max - diff*0.25
        let slider = document.createElement('div')
        slider.setAttribute('id', 'slider_' + label)
        slider.setAttribute('name', 'highlight_slider')
        slider.setAttribute('value', label)
        slider.setAttribute('active', 'false')
        noUiSlider.create(slider,{
            start: [handle_pos1, handle_pos2],
            connect: true,
            //tooltips:false,
            range: {
                'min': [min],
                'max': [max]
            },
        
        })
        slider.noUiSlider.disable()
        slider.noUiSlider.on('slide',(e)=>{
            slider.noUiSlider.updateOptions({
                tooltips: true
            })
        })
        slider.noUiSlider.on('end',(e) =>{
            slider.noUiSlider.updateOptions({
                tooltips: false
            })
        })
        //slider.setAttribute('style', 'display:inline-block; width:150px;height:10px;')
        // let range = document.createElement("input")
        // range.setAttribute('type', 'range')
        // range.setAttribute('class', 'form-range')
        // range.setAttribute('id', 'range_' + label)
        // range.setAttribute('name', 'name_range_' + label)
        // range.setAttribute('disabled', 'true')

        highlight_form.appendChild(highlight_radio)
        highlight_form.appendChild(highlight_label)
        // highlight_form.appendChild(range)
        highlight_form.appendChild(slider)
        // highlight_form.appendChild(std_multiplicator)
        highlight_menu.appendChild(highlight_form)
        //////////////////////
        //jquery slider
        ///////////////////
        
        ///////////////////////////////////////////////
        //create radiobuttons for numerical keys --> draw scatterplot
        //////////////////////////////////////////////
        var formcheck = document.createElement("div")
        formcheck.setAttribute('class', 'form-check')
        var radio = document.createElement('input')
        var radio_label = document.createElement('label')
        radio.setAttribute('id', label)
        radio.setAttribute('class', 'form-check-input')
        radio.setAttribute('type', 'checkbox')
        radio.setAttribute('value', label)
        radio.setAttribute('name','scatterplot_radio')
        radio_label.setAttribute('class', 'form-check-label')
        radio_label.setAttribute('for', label)
        radio_label.innerHTML = label

        formcheck.appendChild(radio)
        formcheck.appendChild(radio_label)
        radiobuttons.appendChild(formcheck)
        
    })

   
}