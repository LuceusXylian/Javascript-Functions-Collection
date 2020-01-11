// Exports the first table of a page by default or by given id

function table_csv_export(tableId = "") {
    var a = "";
    $((tableId == ""? "table:first" : "#"+tableId)+" tr").each(function() {
        var childrens = $(this).children();
        for (let i = 0; i < childrens.length; i++) {
            a += childrens[i].innerHTML + ";";
        }
        a += "\n";
    });
    $("body").prepend("<textarea>"+a+"</textarea>");
}
