(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            { id :  "Id" , dataType : tableau.dataTypeEnum.string},
            { id :  "Title" , dataType : tableau.dataTypeEnum.string},
            { id :  "SubTitle" , dataType : tableau.dataTypeEnum.string},
            { id :  "Last_Modified_At" , dataType : tableau.dataTypeEnum.datetime}
        ];

        var tableInfo = {
            id : "seido_navi",
            alias : "制度ナビ支援制度最新情報",
            columns : cols
        };

        schemaCallback([tableInfo]);
    };

    myConnector.getData = function(table, doneCallback) {
        $.ajax({ 
            url: "https://jirei-seido-api.mirasapo-plus.go.jp/supports?sort=update&order=desc&limit=100&offset=0",
            dataType: 'json',
            type: "GET",
            async: "false" ,
            success: function(resp) {
                var tableData = []; 
                console.log('fetching data success.');
                for ( i = 0; i < resp.items.length; i++ ) {
                    tableData.push({
                        "Id": resp.items[i].id,
                        "Title": resp.items[i].title,
                        "SubTitle": resp.items[i].subtitle,
                        "Last_Modified_At": resp.items[i].update_info.last_modified_at
                    });
                }
                table.appendRows(tableData);
                doneCallback();
            },
            error: function(){
                console.log("fetching data error");
            }
        });
    };

    tableau.registerConnector(myConnector);
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "制度ナビ支援情報最新";
            tableau.submit();
        });
    });
})();



