angular.module('IX', ['ui.codemirror'])

    .controller('EditorController', ['$scope', '$log', function($scope, $log){

        $scope.results = [];

        $scope.editorOptions = {
            mode: 'text/x-mysql',
            theme: 'base16-dark',
            indentWithTabs: true,
            smartIndent: true,
            lineNumbers: true,
            matchBrackets : true,
            autofocus: true
        };

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../data/database.sqlite', true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function(e) {
            var uInt8Array = new Uint8Array(this.response);
            $scope.db = new SQL.Database(uInt8Array);
        };
        xhr.send();

        $scope.runQuery = function(){
            $scope.results = $scope.db.exec($scope.query);
            $log.log(JSON.stringify($scope.results));
        };

        $scope.tasks = [
            {
                title: 'Test Environment',
                description: 'This is where you can run queries for the test.',
                solution: [],
                query: ''
            }
        ];

        $scope.task = $scope.tasks[0];

        $scope.query = $scope.task.query;

        $scope.next = function(){
            $scope.task = $scope.tasks.next();
            $scope.success = null;
            $scope.results = [];
            $scope.query = $scope.task.query;
        };

        $scope.previous = function(){
            $scope.task = $scope.tasks.previous();
            $scope.success = null;
            $scope.results = [];
            $scope.query = $scope.task.query;
        };

        $scope.success = null;
    }]);