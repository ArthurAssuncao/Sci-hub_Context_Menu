setStyleRule = function(selector, rule) {
    var stylesheet = document.styleSheets[(document.styleSheets.length - 1)];
    if(stylesheet.addRule) {
        stylesheet.addRule(selector, rule)
    } else if(stylesheet.insertRule) {
        stylesheet.insertRule(selector + ' { ' + rule + ' }', stylesheet.cssRules.length);
    }
};

function add_styles(){
    var css='z-index:10000;position:relative;float:right;top:4px;right:4px;color:white;width:150px;height:30px;border-radius: 4px; border: solid 1px #ccc; padding:5px;text-align:center;background:green;line-height:25px';
    var css_hover = 'background:limegreen';
    var css_link = 'font-size:16px;text-decoration:none;vertical-align: middle;color:white;'
    var css_link_hover = 'text-decoration:none;color:white;';
    setStyleRule('#button_download', css);
    setStyleRule('#button_download:hover', css_hover);
    setStyleRule('#button_download a', css_link);
    setStyleRule('#button_download a:hover', css_link_hover);
}

function fireContentLoadedEvent () {
    //console.log("add button download");
    add_styles();

    var topo = document.getElementById('top');
    var pdf = document.getElementsByTagName('iframe')[0];
    if(pdf != 'undefined' && (pdf.src.lastIndexOf('pdf')+3 == pdf.src.length || pdf.src.lastIndexOf('PDF')+3 == pdf.src.length)){
        var pdf_link = pdf.getAttribute('src');

        var button_download = document.createElement("DIV");
        var button_link = document.createElement("A");
        var button_texto = document.createTextNode("Download");

        button_download.setAttribute('id', 'button_download');
        button_link.setAttribute('href', pdf.getAttribute('src'));
        button_link.setAttribute('target', '_blank');
        button_link.setAttribute('download', 'Download PDF');

        button_link.appendChild(button_texto);
        button_download.appendChild(button_link);
        if(topo != 'undefined'){
            topo.insertBefore(button_download, topo.firstChild);
        }
        else{
            document.body.insertBefore(button_download, document.body.firstChild);
        }
    }
}

window.addEventListener ("load", fireContentLoadedEvent, false);