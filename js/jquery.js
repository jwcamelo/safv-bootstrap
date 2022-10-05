$('.sidebar ul li').on('click', function () {
  $('.sidebar ul li.active').removeClass('active');
  $(this).addClass('active');
});

$('.open-btn').on('click', function () {
  $('.sidebar').addClass('active');
});

$('.close-btn').on('click', function () {
  $('.sidebar').removeClass('active');
});

$('.btn-next').on('click', function () {
  $('.page-1').addClass('hidden');
  $('.page-2').removeClass('hidden');
});

$('.btn-back').on('click', function () {
  $('.page-2').addClass('hidden');
  $('.page-1').removeClass('hidden');
});