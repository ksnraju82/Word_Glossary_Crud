app.service("GlossarycrudAJService", function ($http) {

    //get All records    
    this.GetAllItems = function () {
        return $http.get("Home/GetAllTerms");
    };

    // get glossary by Id
    this.GetTerm = function (Id) {
        var response = $http({
            method: "post",
            url: "Home/GetTermById",
            params: {
                id: JSON.stringify(Id)
            }
        });
        return response;
    }

    // Update record 
    this.updateGlossaryTerm = function (glossary) {
        var response = $http({
            method: "post",
            url: "Home/UpdateGlossaryTerm",
            data: JSON.stringify(glossary),
            dataType: "json"
        });
        return response;
    }

    // Add record
    this.addGlossary = function (glossary) {
        var response = $http({
            method: "post",
            url: "Home/AddGlossary",
            data: JSON.stringify(glossary),
            dataType: "json"
        });
        return response;
    }

    //Delete record
    this.deleteGlossary = function (Id) {
        var response = $http({
            method: "post",
            url: "Home/DeleteGlossary",
            params: {
                glossaryID: JSON.stringify(Id)
            }
        });
        return response;
    }
});