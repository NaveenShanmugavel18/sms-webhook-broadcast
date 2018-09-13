$( document ).ready( () => {

	$('.nav li').not('.active').addClass('disabled');
	$('.nav li').not('.active').find('a').removeAttr("data-toggle");
	
	$('.next-step').on('click', () => {
		$('.nav li.active').next('li').removeClass('disabled');
		$('.nav li.active').next('li').find('a').attr("data-toggle","tab");
		$('a[href="'+$('.nav li.active').next('li').find('a').attr('href')+'"]').trigger('click');
		var inputFields = getInputFields();
		$('#smsKey option').remove();
		$.each(inputFields, function(key, value) {
			$('.input-fields-populate').append($("<option></option>").attr("value",value).text(value)); 
		});
	});

	$('#addField').on('click', () => {
		$('.input-fields').append('<div class="row"><div class="form-group col-md-5">\
		<input type="text" name="inputkeys[]" class="form-control" placeholder="Key"/></div>\
		<div class="form-group col-md-5"><input type="text" name="inputvalues[]" class="form-control" placeholder="Text / Number"/></div>\
		<a href="#" class="remove_field"><i class="glyphicon glyphicon-trash"></i></a></div>');
	});

	$('body').on('click', '.remove_field', (e) => {
		var $this = $(e.currentTarget);
		$this.closest('div.row').remove();
	});

	$('#clipboardCopy').on('click', () => {
		$('input[name=clipboard]').focus();
		$('input[name=clipboard]').select();
		document.execCommand('copy');
		alert('Copied to clipboard');
	});

	function getInputFields() {
		var inputFields = $("input[name='inputkeys[]']").map(function(){return $(this).val();}).get();
		return inputFields;
	}

});