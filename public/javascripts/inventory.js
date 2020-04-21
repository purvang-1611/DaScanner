window.addEventListener('load',(event)=>{
  console.log("load event fire");
  document.getElementById('addnewrecord').hidden=true;
  document.getElementById('UpdateNewStock').hidden=true;
});
function validateForm(ev){
	var quant = document.getElementById('qty1').value;
if(quant<0 || quant==='0'){ //=== was matching value string with 0 numeric so was false
document.getElementById('error-qty').innerHTML="*Please enter a valid number";
document.getElementById('qty1').focus();
ev.preventDefault();
}
else{
    document.getElementById('error-qty').innerHTML=" ";
}
}

function AddNewRecord(){
  document.getElementById('addnewrecord').hidden=false;
  document.getElementById('UpdateNewStock').hidden=true;
}
function UpdateNewStock(){
  document.getElementById('addnewrecord').hidden=false;
  document.getElementById('UpdateNewStock').hidden=true;
}