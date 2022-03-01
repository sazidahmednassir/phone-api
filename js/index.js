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
    main.innerHTML=""
}


else{
    error.className="d-none"
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
        .then(res => res.json())
        .then ((phones)=> {
            console.log(phones)
            if (phones.status == false){
                error.className="d-inline-block text-danger"
               error.innerText="There is no data, Search another brand phones";
               main.innerHTML=""
            } else{
                error.className="d-none"
                displayPhones(phones.data)
            }
        })
}
 
}

const displayPhones= phonesInfo=>{
    const n=20;

    const phonesInfos = phonesInfo.slice(0,n);
   main.innerHTML=""
   
    // console.log(phonesInfos);
    for (const  phone of phonesInfos ){
        // console.log(phone)
        const div=document.createElement('div');
       
        div.classList.add("col-md-4")
        div.classList.add('my-3')
        div.innerHTML=`
        <div class="card " style="width: 18rem;">
  <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">${phone.brand}</p>
    <button onclick="cardDeatils('${phone.slug}')" class="btn btn-primary"> See Details</buuton>
  
  </div>
</div>
        `
        main.appendChild(div);
    
    }
}