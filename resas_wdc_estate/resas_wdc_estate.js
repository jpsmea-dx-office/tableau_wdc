(function () {
    var myConnector = tableau.makeConnector();

    var resas_api_key = "4KXUy7Q9cGCp0aYFDCaPOiHE4jfFkW8cAuVfGqYi"

    myConnector.getSchema = function (schemaCallback) {
    var cols = [
        { id : "prefCode", dataType : tableau.dataTypeEnum.string },
        { id : "prefName", dataType : tableau.dataTypeEnum.string },
        { id : "cityCode", dataType : tableau.dataTypeEnum.string },
        { id : "cityName", dataType : tableau.dataTypeEnum.string },
        { id : "displayType", dataType : tableau.dataTypeEnum.string },
        { id : "year", dataType : tableau.dataTypeEnum.int },
        { id : "value", dataType : tableau.dataTypeEnum.int}
    ];

    var tableInfo = {
        id : "Estate",
        alias : "不動産取引価格",
        columns : cols
    };

    schemaCallback([tableInfo]);
};

    myConnector.getData = function(table, doneCallback) {
    $.ajax({ 
        url: "https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar?year=2016,2017&prefCode=13&cityCode=-&displayType=2",
        dataType: 'json',
        type: "GET",
        headers: {
            'X-API-KEY': resas_api_key
        }, 
        async: "false" ,
        success: function(resp) {
            var tableData = []; 

           for ( i = 0; i < resp.result.years.length; i++ ) {
                tableData.push({
                "prefCode": resp.result.prefCode,
                "prefName": resp.result.prefName,
                "cityCode": resp.result.cityCode,
                "cityName": resp.result.cityName,
                "displayType": "土地(商業地)",
                "year": resp.result.years[i].year,
                "value": resp.result.years[i].value
            });
        }

        table.appendRows(tableData);
        doneCallback();
        },
    });
};

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "RESAS 不動産取引価格";
        tableau.submit();
    });
});
