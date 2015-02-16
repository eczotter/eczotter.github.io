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
                title: 'DISTINCT',
                description: 'Welcome back! Please, run the query I prepared for you. We got 47 rows back. Did you expect that? Well, you should, because I told you that after the SELECT keyword, we filter the columns, but we return ALL the rows by default. It\'s not there but you can put the ALL keyword immediately after the SELECT keyword and nothing would change. However, in this case, this is probably not what we want. We want the unique product names. And that can be achieved by using the DISTINCT keyword after the SELECT keyword. It\'s important. The DISTINCT keyword does not go before your column names, you can only include it once. This keyword doesn\'t know anything about your columns and rows, it is just a filter before the results are sent back to you, so that you do not get the same result row twice. You will loose all information about which rows the information comes from, but it\s less data to transfer. Now try to retrieve the unique product names and call it types.',
                solution: [{"columns":["types"],"values":[["ice"],["fork"],["cake"],["butter"],["egg"],["flower"]]}],
                query: 'select product from purchases;'
            },
            {
                title: 'DISTINCT works with more than one column, too',
                description: 'Return all the unique fix and variable cost combinations.',
                solution: [{"columns":["fix_cost","variable_cost"],"values":[[100,15],[50,35],[50,37],[150,18],[150,38],[100,70],[100,37],[150,42],[150,25],[100,45],[100,50],[50,54],[150,54],[50,44],[100,23],[50,43],[50,25],[100,34],[50,29],[150,59],[50,13],[50,49],[50,38],[150,33],[100,42],[150,29],[50,53],[50,48],[100,38],[150,56],[50,36],[150,44],[150,32],[100,48],[50,39]]}],
                query: ''
            },
            {
                title: 'Revenue',
                description: 'We will calculate the profit column in SQL! The thing is, I lied to you. But I hope, we will be okay. I said that we specify columns after the SELECT keyword. Well, I had to explain the simple case, before I could get to the thougher part, you see. Actually we can put expressions after the select keywords and we can name them. Expressions are simple calculations with SQL. When some information is in the data, but not in a specific column row value. Run the example query to see how expressions work, then calculate the revenue column yourself (don\'t forget to name the result revenue).',
                solution: [{"columns":["revenue"],"values":[[989],[1632],[205],[640],[2592],[1980],[952],[987],[1260],[2449],[1638],[1118],[640],[3956],[405],[3510],[4914],[4700],[1155],[2340],[5494],[4928],[6570],[5840],[2920],[7808],[8383],[5016],[2744],[6392],[2880],[8019],[7084],[1302],[6468],[2058],[6032],[7290],[4485],[5772],[495],[4664],[8829],[1081],[1860],[2484],[5456]]}],
                query: 'select volume * variable_cost as total_variable_cost from purchases;'
            },
            {
                title: 'Total cost',
                description: 'You can use all four operators (+, -, *, /) and even modulus (%) to create your result columns. Play with it, and then return the total cost column with a calculated column named total_cost.',
                solution: [{"columns":["total_cost"],"values":[[745],[1835],[1567],[726],[2886],[6400],[729],[2124],[675],[3655],[4650],[4694],[1230],[2074],[1135],[2418],[3404],[2124],[1425],[2752],[2428],[4693],[3570],[1300],[999],[2346],[4999],[2558],[1767],[2956],[2006],[4343],[4466],[1278],[2328],[2502],[1658],[3290],[3186],[1765],[446],[2966],[4728],[1066],[2980],[4262],[2506]]}],
                query: ''
            },
            {
                title: 'Practice',
                description: 'Calculate the profit for each purchase and name it as such.',
                solution: [{"columns":["profit"],"values":[[244],[-203],[-1362],[-86],[-294],[-4420],[223],[-1137],[585],[-1206],[-3012],[-3576],[-590],[1882],[-730],[1092],[1510],[2576],[-270],[-412],[3066],[235],[3000],[4540],[1921],[5462],[3384],[2458],[977],[3436],[874],[3676],[2618],[24],[4140],[-444],[4374],[4000],[1299],[4007],[49],[1698],[4101],[15],[-1120],[-1778],[2950]]}],
                query: ''
            },
            {
                title: 'Scalar functions',
                description: 'There are some simple functions in SQL, too. In the example script on the left, length() is used to calculate the length of the uuid column The functions upper() and lower() convert a string to lower or uppercase. The round(x, y) function rounds the x up to y decimals (default = zero). The abs() function returns the absolute value. Be aware that SQL is not a standard, it is a language, which has dialects. We are learning one of its dialects, called SQLite, which most certainly will differ from the one, you will use in your daily work. These functions will be different, too. Always remember to check the manual for the dialect (MS SQL, Oracle, MySQL, whatever) you are using. If you know one that doesn\'t mean you know the other! For now, list the unique product names in uppercase and then we\'ll wrap up this lesson.',
                solution: [{"columns":["upper(product)"],"values":[["ICE"],["FORK"],["CAKE"],["BUTTER"],["EGG"],["FLOWER"]]}],
                query: 'select distinct length(uuid) from purchases;'
            },
            {
                title: 'Wrapping up',
                description: 'Now you know how to return columns with your queries. We learned about the DISTINCT and ALL keywords, operators and scalar functions. In the next lesson, we\'ll dive into row filtering, which will be a bigger challenge, but don\'t let that scare you. You\'re doing great! I\'ll be waiting for you in the next lesson.',
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