function getCheckedCheckboxValuesByName(name) {
  let return_val = "", counter = 0;

  $('[name="'+name+'"]').each( function (){
    if($(this).prop('checked') == true){
      return_val[counter] = $(this).val();
      counter++;
    }
  });
  return return_val;
}
