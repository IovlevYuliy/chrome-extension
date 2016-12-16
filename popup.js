$(document).ready(function () {
    if (localStorage["GeoCodingMode"] == "true")
        document.getElementById("GoogleMode").checked = true;
    else
        document.getElementById("YandexMode").checked = true;
});

$(document).on("click", "#CancelOptions", function () {
    window.close();
});
$(document).on("click", "#SaveOptions", function () {
    localStorage["GeoCodingMode"] = document.getElementById("GoogleMode").checked;
    window.close();
});