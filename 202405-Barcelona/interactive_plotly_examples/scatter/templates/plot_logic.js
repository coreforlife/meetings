/*
additional colors
  line: {color: "rgba(154,50,205, 0.6)"},
  line: {color: "rgba(60,179,113, 0.6)"},
  line: {color: "rgba(255,69,0, 0.6)"},
  line: {color: "rgba(72,118,255, 0.6)"},
  line: {color: "rgba(169,169,169, 0.6)",},
*/

// Fold change threshold logic
function norm_to_log2(norm_val) {
  var log2_val = Math.log2(norm_val);
  return(log2_val)
}
function log2_to_norm(log2_val) {
  var norm_val = Math.pow(2, log2_val);
  return(norm_val)
}

let doPlot = document.getElementById('doPlot');
let sel_lfq = document.getElementById('sel_lfq');
let sel_ibaq = document.getElementById('sel_ibaq');
let sel_raw_int = document.getElementById('sel_raw_int');
let sel_phos_int = document.getElementById('sel_phos_int');
let sel_ubiq_int = document.getElementById('sel_ubiq_int');
let sel_use_gl = document.getElementById('useGl');
let norm_thresh = document.getElementById('normThresh');
let log2_thresh = document.getElementById('log2Thresh');
let sel_only_x = document.getElementById('showOnlyInX');
let sel_only_y = document.getElementById('showOnlyInY');
let sel_nd_both = document.getElementById('showNotInBoth');
let search_input = document.getElementById('searchInput');
let execute_search = document.getElementById('executeSearch');
let select_multiple = document.getElementById("selectMultiple")
let sel_sample_x = document.getElementById('sel-sample-x');
let sel_sample_y = document.getElementById('sel-sample-y');
let add_sample = document.getElementById("addSample");
let x_set = new Set();
let y_set = new Set();

log2_thresh.value = norm_to_log2(norm_thresh.value)


norm_thresh.oninput = function(e) {
  log2_thresh.value = norm_to_log2(e.target.value)
};

log2_thresh.oninput = function(e) {
  norm_thresh.value = log2_to_norm(e.target.value)
};
// End fold change threshold logic

// Returns the keys of the sample intensities
function getsample_keys(projectData){
    let dataKeys = new Set(Object.keys(projectData));
    let expected_names_key = new Set(["Protein IDs", 'Gene names', "Potential contaminant"]);
    let sample_keys = new Set(
      [...dataKeys].filter(x => !expected_names_key.has(x)));
    return(sample_keys)
}
const sample_keys = getsample_keys(projectData);

// Returns the keys of the phospho sample intensities
function getsample_keys_phos(phosphoData){
    let dataKeys_phos = new Set(Object.keys(phosphoData));
    let expected_names_key = new Set(["Protein IDs", 'Gene names', "Potential contaminant", "Amino acid", "Positions within proteins", "multiplicity"]);
    let sample_keys_phos = new Set(
      [...dataKeys_phos].filter(x => !expected_names_key.has(x)));
    return(sample_keys_phos)
}
const sample_keys_phos = getsample_keys_phos(phosphoData);


// Returns the keys of the Ubiquitination sample intensities
function getsample_keys_ubiq(ubiqData){
    let dataKeys_ubiq = new Set(Object.keys(ubiqData));
    let expected_names_key = new Set(["Protein IDs", 'Gene names', "Potential contaminant", "Amino acid", "Positions within proteins", "multiplicity"]);
    let sample_keys_ubiq = new Set(
      [...dataKeys_ubiq].filter(x => !expected_names_key.has(x)));
    return(sample_keys_ubiq)
}
const sample_keys_ubiq = getsample_keys_ubiq(ubiqData);

// Creates the dropdown entries based on the selected intensity subset
function getDropDownList(radio_id) {

    // Get columns names for current intensity selection
    var sel_sample_int_cols = int_subset_per_button[radio_id];

    // Get IDs of both dropdown menues
    var dodropdown_ids = ["sel-sample-x", "sel-sample-y"]

    // Adds entry for each of the dropdown menues
    dodropdown_ids.forEach(function (dropId, index){


        // Select current dropdown
        var dropdown = document.getElementById(dropId);

        // Get the index of the currently selected item
        var idx_currently_selected = dropdown.selectedIndex;

        // Removes previous selection options
        dropdown.options.length = 1;
        // Adds option for each sample
        sel_sample_int_cols.forEach(function (dataKey, index){
            var opt = document.createElement("option"); 
            opt.text = dataKey;
            opt.value = dataKey;
            dropdown.options.add(opt);
        });

        // Set previously selected index for new intensity
        dropdown.selectedIndex = idx_currently_selected
    });
};

// Subsets intensities and enables intensity selection buttons based on available intensities
function setup_intensity_selection(){

  // Expected intensity terms
  const int_terms = {'sel_lfq':'LFQ ', 'sel_ibaq':'iBAQ ', 'sel_raw_int':'Intensity ', 'sel_phos_int':'Phospho site intensity ', 'sel_ubiq_int':'Ubiquitination site intensity '};

  var raw_int_button_sets = []

  // Subset intensity columns and disable buttons for non existing intensities
  for (const [radio_key, int_term_val] of Object.entries(int_terms)) {

    // Check if regular intensity or phospho is searched for and process accordingly
    var is_non_mod = radio_key != 'sel_phos_int' & radio_key != 'sel_ubiq_int'

    if(is_non_mod){

      // Assing the intensity columns according to their radio button
      raw_int_button_sets[[radio_key]] = [...sample_keys].filter(x => x.indexOf(int_term_val) >= 0 );

      // Select current radio button
      var cur_radio = document.getElementById(radio_key)

      // Set enabled / disabled according to present intensity
      var has_int_term = [...sample_keys].some(x => x.indexOf(int_term_val) >= 0);
      cur_radio.disabled = !has_int_term;

    } else {

      // Check if phospho or Ubiquitination is used
      var is_phos_used = radio_key == 'sel_phos_int'

      if(is_phos_used){

        // Assing the phospho intensity columns according to their radio button
        raw_int_button_sets[[radio_key]] = [...sample_keys_phos].filter(x => x.indexOf(int_term_val) >= 0 );

        // Select current radio button
        var cur_radio = document.getElementById(radio_key)

        // Set enabled / disabled according to present intensity
        var has_int_term = [...sample_keys_phos].some(x => x.indexOf(int_term_val) >= 0);
        cur_radio.disabled = !has_int_term;

      } else {

        // Assing the Ubiquitination intensity columns according to their radio button
        raw_int_button_sets[[radio_key]] = [...sample_keys_ubiq].filter(x => x.indexOf(int_term_val) >= 0 );

        // Select current radio button
        var cur_radio = document.getElementById(radio_key)

        // Set enabled / disabled according to present intensity
        var has_int_term = [...sample_keys_ubiq].some(x => x.indexOf(int_term_val) >= 0);
        cur_radio.disabled = !has_int_term;

      }


    }
    
  }
  
  return(raw_int_button_sets)  
}
const int_subset_per_button = setup_intensity_selection()

// Initiates first intensity selection
function select_first_intensity(){
  for(const [radio_key, int_term_val] of Object.entries(int_subset_per_button)){
    var has_int_cols = int_term_val.length > 0;
    if(has_int_cols){
      // Select current radio button
      var cur_radio = document.getElementById(radio_key);
      
      // Checks the current button in case the intensity term was found. Based on the set order the last present button remains checked
      cur_radio.checked = true;

      getDropDownList(radio_key);
      break;
    }
  }
}
select_first_intensity()

// Get extrema
function get_overall_max_and_min(){
  // Join data
  var combined_int_vals = []
  sample_keys.forEach(function (val){
    combined_int_vals.push(projectData[val])
  });
  var merged_int_vals = [].concat.apply([], combined_int_vals);
  
  // Get min and max
  var merged_int_no_na = merged_int_vals.filter(sample_data_val => sample_data_val != "NA" & sample_data_val != "NaN" );

  var general_max = merged_int_no_na.reduce(function(a, b) {
    return Math.max(a, b);
  }, 0);
  var general_min = merged_int_no_na.reduce(function(a, b) {
    return Math.min(a, b);
  }, 0);

  var extrema_out = {'max_val': general_max, 'min_val': general_min}
  return(extrema_out)
};

const extrema = get_overall_max_and_min();
const max_data_val = extrema["max_val"];
const min_data_val = extrema["min_val"];

// Get extrema for phospho
function get_overall_max_and_min_phos(){
  // Join data
  var combined_int_vals = []
  sample_keys_phos.forEach(function (val){
    combined_int_vals.push(phosphoData[val])
  });
  var merged_int_vals = [].concat.apply([], combined_int_vals);
  
  // Get min and max
  var merged_int_no_na = merged_int_vals.filter(sample_data_val => sample_data_val != "NA" & sample_data_val != "NaN" );

  var general_max = merged_int_no_na.reduce(function(a, b) {
    return Math.max(a, b);
  }, 0);
  var general_min = merged_int_no_na.reduce(function(a, b) {
    return Math.min(a, b);
  }, 0);

  var extrema_out = {'max_val': general_max, 'min_val': general_min}
  return(extrema_out)
};

const extrema_phos = get_overall_max_and_min_phos();
const max_data_val_phos = extrema_phos["max_val"];
const min_data_val_phos = extrema_phos["min_val"];



// Get extrema for Ubiquitination
function get_overall_max_and_min_ubiq(){
  // Join data
  var combined_int_vals = []
  sample_keys_ubiq.forEach(function (val){
    combined_int_vals.push(ubiqData[val])
  });
  var merged_int_vals = [].concat.apply([], combined_int_vals);
  
  // Get min and max
  var merged_int_no_na = merged_int_vals.filter(sample_data_val => sample_data_val != "NA" & sample_data_val != "NaN" );

  var general_max = merged_int_no_na.reduce(function(a, b) {
    return Math.max(a, b);
  }, 0);
  var general_min = merged_int_no_na.reduce(function(a, b) {
    return Math.min(a, b);
  }, 0);

  var extrema_out = {'max_val': general_max, 'min_val': general_min}
  return(extrema_out)
};

const extrema_ubiq = get_overall_max_and_min_ubiq();
const max_data_val_ubiq = extrema_ubiq["max_val"];
const min_data_val_ubiq = extrema_ubiq["min_val"];


// Prepare data for plotting
function prepareData(projectData, sample_keys){
    var dataForPlotting = {"Protein IDs": projectData["Protein IDs"],
                            "Gene names": projectData["Gene names"],
                            "Potential contaminant":  projectData["Potential contaminant"]};

    // Iterate over Samples
    sample_keys.forEach(function(sampleKey, contrIdx){
      var sample_ints_raw = projectData[sampleKey];

      // Rounds value if it is not "NA"
      var numDecimals = 5;
      var multiplyerRound = Math.pow(10, numDecimals);
      
      var sample_ints = sample_ints_raw.map(x => (x == "NA") ? "NA" : Math.round((Number(x) + Number.EPSILON) * multiplyerRound) / multiplyerRound);

      dataForPlotting[sampleKey] = sample_ints;
    });
    return(dataForPlotting)
}
const dataForPlotting = prepareData(projectData, sample_keys);

// Prepare phospho data for plotting
function prepareData_phos(phosphoData, sample_keys_phos){
    var dataForPlotting_phos = {"Protein IDs": phosphoData["Protein IDs"],
                            "Gene names": phosphoData["Gene names"],
                            "Potential contaminant":  phosphoData["Potential contaminant"],
                            "Amino acid":  phosphoData["Amino acid"],
                            "Positions within proteins":  phosphoData["Positions within proteins"],
                            "multiplicity":  phosphoData["multiplicity"]};

    // Iterate over Samples
    sample_keys_phos.forEach(function(sampleKey, contrIdx){
      var sample_ints_raw = phosphoData[sampleKey];

      // Rounds value if it is not "NA"
      var numDecimals = 5;
      var multiplyerRound = Math.pow(10, numDecimals);
      
      var sample_ints = sample_ints_raw.map(x => (x == "NA") ? "NA" : Math.round((Number(x) + Number.EPSILON) * multiplyerRound) / multiplyerRound);

      dataForPlotting_phos[sampleKey] = sample_ints;
    });
    return(dataForPlotting_phos)
}
const dataForPlotting_phos = prepareData_phos(phosphoData, sample_keys_phos);

// Prepare Ubiquitination data for plotting
function prepareData_ubiq(ubiqData, sample_keys_ubiq){
    var dataForPlotting_ubiq = {"Protein IDs": ubiqData["Protein IDs"],
                            "Gene names": ubiqData["Gene names"],
                            "Potential contaminant":  ubiqData["Potential contaminant"],
                            "Amino acid":  ubiqData["Amino acid"],
                            "Positions within proteins":  ubiqData["Positions within proteins"],
                            "multiplicity":  ubiqData["multiplicity"]};

    // Iterate over Samples
    sample_keys_ubiq.forEach(function(sampleKey, contrIdx){
      var sample_ints_raw = ubiqData[sampleKey];

      // Rounds value if it is not "NA"
      var numDecimals = 5;
      var multiplyerRound = Math.pow(10, numDecimals);
      
      var sample_ints = sample_ints_raw.map(x => (x == "NA") ? "NA" : Math.round((Number(x) + Number.EPSILON) * multiplyerRound) / multiplyerRound);

      dataForPlotting_ubiq[sampleKey] = sample_ints;
    });
    return(dataForPlotting_ubiq)
}
const dataForPlotting_ubiq = prepareData_ubiq(ubiqData, sample_keys_ubiq);


function create_trace_for_selected_data(sel_sample_x, sel_sample_y){

    let current_data_for_plotting = []

    // Check if the selected sample is in the main data or if it is in phospho data
    if(sel_sample_x in dataForPlotting) {

      current_data_for_plotting = dataForPlotting

    } else if (sel_sample_x in dataForPlotting_phos){

      current_data_for_plotting = dataForPlotting_phos

    } else if (sel_sample_x in dataForPlotting_ubiq){

      current_data_for_plotting = dataForPlotting_ubiq

    } else {

      console.log("Selected Sample not contained in any data")

    }

    var sample_data_x = current_data_for_plotting[sel_sample_x];
    var sample_data_y = current_data_for_plotting[sel_sample_y];

    let no_lables = document.getElementById('labelNo').checked;
    let protein_lables = document.getElementById('lableProtein').checked;
    let gene_lables = document.getElementById('labelGene').checked;

    var more_x_data = {"x_data":[], "y_data": [], "Protein IDs": [], "Gene names": [], "Combined names": [], "Potential contaminant": [], "Size":[]};
    var more_y_data = {"x_data":[], "y_data": [], "Protein IDs": [], "Gene names": [], "Combined names": [], "Potential contaminant": [], "Size":[]};
    var unchanged_data = {"x_data":[], "y_data": [], "Protein IDs": [], "Gene names": [], "Combined names": [], "Potential contaminant": [], "Size":[]};
    var only_x_data = {"x_data":[], "y_data": [], "Protein IDs": [], "Gene names": [], "Combined names": [], "Potential contaminant": [], "Size":[]};
    var only_y_data = {"x_data":[], "y_data": [], "Protein IDs": [], "Gene names": [], "Combined names": [], "Potential contaminant": [], "Size":[]};
    var not_quant_data = {"x_data":[], "y_data": [], "Protein IDs": [], "Gene names": [], "Combined names": [], "Potential contaminant": [], "Size":[]};

    var num_only_x = 0;
    var num_only_y = 0;
    var num_x_and_y_na = 0;
    var x_data_bins = {};
    var y_data_bins = {};
    var bin_size = 0.4;
    var stacking_factor = 100;
    var default_size = 50;
    var min_size = 0.4;

    sample_data_x.forEach(function(val, idx){
      var cur_x_val = sample_data_x[idx];
      var cur_y_val = sample_data_y[idx];
      var is_x_na = cur_x_val == "NA";
      var is_y_na = cur_y_val == "NA";
      if(sel_only_y.checked & is_x_na & !is_y_na){
        num_only_y += 1;
        var cur_bin = Math.floor(cur_y_val/bin_size);
        if(! (cur_bin in y_data_bins)){
          y_data_bins[cur_bin] = {'current': 0, 'total': 1};
        } else {
          y_data_bins[cur_bin]['total'] += 1;
        }
      } else if(sel_only_x.checked & is_y_na & !is_x_na){
        num_only_x += 1;
        var cur_bin = Math.floor(cur_x_val/bin_size);
        if(! (cur_bin in x_data_bins)){
          x_data_bins[cur_bin] = {'current': 0, 'total': 1};
        } else {
          x_data_bins[cur_bin]['total'] += 1;
        }
      }else if(sel_nd_both.checked & is_y_na & is_x_na){
        num_x_and_y_na += 1;
      }
    });

    var sqrt_both_na = Math.sqrt(num_x_and_y_na);
    var not_quant_jittering = [...Array(num_x_and_y_na).keys()];

    // Generates seperate objects for each possible point type. Data such as size and name for each point are defined.
    sample_data_x.forEach(function(val, idx){
      var cur_x_val = sample_data_x[idx];
      var cur_y_val = sample_data_y[idx];
      var cur_prot_name = current_data_for_plotting["Protein IDs"][idx];
      var cur_gene_name = current_data_for_plotting["Gene names"][idx];

      // Adds info dependent whether data type is protin or modification (phospho or Ubiquitination)
      var cur_name_info_combined =  ""
      if("multiplicity" in current_data_for_plotting){
        var cur_amino_acid = current_data_for_plotting["Amino acid"][idx].toString();
        var cur_positions = current_data_for_plotting["Positions within proteins"][idx].toString();
        var cur_multiplicity = current_data_for_plotting["multiplicity"][idx].toString();
        cur_name_info_combined = "Gene: " + cur_gene_name + "<br>" + "Protein: " + cur_prot_name + "<br>" + "Amino acid: " + cur_amino_acid + "<br>" + "Positions: " + cur_positions + "<br>" + "multiplicity: " + cur_multiplicity;
      } else {
        cur_name_info_combined = "Gene: " + cur_gene_name + "<br>" + "Protein: " + cur_prot_name;
      }
      var cur_pot_con = current_data_for_plotting["Potential contaminant"][idx];
      var shape_on_pot_con = cur_pot_con == '+' ? 'triangle-up' : 'circle'
      var is_x_na = cur_x_val == "NA";
      var is_y_na = cur_y_val == "NA";
      var log2_thresh_val = document.getElementById('log2Thresh').value;
      var new_size = default_size;
      if(!is_x_na & !is_y_na){
        var res_x_minus_y = (cur_x_val - cur_y_val);
        var is_x_fold_larger = res_x_minus_y >= log2_thresh_val;
        var is_x_fold_smaler = res_x_minus_y <= -log2_thresh_val;
        var x_count = x_set.size;
        var y_count = y_set.size;
        if(x_set.size && y_set.size){
          for (x_name of x_set){
            if(current_data_for_plotting[x_name][idx] === "NA"){x_count -= 1};
          }
          for (y_name of y_set){
            if(current_data_for_plotting[y_name][idx] === "NA"){y_count -= 1};
          }
          new_size = default_size * (x_count + y_count)/(x_set.size + y_set.size);
          if (new_size <= min_size*default_size){
            new_size = min_size*default_size;
          }
          cur_name_info_combined += "<br>Presence y: " + (y_count) + "/" + y_set.size + "<br>Presence x: " + (x_count) + "/" + x_set.size 
          cur_prot_name += "<br>Presence y: " + (y_count) + "/" + y_set.size + "<br>Presence x: " + (x_count) + "/" + x_set.size 
          cur_gene_name += "<br>Presence y: " + (y_count) + "/" + y_set.size + "<br>Presence x: " + (x_count) + "/" + x_set.size 
        }
        if(is_x_fold_larger){
          more_x_data["x_data"].push(cur_x_val);
          more_x_data["y_data"].push(cur_y_val);
          more_x_data["Protein IDs"].push(cur_prot_name);
          more_x_data["Gene names"].push(cur_gene_name);
          more_x_data["Combined names"].push(cur_name_info_combined);
          more_x_data["Potential contaminant"].push(shape_on_pot_con);
          more_x_data["Size"].push(new_size);

        } else if(is_x_fold_smaler){
          more_y_data["x_data"].push(cur_x_val);
          more_y_data["y_data"].push(cur_y_val);
          more_y_data["Protein IDs"].push(cur_prot_name);
          more_y_data["Gene names"].push(cur_gene_name);
          more_y_data["Combined names"].push(cur_name_info_combined);
          more_y_data["Potential contaminant"].push(shape_on_pot_con);
          more_y_data["Size"].push(new_size);
        } else {
          unchanged_data["x_data"].push(cur_x_val);
          unchanged_data["y_data"].push(cur_y_val);
          unchanged_data["Protein IDs"].push(cur_prot_name);
          unchanged_data["Gene names"].push(cur_gene_name);
          unchanged_data["Combined names"].push(cur_name_info_combined);
          unchanged_data["Potential contaminant"].push(shape_on_pot_con);
          unchanged_data["Size"].push(new_size);
        }
      } else if(sel_only_x.checked & is_y_na & !is_x_na){
        
        var cur_bin = Math.floor(cur_x_val/bin_size);
        var cur_idx = x_data_bins[cur_bin]['current']
        var cur_bin_size = x_data_bins[cur_bin]['total']
        // This function will converge towards a limit
        var y_pos_factor = 2* (1 - (1/(1+Math.exp(-(4* cur_idx/stacking_factor)))))
        // This function will initially stack the points and at a given value stack them more narrow dependent on their total amount per bin
        //var y_pos_factor = (cur_bin_size <= stacking_factor) ? 1-(cur_idx/stacking_factor) : 1-(cur_idx/cur_bin_size);
        x_data_bins[cur_bin]['current'] += 1;
        var stacked_y_pos = (y_pos_factor * 9 + 0.5) - 10

        var x_count = x_set.size;
        if(x_set.size){
          for (x_name of x_set){
            if(current_data_for_plotting[x_name][idx] === "NA"){x_count -= 1};
          }
          new_size = default_size * (x_count )/(x_set.size);
          if (new_size <= min_size*default_size){
            new_size = min_size*default_size;
          }
          cur_name_info_combined += "<br>Missing in " + (x_set.size - x_count) + " out of " + x_set.size + " samples."
          cur_prot_name += "<br>Missing in " + (x_set.size - x_count) + " out of " + x_set.size + " samples."
          cur_gene_name += "<br>Missing in " + (x_set.size - x_count) + " out of " + x_set.size + " samples."
        }
        only_x_data["x_data"].push(cur_x_val);
        only_x_data["y_data"].push(stacked_y_pos);
        only_x_data["Protein IDs"].push(cur_prot_name);
        only_x_data["Gene names"].push(cur_gene_name);
        only_x_data["Combined names"].push(cur_name_info_combined);
        only_x_data["Potential contaminant"].push(shape_on_pot_con);
        only_x_data["Size"].push(new_size);
      } else if(sel_only_y.checked & is_x_na & !is_y_na){

        var cur_bin = Math.floor(cur_y_val/bin_size);
        var cur_idx = y_data_bins[cur_bin]['current']
        var cur_bin_size = y_data_bins[cur_bin]['total']
        // This function will converge towards a limit
        var x_pos_factor = 2* (1 - (1/(1+Math.exp(-(4* cur_idx/stacking_factor)))))
        // This function will initially stack the points and at a given value stack them more narrow dependent on their total amount per bin
        //var x_pos_factor = (cur_bin_size <= stacking_factor) ? 1-(cur_idx/stacking_factor) : 1-(cur_idx/cur_bin_size);
        y_data_bins[cur_bin]['current'] += 1;
        var stacked_x_pos = (x_pos_factor * 9 + 0.5) - 10
        var y_count = y_set.size;
        if(y_set.size){
          for (y_name of y_set){
            if(current_data_for_plotting[y_name][idx] === "NA"){y_count -= 1};
          }
          new_size = default_size * (y_count )/(y_set.size);
          if (new_size <= min_size*default_size){
            new_size = min_size*default_size;
          }
          cur_name_info_combined += "<br>Missing in " + (y_set.size - y_count) + " out of " + y_set.size + " samples."
          cur_prot_name += "<br>Missing in " + (y_set.size - y_count) + " out of " + y_set.size + " samples."
          cur_gene_name += "<br>Missing in " + (y_set.size - y_count) + " out of " + y_set.size + " samples."
        }
        only_y_data["x_data"].push(stacked_x_pos);
        only_y_data["y_data"].push(cur_y_val);
        only_y_data["Protein IDs"].push(cur_prot_name);
        only_y_data["Gene names"].push(cur_gene_name);
        only_y_data["Combined names"].push(cur_name_info_combined);
        only_y_data["Potential contaminant"].push(shape_on_pot_con);
        only_y_data["Size"].push(new_size);
      } else if(sel_nd_both.checked & is_x_na & is_y_na){
        var frequency = 1;

        var num_data_points = not_quant_jittering.length;

        var random_factor =  not_quant_jittering.splice(Math.floor(Math.random()*num_data_points), 1);
        
        var remainder = random_factor%sqrt_both_na;
        var quotient = Math.floor(random_factor/sqrt_both_na);

        var jittered_not_quant_x_val = (0.2 + 9.6 * remainder/sqrt_both_na) - 10;
        var jittered_not_quant_y_val = (0.2 + 9.6 * quotient/sqrt_both_na) - 10;

        not_quant_data["x_data"].push(jittered_not_quant_x_val);
        not_quant_data["y_data"].push(jittered_not_quant_y_val);
        not_quant_data["Protein IDs"].push(cur_prot_name);
        not_quant_data["Gene names"].push(cur_gene_name);
        not_quant_data["Combined names"].push(cur_name_info_combined);
        not_quant_data["Potential contaminant"].push(shape_on_pot_con);
        not_quant_data["Size"].push(default_size)
      }
    });

    let is_set = x_set.size + y_set.size;

    // Constructs traces out of the data generated previously. Traces are only constructed if at least one gene name is present. 
    if (more_x_data["Gene names"].length){
      var more_x_trace_name = (sel_sample_x == "Mean x selection") ? "x selection" : sel_sample_x.match(/([^\s]+)$/)[1];
      var more_x_trace = {
      x: more_x_data["x_data"],
      y: more_x_data["y_data"],
      mode: no_lables ? 'markers' : 'markers+text',
      type: sel_use_gl.checked ? 'scattergl' : 'scatter',
      name: 'Higher in ' + more_x_trace_name,
      line: {color: "rgba(0,128,0, 0.6)",},
      text: no_lables ? more_x_data["Combined names"] : gene_lables ? more_x_data["Gene names"] : more_x_data["Protein IDs"],
      textposition: 'bottom',
      showlegend:true,
      textfont: {
        family: 'sans serif',
        size: 12,
        color: "rgba(0,128,0, 0.6)"
        },
      marker: { size: is_set ? more_x_data["Size"] : 9, symbol: more_x_data["Potential contaminant"], sizemode: is_set ? "area" : "diameter"}
      };
    }

    if (more_y_data["Gene names"].length){
      var more_y_trace_name = (sel_sample_y == "Mean y selection") ? "y selection" : sel_sample_y.match(/([^\s]+)$/)[1];
      var more_y_trace = {
      x: more_y_data["x_data"],
      y: more_y_data["y_data"],
      mode: no_lables ? 'markers' : 'markers+text',
      type: sel_use_gl.checked ? 'scattergl' : 'scatter',
      name: 'Higher in ' + more_y_trace_name,
      line: {color: "rgba(148,0,211, 0.6)",},
      text: no_lables ? more_y_data["Combined names"] : gene_lables ? more_y_data["Gene names"] : more_y_data["Protein IDs"],
      textposition: 'bottom',
      showlegend:true,
      textfont: {
        family: 'sans serif',
        size: 12,
        color: "rgba(148,0,211, 0.6)"
      },
      marker: { size: is_set ? more_y_data["Size"] : 9, symbol: more_y_data["Potential contaminant"], sizemode: is_set ? "area" : "diameter"}
      };
    }
    
    if (unchanged_data["Gene names"].length){
      var unchanged_tarce = {
      x: unchanged_data["x_data"],
      y: unchanged_data["y_data"],
      mode: no_lables ? 'markers' : 'markers+text',
      type: sel_use_gl.checked ? 'scattergl' : 'scatter',
      name: 'Similar in selected samples',
      line: {color: "rgba(169,169,169, 0.6)",},
      text: no_lables ? unchanged_data["Combined names"] : gene_lables ? unchanged_data["Gene names"] : unchanged_data["Protein IDs"],
      textposition: 'bottom',
      showlegend:true,
      textfont: {
        family: 'sans serif',
        size: 12,
        color: "rgba(169,169,169, 0.6)"
      },
      marker: { size: is_set ? unchanged_data["Size"] : 9, symbol: unchanged_data["Potential contaminant"] , sizemode: is_set ? "area":"diameter"}
      };
    }

    if(only_x_data["Gene names"].length){
      var only_x_tarce = {
      x: only_x_data["x_data"],
      y: only_x_data["y_data"],
      mode: no_lables ? 'markers' : 'markers+text',
      type: sel_use_gl.checked ? 'scattergl' : 'scatter',
      name: 'Only in ' + more_x_trace_name,
      line: {color: "rgba(25,200,25, 0.4)",},
      text: no_lables ? only_x_data["Combined names"] : gene_lables ? only_x_data["Gene names"] : only_x_data["Protein IDs"],
      textposition: 'bottom',
      hoverinfo: "x+text",
      showlegend:true,
      textfont: {
        family: 'sans serif',
        size: 12,
        color: "rgba(25,200,25, 0.4)"
        },
      marker: { size: is_set ? only_x_data["Size"]:9, symbol: only_x_data["Potential contaminant"], sizemode: is_set ? "area":"diameter" }
      };
    }

    if(only_y_data["Gene names"].length){
      var only_y_tarce = {
      x: only_y_data["x_data"],
      y: only_y_data["y_data"],
      mode: no_lables ? 'markers' : 'markers+text',
      type: sel_use_gl.checked ? 'scattergl' : 'scatter',
      name: 'Only in ' + more_y_trace_name,
      line: {color: "rgba(200,25,200, 0.4)",},
      text: no_lables ? only_y_data["Combined names"] : gene_lables ? only_y_data["Gene names"] : only_y_data["Protein IDs"],
      textposition: 'bottom',
      hoverinfo: "y+text",
      showlegend:true,
      textfont: {
        family: 'sans serif',
        size: 12,
        color: "rgba(200,25,200, 0.4)"
      },
      marker: { size: is_set ? only_y_data["Size"]:9, symbol: only_y_data["Potential contaminant"], sizemode: is_set ? "area" : "diameter"}
      };
    }

    if(not_quant_data["Gene names"].length){
      var not_quant_tarce = {
      x: not_quant_data["x_data"],
      y: not_quant_data["y_data"],
      mode: no_lables ? 'markers' : 'markers+text',
      type: sel_use_gl.checked ? 'scattergl' : 'scatter',
      name: 'Not quantified in these samples',
      line: {color: "rgba(200,25,25, 0.4)",},
      text: no_lables ? not_quant_data["Combined names"] : gene_lables ? not_quant_data["Gene names"] : not_quant_data["Protein IDs"],
      textposition: 'bottom',
      hoverinfo: "text",
      showlegend:true,
      textfont: {
        family: 'sans serif',
        size: 12,
        color: "rgba(200,25,25, 0.4)"
      },
      marker: { size: is_set ? not_quant_data["Size"]:9, symbol: not_quant_data["Potential contaminant"], sizemode: is_set ? "area":"diameter" }
      };
    }
    
    // Creates invisible triangle for Contaminant Symbol legend entry.
    var shape_trace_legend = {
    x: [NaN],
    y: [NaN],
    mode: 'markers',
    type: sel_use_gl.checked ? 'scattergl' : 'scatter',
    name: 'Is potential conaminant',
    line: {color: "rgba(0,0,0, 1)",},
    text: ["contaminant"],
    textposition: 'bottom',
    showlegend:true,
    legendgroup: "shape",
    marker: { size: is_set ? [default_size] : 9, symbol: ['triangle-up'], sizemode : is_set ? "area" :"diameter"}
    };

    // Creates invisible points with different sizes for size change legend entry.
    if (x_set.size > 0 || y_set.size > 0){
      var size1_trace_legend = {
      x: [NaN],
      y: [NaN],
      mode: "markers",
      type: sel_use_gl.checked ? 'scattergl' : 'scatter',
      name: "Data missing in at least " + Math.round((1-min_size)*(x_set.size + y_set.size)) + " samples",
      line: {color: "rgba(0,0,0, 1)",},
      showlegend: true,
      legendgroup: "size",
      marker: {size: [min_size * 16], sizemode : "area"}
      }

      var size2_trace_legend = {
      x: [NaN],
      y: [NaN],
      mode: "markers",
      type: sel_use_gl.checked ? 'scattergl' : 'scatter',
      name: "",
      line: {color: "rgba(0,0,0, 1)",},
      showlegend: true,
      legendgroup: "size",
      marker: {size: [(min_size*16 + 16)/2], sizemode: "area"}
      }
      
      var size3_trace_legend = {
      x: [NaN],
      y: [NaN],
      mode: "markers",
      type: sel_use_gl.checked ? 'scattergl' : 'scatter',
      name: "Data for all samples",
      line: {color: "rgba(0,0,0, 1)",},
      showlegend: true,
      legendgroup: "size",
      marker: {size: [16], sizemode : "area"}
      }

      var tracesToPlot = [shape_trace_legend, size1_trace_legend, size2_trace_legend, size3_trace_legend];
    
    } else {
      var tracesToPlot = [shape_trace_legend];
    }
  
    if(more_x_trace) tracesToPlot.push(more_x_trace);
    if(more_y_trace) tracesToPlot.push(more_y_trace);
    if(unchanged_tarce) tracesToPlot.push(unchanged_tarce);
    if(only_x_tarce) tracesToPlot.push(only_x_tarce);
    if(only_y_tarce) tracesToPlot.push(only_y_tarce);
    if(not_quant_tarce) tracesToPlot.push(not_quant_tarce);
    return(tracesToPlot);
};



execute_search.addEventListener('click', function(){

    //document.getElementsByClassName('text')[0].__data__[0].tx
    var plotObjectTexts = Array.from(document.getElementsByClassName('text'));
    var hasTextelements = plotObjectTexts.length > 0;
    var searchTerm = search_input.value.toLowerCase();
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



function create_plot_with_selected_samples(x, y) {

    let current_data_for_plotting = []

    // Check if the selected sample is in the main data or if it is in modification data (phospho or Ubiquitination)
    if(x in dataForPlotting) {

      current_data_for_plotting = dataForPlotting
      var max_limit = max_data_val * 1.05;
      var min_limit = min_data_val * 0.0;

    } else if (x in dataForPlotting_phos){

      current_data_for_plotting = dataForPlotting_phos
      var max_limit = max_data_val_phos * 1.05;
      var min_limit = min_data_val_phos * 0.0;

    } else if (x in dataForPlotting_ubiq){

      current_data_for_plotting = dataForPlotting_ubiq
      var max_limit = max_data_val_ubiq * 1.05;
      var min_limit = min_data_val_ubiq * 0.0;

    } else {

      console.log("Selected Sample not contained in any data: " + x)

    }

    // x-axis
    var sample_data_x = current_data_for_plotting[x]
    
    // y-axis
    var sample_data_y = current_data_for_plotting[y]
    
    // General
    
    var log2_thresh_val = document.getElementById('log2Thresh').value;
    var cur_window_height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

    // Checks if contrast has been selected
    if(x != '' & y != ''){
        var plotTitle = 'Scatterplot ' + x + ' vs ' + y;

        var layout = {
            xaxis: {
                title: "log2 " + x,
                //range: [ min_limit, max_limit ]
                range: [ -10, max_limit ]
            },
            yaxis: {
                title: "log2 " + y,
                //range: [ min_limit, max_limit ]
                range: [ -10, max_limit ]
            },
            'shapes': [
              // Middle line
              {
                'type': 'line',
                'x0': -10,
                'y0': -10,
                'x1': max_limit * 1.1,
                'y1': max_limit * 1.1,
                'line': {
                  'color': 'rgba(0, 0, 0, 0.4)',
                  'width': 2,
                  dash: 'dash'
                },
              },
              //Upper line
              {
                'type': 'line',
                'x0': -10,
                'y0': log2_thresh_val - 10,
                'x1': max_limit * 1.1,
                // *1 due to implicite string concatenation
                'y1': (max_limit * 1.1) + 1*log2_thresh_val,
                'line': {
                  'color': 'rgba(171, 0, 0, 0.4)',
                  'width': 2,
                  dash: 'dash'
                },
              },
              //Lower line
              {
                'type': 'line',
                'x0': -10,
                'y0': -10 - log2_thresh_val,
                'x1': max_limit * 1.1,
                'y1': (max_limit * 1.1) - log2_thresh_val,
                'line': {
                  'color': 'rgba(171, 0, 0, 0.4)',
                  'width': 2,
                  dash: 'dash'
                },
              }
            ],
            responsize: true,
            // The settings use roughly 250px of height
            height: cur_window_height - 250,
            //width: '100%',
            hovermode : 'closest',
            title: y_set.size&&x_set.size ? "Mean Multiple Sample Scatterplot" : 'Scatterplot'
        };

        // Only in x sample area
        if(sel_only_x.checked){
          layout["shapes"].push(
            {
              'type': 'rect',
              x0: 0,
              y0: 0,
              x1: max_limit,
              y1: -10,
              line: {
                color: 'rgba(0, 122, 0, 0.2)',
                width: 2
              },
              fillcolor: 'rgba(0, 122, 0, 0.1)'
            }
          );
        }

        // Only in y sample area
        if(sel_only_y.checked){
          layout["shapes"].push(
            {
              'type': 'rect',
              x0: 0,
              y0: 0,
              x1: -10,
              y1: max_limit,
              line: {
                color: 'rgba(122, 0, 122, 0.2)',
                width: 2
              },
              fillcolor: 'rgba(122, 0, 122, 0.1)'
            }
          );
        }

        // Not quantified in x and y
        if(sel_nd_both.checked){
          layout["shapes"].push(
            
            {
              'type': 'rect',
              x0: 0,
              y0: 0,
              x1: -10,
              y1: -10,
              line: {
                color: 'rgba(122, 55, 55, 0.2)',
                width: 2
              },
              fillcolor: 'rgba(122, 55, 55, 0.1)'
            }
          );
        }
        var data = create_trace_for_selected_data(x, y);
           
        Plotly.newPlot('myDiv', data, layout, {scrollZoom: true});
    }
    
};

// Helper function to remove generated buttons and their associated value
let click_remove = function(){
  let identifier = this.id;
  let value = this.value;
  document.getElementById(identifier).remove();
  if(identifier[0] === "x"){
    x_set.delete(value);
  } else if (identifier[0] === "y"){
    y_set.delete(value);
  } else {
    console.log("Error: button class could not be identified.")
  }
}

// Helper function to merge selected samples
let merge_samples = function(names){

  // Check if the selected sample is in the main data or if it is in modification data ( phospho or Ubiquitination)
  if([...names][0] in dataForPlotting) {

    current_data_for_plotting = dataForPlotting

  } else if ([...names][0] in dataForPlotting_phos){

    current_data_for_plotting = dataForPlotting_phos

  } else if ([...names][0] in dataForPlotting_ubiq){

    current_data_for_plotting = dataForPlotting_ubiq

  } else {

    console.log("Selected Sample not contained in any data: " + names)

  }

  merged = [];
  for (let i = 0; i <= current_data_for_plotting["Gene names"].length-1; i++){
    let len = 0;
    let sum = 0;
    for (nam of names){
      if (current_data_for_plotting[nam][i] != "NA"){
        sum += current_data_for_plotting[nam][i];
        len += 1;}
    }
    mean = sum/len;
    merged.push(mean);
  // Used to count how many NA's appear in the merged samples. NOT USED ANYMORE. Might still be usefull later.
    if(current_data_for_plotting["number_found"][i] !== undefined){
      current_data_for_plotting["number_found"][i] += len
    } else {
    current_data_for_plotting["number_found"].push(len)
    }
  }
  // Replaces possible NaNs with the string "NA"
  return merged.map((val) => Number.isNaN(val) ? "NA" : val)
}
// When the add button is clicked a div grid is generated. This grid is populated with buttons corresponding to unique x and y selection values 
// selected each time the add button is pressed.
add_sample.addEventListener("click", function(){
  // x_set and y_set are global variables that store the current selection for plotting
  dataForPlotting["number_found"] = [];
  dataForPlotting_phos["number_found"] = [];
  dataForPlotting_ubiq["number_found"] = [];
  if(sel_sample_x.value){
    x_set.add(sel_sample_x.value)
  }
  if(sel_sample_y.value){
    y_set.add(sel_sample_y.value)
  }
  num_samples = Math.max(x_set.size, y_set.size)
  // The div_grid stores the buttons in two columns, one for the x and one for the y axis. It is only generated if not already present.
  if (!document.getElementById("div_grid")){
    let div_grid = document.createElement("div")
    div_grid.style.display = "grid"
    div_grid.style.gridTemplateColumns = "auto auto"
    div_grid.id = "div_grid"
    let set_width = window.getComputedStyle(sel_sample_y).width.slice(0, -2);
    set_width = 2*parseInt(set_width) + 20;
    div_grid.style.width = set_width.toString() + "px" 
    document.getElementById("sel_&_plot").appendChild(div_grid)
    let new_xdiv = document.createElement("div");
    let new_ydiv = document.createElement("div");
    new_xdiv.id = "xbutton_div";
    new_ydiv.id = "ybutton_div";
    new_xdiv.style.minWidth = (set_width/2).toString() + "px"
    new_ydiv.style.minWidth = (set_width/2).toString() + "px"
    document.getElementById("div_grid").appendChild(new_xdiv);
    document.getElementById("div_grid").appendChild(new_ydiv);
  }
  
  // x and y buttons are generated only if the button is not already present
  for (value of x_set){
    if (!document.getElementById("x_button_" + value)){
      let append_div = document.getElementById("xbutton_div")
      let new_button = document.createElement("button");
      new_button.id = "x_button_" + value;
      new_button.value = value;
      let button_text = document.createTextNode(value + "|  X");
      new_button.onclick = click_remove;
      new_button.appendChild(button_text);
      append_div.appendChild(new_button);
    }
  }
  for (value of y_set){
    if (!document.getElementById("y_button_" + value)){
      let append_div = document.getElementById("ybutton_div")
      let new_button = document.createElement("button");
      new_button.id = "y_button_" + value;
      new_button.value = value;
      let button_text = document.createTextNode(value + "|  X");
      new_button.appendChild(button_text);
      new_button.onclick = click_remove;
      append_div.appendChild(new_button);
    }
  }
})

doPlot.addEventListener ("click", function(){
  x_name = sel_sample_x.value;
  y_name = sel_sample_y.value;

  if(x_set.size > 0){
    if(x_name in dataForPlotting){
      dataForPlotting["Mean x selection"] = merge_samples(x_set);
    } else if (x_name in dataForPlotting_phos){
      dataForPlotting_phos["Mean x selection"] = merge_samples(x_set);
    } else if (x_name in dataForPlotting_ubiq){
      dataForPlotting_ubiq["Mean x selection"] = merge_samples(x_set);
    } else {
      console.log("Name not found in any data: " + x_name);
    }
    x_name = "Mean x selection";
  }
  if(y_set.size > 0){
    if(y_name in dataForPlotting){
      dataForPlotting["Mean y selection"] = merge_samples(y_set);
    } else if (y_name in dataForPlotting_phos){
      dataForPlotting_phos["Mean y selection"] = merge_samples(y_set);
    } else if (y_name in dataForPlotting_ubiq){
      dataForPlotting_ubiq["Mean y selection"] = merge_samples(y_set);
    } else {
      console.log("Name not found in any data: " + y_name);
    }
    y_name = "Mean y selection";
  }
  create_plot_with_selected_samples(x_name, y_name);
  dataForPlotting["number_found"] = [];
  dataForPlotting_phos["number_found"] = [];
  dataForPlotting_ubiq["number_found"] = [];
});

sel_use_gl.addEventListener ("click", function(){
  x_name = sel_sample_x.value;
  y_name = sel_sample_y.value;
  if(x_set.size > 0){
    if(x_name in dataForPlotting){
      dataForPlotting["Mean x selection"] = merge_samples(x_set);
    } else if (x_name in dataForPlotting_phos){
      dataForPlotting_phos["Mean x selection"] = merge_samples(x_set);
    } else if (x_name in dataForPlotting_ubiq){
      dataForPlotting_ubiq["Mean x selection"] = merge_samples(x_set);
    } else {
      console.log("Name not found in any data: " + x_name);
    }
    x_name = "Mean x selection";
  }
  if(y_set.size > 0){
    if(y_name in dataForPlotting){
      dataForPlotting["Mean y selection"] = merge_samples(y_set);
    } else if (y_name in dataForPlotting_phos){
      dataForPlotting_phos["Mean y selection"] = merge_samples(y_set);
    } else if (y_name in dataForPlotting_ubiq){
      dataForPlotting_ubiq["Mean y selection"] = merge_samples(y_set);
    } else {
      console.log("Name not found in any data: " + y_name);
    }
    y_name = "Mean y selection";
  }
  create_plot_with_selected_samples(x_name, y_name);
  if(sel_use_gl.checked){
    search_input.disabled = true;
    execute_search.disabled = true;
  } else {
    search_input.disabled = false;
    execute_search.disabled = false;
  }
});
