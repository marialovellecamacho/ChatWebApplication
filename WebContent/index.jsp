<!DOCTYPE html>
 
<html>
    <head>
        <title>Simple Chat Application</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        
        <!-- JS FILES -->
        <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
        <script type="text/javascript" src="js/jquery.cookie.js"></script>
        <script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/bootstrap/bootstrap-modalmanager.js"></script>
        <script type="text/javascript" src="js/bootstrap/bootstrap-modal.js"></script>
        
        <!-- BOOTSTRAP / CSS FILES -->
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
	    <link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.min.css" />
	    <link rel="stylesheet" type="text/css" href="css/bootstrap-modal.css" />
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        
        <!-- CUSTOM JS FILES -->
	    <script type="text/javascript" src="js/chat.js"></script>
	    
    </head>
    <body>
       
        <!-- <div>
            <input type="text" id="messageinput"/>
        </div>
        <div>
            <button type="button" onclick="openSocket();" >Open</button>
            <button type="button" onclick="send();" >Send</button>
            <button type="button" onclick="closeSocket();" >Close</button>
        </div> -->
        <!-- Server responses get written here -->
        <!-- <div id="messages"></div> -->
        
        <ul id="messages"></ul>
        <div class="alert alert-success hide connected-alert" role="alert">Connected!</div>
        <div class="alert alert-danger hide disconnected-alert" role="alert">Connection Failed!</div>
	    <form id="msg-form" action="">
		    <div class="input-group">
			    <input type="text" id="input-msg" class="form-control" placeholder="Type your message here...">
			    <span class="input-group-btn">
			        <button id="send-btn" class="btn btn-success" type="button">Send</button>
			   </span>
			</div>
	    </form>
	    
	    <div id="new-user-modal" class="modal fade hide" data-backdrop="static">
		    <div class="form-panel">
				<div class="modal-header">
					<h3>Welcome!</h3>
				</div>
				<div class="modal-body">
					<form class="form-inline">
						<div class="form-group">
						    <label for="input-username"><h4>Enter username:</h4></label>
						    <input type="text" id="input-username" class="input-username form-control" placeholder="Type your username here...">
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button class="btn btn-success connect-btn" type="button">Connect</button>
				</div>
			</div>
	    </div>
	    
	    <div id="continue-user-modal" class="modal fade hide" data-backdrop="static">
	    	<div class="form-panel" >
				<div class="modal-body">
					<h3>Welcome back, <span class="username-label"></span>!</h3>
				</div>
				<div class="modal-footer">
					<button class="btn btn-success connect-btn" type="button">Connect</button>
					<button class="btn btn-primary change-user-btn" type="button">Change user</button>
				</div>
			</div>
	    </div>
       
    </body>
</html>