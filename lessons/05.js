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
            $scope.success = angular.equals($scope.task.solution,$scope.results);
            $log.log(JSON.stringify($scope.results));
        };

        $scope.tasks = [
            {
                title: 'Practice Task 1',
                description: 'In this lesson, we\'re just going to practice for the test. Let\'s start! List every information about all the records that have a uuid starting with a or 5 and have more than a 1000 as profit. Hint: use parentheses!',
                solution: [{"columns":["uuid","product","volume","price","revenue","time","payed","fix_cost","variable_cost","total_cost","profit"],"values":[["53f744fb-adb2-45f1-99eb-a5ea15c48b56","flower",47,100,4700,"2014.09.23 3:36","FALSE",150,42,2124,2576],["ad54ac8a-829f-467a-ab69-c0120d9538ea","fork",73,40,2920,"2014.10.26 13:57","TRUE",50,13,999,1921],["a0e6d287-4878-4066-aefc-82a637591737","butter",111,52,5772,"2014.12.31 14:10","TRUE",100,15,1765,4007],["5e36cd87-6499-4e7a-a27c-6a61a0504d0c","ice",62,88,5456,"2014.12.09 4:43","TRUE",150,38,2506,2950]]}],
                query: ''
            },
            {
                title: 'Practice Task 2',
                description: 'Calculate the profit per unit named profit_per_unit for each purchase that was payed for. You will have to multiply some column in the expression with 1.0 to convert the initially integer value to float and get a correct number. Round the value to 1 decimal.',
                solution: [{"columns":["profit_per_unit"],"values":[[5.7],[-4],[-4.1],[-24.2],[27.9],[-16.2],[20.2],[19.4],[-4.9],[37.4],[56.7],[26.3],[37.2],[19.9],[50.5],[13.7],[45.4],[28.5],[0.8],[-10.6],[18.8],[36.1],[19.3],[37.6],[0.7],[-18.7],[-16.5],[47.6]]}],
                query: ''
            },
            {
                title: 'Practice Task 3',
                description: 'Return all records with their respective price, quantity, variable cost, revenue and profit which have a revenue more than 1000 and less than 2000 and are profitable but with less than a profit of 100.',
                solution: [{"columns":["price","quantity","variable_cost","revenue","profit"],"values":[[42,31,38,1302,24],[47,23,42,1081,15]]}],
                query: ''
            },
            {
                title: 'Practice Task 4',
                description: 'Fetch all info about ice, butter and egg purchases with a total cost higher than 1000 and a profit higher than 1000 but less than 2000',
                solution: [{"columns":["uuid","product","volume","price","revenue","time","payed","fix_cost","variable_cost","total_cost","profit"],"values":[["2adccfb7-576d-423c-a0bc-413c1955daad","ice",46,86,3956,"2014.10.22 9:52","FALSE",50,44,2074,1882],["02b364a6-5456-469b-b01e-31d8df683b64","butter",54,65,3510,"2014.11.08 0:43","TRUE",150,42,2418,1092],["29bddff2-b637-4dbf-b5a8-586690f7cbf9","egg",78,63,4914,"2014.11.21 12:57","TRUE",50,43,3404,1510]]}],
                query: ''
            },
            {
                title: 'Congrats and goodbye!',
                description: 'Congratulations, you made it all the way through this course. If you could tackle these practice tasks easily, then you have nothing to fear from the actual test.',
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