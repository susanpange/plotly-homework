
var dropdownbox = d3.select("#selDataset")

d3.json("samples.json").then((data) => {
    var ids = data.names;
    //console.log(ids);
    ids.forEach(element => {
        dropdownbox.append("option").text(element);
    });
});



function dashboard() {

    var selectedID = dropdownbox.property("value");

    d3.json("samples.json").then((data) => {

        var sample_data_for_selectedID = data.samples.filter(eachdata => eachdata.id == selectedID);
        var demo_info_for_selectedID = data.metadata.filter(eachdata => eachdata.id == selectedID);
        console.log(sample_data_for_selectedID);
        console.log(demo_info_for_selectedID);

        d3.selectAll("ul").remove();
    
    
        //Barchat area
        var bar_y = sample_data_for_selectedID[0].sample_values.slice(0,10).reverse();
        console.log(bar_y);
        var bar_x = sample_data_for_selectedID[0].otu_ids.slice(0,10).map(data => `OTU ${data}`).reverse();
        console.log(bar_x);
        var bar_text = sample_data_for_selectedID[0].otu_labels.slice(0,10).reverse();
        console.log(bar_text);
    
        var trace_bar = {
            x: bar_y,
            y: bar_x,
            text: bar_text,
            type: "bar",
            orientation: "h"
        };
    
        var data_bar = [trace_bar];
    
        var layout_bar = { width: 450, height: 400, margin: { t: 10, b: 0 } };
    
        Plotly.newPlot("bar", data_bar, layout_bar);
    
        
        //Bubble area
        var bubble_x = sample_data_for_selectedID[0].otu_ids;
        var bubble_y = sample_data_for_selectedID[0].sample_values;
        var bubble_text = sample_data_for_selectedID[0].otu_labels;
    
        var trace_bubble = {
            x: bubble_x,
            y: bubble_y,
            mode: "markers",
            marker: {
                color: bubble_x,
                size: bubble_y
            },
            text: bubble_text,
        };
    
        var data_bubble = [trace_bubble];
    
        Plotly.newPlot("bubble", data_bubble);
    
        //Demo info
        var demo_ul = d3.select("#sample-metadata").append("ul");
        demo_ul.append("li").text(`Id: ${demo_info_for_selectedID[0].id}`);
        demo_ul.append("li").text(`ethnicity: ${demo_info_for_selectedID[0].ethnicity}`);
        demo_ul.append("li").text(`gender: ${demo_info_for_selectedID[0].gender}`);
        demo_ul.append("li").text(`age: ${demo_info_for_selectedID[0].age}`);
        demo_ul.append("li").text(`location ${demo_info_for_selectedID[0].location}`);
        demo_ul.append("li").text(`bbtype: ${demo_info_for_selectedID[0].bbtype}`);
        demo_ul.append("li").text(`wfreq: ${demo_info_for_selectedID[0].wfreq}`);
    
        //gauge
        var trace_gauge = {
              domain: { x: [0, 1], y: [0, 1] },
              value: demo_info_for_selectedID[0].wfreq,
              title: { text: "Belly Button Washing Frequency", font: { size: 18 }},
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [0, 9] },
                steps: [
                  { range: [0, 1], color: "lightgray" },
                  { range: [1, 2], color: "lightgray" },
                  { range: [2, 3], color: "lightgray" },
                  { range: [3, 4], color: "lightgray" },
                  { range: [4, 5], color: "lightgray" },
                  { range: [5, 6], color: "lightgray" },
                  { range: [6, 7], color: "lightgray" },
                  { range: [7, 8], color: "lightgray" },
                  { range: [8, 9], color: "lightgray" },
                ]
              }
        };
        
        var data_gauge = [trace_gauge];
        var layout_gauge = { width: 500, height: 300, margin: { t: 150, b: 0 } };
        Plotly.newPlot('gauge', data_gauge, layout_gauge);
    
    
    });
};

dropdownbox.on("change", dashboard);