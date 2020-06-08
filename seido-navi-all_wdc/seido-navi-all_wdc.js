(function () {
    var myConnector = tableau.makeConnector();

    var url="https://jirei-seido-api.mirasapo-plus.go.jp/supports?sort=update&order=desc&limit=100&offset="
    

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            { id : "id", dataType : tableau.dataTypeEnum.string },
            { id : "mngGroup", dataType : tableau.dataTypeEnum.string },
            { id : "catalog_id", dataType : tableau.dataTypeEnum.string },
            { id : "specialMeasure", dataType : tableau.dataTypeEnum.bool },
            { id : "published", dataType : tableau.dataTypeEnum.bool },
            { id : "deleted", dataType : tableau.dataTypeEnum.bool },
            { id : "publishDate", dataType : tableau.dataTypeEnum.date },
            { id : "unpublishDate", dataType : tableau.dataTypeEnum.date },
            { id : "priority", dataType : tableau.dataTypeEnum.bool }, 
            { id : "language", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_createdBy_id", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_createdBy_name", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_createdAt", dataType : tableau.dataTypeEnum.datetime },
            { id : "updateInfo_lastModifiedBy_id", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_lastModifiedBy_name", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_lastModifiedAt", dataType : tableau.dataTypeEnum.datetime },
            { id : "hasCaseStudies", dataType : tableau.dataTypeEnum.bool },
            { id : "userEvaluation", dataType : tableau.dataTypeEnum.string },
            { id : "title", dataType : tableau.dataTypeEnum.string },
            { id : "subTitle", dataType : tableau.dataTypeEnum.string },
            { id : "competentAuthorities_id", dataType : tableau.dataTypeEnum.string },
            { id : "number", dataType : tableau.dataTypeEnum.string },
            { id : "baseId", dataType : tableau.dataTypeEnum.string },
            { id : "baseNumber", dataType : tableau.dataTypeEnum.string },
            { id : "baseOverride", dataType : tableau.dataTypeEnum.string },
            { id : "target", dataType : tableau.dataTypeEnum.string },
            { id : "applicationTarget", dataType : tableau.dataTypeEnum.string },
            { id : "prefectures_id", dataType : tableau.dataTypeEnum.string },
            { id : "area", dataType : tableau.dataTypeEnum.string },
            { id : "maxEmployeesCount", dataType : tableau.dataTypeEnum.int },
            { id : "maxCapital", dataType : tableau.dataTypeEnum.int },
            { id : "maxEstablishedYears", dataType : tableau.dataTypeEnum.string },
            { id : "summary", dataType : tableau.dataTypeEnum.string },
            { id : "body", dataType : tableau.dataTypeEnum.string },
            { id : "usage", dataType : tableau.dataTypeEnum.string },
            { id : "reception_start_date", dataType : tableau.dataTypeEnum.date },
            { id : "reception_end_date", dataType : tableau.dataTypeEnum.date },
            { id : "reception_remarks", dataType : tableau.dataTypeEnum.string },
            { id : "applicationUrl", dataType : tableau.dataTypeEnum.string },
            { id : "governingLaw", dataType : tableau.dataTypeEnum.string },            
            { id : "reference", dataType : tableau.dataTypeEnum.string },
            { id : "support_organization", dataType : tableau.dataTypeEnum.string },
            { id : "inquiry", dataType : tableau.dataTypeEnum.string },
            { id : "industry_categories_id", dataType : tableau.dataTypeEnum.string },
            { id : "stage_categories_id", dataType : tableau.dataTypeEnum.string },
            { id : "service_categories_id", dataType : tableau.dataTypeEnum.string },
            { id : "purpose_categories_id", dataType : tableau.dataTypeEnum.string },
            { id : "purpose_categories_name", dataType : tableau.dataTypeEnum.string },
            { id : "disasters_id", dataType : tableau.dataTypeEnum.string },
            { id : "keywords", dataType : tableau.dataTypeEnum.string }
        ];

        var tableInfo = {
            id : "seido_navi_all",
            alias : "制度ナビ情報",
            columns : cols
        };

        schemaCallback([tableInfo]);
    };

    function sleep(waitSec, callbackFunc) {
        var spanedSec = 0;
        var waitFunc = function () {
            spanedSec++;
            if (spanedSec >= waitSec) {
                if (callbackFunc) callbackFunc();
                return;
            }
            clearTimeout(id);
            id = setTimeout(waitFunc, 1000);
        };
        var id = setTimeout(waitFunc, 1000);
    };

    myConnector.getData = function(table, doneCallback) {
        var tableData = []; 
        var offset = 0;
        var foo = function(){
            console.log(url+offset);
            $.ajax({ 
                url: url + offset,
                dataType: 'json',
                type: "GET",
                async: "false"
            }).done(function(resp) {

                for ( i = 0; i < resp.items.length; i++ ) {
                    console.log(resp.items[i]);

                    tableData.push({
                        "id" : resp.items[i].id,
                        "mngGroup"  : (resp.items[i].mng_group)?resp.items[i].mng_group:"",
                        "catalog_id"  : (resp.items[i].catalog && resp.items[i].catalog.id)?resp.items[i].catalog.id:"",
                        "specialMeasure"  : (resp.items[i].specialMeasure)?resp.items[i].specialMeasure:"",
                        "published"  : (resp.items[i].published)?resp.items[i].published:"",
                        "deleted"  : (resp.items[i].deleted)?resp.items[i].deleted:"",
                        "publishDate"  : (resp.items[i].publishDate)?resp.items[i].publishDate:"",
                        "unpublishDate"  : (resp.items[i].unpublishDate)?resp.items[i].unpublishDate:"",
                        "priority"  : (resp.items[i].priority)?resp.items[i].priority:"",
                        "language"  : (resp.items[i].language)?resp.items[i].language:"",
                        "updateInfo_createdBy_id"  : (resp.items[i].update_info.created_by && resp.items[i].update_info.created_by.id) ? resp.items[i].update_info.created_by.id :"",
                        "updateInfo_createdBy_name"  : (resp.items[i].update_info.created_by && resp.items[i].update_info.created_by.name) ? resp.items[i].update_info.created_by.name :"",
                        "updateInfo_createdAt"  : resp.items[i].update_info.created_at,
                        "updateInfo_lastModifiedBy_id"  : (resp.items[i].update_info.last_modified_by && resp.items[i].update_info.last_modified_by.id) ? resp.items[i].update_info.last_modified_by.id:"",
                        "updateInfo_lastModifiedBy_name"  : (resp.items[i].update_info.last_modified_by && resp.items[i].update_info.last_modified_by.name) ? resp.items[i].update_info.last_modified_by.name:"",
                        "updateInfo_lastModifiedAt"  : resp.items[i].update_info.last_modified_at,
                        "hasCaseStudies"  : (resp.items[i].has_case_studies)?resp.items[i].has_case_studies:"",
                        "userEvaluation"  : (resp.items[i].user_evaluation)?resp.items[i].user_evaluation:"",
                        "title"  : (resp.items[i].title)?resp.items[i].title:"",
                        "subTitle"  : (resp.items[i].subtitle)?resp.items[i].subtitle:"",
                        "competentAuthorities_id"  : (resp.items[i].competent_authorities && resp.items[i].competent_authorities.id)?resp.items[i].competent_authorities.id:"",
                        "number"  : (resp.items[i].number)?resp.items[i].number:"",
                        "baseId"  : (resp.items[i].base_id)?resp.items[i].base_id:"",
                        "baseNumber"  : (resp.items[i].base_number)?resp.items[i].base_number:"",
                        "baseOverride"  : (resp.items[i].base_override)?resp.items[i].base_override:"",
                        "target"  : (resp.items[i].target)?resp.items[i].target:"",
                        "applicationTarget"  : (resp.items[i].application_target)?resp.items[i].application_target:"",
                        "prefectures_id"  : (resp.items[i].prefectures)?resp.items[i].prefectures.map(function(obj){return obj.id}).join(','):"",
                        "area"  : (resp.items[i].area)?resp.items[i].area:"",
                        "maxEmployeesCount"  : (resp.items[i].max_employees_count)?resp.items[i].max_employees_count:"",
                        "maxCapital"  : (resp.items[i].max_capital)?resp.items[i].max_capital:"",
                        "maxEstablishedYears"  : (resp.items[i].max_established_years)?resp.items[i].max_established_years:"",
                        "summary"  : (resp.items[i].summary)?resp.items[i].summary:"",
                        "body"  : (resp.items[i].body)?resp.items[i].body:"",
                        "usage"  : (resp.items[i].usage)?resp.items[i].usage:"",
                        "reception_start_date"  : (resp.items[i].reception_start_date)?resp.items[i].reception_start_date:"",
                        "reception_end_date"  : (resp.items[i].reception_end_date)?resp.items[i].reception_end_date:"",
                        "reception_remarks"  : (resp.items[i].reception_remarks)?resp.items[i].reception_remarks:"",
                        "applicationUrl"  : (resp.items[i].application_url)?resp.items[i].application_url:"",
                        "governingLaw"  : (resp.items[i].governing_law)?resp.items[i].governing_law:"",
                        "reference"  : (resp.items[i].reference)?resp.items[i].reference:"",
                        "support_organization"  : (resp.items[i].support_organization)?resp.items[i].support_organization:"",
                        "inquiry"  : (resp.items[i].inquiry)?resp.items[i].inquiry:"",
                        "industry_categories_id"  : (resp.items[i].industry_categories)?resp.items[i].industry_categories.map(function(obj){return obj.id}).join(','):"",
                        "stage_categories_id"  : (resp.items[i].stage_categories)?resp.items[i].stage_categories.map(function(obj){return obj.id}).join(','):"",
                        "service_categories_id"  : (resp.items[i].service_categories)?resp.items[i].service_categories.map(function(obj){return obj.id}).join(','):"",
                        "purpose_categories_id"  : (resp.items[i].purpose_categories)?resp.items[i].purpose_categories.map(function(obj){return obj.id}).join(','):"",
                        "purpose_categories_name"  : (resp.items[i].purpose_categories)?resp.items[i].purpose_categories.map(function(obj){return obj.name}).join(','):"",
                        "disasters_id"  : (resp.items[i].disasters)?resp.items[i].disasters.map(function(obj){return obj.id}).join(','):"",
                        "keywords"  : (resp.items[i].keywards)?resp.items[i].keywards.map(function(obj){return obj.id}).join(','):""
                    });
                }
                if (offset < 900) {
                    sleep(2000);
                    offset=offset+100;
                    foo();
                }else{
                    table.appendRows(tableData);
                    doneCallback();
                }     
                
            });
        };
        foo();
        
    };

    tableau.registerConnector(myConnector);
    
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "制度ナビ情報取得";
        tableau.submit();
    });
});
