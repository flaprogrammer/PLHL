
Mygallery = (opts) ->
	opts = opts || {}
	opts.selector = opts.selector || ''
	opts.slide = opts.slide || '.img'
	opts.prevBut = opts.prevBut || '.teams__leftbut'
	opts.nextBut = opts.nextBut || '.teams__rightbut'

	this.$slides = $(opts.selector)
	opts.width = opts.width || this.$slides.width()

	this.true_width = this.$slides.width()

	this.slide_width = 300
	this.playing = false
	self = this


	copy = this.$slides.find(opts.slide).clone()
	copy2 = this.$slides.find(opts.slide).clone()

	this.slide_width = opts.width

	this.$slides.append(copy)
	this.$slides.prepend(copy2)

	this.len = $(opts.slide).length
	this.$slides.css('left', -this.true_width*(this.len/3)+'px')
	this.current = this.len/3


	$(opts.prevBut).on('click', -> self.goToSlide('prev'))
	$(opts.nextBut).on('click', -> self.goToSlide('next'))

	return this


Mygallery.prototype.goToSlide = (val) ->

	return if this.playing
	v = -1 if val=='prev'
	v = 1 if val=='next'

	this.current += v
	this.current = this.len-1 if this.current<0
	this.current = 0 if this.current>this.len-1

	this.showSlide(this.current)

Mygallery.prototype.checkMiddle = ->

	if this.current>this.len/3*2
		this.current-= this.len/3
		this.$slides.css('left', -this.slide_width*(this.current)+'px')
	else if this.current<this.len/3
		this.current+= this.len/3
		this.$slides.css('left', -this.slide_width*(this.current)+'px')


Mygallery.prototype.showSlide = (val) ->
	self = this
	this.playing = true
	this.$slides.velocity({
			left: -val*self.slide_width
		}, ->
		self.checkMiddle()
		self.playing = false
	)



TwoGallery = (opts) ->
	opts = opts || {}
	opts.selector = opts.selector || ''
	opts.slide = opts.slide || '.img'
	opts.prevBut = opts.prevBut || '.teams__leftbut'
	opts.nextBut = opts.nextBut || '.teams__rightbut'

	this.$slides = $(opts.selector)
	opts.width = opts.width || this.$slides.width()

	this.true_width = this.$slides.width()

	this.slide_width = 300
	this.playing = false
	self = this


	this.slide_width = opts.width

	this.len = Math.ceil(this.true_width / this.slide_width)
	this.$slides.css('left', 0+'px')
	this.current = 0


	$(opts.prevBut).on('click', -> self.goToSlide('prev'))
	$(opts.nextBut).on('click', -> self.goToSlide('next'))

	return this


TwoGallery.prototype.goToSlide = (val) ->

	return if this.playing
	v = -1 if val=='prev'
	v = 1 if val=='next'

	this.current += v
	this.current = this.len-1 if this.current<0
	this.current = 0 if this.current>this.len-1

	this.showSlide(this.current)


TwoGallery.prototype.showSlide = (val) ->
	self = this
	this.playing = true
	this.$slides.velocity({
			left: -val*self.slide_width
		}, 800, ->
		self.playing = false
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

