// http://stackoverflow.com/questions/18386730/chrome-extension-properly-adding-a-context-menu-entry-with-non-persistent-backg
// https://github.com/Rob--W/crxviewer/blob/master/src/bg-contextmenu.js

var id = chrome.i18n.getMessage("id");
var MENU_ID_LINK = id+'_link';
var MENU_ID_PAGE_OUTRA_ABA = id+'_page_outra_aba';
var MENU_ID_PAGE_MESMA_ABA = id+'_page_mesma_aba';
var MENU_ID_SELECTION = id+'_selection';

function open(info, tab) {
    // alert(info.menuItemId);
    // alert(JSON.stringify(info));
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));

    var url = "";
    if ('linkUrl' in info){
        url = info['linkUrl'];
    }
    else if('selectionText' in info){
        url = info['selectionText'];
    }
    else if('pageUrl' in info){
        url = info['pageUrl'];
    }

    console.log("URL: " + url);
    var regex = '(https?):\/\/([^\/]*)\/(.*)';
    var partes = url.match(regex);
    // alert(url);
    
    if(partes != null){
        var url_new = partes[1] + "://" + partes[2] + ".sci-hub.org/" + partes[3];

        if(info.menuItemId == MENU_ID_PAGE_MESMA_ABA){
            chrome.tabs.update(tab.id, {url: url_new});
        }
        else{
            chrome.tabs.create({"url" : url_new});
        }
    }
    else{
        console.log("Erro ao modificar url");
    }
}

function createContextMenu(){
    var patterns = [
                'http://*/*',
                'https://*/*'
            ];
    var title_link = 'Abrir link no Sci-Hub.org';
    var title_page = 'Abrir esta página no Sci-Hub.org';
    var title_page_in = 'Abrir esta página no Sci-Hub.org na mesma aba';
    chrome.contextMenus.create({
        id: MENU_ID_LINK,
        title: title_link, 
        contexts:["link"], 
        targetUrlPatterns: patterns
        //onclick: open,
    });
    chrome.contextMenus.create({
        id: MENU_ID_PAGE_OUTRA_ABA,
        title: title_page, 
        contexts:["page"], 
        documentUrlPatterns: patterns
        //onclick: open,
    });
    chrome.contextMenus.create({
        id: MENU_ID_PAGE_MESMA_ABA,
        title: title_page_in, 
        contexts:["page"], 
        documentUrlPatterns: patterns
        //onclick: open,
    });
}

function removeAllContextMenus() {
    chrome.contextMenus.removeAll();
}

chrome.contextMenus.onClicked.addListener(open);

chrome.runtime.onInstalled.addListener(function() {
    createContextMenu();
});

chrome.runtime.onStartup.addListener(function() {
    createContextMenu();
});