if $('.bigtable__select').length
	$('.bigtable__select').customSelect()

if $('.teamplayers__season').length
	$('.teamplayers__season').customSelect()

if $('.teamplayers__tab').length
	$('.teamplayers__tab').on('click', ->
		index = $('.teamplayers__tab').index $(this)

		$('.teamplayers__tab').removeClass('teamplayers__tab--active')
		$(this).addClass('teamplayers__tab--active')

		$('.teamplayers__content').removeClass('teamplayers__content--active')
		$('.teamplayers__content').eq(index).addClass('teamplayers__content--active')


	)