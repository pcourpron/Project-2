$(document).ready(() => {
  const showOnly = (category) => {
    $('.hideCategory').hide();
    $(`${category}`).show();
  };

  $('select').formSelect();
  $('.carousel').carousel();

  $(document).keydown(function(e) {
    switch (e.which) {
      case 37:
        $('.carousel').carousel('prev');
        break;
      case 39:
        $('.carousel').carousel('next');
        break;
      default:
        return;
    }
    e.preventDefault();
  });

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


  $('.btn').click(function () {
    var parent = $(this).parents().eq(4)  
    var id = this.dataset.id
    if ($(this).parents().eq(4)[0].classList[1] === 'active') {

      $.ajax("/api/deleteWorkout", {
        type: "POST",
        data: {id:id}
      }).then(function (response) {
        if (response === true){
          window.location.reload()
        }
      })
    }

  })

})
