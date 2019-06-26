class Autocomplete {
    constructor(let_input_target, let_ac_url) {
        this.ac_url = let_ac_url;
        this.ac_container = "autocomplete_container";
        this.ac_list = "autocomplete_list";
		    this.input_target = let_input_target;
		
        this.use_plz = 1;
        this.stadtteil_mit_anzeigen = 0;
        this.plz_mit_anzeigen = 1;
        this.nur_ort_anzeigen = 0;
        this.ac_container_addTopPos = 90;
        this.ac_container_fixed = false;

        if ( $("#"+this.ac_container).length == 0 ) {
            $("body").append('<div id="'+this.ac_container+'" style="display: none; position: absolute; max-width: calc(100% - ' + this.ac_container_addTopPos +'px); width: 417px; top: 0; left: 0; overflow: auto; max-height: 110px;" class="ac_results"><ul id="'
               +this.autocomplete_list+'"></ul></div>');
		    }
		
		this.events();
	  }
	
    setConfig(use_plz, stadtteil_mit_anzeigen, plz_mit_anzeigen, nur_ort_anzeigen, ac_container_addTopPos, ac_container_fixed) {
        this.use_plz = use_plz;
        this.stadtteil_mit_anzeigen = stadtteil_mit_anzeigen;
        this.plz_mit_anzeigen = plz_mit_anzeigen;
        this.nur_ort_anzeigen = nur_ort_anzeigen;
        this.ac_container_addTopPos = ac_container_addTopPos;
		  this.ac_container_fixed = ac_container_fixed;
	  }
	
    useConfig() {
      $("#"+this.input_target).css("position", this.ac_container_fixed? "fixed" : "absolute");
    }

    ac_request() {
		useConfig();
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
                nur_ort_anzeigen: this.nur_ort_anzeigen
            },
            error: function(xhr, status, error) {},

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

                let input_target_pos = $("#"+this_input_target).position();
				$("#"+this_ac_container)
					.css("left", input_target_pos.left)
					.css("top", input_target_pos.top + this_ac_container_addTopPos)
					.css("display", "block");
            }
        });
    }

	events() {
		var ac = this;
		var is_ac_event = false;
		$("#"+ac.input_target)
			.on("keyup", function(e) { 
				if(e.keyCode === 13) {  
					$("#"+ac.input_target).val( $( $("#autocomplete_container").children()[0] ).html() );
					$("#"+ac.ac_container).css("display", "none");
				} else {
					is_ac_event = true; ac.ac_request(); is_ac_event = false; 
				}
			})
			.on("click", function() { is_ac_event = true; ac.ac_request(); is_ac_event = false; });
		$(window).on("click", function() {
			setTimeout(() => {
				if (is_ac_event == false) {
					$("#"+ac.ac_container).css("display", "none");
				}
			}, 2);
		});
	}
}
