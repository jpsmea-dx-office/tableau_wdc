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
    

        var param_years = ['2009','2010','2011','2012','2013','2014','2015','2016','2017'];
        var prefCode = 1;
        var tableData = []; 

        var foo = function(){
            var year = param_years.shift();
            $.ajax({ 
                url: "https://opendata.resas-portal.go.jp/api/v1/townPlanning/estateTransaction/bar?year="+year+"&prefCode="+prefCode+"&cityCode=-&displayType=2",
                dataType: 'json',
                type: "GET",
                headers: {
                    'X-API-KEY': resas_api_key
                }, 
                async: "false"
            }).done(function(resp) {
                tableData.push({
                    "prefCode": resp.result.prefCode,
                    "prefName": resp.result.prefName,
                    "cityCode": resp.result.cityCode,
                    "cityName": resp.result.cityName,
                    "displayType": "土地(商業地)",
                    "year": resp.result.years[0].year,
                    "value": resp.result.years[0].value
                });
                if(param_years.length){
                    foo();
                }else{
                    if(prefCode < 47){
                        param_years = ['2009','2010','2011','2012','2013','2014','2015','2016','2017'];
                        prefCode++;
                        foo();
                    }else{
                        table.appendRows(tableData);
                        doneCallback();     
                    }
                }
            });
        };
        foo();
    };

    tableau.registerConnector(myConnector);
    
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "RESAS 不動産取引価格";
        tableau.submit();
    });
});
