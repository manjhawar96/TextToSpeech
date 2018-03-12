(function() {

        let options = {
            'enqueue': true,
            'rate': 1.0, 
            'voiceName': ''
        }; 
        let speed = ["0.25", "0.50", "0.75", "1.0", "1.5", "2.0"];
        window.onload = function(){
        createMenu(); 
        chrome.contextMenus.onClicked.addListener(function(data) {
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
            if(data.parentMenuItemId == "voice-select") {
                options.voiceName = data.menuItemId; 
            }
            if(data.parentMenuItemId == "speed-select") {
                options.rate = parseFloat(data.menuItemId); 
            }
        });  
    }
    function createMenu() {
        chrome.contextMenus.create({
            title: "Text To Speak",
            contexts:["all"],
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
            contexts:["all"],
            parentId: "text-to-speak",
            id: "setting-speak",
        });
        chrome.contextMenus.create({
            title: "Voice",
            contexts:["all"],
            parentId: "setting-speak",
            id: "voice-select",
        });
        createVoiceMenu(); 
        chrome.contextMenus.create({
            title: "Speed",
            contexts:["all"],
            parentId: "setting-speak",
            id: "speed-select",
        });
        createSpeedMenu(); 
    }
         
    function createVoiceMenu() {
        chrome.tts.getVoices(function(voices) {        
            console.log(voices);    
            for(let i = 0; i < voices.length; i++) {
                chrome.contextMenus.create({
                    title: voices[i].voiceName,
                    contexts:["all"],
                    parentId: "voice-select",
                    id: voices[i].voiceName,
                });
            }
        });
    }

    function createSpeedMenu() {
        for(let i = 0; i < speed.length; i++) {
            chrome.contextMenus.create({
                title: speed[i],
                contexts:["all"],
                parentId: "speed-select",
                id: speed[i],
            });
        }
    }
})();