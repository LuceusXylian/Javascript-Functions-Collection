var is_ac_event = false;
class Autocomplete {
    constructor(let_input_target) {
        this.ac_url = "/ajax/autocomplete_ort_plz.cfm";
        this.ac_container = "autocomplete_container";
        this.ac_list = "autocomplete_list";
        this.input_target = let_input_target;
        is_ac_event = false;
        
        this.use_plz = 1;
        this.stadtteil_mit_anzeigen = 0;
        this.plz_mit_anzeigen = 1;
        this.nur_ort_anzeigen = 0;
        this.umland_mit_anzeigen = 0;
        this.ac_container_addTopPos = 90;
        this.ac_container_fixed = false;

        if ( $("#"+this.ac_container).length == 0 ) {
            $("body").append('<div id="'+this.ac_container+'" style="display: none; position: absolute; max-width: calc(100% - 20px); width: 417px; top: 0; left: 0; overflow: auto; max-height: 110px; z-index: 99999 !important;" class="ac_results"><ul id="'
            +this.autocomplete_list+'"></ul></div>');
        }
        this.events();
    }
    
    setConfig(use_plz, stadtteil_mit_anzeigen, plz_mit_anzeigen, nur_ort_anzeigen, umland_mit_anzeigen, ac_container_addTopPos, ac_container_fixed) {
        this.use_plz = use_plz;
        this.stadtteil_mit_anzeigen = stadtteil_mit_anzeigen;
        this.plz_mit_anzeigen = plz_mit_anzeigen;
        this.nur_ort_anzeigen = nur_ort_anzeigen;
        this.umland_mit_anzeigen = umland_mit_anzeigen;
        this.ac_container_addTopPos = ac_container_addTopPos;
        this.ac_container_fixed = ac_container_fixed;

        $("#"+this.ac_container).css("position", this.ac_container_fixed? "fixed" : "absolute");
    }
    
    ac_request() {
        if(is_ac_event == false) {
            is_ac_event = true;
            const input_value = $("#"+this.input_target).val(), this_input_target = this.input_target, this_ac_list = this.ac_list,
                this_ac_container = this.ac_container, this_ac_container_addTopPos = this.ac_container_addTopPos;

            jQuery.ajax({
                url: this.ac_url,
                method: 'GET',
                data: { 
                    debugoutput: "No",
                    q: input_value,
                    limit: 9,
                    timestamp: new Date().getTime(),
                    use_plz: this.use_plz,
                    stadtteil_mit_anzeigen:	this.stadtteil_mit_anzeigen,
                    plz_mit_anzeigen: this.plz_mit_anzeigen,
                    nur_ort_anzeigen: this.nur_ort_anzeigen,
                    umland_mit_anzeigen: this.umland_mit_anzeigen
                },
                error: function(xhr, status, error) { is_ac_event = false; },

                success: function(result) {
                    var result_array = result.split("\n"), ac_list_content = "";

                    for (let i = 0; i < result_array.length; i++) {
                        result_array[i] = result_array[i].trim();
                        if(result_array[i].length > 1) {
                            ac_list_content += '<li id="'+this_ac_list+'_listitem'+i
                                +'" onclick="$(\'#'+this_input_target+'\').val(\''+result_array[i]+'\'); $(\'#'+this_ac_container+'\').css(\'display\', \'none\');">' 
                                + result_array[i] + '</li>';

                        }
                    }
                    $("#"+this_ac_container).html(ac_list_content);

                    let input_target_pos = $("#"+this_input_target).offset();
                    $("#"+this_ac_container)
                        .css("left", input_target_pos.left)
                        .css("top", input_target_pos.top + this_ac_container_addTopPos)
                        .css("display", "block");
                    is_ac_event = false;
                }
            });
        }
    }

    events() {
        var ac = this;
        $("#"+ac.input_target)
            .on("keyup", function(e) { 
                if(e.keyCode === 13) {  
                    $("#"+ac.input_target).val( $( $("#autocomplete_container").children()[0] ).html() );
                    $("#"+ac.ac_container).css("display", "none");
                } else {
                    ac.ac_request();
                }
            })
            .on("click", function( ) { ac.ac_request(); });
        $(body).on("click", function() {
            setTimeout(() => {
                if (is_ac_event == false) {
                    $("#"+ac.ac_container).css("display", "none");
                }
            }, 2);
        });
    }

}
