var inp = document.querySelectorAll("input");
var buon = document.querySelectorAll("button");
buon.classList.remove("login_submit2");
buon.classList.add("login_submit2");
input.addEventListener('click', function(){
      if(inp===''){
       buon.classList.remove("login_submit2");
       buon.classList.add("login_submit2"); 
   }
});