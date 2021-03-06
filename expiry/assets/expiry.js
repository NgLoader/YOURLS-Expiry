// Create new link with expiry data and add to table
function add_link_expiry() {
	if( $('#add-button').hasClass('disabled') ) {
		return false;
	}
	var newurl = $("#add-url").val();
	var nonce = $("#nonce-add").val();
	var expiry = $("#expiry").val();
	var age = $("#age").val();
	var ageMod = $("#ageMod").val();
	var count = $("#count").val();
	var postx = $("#postx").val();
	if ( !newurl || newurl == 'http://' || newurl == 'https://' ) {
		return;
	}
	var keyword = $("#add-keyword").val();
	add_loading("#add-button");
	$.getJSON(
		ajaxurl,
		{action:'add', url: newurl, keyword: keyword, expiry: expiry, age: age, ageMod: ageMod, count: count, postx: postx, nonce: nonce},
		function(data){
			if(data.status == 'success') {
				$('#main_table tbody').prepend( data.html ).trigger("update");
				$('#nourl_found').css('display', 'none');
				zebra_table();
				increment_counter();
				toggle_share_fill_boxes( data.url.url, data.shorturl, data.url.title );
			}

			add_link_reset();
			end_loading("#add-button");
			end_disable("#add-button");

			feedback(data.message, data.status);
		}
	);
}
// dealing with the expiry list form
function setExpiryCookie(name,value) {
    document.cookie = name + "=" + (value || "");
}
// expiry info on admin page
function expiry_infos(url) {
	var shorturl = ( url == null ? $( '#copylink' ).val() : url );
	$.ajax({
		type: "GET",
		url: ajaxurl,
		data:{action:'expiry-stats', shorturl: shorturl},
		success: function(data) {
			var smpl = data.simple;
			var msg = '<div style="padding:4px;border:1px solid #CDCDCD;background:#C7E7FF;clear:both;"><strong>Expiry: </strong>' + smpl + '</div>';
			$(exp_result).html(msg);
		}
	});
}
$(document).ready( function( ){
	// Share button behavior
	$( '.button_share' ).click( function( ){
		expiry_infos( );
	});			
});
