$('.tab-content:not(.default)').hide();
$('.nav-tab').on('click',function(){
	var type = $(this).data('type')
	$(this).addClass('active').siblings('.nav-tab').removeClass('active');
	$('.tab-content#'+type).show().siblings('.tab-content').hide();
})

$('.tab-option-content:not(.default)').hide();
$('.tab-option').on('click',function(){
	var type = $(this).data('type')
	$(this).addClass('history-active').siblings('.tab-option').removeClass('history-active');
	$('.tab-option-content.'+type).show().siblings('.tab-option-content').hide();
})