const preLoad = () => {
    window.onload = modal;
    function modal() {
        $('#modalStart').modal('show');
        setTimeout(function () {
            $('#modalStart').modal('hide');
        }, 2000);
    }
}
export {preLoad as default}