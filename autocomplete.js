var is_ac_event = false;
class Autocomplete {
    constructor(let_input_target) {
        this.ac_url = "/ajax/autocomplete_ort_plz.cfm";
        this.ac_extra = "";
        this.ac_container = "autocomplete_container";
        this.ac_list = "autocomplete_list";
        this.input_target = let_input_target;
        this.ac_container_addTopPos = 40;
        this.ac_container_fixed = false;

        if ( $("#"+this.ac_container).length == 0 ) {
            $("body").append('<div id="'+this.ac_container+'" style="display: none; position: absolute; max-width: calc(100% - 20px); width: 276px; top: 0; left: 0; overflow: auto; max-height: 110px; z-index: 99999 !important;" class="ac_results"><ul id="'
            +this.autocomplete_list+'"></ul></div>');
        }
        this.events();
    }

    setFixedPos(isFixed) {
        this.ac_container_fixed = isFixed;
        $("#"+this.ac_container).css("position", this.ac_container_fixed? "fixed" : "absolute");
    }

    addAfterEvent(ae) {
        this.afterEvent = ae;
    }

    ac_request() {
        if(is_ac_event == false) {
            is_ac_event = true;
            const input_value = $("#"+this.input_target).val();
            var ac = this;

            var requestData = "debugoutput=no&limit=9&timestamp="+ new Date().getTime() +"&q="+input_value + ac.ac_extra;
            jQuery.ajax({
                url: this.ac_url,
                method: 'GET',
                data: requestData,
                error: function(xhr, status, error) { is_ac_event = false; },

                success: function(result) {
                    var result_array = result.split("\n");

                    $("#"+ac.ac_container).html("");
                    for (let i = 0; i < result_array.length; i++) {
                        result_array[i] = result_array[i].trim();
                        if(result_array[i].length > 1) {
                            $("#"+ac.ac_container).append('<li id="'+ac.ac_list+'_listitem'+i+'">'+result_array[i]+'</li>');
                            $('#'+ac.ac_list+'_listitem'+i).on("click", function() {
                                $('#'+ac.input_target+'').val(''+result_array[i]+''); $('#'+ac.ac_container).hide(); if(typeof ac.afterEvent === 'function') ac.afterEvent.call();
                            });
                        }
                    }

                    let input_target_pos = $("#"+ac.input_target).offset();
                    $("#"+ac.ac_container)
                        .css("left", input_target_pos.left)
                        .css("top", input_target_pos.top + ac.ac_container_addTopPos)
                        .css("display", "block");
                    is_ac_event = false;
                }
            });
        }
    }

    events() {
        var ac = this;
        $("#"+ac.input_target)
            .on("focusout", function( ) { if (is_ac_event == false) $("#"+ac.ac_container).hide(); })
            .on("click", function( ) { ac.ac_request(); })
            .on("keyup", function(e) { 
                if(e.keyCode === 13) {  
                    $("#"+ac.input_target).val( $( $("#autocomplete_container").children()[0] ).html() );
                    $("#"+ac.ac_container).hide();
                    if(typeof ac.afterEvent === "function") ac.afterEvent.call(); 
                } else {
                    ac.ac_request();
                }
            })
            .on("change", function( ) { 
                $("#"+ac.input_target).val( $( $("#autocomplete_container").children()[0] ).html() );
                $("#"+ac.ac_container).hide();
                if(typeof ac.afterEvent === "function") ac.afterEvent.call(); 
            });
    }

}
