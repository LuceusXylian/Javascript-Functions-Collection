function inputRequiredCheck(inputArray) {
	let bool = true;

	if (inputArray.length > 1) {
		for (let i = 0; i < inputArray.length; i++) {
			const element = $(inputArray[i]);
				
			if(element.val().trim() == "") {
				element.css( 'border', '1px solid red');
				bool = false;
			} else {
				element.css( 'border', '');
			}
		}
	} else {
		bool = inputArray.val().length != 0;
	}

	return bool;
}

function getCheckedCheckboxValuesByName(name) {
  let return_val = [], counter = 0;

  $('[name="'+name+'"]').each( function (){
    if($(this).prop('checked') == true){
      return_val[counter] = $(this).val();
      counter++;
    }
  });
  return return_val;
}

function numberControll(input_name, numberToAdd) {
  let this_number_var = parseInt( $(input_name).val() );

  if ( !$.isNumeric( $(input_name).val() ) || this_number_var < 1 ) {
    $(input_name).val(1);
  } else if ( this_number_var > 100 ) {
    $(input_name).val(99);
  } else {
    let calculated_var = this_number_var + parseInt(numberToAdd);
    if (calculated_var > 0 && calculated_var < 100) {
      $(input_name).val(calculated_var);
    }
  }
}

function inputDecimalCheck(object, dp, suffix) {
	var val = parseFloat( (object.value).replace(",", ".") ).toFixed(dp);
	if(val != NaN && val != "NaN" && val != null) {
		val = val.replace(".", ",");
		val += suffix;
	} else {
		val = "";
	} 
	object.value = val;
}

Array.prototype.extend = function (array) {
	if (Array.isArray(array) == true) {
		array.forEach(function(v) {this.push(v)}, this);
		return array.length;
	}
	return 0;
}
