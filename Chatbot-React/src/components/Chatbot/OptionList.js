/*Dropdown Menu*/
// console.log(document.querySelector('.dropdown'))
// if(document.querySelector('.dropdown').value){

function menu(){
    document.querySelector('.dropdown').click(function () {
        document.querySelector(this).attr('tabindex', 1).focus();
        document.querySelector(this).classList.toggle('active');
        document.querySelector(this).querySelector('.dropdown-menu').slideToggle(300);
    });
    document.querySelector('.dropdown').focusout(function () {
        document.querySelector(this).classList.remove('active');
        document.querySelector(this).querySelector('.dropdown-menu').slideUp(300);
    });
    document.querySelector('.dropdown .dropdown-menu li').click(function () {
        document.querySelector(this).parents('.dropdown').querySelector('span').text(document.querySelector(this).text());
        document.querySelector(this).parents('.dropdown').querySelector('input').attr('value', document.querySelector(this).attr('id'));
    });
    /*End Dropdown Menu*/
    document.querySelector('.dropdown-menu li').click(function () {
    var input = '<strong>' + document.querySelector(this).parents('.dropdown').querySelector('input').value + '</strong>',
      msg = '<span class="msg">Hidden input value: ';
    document.querySelector('.msg').html(msg + input + '</span>');
    }); 
}

export  default menu;
// }
// 