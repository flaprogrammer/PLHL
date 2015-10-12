class Mygallery
	constructor : (opts) ->
		opts = opts || {}
		opts.selector = opts.selector || ''
		opts.slide = opts.slide || '.img'
		opts.prevBut = opts.prevBut || '.teams__leftbut'
		opts.nextBut = opts.nextBut || '.teams__rightbut'

		@$slides = $(opts.selector)
		opts.width = opts.width || @$slides.width()

		@true_width = @$slides.width()

		@slide_width = 300
		@playing = false

		copy = @$slides.find(opts.slide).clone()
		copy2 = @$slides.find(opts.slide).clone()

		@slide_width = opts.width

		@$slides.append(copy)
		@$slides.prepend(copy2)

		@len = $(opts.slide).length
		@$slides.css('left', -@true_width*(@len/3)+'px')
		@current = @len/3


		$(opts.prevBut).on('click', => @goToSlide('prev'))
		$(opts.nextBut).on('click', => @goToSlide('next'))


	goToSlide : (val) ->

		return if @playing
		v = -1 if val=='prev'
		v = 1 if val=='next'

		@current += v
		@current = @len-1 if @current<0
		@current = 0 if @current>@len-1

		@showSlide(@current)

	checkMiddle : ->

		if @current>@len/3*2
			@current-= @len/3
			@$slides.css('left', -@slide_width*(@current)+'px')
		else if @current<@len/3
			@current+= @len/3
			@$slides.css('left', -@slide_width*(@current)+'px')


	showSlide : (val) ->
		@playing = true
		@$slides.velocity({
				left: -val*@slide_width
			}, =>
			@checkMiddle()
			@playing = false
		)


class TwoGallery
	constructor: (opts) ->
		opts = opts || {}
		opts.selector = opts.selector || ''
		opts.slide = opts.slide || '.img'
		opts.prevBut = opts.prevBut || '.teams__leftbut'
		opts.nextBut = opts.nextBut || '.teams__rightbut'

		@$slides = $(opts.selector)
		opts.width = opts.width || this.$slides.width()

		@true_width = @$slides.width()

		@slide_width = 300
		@playing = false

		@slide_width = opts.width

		@len = Math.ceil(@true_width / @slide_width)
		@$slides.css('left', 0+'px')
		@current = 0


		$(opts.prevBut).on('click', => @goToSlide('prev'))
		$(opts.nextBut).on('click', => @goToSlide('next'))

	goToSlide : (val) ->

		return if @playing
		v = -1 if val=='prev'
		v = 1 if val=='next'

		@current += v
		@current = @len-1 if @current<0
		@current = 0 if @current>@len-1

		@showSlide(@current)


	showSlide : (val) ->
		self = this
		@playing = true
		@$slides.velocity({
				left: -val*@slide_width
			}, 800, =>
			@playing = false
		)





g1 = new Mygallery({
	selector : '.teams__images'
	slide : '.teams__img'
	prevBut : '.teams__leftbut'
	nextBut : '.teams__rightbut'
	width: 300
})

g2 = new TwoGallery({
	selector : '.results__list'
	slide : '.results__el'
	prevBut : '.results__leftbut'
	nextBut : '.results__rightbut'
	width: 660
})

gal_index = 0
$('.gal__el').each((index, el) ->
	#$(el).css('position', 'absolute') if index % 2 == 0
	if $(el).hasClass('gal__el--big')
		$(el).css('margin-left', '180px') if gal_index%2 == 1
		gal_index = 0
	else if $(el).hasClass('gal__el--small')
		$(el).css('position', 'absolute') if gal_index%2 == 0
		gal_index++


)


g3 = new TwoGallery({
	selector : '.gal__list'
	slide : '.gal__el'
	prevBut : '.gal__leftbut'
	nextBut : '.gal__rightbut'
	width: 650
})

