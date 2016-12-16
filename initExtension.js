
window.onload = function(){
   chrome.contextMenus.create({"title": "Найти на карте", "contexts": ["selection"], "onclick":
        function(info, tab)
        {
            var frame = window.open("map.html", "Карта",
            "width=500,height=500,status=no,toolbar=no,menubar=no");

            frame.onload = function () {
                if (localStorage["GeoCodingMode"] === "true") {
                    frame.createGoogleMap(info.selectionText);
                }
                else {
                    frame.createYandexMap(info.selectionText);
                }
             };
        }});
};

