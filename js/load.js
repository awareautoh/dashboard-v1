window.onload = modal;
function modal() {
    $('#modalStart').modal('show');
    setTimeout(function () {
       $('#modalStart').modal('hide');
    }, 2000);
}