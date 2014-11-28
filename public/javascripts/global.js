var socket = io.connect('http://localhost:3000');

var objectifsListData = [];

$(document).ready(function() {
	socket.on('server_message', function(message) {
		console.log(message);
		newQuest(message);
	});

	populateList();

	$("#new_obj").click(function(){
		socket.emit('new_obj', {
			'titre': $("#obj_titre").val(), 
			'description': $("#obj_descr").val()
		});

		$("#obj_titre").val('').focus();
		$("#obj_descr").val('');
	});
});

function populateList() {
	$.getJSON('/objectifs/objectifslist', function(data) {
		var newline = '';

		objectifsListData = data;

		$.each(data, function() {
			newline += '<p><strong>'+ this.titre +'</strong> : '+ this.description +'</p>';
		});

		$("#objectifs").html(newline);
	});
}

function newQuest(message) {
	$("#new").append('<h3>Nouvel objectif !</h3>');
	$("#new").append('<p><strong>'+message.titre+'</strong><br />');
	$("#new").append(message.description+'</p><br />');
	$("#new").append('<input type="button" id="ok_obj" value="OK" />');
	$("#new").show();

	$("#ok_obj").click(function() {
		addObj(message);
	});
}

function addObj(message) {
	$("#new").empty().hide();
	var newObj = {
		'titre': message.titre,
		'description': message.description
	}

        // Use AJAX to post the object to our adduser service
        $.ajax({
        	type: 'POST',
        	data: newObj,
        	url: '/objectifs/addobjectif',
        	dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                // Update the table
                populateList();
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
    };