//main container
const main=document.getElementById('main');

const loadPhones=()=>{
    const error=document.getElementById('error');
    const input= document.getElementById('input-value');
    const inputText=input.value.toLowerCase();
    input.value='';
// console.log(inputText);
// console.log(typeof(parseInt(inputText)))
if(!isNaN(inputText) || inputText == ""){
    error.className="d-inline-block text-danger"
    error.innerText="Please Enter a Text";
}else{
    error.className="d-none"
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
        .then(res => res.json())
        .then (phones=> displayPhones(phones.data))
}
 
}

const displayPhones= phonesInfo=>{
    const n=20;

    const phonesInfos = phonesInfo.slice(0,n);

    console.log(phonesInfos);
}