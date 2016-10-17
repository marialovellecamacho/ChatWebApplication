/**
 * Javascript for chat
 */

var webSocket;
var messages = $("#messages");


$(document).ready(function() {
	var changeUserModal = $("#continue-user-modal");
	var newUserModal = $("#new-user-modal");
	
	if($.cookie("username") && $.cookie("username") != "undefined") { //if cookie present
		// populate username
		changeUserModal.find(".username-label").text($.cookie("username"));
		
		changeUserModal.modal("show");
	} else {
		newUserModal.modal("show");
	}
	
	$("#send-btn").on("click", function() {
		send();
	});
	
	$(".connect-btn").on("click", function() {
		var username = newUserModal.find(".input-username").val(); // username field
		
		// store username as cookie
		if(!$.cookie("username")) {
			$.cookie("username", username);
		}
		
		// connect to websocket
		openSocket();
		
		// close modal
		newUserModal.modal("hide");
		changeUserModal.modal("hide");
	});
	
	$(".change-user-btn").on("click", function() {
		changeUserModal.modal("hide");
		
		// remove cookie
		$.removeCookie('username');
		
		newUserModal.modal("show");
	});
});

function openSocket(){
	// Ensures only one connection is open at a time
	if(webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED){
	   writeResponse("WebSocket is already opened.");
	    return;
	}
	// Create a new instance of the websocket
	var homeURL = window.location.host + window.location.pathname;
	webSocket = new WebSocket("ws://" + homeURL +"echo/"+$.cookie("username"));
 
	/**
	 * Binds functions to the listeners for the websocket.
	 */
	webSocket.onopen = function(event){
	    if(event.data === undefined)
	        return;
	    
	    writeConnected({
	    	username:$.cookie("username")
	    });
	    
	    alertConnect();
	};
 
	webSocket.onmessage = function(event){
		
		data = JSON.parse(event.data);
		
		if(data.type == "message") {
			writeResponse(data);
		} else if (data.type == "online") {
			writeConnected(data);
		} else if (data.type == "offline") {
			writeDisconnected(data);
		}
	};
 
    webSocket.onclose = function(event){
        writeResponse("Connection closed");
        
        alertDisconnect();
    };
}
   
	/**
	 * Sends the value of the text input to the server
	 */
	function send(){
		var text = $("#input-msg").val();
        webSocket.send(JSON.stringify({
        	  username: $.cookie("username"),
        	  message: text,
        	  type: "message"
        }));
        
    }
   
    function closeSocket(){
        webSocket.close();
        
        writeDisconnected({
        	username: $.cookie("username")
        });
    }
 
    function writeConnected(data){
    	if(data.username != $.cookie("username")) {
    		$("#messages").append("<li> <div class='connected'>"+data.username+" is now online.</div></li>");
    	} else {
    		$("#messages").append("<li> <div class='connected'>You are now online.</div></li>");
    	}
    	
    }
    
    function writeDisconnected(data){
    	$("#messages").append("<li> <div class='disconnected'>"+data.username+" is now offline.</div></li>");
    }
    
    function writeResponse(data){
    	var d = new Date();
    	
    	var datetime = (d.getMonth()+1) + "/"
        + d.getDate()  + "/" 
        + d.getFullYear() + " "  
        + formatAMPM(d);
    	
    	if(data.username != $.cookie("username")) {
    		$("#messages").append("<li><div><b>"+data.username+": </b><br/><p>" + data.message+"</p> <span class='timestamp'>"+datetime+"</span></div></li>");
    	} else {
    		$("#messages").append("<li> <div class='own-msg'><p>"+data.message+"</p><span class='timestamp'>"+datetime+"</span></div></li>");
    	}
        
        // clear input field
        $("#input-msg").val("");
    }
    
    function formatAMPM(date) {
    	  var hours = date.getHours();
    	  var minutes = date.getMinutes();
    	  var ampm = hours >= 12 ? 'pm' : 'am';
    	  hours = hours % 12;
    	  hours = hours ? hours : 12; // the hour '0' should be '12'
    	  minutes = minutes < 10 ? '0'+minutes : minutes;
    	  var strTime = hours + ':' + minutes + ' ' + ampm;
    	  return strTime;
    	}
    
    /*
     * Alerts	
     */
    function alertConnect() {
	    $(".connected-alert").show();
	    setTimeout(function() {
	    	$(".connected-alert").hide();
	    }, 2000);
    }
    
    function alertDisconnect() {
    	$(".disconnected-alert").show();
	    setTimeout(function() {
	    	$(".disconnected-alert").hide();
	    }, 2000);
    }