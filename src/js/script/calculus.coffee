if $('.teamplayers__player').length
	len = $('.teamplayers__player').length
	lastnums = len % 4 || 4
	for i in [1..lastnums]
		$('.teamplayers__player').eq(-i).addClass('teamplayers__player--lastrow')

if $('.plyrs__el').length
	len = $('.plyrs__el').length
	lastnums = len % 2 || 2
	for i in [1..lastnums]
		$('.plyrs__el').eq(-i).addClass('plyrs__el--lastrow')

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