function handleHistoryCS(){
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
    chrome.runtime.onMessage.addListener((d)=>{
        let { m, data } = d;
        console.log(d);
        if (m === "history_cleared"){
            console.log(`BROWSING DATA CLEAERED: ${Object.keys(data).join(" | ")}`);
        } 
    })
};

handleHistoryCS();