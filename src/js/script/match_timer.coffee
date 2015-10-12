do ->

	interval = (time, callback) -> setInterval(callback, time)
	$time = $('.curm__timer_time')


	if $time.length>0
		val = $time.text()
		reg = /(\d{1,2}):(\d{1,2})/
		match = reg.exec(val)
		try
			m = parseInt match[1]
			s = parseInt match[2]
		catch e
			console.log 'ILLEGAL TIME'
			return


		match_timer = interval 1000, ->
			s--
			if s<=0 && m<=0
				clearInterval match_timer
				renderTime(0,0)
				return
			if s<0
				m--
				s = 59
			renderTime(m,s)

	renderTime = (m,s) ->
		if s<10 then s = '0'+s
		$time.text("#{m}:#{s}")
