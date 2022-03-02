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
    detailsDv.innerHTML=""
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
    <h5 class="card-title text-dark font-weight-bold">${phone.phone_name}</h5>
    <p class="card-text text-danger  font-weight-bold">${phone.brand}</p>
    <button onclick="phoneDeatils('${phone.slug}')" class="btn btn-danger"> See Details</buuton>
  
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
    
    div.innerHTML = `
    <img src="${details.image}" class="img-thumbnail sp2 " alt="...">
  <div class="card-body">
    <h5 class="card-title text-danger font-weight-bold">${details.name}</h5>
    <p class="card-text"> <span class="text-primary font-weight-bold">Sensors</span>: ${details.mainFeatures.sensors.slice(0, n)} </p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item text-dark font-weight-bold"> <span class="text-primary font-weight-bold">WiFi</span>:  ${othersData(details?.others?.WLAN)}</li>
    <li class="list-group-item text-dark font-weight-bold"><span class="text-primary font-weight-bold">Bluetooth</span>: ${othersData(details?.others?.Bluetooth)}</li>
    <li class="list-group-item text-dark font-weight-bold"><span class="text-primary font-weight-bold">GPS</span>: ${othersData(details?.others?.GPS)}</li>
	 <li class="list-group-item text-dark font-weight-bold"><span class="text-primary font-weight-bold">NFC</span>: ${othersData(details?.others?.NFC)}</li>
	  <li class="list-group-item text-dark font-weight-bold"><span class="text-primary font-weight-bold">Radio</span>: ${othersData(details?.others?.Radio)}</li>
  </ul>
  <div class="card-body">
    <p class="card-text text-warning font-weight-bold"><span class="text-danger font-weight-bold">Release-Date</span>: ${releaseData ( details.releaseDate)}</p>
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
        return "No Release Date  Found"
    }
    else{
        return date;
    }
}


