$( document ).ready( () => {

	$('.nav li').not('.active').addClass('disabled');
	$('.nav li').not('.active').find('a').removeAttr("data-toggle");
	
	$('#configureField').on('click', () => {
		$('.nav li.active').next('li').removeClass('disabled');
		$('.nav li.active').next('li').find('a').attr("data-toggle","tab");
		$('a[href="'+$('.nav li.active').next('li').find('a').attr('href')+'"]').trigger('click');
		var inputFields = getInputFields();
		$.each(inputFields, function(key, value) {
			$('#inputFilter').append($("<option></option>").attr("value",value).text(value)); 
		});
	});

	$('#configureSms').on('click', () => {
		$('.nav li.active').next('li').removeClass('disabled');
		$('.nav li.active').next('li').find('a').attr("data-toggle","tab");
		$('a[href="'+$('.nav li.active').next('li').find('a').attr('href')+'"]').trigger('click');
		var inputFields = getInputFields();
		$.each(inputFields, function(key, value) {
			$('#smsKey').append($("<option></option>").attr("value",value).text(value)); 
		});
	});

	$('#addField').on('click', () => {
		$('.input-fields').append('<div class="row"><div class="form-group col-md-5">\
		<input type="text" name="inputkeys[]" class="form-control" placeholder="Key"/></div>\
		<div class="form-group col-md-5"><input type="text" name="inputvalues[]" class="form-control" placeholder="Text / Number"/></div>\
		<a href="#" class="remove_field"><i class="glyphicon glyphicon-trash"></i></a></div>');
	});

	function getInputFields() {
		var inputFields = $("input[name='inputkeys[]']").map(function(){return $(this).val();}).get();
		return inputFields;
	}

});