(function () {
    var myConnector = tableau.makeConnector();

    var url="https://jirei-seido-api.mirasapo-plus.go.jp/supports?sort=update&order=desc&limit=100&offset="
    

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            { id : "id", alias : "管理ID", dataType : tableau.dataTypeEnum.string },
            { id : "mngGroup", alias : "管理グループID", dataType : tableau.dataTypeEnum.string },
            { id : "catalog_id", alias : "カテゴリID", dataType : tableau.dataTypeEnum.string },
            { id : "specialMeasure", alias : "特定施策区分", dataType : tableau.dataTypeEnum.bool },
            { id : "published", alias : "公開状態", dataType : tableau.dataTypeEnum.bool },
            { id : "deleted", alias : "削除状態", dataType : tableau.dataTypeEnum.bool },
            { id : "publishDate", alias : "公開日", dataType : tableau.dataTypeEnum.date },
            { id : "unpublishDate", alias : "公開終了日", dataType : tableau.dataTypeEnum.date },
            { id : "priority", alias : "表示優先度", dataType : tableau.dataTypeEnum.bool }, 
            { id : "language", alias : "言語", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_createdBy_id", alias : "作成者ID", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_createdBy_name", alias : "作成者", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_createdAt", alias : "作成日", dataType : tableau.dataTypeEnum.datetime },
            { id : "updateInfo_lastModifiedBy_id", alias : "更新者ID", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_lastModifiedBy_name", alias : "更新者", dataType : tableau.dataTypeEnum.string },
            { id : "updateInfo_lastModifiedAt", alias : "更新日", dataType : tableau.dataTypeEnum.datetime },
            { id : "hasCaseStudies", alias : "事例有無", dataType : tableau.dataTypeEnum.bool },
            { id : "title", alias : "タイトル", dataType : tableau.dataTypeEnum.string },
            { id : "subTitle", alias : "サブタイトル", dataType : tableau.dataTypeEnum.string },
            { id : "competentAuthorities_id", alias : "制度所管組織ID", dataType : tableau.dataTypeEnum.string },
            { id : "number", alias : "制度番号", dataType : tableau.dataTypeEnum.string },
            { id : "baseId", alias : "元制度管理ID", dataType : tableau.dataTypeEnum.string },
            { id : "baseNumber", alias : "元制度番号", dataType : tableau.dataTypeEnum.string },
            { id : "baseOverride", alias : "制度変更区分", dataType : tableau.dataTypeEnum.string },
            { id : "target", alias : "対象者", dataType : tableau.dataTypeEnum.string },
            { id : "applicationTarget", alias : "用途・対象物", dataType : tableau.dataTypeEnum.string },
            { id : "prefectures_id", alias : "都道府県ID", dataType : tableau.dataTypeEnum.string },
            { id : "area", alias : "対象地域群", dataType : tableau.dataTypeEnum.string },
            { id : "maxEmployeesCount", alias : "従業員条件(人以下)", dataType : tableau.dataTypeEnum.int },
            { id : "maxCapital", alias : "資本金条件(円以下)", dataType : tableau.dataTypeEnum.int },
            { id : "maxEstablishedYears", alias : "創業年条件(年未満)", dataType : tableau.dataTypeEnum.string },
            { id : "summary", alias : "概要", dataType : tableau.dataTypeEnum.string },
            { id : "body", alias : "内容", dataType : tableau.dataTypeEnum.string },
            { id : "usage", alias : "利用・申請方法", dataType : tableau.dataTypeEnum.string },
            { id : "reception_start_date", alias : "受付開始日", dataType : tableau.dataTypeEnum.date },
            { id : "reception_end_date", alias : "受付終了日", dataType : tableau.dataTypeEnum.date },
            { id : "reception_remarks", alias : "受付備考", dataType : tableau.dataTypeEnum.string },
            { id : "applicationUrl", alias : "電子申請URL", dataType : tableau.dataTypeEnum.string },
            { id : "governingLaw", alias : "根拠法令", dataType : tableau.dataTypeEnum.string },            
            { id : "reference", alias : "詳細参照先", dataType : tableau.dataTypeEnum.string },
            { id : "support_organization", alias : "実施組織・支援機関", dataType : tableau.dataTypeEnum.string },
            { id : "inquiry", alias : "お問合せ先", dataType : tableau.dataTypeEnum.string },
            { id : "industry_categories_id", alias : "標準産業分類ID", dataType : tableau.dataTypeEnum.string },
            { id : "stage_categories_id", alias : "事業ステージ分類ID", dataType : tableau.dataTypeEnum.string },
            { id : "service_categories_id", alias : "行政サービス分類ID", dataType : tableau.dataTypeEnum.string },
            { id : "purpose_categories_id", alias : "お困りごと分類ID", dataType : tableau.dataTypeEnum.string },
            { id : "purpose_categories_name", alias : "お困りごと分類", dataType : tableau.dataTypeEnum.string },
            { id : "disasters_id", alias : "災害ID", dataType : tableau.dataTypeEnum.string },
            { id : "keywords", alias : "キーワード", dataType : tableau.dataTypeEnum.string }
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
                        "keywords"  : (resp.items[i].keywords)?resp.items[i].keywords.join(','):""
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
