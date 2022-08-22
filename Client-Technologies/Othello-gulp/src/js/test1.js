console.log('Hello');

$(() => {
  setInterval(() => 
    $('p').css(
      'color', 
      $('p').css('color') === 'rgb(0, 0, 255)' 
        ? 'rgb(255, 0, 0)' 
        : 'rgb(0, 0, 255)'), 
      1000);

  setTimeout(() => $('h1').text('Yoink!'), 5000);
});