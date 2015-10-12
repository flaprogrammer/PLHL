if ($('.bigtable__select').length) {
  $('.bigtable__select').customSelect();
}

if ($('.teamplayers__season').length) {
  $('.teamplayers__season').customSelect();
}

if ($('.teamplayers__tab').length) {
  $('.teamplayers__tab').on('click', function() {
    var index;
    index = $('.teamplayers__tab').index($(this));
    $('.teamplayers__tab').removeClass('teamplayers__tab--active');
    $(this).addClass('teamplayers__tab--active');
    $('.teamplayers__content').removeClass('teamplayers__content--active');
    return $('.teamplayers__content').eq(index).addClass('teamplayers__content--active');
  });
}

var Mygallery, TwoGallery, g1, g2, g3, gal_index;

Mygallery = function(opts) {
  var copy, copy2, self;
  opts = opts || {};
  opts.selector = opts.selector || '';
  opts.slide = opts.slide || '.img';
  opts.prevBut = opts.prevBut || '.teams__leftbut';
  opts.nextBut = opts.nextBut || '.teams__rightbut';
  this.$slides = $(opts.selector);
  opts.width = opts.width || this.$slides.width();
  this.true_width = this.$slides.width();
  this.slide_width = 300;
  this.playing = false;
  self = this;
  copy = this.$slides.find(opts.slide).clone();
  copy2 = this.$slides.find(opts.slide).clone();
  this.slide_width = opts.width;
  this.$slides.append(copy);
  this.$slides.prepend(copy2);
  this.len = $(opts.slide).length;
  this.$slides.css('left', -this.true_width * (this.len / 3) + 'px');
  this.current = this.len / 3;
  $(opts.prevBut).on('click', function() {
    return self.goToSlide('prev');
  });
  $(opts.nextBut).on('click', function() {
    return self.goToSlide('next');
  });
  return this;
};

Mygallery.prototype.goToSlide = function(val) {
  var v;
  if (this.playing) {
    return;
  }
  if (val === 'prev') {
    v = -1;
  }
  if (val === 'next') {
    v = 1;
  }
  this.current += v;
  if (this.current < 0) {
    this.current = this.len - 1;
  }
  if (this.current > this.len - 1) {
    this.current = 0;
  }
  return this.showSlide(this.current);
};

Mygallery.prototype.checkMiddle = function() {
  if (this.current > this.len / 3 * 2) {
    this.current -= this.len / 3;
    return this.$slides.css('left', -this.slide_width * this.current + 'px');
  } else if (this.current < this.len / 3) {
    this.current += this.len / 3;
    return this.$slides.css('left', -this.slide_width * this.current + 'px');
  }
};

Mygallery.prototype.showSlide = function(val) {
  var self;
  self = this;
  this.playing = true;
  return this.$slides.velocity({
    left: -val * self.slide_width
  }, function() {
    self.checkMiddle();
    return self.playing = false;
  });
};

TwoGallery = function(opts) {
  var self;
  opts = opts || {};
  opts.selector = opts.selector || '';
  opts.slide = opts.slide || '.img';
  opts.prevBut = opts.prevBut || '.teams__leftbut';
  opts.nextBut = opts.nextBut || '.teams__rightbut';
  this.$slides = $(opts.selector);
  opts.width = opts.width || this.$slides.width();
  this.true_width = this.$slides.width();
  this.slide_width = 300;
  this.playing = false;
  self = this;
  this.slide_width = opts.width;
  this.len = Math.ceil(this.true_width / this.slide_width);
  this.$slides.css('left', 0 + 'px');
  this.current = 0;
  $(opts.prevBut).on('click', function() {
    return self.goToSlide('prev');
  });
  $(opts.nextBut).on('click', function() {
    return self.goToSlide('next');
  });
  return this;
};

TwoGallery.prototype.goToSlide = function(val) {
  var v;
  if (this.playing) {
    return;
  }
  if (val === 'prev') {
    v = -1;
  }
  if (val === 'next') {
    v = 1;
  }
  this.current += v;
  if (this.current < 0) {
    this.current = this.len - 1;
  }
  if (this.current > this.len - 1) {
    this.current = 0;
  }
  return this.showSlide(this.current);
};

TwoGallery.prototype.showSlide = function(val) {
  var self;
  self = this;
  this.playing = true;
  return this.$slides.velocity({
    left: -val * self.slide_width
  }, 800, function() {
    return self.playing = false;
  });
};

g1 = new Mygallery({
  selector: '.teams__images',
  slide: '.teams__img',
  prevBut: '.teams__leftbut',
  nextBut: '.teams__rightbut',
  width: 300
});

g2 = new TwoGallery({
  selector: '.results__list',
  slide: '.results__el',
  prevBut: '.results__leftbut',
  nextBut: '.results__rightbut',
  width: 660
});

gal_index = 0;

$('.gal__el').each(function(index, el) {
  if ($(el).hasClass('gal__el--big')) {
    if (gal_index % 2 === 1) {
      $(el).css('margin-left', '180px');
    }
    return gal_index = 0;
  } else if ($(el).hasClass('gal__el--small')) {
    if (gal_index % 2 === 0) {
      $(el).css('position', 'absolute');
    }
    return gal_index++;
  }
});

g3 = new TwoGallery({
  selector: '.gal__list',
  slide: '.gal__el',
  prevBut: '.gal__leftbut',
  nextBut: '.gal__rightbut',
  width: 650
});

(function() {
  var $time, e, error, interval, m, match, match_timer, reg, renderTime, s, val;
  interval = function(time, callback) {
    return setInterval(callback, time);
  };
  $time = $('.curm__timer_time');
  if ($time.length > 0) {
    val = $time.text();
    reg = /(\d{1,2}):(\d{1,2})/;
    match = reg.exec(val);
    try {
      m = parseInt(match[1]);
      s = parseInt(match[2]);
    } catch (error) {
      e = error;
      console.log('ILLEGAL TIME');
      return;
    }
    match_timer = interval(1000, function() {
      s--;
      if (s <= 0 && m <= 0) {
        clearInterval(match_timer);
        renderTime(0, 0);
        return;
      }
      if (s < 0) {
        m--;
        s = 59;
      }
      return renderTime(m, s);
    });
  }
  return renderTime = function(m, s) {
    if (s < 10) {
      s = '0' + s;
    }
    return $time.text(m + ":" + s);
  };
})();
