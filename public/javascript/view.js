$(document).ready(() => {
  const showOnly = (category) => {
    $('.hideCategory').hide();
    $(`${category}`).show();
  };

  $('select').formSelect();
  $('.carousel').carousel();
  showOnly('#all');

  $('#categorySelect').change(function select() {
    switch ($(this).val()) {
      case '1':
        showOnly('#all');
        break;
      case '2':
        showOnly('#crossfit');
        break;
      case '3':
        showOnly('#hike');
        break;
      case '4':
        showOnly('#ride');
        break;
      case '5':
        showOnly('#run');
        break;
      case '6':
        showOnly('#swim');
        break;
      case '7':
        showOnly('#walk');
        break;
      case '8':
        showOnly('#other');
        break;
      default:
        break;
    }
  });
});
