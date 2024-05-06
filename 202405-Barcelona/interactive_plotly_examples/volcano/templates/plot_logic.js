// Returns the keys of the contrasts
function getContrastKeys(projectData){
    var dataKeys = Object.keys(projectData);
    return(dataKeys)
}
const contrastKeys = getContrastKeys(projectData);

// Prepare data for plotting
function prepareData(projectData, contrastKeys){
    var dataForPlotting = {};

    // Iterate over contrasts
    contrastKeys.forEach(function(contrastKey, contrIdx){
      var merged_prot_gene_names = projectData[contrastKey]["merged_prot_gene_names"];
      var logFcRaw = projectData[contrastKey]["logFc"];
      var missVal = projectData[contrastKey]["missVal"];
      var missCondVal = projectData[contrastKey]["missCondVal"];
      var pValRaw = projectData[contrastKey]["pVal"];
      var adjPValRaw = projectData[contrastKey]["adjPVal"];
      var contrastMaxScoreRaw = projectData[contrastKey]["contrast_max_score_data"];
      var contrastScoreDiffRaw = projectData[contrastKey]["contrast_score_diff_data"];

      // Rounds value if it is not "NA"
      var numDecimals = 4;
      var multiplyerRound = Math.pow(10, numDecimals);
      
      var logFc = logFcRaw.map(x => (x == "NA") ? "NA" : Math.round((Number(x) + Number.EPSILON) * multiplyerRound) / multiplyerRound);
      var pVal = pValRaw.map(x => (x == "NA") ? "NA" : Math.round((-Math.log10(Number(x)) + Number.EPSILON) * multiplyerRound) / multiplyerRound);
      var adjPVal = adjPValRaw.map(x => (x == "NA") ? "NA" : Math.round((-Math.log10(Number(x)) + Number.EPSILON) * multiplyerRound) / multiplyerRound);
      var contrastMaxScore = contrastMaxScoreRaw.map(x => (x == "NA") ? "NA" : Math.round((Number(x) + Number.EPSILON) * multiplyerRound) / multiplyerRound);
      // the score differences can range from -1 to 1, the coloring accepts no negativevalues so 1 is added to get a scale from 0 to 2
      var contrastScoreDiffScaled = contrastScoreDiffRaw.map(x => (x == "NA") ? "NA" : 1+ Math.round((Number(x) + Number.EPSILON) * multiplyerRound) / multiplyerRound);

      var contrastData = {"merged_prot_gene_names": merged_prot_gene_names,
                      "logFc":logFc,
                      "missVal":missVal,
                      "missCondVal":missCondVal,
                      "pVal": pVal,
                      "adjPVal": adjPVal,
                      "contrastMaxScore":contrastMaxScore,
                      "contrastScoreDiffScaled":contrastScoreDiffScaled
                  };

      dataForPlotting[contrastKey] = contrastData;
    });
    return(dataForPlotting)
}
const dataForPlotting = prepareData(projectData, contrastKeys);

// Creates the dropdown entries based on the sample data keys (sample names)
function getDropDownList(contrastKeys, dodropdownIds) {

    // Adds entry for each of the dropdown menues
    dodropdownIds.forEach(function (dropId, index){

        var dropdown = document.getElementById(dropId);

        // Adds option for each sample
        contrastKeys.forEach(function (dataKey, index){
            var opt = document.createElement("option"); 
            opt.text = dataKey;
            opt.value = dataKey;
            dropdown.options.add(opt);
        });
    });
};
getDropDownList(contrastKeys, ["sel-contrast"]);

function scale_for_display_setup(array_to_scale, min_setup_val, max_setup_val){
    var array_max = Math.max(...array_to_scale.filter(Number) );
    var array_min = Math.min(...array_to_scale.filter(Number) );

    // Default setup if there is only one element of a given array
    var array_for_display_setup = max_setup_val;

    // Assing values for multiple non empty array elements
    if(array_to_scale.filter(Number).length > 1){
        var array_scaled_0_to_1 = array_to_scale.map(x => (x-array_min)/(array_max - array_min) );
        array_for_display_setup = array_scaled_0_to_1.map(x => min_setup_val + (x * (max_setup_val-min_setup_val) )  );
    }
    
    return(array_for_display_setup)
};

function create_trace_for_selected_data(selContr){
    var contrastData = dataForPlotting[selContr];

    let has_score = !contrastData.contrastMaxScore.every( function(el) {return el == ''});
    console.log(has_score)
    let showLables = document.getElementById('showChangedNames').checked;

    // p-value selection
    let sel_p_val = document.getElementById('pVal').checked;
    let sel_adj_p_val = document.getElementById('adjPVal').checked;

    var mainTrace = {"merged_prot_gene_names": [],
                      "logFc": [],
                      "missVal": [],
                      "missCondVal": [],
                      "pVal": [],
                      "adjPVal": [],
                      "contrastMaxScore": [],
                      "contrastScoreDiffScaled": []
                  };
    var missTrace = {"merged_prot_gene_names": [],
                      "logFc": [],
                      "missVal": [],
                      "missCondVal": [],
                      "pVal": [],
                      "adjPVal": [],
                      "contrastMaxScore": [],
                      "contrastScoreDiffScaled": []
                  };
    var condMissTrace = {"merged_prot_gene_names": [],
                      "logFc": [],
                      "missVal": [],
                      "missCondVal": [],
                      "pVal": [],
                      "adjPVal": [],
                      "contrastMaxScore": [],
                      "contrastScoreDiffScaled": []
                  };

    contrastData["missVal"].forEach(function (isMissVal, i){
      var isCondMissVal = contrastData["missCondVal"][i] == '+'

      if(isMissVal == ''){
        mainTrace['merged_prot_gene_names'][i] = contrastData['merged_prot_gene_names'][i]
        mainTrace['logFc'][i] = contrastData['logFc'][i]
        mainTrace['missVal'][i] = contrastData['missVal'][i]
        mainTrace['missCondVal'][i] = contrastData['missCondVal'][i]
        mainTrace['pVal'][i] = contrastData['pVal'][i]
        mainTrace['adjPVal'][i] = contrastData['adjPVal'][i]
        mainTrace["contrastMaxScore"][i] = contrastData['contrastMaxScore'][i]
        mainTrace["contrastScoreDiffScaled"][i] = contrastData['contrastScoreDiffScaled'][i]

      } else {

        if(isCondMissVal){
          condMissTrace['merged_prot_gene_names'][i] = contrastData['merged_prot_gene_names'][i]
          condMissTrace['logFc'][i] = contrastData['logFc'][i]
          condMissTrace['missVal'][i] = contrastData['missVal'][i]
          condMissTrace['missCondVal'][i] = contrastData['missCondVal'][i]
          condMissTrace['pVal'][i] = contrastData['pVal'][i]
          condMissTrace['adjPVal'][i] = contrastData['adjPVal'][i]
          condMissTrace["contrastMaxScore"][i] = contrastData['contrastMaxScore'][i]
          condMissTrace["contrastScoreDiffScaled"][i] = contrastData['contrastScoreDiffScaled'][i]

        } else {
          missTrace['merged_prot_gene_names'][i] = contrastData['merged_prot_gene_names'][i]
          missTrace['logFc'][i] = contrastData['logFc'][i]
          missTrace['missVal'][i] = contrastData['missVal'][i]
          missTrace['missCondVal'][i] = contrastData['missCondVal'][i]
          missTrace['pVal'][i] = contrastData['pVal'][i]
          missTrace['adjPVal'][i] = contrastData['adjPVal'][i]
          missTrace["contrastMaxScore"][i] = contrastData['contrastMaxScore'][i]
          missTrace["contrastScoreDiffScaled"][i] = contrastData['contrastScoreDiffScaled'][i]
        }
      }
    });

    var symbol_size = 13;
    var color_scale_max = 1;
    var color_scale_min = 0;

    var contrastTarceMain = {
      x: mainTrace["logFc"],
      // currently only 2 options here only one needs to be tested
      y: sel_p_val ? mainTrace["pVal"] :  mainTrace["adjPVal"],
      mode: showLables ? 'markers+text' : 'markers',
      type: 'scatter',
      name: 'All values present',
      text: contrastData["merged_prot_gene_names"],
      hovertemplate:    has_score ? 'Name: %{text}<br>' +
                        'x-value: %{x}<br>' +
                        'y-value: %{y}<br>' +
                        'Score: %{marker.color}' :
                        'Name: %{text}<br>' +
                        'x-value: %{x}<br>' +
                        'y-value: %{y}',
      textposition: 'bottom',
      textfont: {
        family: 'sans serif',
        size: 12,
        color: "rgba(0,0,0, 1)"
      },
      showlegend: true,
      marker: has_score ? {
        symbol: "circle",
        size: scale_for_display_setup(mainTrace["contrastScoreDiffScaled"],symbol_size,symbol_size),
        sizemode: 'diameter',
        color: mainTrace["contrastMaxScore"],
        cmax: color_scale_max,
        cmin: color_scale_min,
        colorscale: 'Viridis',
        showscale: false
      } : {
        symbol: "circle",
        size: 9,
        sizemode: 'diameter',
        color: "rgba(127,127,127, 0.6)",
        showscale: false
      }
    };

    var contrastTarceMissing = {
      x: missTrace["logFc"],
      // currently only 2 options here only one needs to be tested
      y:  sel_p_val ? missTrace["pVal"] :  missTrace["adjPVal"],
      mode: showLables ? 'markers+text' : 'markers',
      type: 'scatter',
      name: 'Has missing/imputed values',
      //line: {color: "rgba(255,127,80, 0.6)",},
      text: contrastData["merged_prot_gene_names"],
      hovertemplate:    has_score ? 'Name: %{text}<br>' +
                        'x-value: %{x}<br>' +
                        'y-value: %{y}<br>' +
                        'Score: %{marker.color}' :
                        'Name: %{text}<br>' +
                        'x-value: %{x}<br>' +
                        'y-value: %{y}',
      textposition: 'bottom',
      textfont: {
        family: 'sans serif',
        size: 12,
        color: "rgba(0,0,0, 1)"
      },
      showlegend: true,
      marker: has_score ? {
        symbol: "square",
        size: scale_for_display_setup(missTrace["contrastScoreDiffScaled"],symbol_size,symbol_size),
        sizemode: 'diameter',
        color: missTrace["contrastMaxScore"],
        cmax: color_scale_max,
        cmin: color_scale_min,
        colorscale: 'Viridis',
        showscale: false
      } : {
        symbol: "square",
        size: 9,
        sizemode: 'diameter',
        color: "rgba(255,127,80, 0.6)",
        showscale: false
      }
    };


    var contrastTarceCondMissing = {
      x: condMissTrace["logFc"],
      // currently only 2 options here only one needs to be tested
      y:  sel_p_val ? condMissTrace["pVal"] :  condMissTrace["adjPVal"],
      mode: showLables ? 'markers+text' : 'markers',
      type: 'scatter',
      name: 'All missing/imputed in one condition',
      //line: {color: "rgba(229,36,120, 0.6)",},
      text: contrastData["merged_prot_gene_names"],
      hovertemplate:    has_score ? 'Name: %{text}<br>' +
                        'x-value: %{x}<br>' +
                        'y-value: %{y}<br>' +
                        'Score: %{marker.color}' :
                        'Name: %{text}<br>' +
                        'x-value: %{x}<br>' +
                        'y-value: %{y}',
      textposition: 'bottom',
      textfont: {
        family: 'sans serif',
        size: 12,
        color: "rgba(0,0,0, 1)"
      },
      showlegend: true,
      marker: has_score ? {
        symbol: "diamond",
        size: scale_for_display_setup(condMissTrace["contrastScoreDiffScaled"],symbol_size,symbol_size),
        sizemode: 'diameter',
        color: condMissTrace["contrastMaxScore"],
        colorscale: 'Viridis',
        cmax: color_scale_max,
        cmin: color_scale_min,
        showscale: false
      } : {
        symbol: "diamond",
        size: 9,
        sizemode: 'diameter',
        color: "rgba(229,36,120, 0.6)",
        showscale: false
      }
    };

    var color_scale_trace = {
        x: [null],
        y: [null],
        type: 'scatter',
        showlegend: false,
        marker: {
            cmax: color_scale_max,
            cmin: color_scale_min,
            colorscale: 'Viridis',
            showscale: true,
            colorbar: {
                len: 0.7,
                title: "Contrast Max Quality Score",
                tickmode: "array",
                tickvals: [0, 0.25, 0.5, 0.75, 1],
                ticktext: ["0", "0.25", "0.5", "0.75", "1"]
             }
       }
    };

    var tracesToPlot = [contrastTarceMain, contrastTarceMissing, contrastTarceCondMissing, has_score ? color_scale_trace : []];

    return(tracesToPlot);
};

var hoverButton = document.getElementById('hoverbutton')
hoverButton.addEventListener('click', function(){

    //document.getElementsByClassName('text')[0].__data__[0].tx
    var plotObjectTexts = Array.from(document.getElementsByClassName('text'));
    var hasTextelements = plotObjectTexts.length > 0;
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();
    var hasSearchTerm = searchTerm !== "";
    // Tests if there are any hover able text elements and the search is not empty
    if(hasTextelements & hasSearchTerm){
        var toTriggerHover = [];
        plotObjectTexts.forEach(function (trace, i){
            Array.from(trace.__data__).forEach(function (dataPoint, j){
                var dataPointText = dataPoint.tx;
                var isStringType = typeof dataPointText == "string";
                if(isStringType){
                    var foundMatch = dataPointText.toLowerCase().includes(searchTerm);
                    if(foundMatch){
                        toTriggerHover.push({curveNumber:i, pointNumber:j});
                    }
                }
            });
        });
        Plotly.Fx.hover('myDiv',toTriggerHover);
    }
});

function create_plot_with_selected_samples() {
    let selContr = document.getElementById('sel-contrast');
    var selContrVal = selContr.value
    var selLogFc = dataForPlotting[selContrVal]['logFc']

    // p-value selection
    let sel_p_val = document.getElementById('pVal').checked;
    let sel_adj_p_val = document.getElementById('adjPVal').checked;

    var xMaxLimit = Math.max.apply(null, selLogFc.filter(logFcVal => logFcVal != "NA" )) * 1.05;
    var xMinLimit = Math.min.apply(null, selLogFc.filter(logFcVal => logFcVal != "NA" )) * 1.05;
    
    // Since thee are only two options only one needs to be evaluated
    var selPVals = sel_p_val ? dataForPlotting[selContrVal]['pVal'] : dataForPlotting[selContrVal]['adjPVal'];
    var yMaxLimit = Math.max.apply(null, selPVals.filter(pVal => selPVals != "NA" )) * 1.05;
    var yMinLimit = 0;
    
    // Checks if contrast has been selected
    if(selContrVal != ''){
        var plotTitle = 'Volcano ' + selContrVal;

        var tracesToPlot = create_trace_for_selected_data(selContrVal);

        // Plot main traces
        var data = tracesToPlot;

        var layout = {
            xaxis: {
                title: "log2 fold change",
                range: [ xMinLimit, xMaxLimit ]
            },
            yaxis: {
                title: sel_p_val ? "-log10 p-value" : "-log10 adjusted p-value",
                range: [ yMinLimit, yMaxLimit ]
            },
            height: 700,
            hovermode : 'closest',
            title: 'Volcano'
        };
        
        Plotly.newPlot('myDiv', data, layout, {scrollZoom: true});

    }
    
};

let doPlot = document.getElementById('doPlot');
doPlot.addEventListener ("click", function(){
    create_plot_with_selected_samples();
});