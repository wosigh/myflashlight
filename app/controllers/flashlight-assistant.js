
var ctrlr;

var FlashlightAssistant = Class.create( {
initialize: function() {
    Mojo.Log.info("Initialize");
    this.iFlameStatus = 0;
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

    this.controller.get('main-title').innerHTML = $L("myFlashlight!"); 
    this.controller.get('flashlightMode').innerHTML = $L("Flashlight Mode");
    this.controller.get('modeSwitchDescription_ON').innerHTML = $L("Your flashlight is ON!  Remember to turn it off so you don't waste your battery!");
    this.controller.get('modeSwitchDescription_OFF').innerHTML = $L("Your flashlight is OFF!  Flip the switch to turn it on.");
    this.controller.get('app-footer').innerHTML = $L("<hr/> <a href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=10858526\">Donate</a> <br> &copy; 2009 PreGame");

    Mojo.Log.info("Setup");
    ctrlr=this.controller;
    this.controller.setupWidget('onOffToggle', this.onOffToggleOpt, this.toggleModel);
    this.controller.get('onOffToggle').observe('mojo-property-change', this.selectorChangedHandler.bind(this));
	this.flameStatus();
	Mojo.Log.error("flamestatus "+this.iFlameStatus);
	if(this.iFlameStatus == 0) {
		this.toggleModel.toggleOpt = "ON";
		this.controller.modelChanged(this.toggleModel);
		this.enableFlashlight();
	}
},

deactivate: function(e) {
	this.disableFlashlight();
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
            method: 'flameOn',
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
flameStatus: function() {
	this.controller.serviceRequest('palm://net.vertigostudios.ledmanager', {
	    method: 'flameStatus',
		OnSuccess: function(data) { 
				Mojo.Log.error(data.status);
				if(data.status) {
					this.iFlameStatus = data.status;
				} else {
					this.iFlameStatus = 0;
				}}.bind(this),
	        parameters: {}
	                                        });
	
	                                        
},
getVersion: function() {
try {
this.controller.get('version').innerHTML = "get version";
	this.controller.serviceRequest('palm://net.vertigostudios.ledmanager', {
		method: 'version',
			parameters: {},
				OnSuccess: function(string) { this.controller.get('version').innerHTML = string.version; },
				OnFailure: function(string) { this.controller.get('version').innerHTML = string; }
			
		});
		}
		catch(err) {
	Mojo.Log.error("version err");
	Mojo.Log.error("err: "+err);		
	}
}


});
