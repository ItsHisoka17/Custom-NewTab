  $(document).ready(function (){
    search();
    getRight();
    historyEvent();
    tabBG();
    ent()
});
                        
function randomize(array){
        return array[Math.round(Math.random() * array["length"]-1)];
};

function getRight(){
    let time = moment().format('hh:mm A')
    let t = document.createElement('a');
    t.style.float = 'right';
document.getElementsByClassName('navbar')[0].appendChild(t);
    $('.time').html(time);
    let grtT = document.getElementById('grt_t');
    let arr = ['Hey there, how\'s going?', 'Good day to you sir!','Amazing day ahead of us'];
    let g;
    function getA(){
       let a = randomize(arr);
       if (a===undefined){
        getA();
       } else {
        g = a;
       };
    };getA();
    grtT.innerHTML = g;
};

function search(){
    let e = document.getElementById('search');
    e.addEventListener('click', (ev) => {
      let search = window.prompt("What are you looking for?");
      if (search===null)return;
      window.location.href = `https://www.google.com/search?q=${search}`;
      ev.preventDefault();
    });
};

function historyEvent(){
    function createMessage(a){
     let e = document.createElement('a');
     e.id = "delM";
     e.style.fontSize = "16px";
     document.getElementById("nav").appendChild(e) ;
     function display(){
         e.innerHTML = `Browsing Data Cleared (${Object.keys(a).join(" | ")})`;
         return {display, remove}
     };
     function remove(){
         e.remove();
         return false;
     };
      return {display, remove};
    };
    
    chrome.runtime.onMessage.addListener((d)=>{
        let { m,data } = d;
        if (m === "history_cleared"){
            let nM = createMessage(data).display();
            setTimeout(nM.remove, 3000);
        };
    });
    document.getElementById("del").onclick = ()=>{
        chrome.runtime.sendMessage({m: "del_history"});
    };
    let keymap = {};
    
    document.onkeyup = function(e){
        if (keymap[e.code]){
            delete keymap[e.code];
        };
    };
    document.onkeydown = function(e){
        if (e.ctrlKey){
            keymap["ControlLeft"]=true;
            if (e.code==="KeyH"){
                e.preventDefault();
                keymap["KeyH"]=true;
               if (keymap["ControlLeft"]&&keymap["KeyH"]){
                chrome.runtime.sendMessage({m: "del_history"});
                e.preventDefault();
               };
            };              
    };
  };
};

function ent(){
    let e = document.getElementById("ent");
    let n = document.getElementById("netflix");
    let d = document.getElementById("disney");
    e.addEventListener("mouseover", function(){
      $("#netflix").css("display", "block");
      $("#disney").css("display", "block");
    });
    e.addEventListener("mouseout", function(){
      $("#netflix").css("display", "none");
      $("#disney").css("display", "none");
    });
    n.addEventListener("mouseover", function(){
        $("#netflix").css("display", "block");
        $("#disney").css("display", "block");
    });
    n.addEventListener("mouseout", function(){
        $("#netflix").css("display", "none");
        $("#disney").css("display", "none");
    });
    d.addEventListener("mouseover", function(){
        $("#netflix").css("display", "block");
        $("#disney").css("display", "block");
    });
    d.addEventListener("mouseout", function(){
        $("#netflix").css("display", "none");
        $("#disney").css("display", "none");
    });
};

function tabBG(){
    let m = Math.ceil(1);
    let mx = Math.floor(11);
    let fileN = Math.floor(Math.random()*(mx-m+1))+m;
    document.body.style.backgroundImage = `url(backgrounds/${fileN}.jpeg)`;
    document.body.style.backgroundSize = 'cover';
};