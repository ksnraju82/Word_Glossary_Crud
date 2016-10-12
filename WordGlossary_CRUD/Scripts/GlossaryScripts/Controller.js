app.controller("GlossaryCRUDCtrl", function ($scope, GlossarycrudAJService) {
    $scope.divGlossary = false;
    GetAllTerms();
    //To Get all glossary records  
    function GetAllTerms() {
        debugger;
        var getGlossaryData = GlossarycrudAJService.GetAllItems();
        getGlossaryData.then(function (glossary) {
            $scope.glossaries = glossary.data;
        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.editglossary = function (glossary) {
        var getglossaryData = GlossarycrudAJService.GetTerm(glossary.Id);
        getglossaryData.then(function (_glossary) {
            $scope.glossary = _glossary.data;
            $scope.glossaryId = glossary.Id;
            $scope.glossaryTerm = glossary.Term;
            $scope.glossaryDefinition = glossary.Definition;
            $scope.Action = "Update";
            $scope.divGlossary = true;
        }, function () {
            alert('Error in getting records');
        });
    }

    $scope.AddUpdateGlossary = function () {
        var Glossary = {           
            Term: $scope.glossaryTerm,
            Definition: $scope.glossaryDefinition
        };
        var getglossaryAction = $scope.Action;

        if (getglossaryAction == "Update") {
            Glossary.Id = $scope.glossaryId;
            var getGlossaryData = GlossarycrudAJService.updateGlossaryTerm(Glossary);
            getGlossaryData.then(function (msg) {
                GetAllTerms();
                alert(msg.data);
                $scope.divGlossary = false;
            }, function () {
                alert('Error in updating record');
            });
        } else {
            var getGlossaryData = GlossarycrudAJService.addGlossary(Glossary);
            getGlossaryData.then(function (msg) {
                GetAllTerms();
                alert(msg.data);
                $scope.divGlossary = false;
            }, function () {
                alert('Error in adding record');
            });
        }
    }

    $scope.AddglossaryDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divGlossary = true;
    }

    $scope.deleteglossary = function (glossary) {
        var getglossaryData = GlossarycrudAJService.deleteGlossary(glossary.Id);
        getglossaryData.then(function (msg) {
            alert(msg.data);
            GetAllTerms();
        }, function () {
            alert('Error in deleting record');
        });
    }

    function ClearFields() {
        $scope.glossaryId = "";
        $scope.glossaryTerm = "";
        $scope.glossaryDefinition = "";
    }
    $scope.Cancel = function () {
        $scope.divGlossary = false;
    };
});