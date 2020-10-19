function mudaFoto(foto){
    document.getElementById("incone").src = foto;
}


function calcTotal(){
  var resultado = parseInt(document.getElementById('c_quant').value);
  var total = resultado*1500;
   document.getElementById('c_preco').value = total;
}
