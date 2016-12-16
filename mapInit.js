function createGoogleMap(address) {
    var geocoder,
        map,
        zoom = getZoom(address);
    document.title = 'Карта Google';
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: zoom,
        center: latlng
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);

            var infowindow = new google.maps.InfoWindow({
                content: results[0].formatted_address
            });


            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        } else {
            alert('Не удалось найти результатов по запросу: ' + address);
            window.close();
        }
    });
}

function getZoom(address)
{
    var zoom;
    var countFindElement = address.split(' ').length;
    if (countFindElement <= 2)
        zoom = 10;
    else
        zoom = 16;

    return zoom;
}


function createYandexMap(address) {
    var myMap,
        myPlacemark,
        zoom = getZoom(address);
    ymaps.ready(init);
    document.title = 'Карта Yandex';


    function init() {
        var geocoder = new ymaps.geocode(address);
        geocoder.then(
            function (res) {
                if (res.metaData.geocoder.found == 0)
                {
                    alert("Не удалось найти результатов по запросу: " + address);
                }
                myMap = new ymaps.Map("map", {
                    center: res.geoObjects.get(0).geometry.getCoordinates(),
                    zoom: zoom
                });
            },
            function (err) {
                alert('Ошибка: ' + err);
            }
        );
        geocoder.then(
            function (res) {
                myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(),
                    {preset: 'islands#greenStretchyIcon',
                        balloonContent:  res.geoObjects.get(0).properties.get('text')}
                );
                myMap.geoObjects.add(myPlacemark);
                myMap.addOverlay(myPlacemark);
            }
       );
    }
}

/*var qq = document.getElementById("testbut");
qq.addEventListener("click", function () {
    createGoogleMap("sadasdf");
}, true);*/