var socket = io.connect('http://localhost:3000');

var objectifsListData = [];

$(document).ready(function() {
	socket.on('server_message', function(message) {
		newQuest(message);
	});

	populateList();

	$("#new_obj").click(function(){
		var newObj = {
			'titre': $("#obj_titre").val(),
			'description': $("#obj_descr").val()
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
                // Send socket
                socket.emit('new_obj', newObj);
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
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
		populateList();
		$("#new").empty().hide();
	});
}