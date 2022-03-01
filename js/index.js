// container
const main=document.getElementById('main');
const detailsDv= document.getElementById('phone-details')

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
            // console.log(phones)
            if (phones.status == false){
                error.className="d-inline-block text-danger"
               error.innerText="There is no data, Search another brand phones";
               main.innerHTML=""
               detailsDv.innerHTML=""
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
   detailsDv.innerHTML=""
    // console.log(phonesInfos);
    for (const  phone of phonesInfos ){
        // console.log(phone)
        const div=document.createElement('div');
       
        div.classList.add("col-md-4")
        div.classList.add('my-3')
       
        div.innerHTML=`

        <div class="card  text-center centerCard" style="width: 18rem;">
  <img src="${phone.image}" class="card-img-top sp1 p-2" alt="...">
  <div class="card-body">
    <h5 class="card-title">${phone.phone_name}</h5>
    <p class="card-text">${phone.brand}</p>
    <button onclick="phoneDeatils('${phone.slug}')" class="btn btn-primary"> See Details</buuton>
  
  </div>
</div>
        `
        main.appendChild(div);
    
    }
}

const phoneDeatils=(id)=>{
   const url=`https://openapi.programming-hero.com/api/phone/${id}`
//    console.log(url);
fetch(url)
.then(res =>res.json())
.then(phone=> displayPhonesDetails(phone.data))
}

const displayPhonesDetails=(details)=>{
//     console.log(details);
//   console.log(details.mainFeatures.sensors)
  const n=details.mainFeatures.sensors.length;
    detailsDv.innerHTML=""
    const div = document.createElement('div');
    div.classList.add('card');
    
    div.classList.add('mt-3');
    div.classList.add('sp');
    div.innerHTML = `
    <img src="${details.image}" class="img-thumbnail sp2 " alt="...">
  <div class="card-body">
    <h5 class="card-title">${details.name}</h5>
    <p class="card-text">Sensors: ${details.mainFeatures.sensors.slice(0, n)} </p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">WiFi: ${othersData(details?.others?.WLAN)}<</li>
    <li class="list-group-item">Bluetooth: ${othersData(details?.others?.Bluetooth)}</li>
    <li class="list-group-item">GPS: ${othersData(details?.others?.GPS)}</li>
	 <li class="list-group-item">NFC: ${othersData(details?.others?.NFC)}</li>
	  <li class="list-group-item">Radio: ${othersData(details?.others?.Radio)}</li>
  </ul>
  <div class="card-body">
    <p class="card-text">Release-Date: ${releaseData ( details.releaseDate)}</p>
  </div>
</div>	
    `;
    detailsDv.appendChild(div);
   
}

//othersData function
const othersData=(data)=>{
    if(data==undefined){
        return "No Data Found"
    } else{
        return data;
    }
}

//releaseData function
const releaseData=(date)=>{
    if(date ==""){
        return "No Date info Found"
    }
    else{
        return date;
    }
}


