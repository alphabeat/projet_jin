var socket = io.connect('http://localhost:3000');

$(document).ready(function() {
	socket.on('server_message', function(message) {
		newQuest(message);
	});

	$("#new_obj").click(function(){
		socket.emit('new_obj', $("#obj_content").val());
		$("#obj_content").val('').focus();
	});
});

function newQuest(message) {
	$("#new").append('<h3>Nouvel objectif !</h3><p>'+message+'</p><br /><input type="button" id="ok_obj" value="OK" />');
	$("#new").show();

	$("#ok_obj").click(function() {
		$("#new").empty().hide();
		$("#objectifs").append('<p>'+ message +'</p>');
	});
}
