window.onload = function(){
    if(sessionStorage.getItem('ACCESS_TOKEN') == null){
        window.location.href = '/';
    }
};



