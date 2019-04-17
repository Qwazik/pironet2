$(function(){
  var Plugins = {};
  Plugins.DOM = {
    slider: '[data-slider]',
    tabs: '[data-tabs]'
  }
  Plugins.tabs = function($el){
    var nav = $el.find('[data-nav]'),
        content = $el.find('[data-content]'),
        navActive = nav.data('active'),
      contentActive = content.data('active');
        console.log(1);
    nav.children().click(function(){
      var activeSection = content.children().eq($(this).index());
      $(this).siblings().removeClass(navActive);
      $(this).addClass(navActive);
      content.children().removeClass(contentActive || 'active');
      activeSection.addClass(contentActive || 'active');
      if(activeSection.find('.swiper-container').length){
        var swiper = activeSection.find('.swiper-container')[0].swiper;
        if(swiper) swiper.update();
      }
      
    }).eq(0).click();
  }
  Plugins.slider = function($el){
    var sliders = {
          'carousel':{
            slidesPerView: 4,
            spaceBetween: 30,
            pagination: {
              el: '.swiper-pagination'
            }
          },
          'home':{
            slidesPerView: 1,
            spaceBetween: 15,
            autoplay: true,
            autoplayTimeout: 5000,
            pagination: {
              el: '.swiper-pagination'
            }
          }
        },
        slider = $el.data('slider'),
        need = $el.data('need') || 0,
        swiper;
    console.log(slider);
    if ($el.find('.swiper-slide').length >= need){
      swiper = new Swiper($el, sliders[slider] || {});
    }else{
      return false;
    }
  }
  Plugins.init = function(){
    for(plugin in this){
      var that = this;
      if(plugin === 'DOM' || plugin === 'init') continue;
      $(this.DOM[plugin]).each(function(){
        that[plugin]($(this));
      });
      
    }
  }
  Plugins.init();
});