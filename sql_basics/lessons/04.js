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
                title: 'WHERE',
                description: 'Welcome back! So far we only filtered columns. From now on, we start to filter rows, too. The WHERE keyword is used for this. After the WHERE clause, we have to put an expression, that will evaluate to true or false for each record. Every row, for which that expression is false, will be ignored when the result is created. Take a look at the example I provided for you in the editor. It shows whether the profitable purchases were payed or not.',
                solution: [{"columns":["payed"],"values":[["TRUE"],["FALSE"],["TRUE"],["FALSE"],["TRUE"],["TRUE"],["FALSE"],["TRUE"],["FALSE"],["FALSE"],["TRUE"],["TRUE"],["FALSE"],["FALSE"],["TRUE"],["TRUE"],["TRUE"],["TRUE"],["TRUE"],["TRUE"],["TRUE"],["FALSE"],["FALSE"],["FALSE"],["TRUE"],["TRUE"],["FALSE"],["TRUE"],["TRUE"],["TRUE"],["TRUE"]]}],
                query: 'select payed\n' +
                'from purchases\n' +
                'where profit > 0;'
            },
            {
                title: 'Conditional operators',
                description: 'You can use the common operators in a where clause (=, >, <, >=, <=), and <> for not equal, which might differ in some dialects. Go find out which product has a purchase with the price 20 and show the product and price.',
                solution: [{"columns":["product","price"],"values":[["butter",20]]}],
                query: ''
            },
            {
                title: 'Logical operators',
                description: 'You can combine conditions with AND, OR and NOT. See the example, and then retrieve the product, the revenue and the profit for each record, which has a revenue higher than the fixed cost and isn\'t profitable.',
                solution: [{"columns":["product","revenue","profit"],"values":[["fork",1632,-203],["cake",205,-1362],["butter",640,-86],["fork",2592,-294],["egg",1980,-4420],["flower",987,-1137],["cake",2449,-1206],["butter",1638,-3012],["fork",1118,-3576],["cake",640,-590],["flower",405,-730],["cake",1155,-270],["butter",2340,-412],["cake",2058,-444],["cake",1860,-1120],["fork",2484,-1778]]}],
                query: 'select product, profit\n' +
                'from purchases\n' +
                'where profit > 0 or revenue > fix_cost;'
            },
            {
                title: 'BETWEEN',
                description: 'In case you want to select a range of values, you can do so with the BETWEEN keyword. This keyword is used as demonstrated in the editor. Basically it is just a shortcut for column > x and column < y. Instead, you can write column BETWEEN x AND y. Notice, that once again SQL dialects disagree on which of the end values should be inclusive or exclusive. Try it yourself, to fetch all products with price above 50 and below 100.',
                solution: [{"columns":["product","price"],"values":[["butter",56],["egg",60],["ice",86],["butter",65],["egg",63],["flower",100],["flower",67],["ice",64],["egg",73],["fork",73],["cake",64],["egg",83],["flower",76],["cake",56],["ice",94],["flower",99],["flower",77],["butter",98],["cake",81],["flower",65],["butter",52],["fork",53],["egg",81],["ice",88]]}],
                query: 'select product, profit\n' +
                'from purchases\n'+
                'where volume between 0 and 10;'
            },
            {
                title: 'IN',
                description: 'Sometimes, the values are categorical, and you want to filter by some of those values. Something like \'where column = x or column = y or column = z\'. Thankfully, we have the IN keyword for that. Also, we are going to start wrapping our concrete values with quotes, because we don\'t want to confuse SQL. Take a look at the example, and after that return the prices for the butter, egg and ice with the respective product name before  to solve this step.',
                solution: [{"columns":["product","price"],"values":[["ice",23],["butter",20],["egg",22],["butter",56],["egg",60],["butter",18],["ice",86],["butter",65],["egg",63],["butter",30],["ice",64],["egg",73],["egg",83],["ice",94],["butter",45],["butter",98],["egg",116],["butter",52],["egg",81],["butter",47],["ice",88]]}],
                query: 'select product, fix_cost\n' +
                'from purchases\n'+
                'where fix_cost in (\'50\', \'100\');'
            },
            {
                title: 'LIKE',
                description: 'The final keyword in this lesson is LIKE. This is a simple option to search in a table column. For example, we might not remember that we have cake among our products, just that it starts with a c. Well, the example query uses LIKE for this. The % wildcard is to replace unknown characters. The pattern %x means it ends with x, the pattern x% means it starts with x and the pattern %x% means it contains x. Use it to retrieve the uuid that contains 4004.',
                solution: [{"columns":["uuid"],"values":[["aca034ab-12b2-4004-aec5-c84c751e71b9"]]}],
                query: 'select distinct product\n' +
                'from purchases\n'+
                'where product like \'c%\';'
            },
            {
                title: 'Wrapping up',
                description: 'In this lesson, we really learned a lot. Feel free to repeat it, if you are confused by these WHERE clauses. Try to play with your own examples. And don\'t forget: the more mistakes you make, the more you learn. Try to make a lot of mistakes!',
                solution: [],
                query: 'select uuid\n' +
                'from purchases\n'+
                'where uuid like \'%4004%\';'
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