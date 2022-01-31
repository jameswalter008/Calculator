let from=document.getElementById("from")
let to=document.getElementById("to")
let input=document.getElementById("input")
let result=document.getElementById("result")
let historylist=document.getElementById("history-list")

function createOption(x,y,z){
    let o=document.createElement("option")
    let text=document.createTextNode(y)
    o.setAttribute("value",toNum(z))
    o.appendChild(text)
    x.appendChild(o)
}

function toNum(x){
    return Number(x.replace(",",""))
}

for(x in data.rates){
    createOption(from,x,data.rates[x])
    createOption(to,x,data.rates[x])
}

function createtr(x){
    let rowSpacer=document.getElementById("rowSpacer")
    if(rowSpacer){
        rowSpacer.remove()
    }
    let tr=document.createElement("tr")
    x.map(function(el){
        let td=document.createElement("td")
        let text=document.createTextNode(el)
     
        td.appendChild(text)
        tr.appendChild(td)
    })

    historylist.appendChild(tr)

}

function store(){
    localStorage.setItem("record",historylist.innerHTML)
}

document.getElementById("calc").addEventListener("submit",function(e){
    e.preventDefault()
    // get state
    let x=input.value;
    let y=from.value;
    let z=to.value;
  

    //process
    let first=x*y;
    let second=first/z;
    let fromText=x+from.options[from.selectedIndex].innerHTML
    let toText=to.options[to.selectedIndex].innerHTML
    let resultnum=second.toFixed(2)
    let date=new Date().toLocaleDateString();
    let arr=[date,fromText,toText,resultnum]
    createtr(arr)
    store()
    
    //set state
    result.innerHTML=resultnum
    input.value=""
    input.focus()
    from.value=""
    to.value=1
});

(function(){
    if(localStorage.getItem("record")){
        historylist.innerHTML=localStorage.getItem("record")
    }
    else{
        historylist.innerHTML=`<tr id="rowSpacer"><td colspan=4>There is no row.</td></tr>`
    }
})();

function test(){
    console.log(from.options[from.selectedIndex].innerHTML)
}

function changeMode(){
    document.body.classList.toggle("night-mode")
    document.getElementById("modeicon").classList.toggle("fa-sun")
}