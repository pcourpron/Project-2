const showOnly = (category) => {
  $('.hide').hide();
  $(`${category}`).show();
};

$('#categorySelect').change(function select() {
  switch ($(this).val()) {
    case 'All':
      $('.hide').show();
      break;
    case 'Crossfit':
      showOnly('#crossfit');
      break;
    case 'Hike':
      showOnly('#hike');
      break;
    case 'Ride':
      showOnly('#ride');
      break;
    case 'Run':
      showOnly('#run');
      break;
    case 'Swim':
      showOnly('#swim');
      break;
    case 'Walk':
      showOnly('#walk');
      break;
    case 'Other':
      showOnly('#other');
      break;
    default:
      break;
  }
});
