jQuery(document).ready(function($){$(".testme_button").click(function(){testme_result_back();

	var testme_id = $(this).parents(".testme_area").find("[name=testme_id]").val();
	var answered_arr=$(this).parents(".testme_area").find(":radio:checked");
	var answered = answered_arr.length;
	var questions = $(this).parents(".testme_area").find(".testme_question").length;
		if(answered>questions)
		{
		alert('Вы ответили только на '+answered+' вопросов из '+questions+'.\n\nОтветьте на все вопросы.');}
		else
		{
		var answers_line='';answered_arr.each(function(index,element)
		{var pr = element.value;answers_line += pr+',';});$(this).hide();$(this).after('<div id="testme_result"><img src="https://in-space.ru/wp-content/plugins/wp_testme/images/loading4.gif" alt="" /></div>');
		jQuery.ajax({url: 'https://in-space.ru/wp-content/plugins/wp_testme/testme-action.php',method: 'GET',data: 	'task=testresults&testme_id='+testme_id+'&testme_answers='+answers_line,success: function (html)	{$("#testme_result").html(html);},error: function(){alert ('Не удалось выполнить операцию');testme_result_back();
		}
		});}
		}
		);
		function testme_result_back()		{$("#testme_result").remove();$(".testme_button").show();};$(".testme_result_close").on('click',function(){testme_result_back();return false;});});