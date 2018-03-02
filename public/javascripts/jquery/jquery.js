
$(document).ready(function() {
    $('#search-box').keydown(function(event){
        if(event.keyCode == 13) {
        event.preventDefault();
        return false;
        }
    });

    $('#search-box-user').keydown(function(event){
        if(event.keyCode == 13) {
        event.preventDefault();
        return false;
        }
    });

    $('#nav-icon').on('click',function(){
        console.log("entra")
        $( ".nav-li").toggleClass("display")
        
        });
        

});
