function ZeroEsqueda (num){
    return num >=10 ? num : `0${num}`;
}

function FormatandoData(data){

    //Dia
    const dia = ZeroEsqueda(data.getDate());
    const mes = ZeroEsqueda(data.getMonth() + 1);
    const ano = ZeroEsqueda(data.getFullYear());

    //Horas 
    const horas = ZeroEsqueda(data.getHours());
    const min = ZeroEsqueda(data.getMinutes());
    const segundos = ZeroEsqueda(data.getSeconds());


    return `${dia}-${mes}-${ano}  ${horas}:${min}:${segundos} `

}

const data = new Date(`2011-01-31T14:48:00.000Z`); 
const dataBrasil = FormatandoData(data); 

console.log(dataBrasil)