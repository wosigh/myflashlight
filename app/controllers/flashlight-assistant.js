
var ctrlr;
var FlashlightAssistant = Class.create( {
initialize: function() {
    Mojo.Log.info("Initialize");

	//this.disableFlashlight();
    this.onOffToggleOpt= {
	    modelProperty: 'toggleOpt',
	    trueValue: "ON",
	    falseValue: "OFF"	
    };

    this.toggleModel= {
	    toggleOpt: "OFF",
	    disabled : false
    };

},

setup: function(){
    Mojo.Log.info("Setup");
    ctrlr=this.controller;
    this.controller.setupWidget('onOffToggle', this.onOffToggleOpt, this.toggleModel);
    this.controller.get('onOffToggle').observe('mojo-property-change', this.selectorChangedHandler.bind(this));
	this.getVersion();
},

selectorChangedHandler: function(e) {
    Mojo.Log.info("selectorChangedHandler");

    if(e.value=="OFF") {
        this.disableFlashlight();
    } else {
       this.enableFlashlight();
    }
        
    },
enableFlashlight: function() {
	this.controller.get('modeSwitchDescription_OFF').hide();
        this.controller.get('modeSwitchDescription_ON').show();
        this.controller.serviceRequest('palm://net.vertigostudios.ledmanager', {
            method: 'flameOn2',
                parameters: {}
                                                });
                                                
},
disableFlashlight: function() {
	this.controller.get('modeSwitchDescription_ON').hide();
	this.controller.get('modeSwitchDescription_OFF').show();
	this.controller.serviceRequest('palm://net.vertigostudios.ledmanager', {
	    method: 'flameOff',
	        parameters: {}
	                                        });
	                                        
},
getVersion: function() {
try {
	this.controller.serviceRequest('palm://net.vertigostudios.ledmanager', {
		method: 'version',
			parameters: {},
				OnSuccess: function(string) { this.controller.get('version').innerHTML = string; },
				OnFailure: function(string) { this.controller.get('version').innerHTML = string; }
			
		});
		}
		catch(err) {
	Mojo.Log.error("version err");
	Mojo.Log.error("err: "+err);		
	}
}


});