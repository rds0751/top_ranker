function loggedOutHomePageInit(){
	signupFormInit();
	loginFormInit();
}

function signupPageInit(){
	signupFormInit();
}
function resetPasswordPageInit(){
	resetPasswordFormInit();
}
function signupFormInit(){
	document.getElementById('signupForm').reset();
	$('#signupForm input').on('input', function(e) { 
        $('#'+e.target.id).addClass('dirty');
    });

	$('#signupForm :input').each( function() { 
        var element = $(this)[0];
        element.setCustomValidity("Required");
    });

    $('#signupForm :input').on('input', function(e) { 
        var element = $('#'+e.target.id)[0];
        if ($('#'+e.target.id).val() == "") {
            element.setCustomValidity("Required");
            $('#'+e.target.id+"Msg").text("Required");
        }
        else {
            element.setCustomValidity("");
            $('#'+e.target.id+"Msg").text("");
        }
    });

    $('#signupForm #email').on('input', function (){
    	if ($('#signupForm #email').val() == "") {
            $('#signupForm #email')[0].setCustomValidity("Required");
            $('#signupForm #emailMsg').text("Required");
        }
        else{
        	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  		if(regex.test($('#signupForm #email').val())){
	  			//Check if email exists
			  	var xmlhttp = new XMLHttpRequest();
		        xmlhttp.onreadystatechange = function() {
		            if (this.readyState == 4 && this.status == 200) {
		            	var result = JSON.parse(xmlhttp.responseText);
		            	if(result['result'] == true){
		            		$('#signupForm #email')[0].setCustomValidity("Email Taken");
	  						$('#signupForm #emailMsg').text("Email in use");
		            	}
		            	else {
		            		$('#signupForm #email')[0].setCustomValidity("");
	  						$('#signupForm #emailMsg').text("");
		            	}
		                
		            }
		        };
		        xmlhttp.open("GET", "/account/handlers/checkEmailExists.php?email=" + $('#signupForm #email').val(), true);
		        xmlhttp.send();

	  		}
	  		else {
	  			$('#signupForm #email')[0].setCustomValidity("Invalid Email");
	  			$('#signupForm #emailMsg').text("Invalid email");
	  		}
        }
    	
    });


    $('#signupForm #username').on('input', function (){
    	if ($('#signupForm #username').val() == "") {
            $('#signupForm #username')[0].setCustomValidity("Required");
            $('#signupForm #usernameMsg').text("Required");
        }
        else{
  			//Check if username exists
		  	var xmlhttp = new XMLHttpRequest();
	        xmlhttp.onreadystatechange = function() {
	            if (this.readyState == 4 && this.status == 200) {
	            	var result = JSON.parse(xmlhttp.responseText);
	            	if(result['result'] == true){
	            		$('#signupForm #username')[0].setCustomValidity("Username Taken");
  						$('#signupForm #usernameMsg').text("Username in use");
	            	}
	            	else {
	            		$('#signupForm #username')[0].setCustomValidity("");
  						$('#signupForm #usernameMsg').text("");
	            	}
	                
	            }
	        };
	        xmlhttp.open("GET", "/account/handlers/checkUsernameExists.php?username=" + $('#signupForm #username').val(), true);
	        xmlhttp.send();
        }
    	
    });

    $('#signupForm #password').on('input', function (){
    	var inp = $('#signupForm #password').val();
    	
    	if($('#signupForm #password').val() == ""){  		
			$('#signupForm #password')[0].setCustomValidity("Required");
			$('#signupForm #passwordMsg').removeClass();
			$('#signupForm #passwordMsg').addClass("text-danger");
  			$('#signupForm #passwordMsg').text("Required");
    	}
    	else{
    		var score = zxcvbn(inp).score;
    		if(score <=2){
	    		$('#signupForm #password')[0].setCustomValidity("Weak Password");
		    	$('#signupForm #passwordMsg').removeClass();
				$('#signupForm #passwordMsg').addClass("text-danger");
	  			$('#signupForm #passwordMsg').text("Weak password");
    		}
    		else if(score == 3){
	    		$('#signupForm #password')[0].setCustomValidity("");
		    	$('#signupForm #passwordMsg').removeClass();
				$('#signupForm #passwordMsg').addClass("text-warning");	    		
	  			$('#signupForm #passwordMsg').text("OK Password");
    		}
    		else if (score == 4){
    			$('#signupForm #password')[0].setCustomValidity("");
		    	$('#signupForm #passwordMsg').removeClass();
				$('#signupForm #passwordMsg').addClass("text-success");    			
	  			$('#signupForm #passwordMsg').text("Strong Password");
    		}
    	}
    	if($('#signupForm #repeatpassword').val() != ""){
    		var pass = $('#signupForm #password').val();
	    	var inp = $('#signupForm #repeatpassword').val();

	    	if(inp !== pass){
	    		$('#signupForm #repeatpassword')[0].setCustomValidity("Required");
	  			$('#signupForm #repeatpasswordMsg').text("Passwords different");
	    	}
	    	else {
	    		$('#signupForm #repeatpassword')[0].setCustomValidity("");
	  			$('#signupForm #repeatpasswordMsg').text("");
	    	}
    	}
    });

    $('#signupForm #repeatpassword').on('input', function (){
    	var pass = $('#signupForm #password').val();
    	var inp = $('#signupForm #repeatpassword').val();

    	if(inp !== pass){
    		$('#signupForm #repeatpassword')[0].setCustomValidity("Required");
  			$('#signupForm #repeatpasswordMsg').text("Passwords different");
    	}
    	else {
	    	$('#signupForm #repeatpassword')[0].setCustomValidity("");
	  		$('#signupForm #repeatpasswordMsg').text("");
	    }
    });
}

function loginFormInit(){
	document.getElementById('loginForm').reset();
}

function resetPasswordFormInit(){
	document.getElementById('passwordResetForm').reset();
	$('#passwordResetForm input').on('input', function(e) { 
        $('#'+e.target.id).addClass('dirty');
    });
	
	$('#passwordResetForm #password').on('input', function (){
    	var inp = $('#passwordResetForm #password').val();
    	
    	if($('#passwordResetForm #password').val() == ""){  		
			$('#passwordResetForm #password')[0].setCustomValidity("Required");
			$('#passwordResetForm #passwordMsg').removeClass();
			$('#passwordResetForm #passwordMsg').addClass("text-danger");
  			$('#passwordResetForm #passwordMsg').text("Required");
    	}
    	else{
    		var score = zxcvbn(inp).score;
    		if(score <=2){
	    		$('#passwordResetForm #password')[0].setCustomValidity("Weak Password");
		    	$('#passwordResetForm #passwordMsg').removeClass();
				$('#passwordResetForm #passwordMsg').addClass("text-danger");
	  			$('#passwordResetForm #passwordMsg').text("Weak password");
    		}
    		else if(score == 3){
	    		$('#passwordResetForm #password')[0].setCustomValidity("");
		    	$('#passwordResetForm #passwordMsg').removeClass();
				$('#passwordResetForm #passwordMsg').addClass("text-warning");	    		
	  			$('#passwordResetForm #passwordMsg').text("OK Password");
    		}
    		else if (score == 4){
    			$('#passwordResetForm #password')[0].setCustomValidity("");
		    	$('#passwordResetForm #passwordMsg').removeClass();
				$('#passwordResetForm #passwordMsg').addClass("text-success");    			
	  			$('#passwordResetForm #passwordMsg').text("Strong Password");
    		}
    	}
    	if($('#passwordResetForm #repeatpassword').val() != ""){
    		var pass = $('#passwordResetForm #password').val();
	    	var inp = $('#passwordResetForm #repeatpassword').val();

	    	if(inp !== pass){
	    		$('#passwordResetForm #repeatpassword')[0].setCustomValidity("Required");
	  			$('#passwordResetForm #repeatpasswordMsg').text("Passwords different");
	    	}
	    	else {
	    		$('#passwordResetForm #repeatpassword')[0].setCustomValidity("");
	  			$('#passwordResetForm #repeatpasswordMsg').text("");
	    	}
    	}
    });

    $('#passwordResetForm #repeatpassword').on('input', function (){
    	var pass = $('#passwordResetForm #password').val();
    	var inp = $('#passwordResetForm #repeatpassword').val();

    	if(inp !== pass){
    		$('#passwordResetForm #repeatpassword')[0].setCustomValidity("Required");
  			$('#passwordResetForm #repeatpasswordMsg').text("Passwords different");
    	}
    	else {
	    	$('#passwordResetForm #repeatpassword')[0].setCustomValidity("");
	  		$('#passwordResetForm #repeatpasswordMsg').text("");
	    }
    });
}

function validateSignupForm(){
	var form = document.getElementById('signupForm');
	$('#signupForm :input').each( function() { 
        $(this).addClass("dirty");
        if($(this).val() == ""){
        	$("#" + $(this).attr('id') + "Msg").text("Required");
        }
    });
	document.getElementById('signupBtn').setCustomValidity("");
	document.getElementById('loginBtnLink1').setCustomValidity("");

	var isValidForm = form.checkValidity();
	return isValidForm;
}

function validateResetPasswordForm(){
	var form = document.getElementById('passwordResetForm');
	$('#passwordResetForm :input').each( function() { 
        $(this).addClass("dirty");
        if($(this).val() == ""){
        	$("#" + $(this).attr('id') + "Msg").text("Required");
        }
    });
	document.getElementById('resetPasswordBtn').setCustomValidity("");

	var isValidForm = form.checkValidity();
	return isValidForm;
}