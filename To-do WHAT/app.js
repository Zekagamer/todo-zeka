const form = document.getElementById("form");
const input = document.getElementById("input");
let list = document.getElementById("list");
const sort = document.querySelector(".sort");
const add = document.querySelector(".add");
let isSorted = false;

function check(){
  if(list.children.length == 0){
    list.style.display='none'
  }
}
showData();
function showData() {
  let arrData = [];
  let tags = "";
  const LocalStData = JSON.parse(localStorage.getItem("datas"));
  if (LocalStData == null) {
    arrData = [];
  } else {
    for (let i = 0; i < LocalStData.length; i++) {
      arrData.push(LocalStData[i]);
    }
  }

  if (arrData != null) {
    arrData.forEach((data, index) => {
      tags += `<li><span>${data.length > 26 ? data.substring(0,26) +" ...":data}</span><i onclick="deleteData(${index})" class="fa-solid fa-trash-can"></i></li>`;
    });
  }
  
  list.innerHTML = tags;
  check()
}

function updateData() {
  isSorted = !isSorted;

  let LSdata = JSON.parse(localStorage.getItem("datas"));
  let getDataLSArr = [];
  for (let i = 0; i < LSdata.length; i++) {
    getDataLSArr.push(LSdata[i]);
  }
  // getDataLSArr.sort(); localstorage den gelen datalari bir array atib sonra siralayiriq.Normal sort yazanda alfabeye gore siralayir.Amma asagida kimi yazsaq isteyimize esasen siralaya bilerik.
  if (isSorted) {
    getDataLSArr.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
  } else if (!isSorted) {
    getDataLSArr.sort((a, b) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    });
  }

  localStorage.setItem("datas", JSON.stringify(getDataLSArr));
  showData();
}
function deleteData(index) {
  let newData = [];
  let dataLS = JSON.parse(localStorage.getItem("datas"));

  for (let i = 0; i < dataLS.length; i++) {
    newData.push(dataLS[i]);
  }
  newData = newData.filter((d, ind) => ind != index);

  localStorage.setItem("datas", JSON.stringify(newData));
  check();
  showData();
}
function addData() {
  let val = input.value;
  let getDataLSArr = [];

  if(input.value == ""){
    return alert("No Empty value")
  }
  let LSdata = JSON.parse(localStorage.getItem("datas"));

  if (LSdata != null) {
    for (let i = 0; i < LSdata.length; i++) {
      getDataLSArr.push(LSdata[i]);
    }
  } else {
    getDataLSArr.push(val);
  }
  if (val !== "") {
    getDataLSArr.push(val);
    
  }
  localStorage.setItem("datas", JSON.stringify(getDataLSArr));
  showData();
  input.value = "";
}
add.addEventListener("click", (e) => {
  e.preventDefault();
  list.style.display = 'block'
  addData();
});
let isTurned=false;
sort.addEventListener("click", (e) => {
  if(!isTurned){
    sort.classList.add("isTurned")
    isTurned=true;
  }else{
    sort.classList.remove("isTurned")
    isTurned=false;
  }
  e.preventDefault();
  updateData();
});
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    addData()
})