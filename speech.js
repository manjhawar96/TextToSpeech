(function() {

        let options = {
            'enqueue': true,
            'rate': 1.0, 
            'voiceName': ''
        }; 
        window.onload = function(){
        createMenu(); 
        chrome.contextMenus.onClicked.addListener(function(data) {
            console.log(data);
            if(data.menuItemId == "start-speak" && data.selectionText){
                chrome.tts.speak(data.selectionText, options);
            } 
            if(data.menuItemId == "stop-speak") {
                chrome.tts.stop(); 
            }
            if(data.menuItemId == "pause-speak") {
                chrome.tts.pause(); 
            }
            if(data.menuItemId == "resume-speak") {
                chrome.tts.resume(); 
            }
            if(data.parentId == "voice-select") {
                options.voiceName = (data.menuItemId); 
            }
        });  
    }
    function createMenu() {
        chrome.contextMenus.create({
            title: "Text To Speak",
            contexts:["selection"],
            id: "text-to-speak",
        });
        chrome.contextMenus.create({
            title: "Start",
            contexts:["selection"],
            parentId: "text-to-speak",
            id: "start-speak",
        });
        chrome.contextMenus.create({
            title: "Stop",
            contexts:["selection"],
            parentId: "text-to-speak",
            id: "stop-speak",
        });
        chrome.contextMenus.create({
            title: "Pause",
            contexts:["selection"],
            parentId: "text-to-speak",
            id: "pause-speak",
        });
        chrome.contextMenus.create({
            title: "Resume",
            contexts:["selection"],
            parentId: "text-to-speak",
            id: "resume-speak",
        });
        chrome.contextMenus.create({
            title: "Settings",
            contexts:["selection"],
            parentId: "text-to-speak",
            id: "setting-speak",
        });
        chrome.contextMenus.create({
            title: "Voice",
            contexts:["selection"],
            parentId: "text-to-speak",
            id: "voice-select",
        });
        createVoiceMenu(); 
    }
         
    function createVoiceMenu() {
        chrome.tts.getVoices(function(voices) {            
            for(let i = 0; i < voices.length; i++) {
                chrome.contextMenus.create({
                    title: voices[i].voiceName,
                    contexts:["selection"],
                    parentId: "voice-select",
                    id: voices[i].voiceName,
                });
            }
        });
    }
})();