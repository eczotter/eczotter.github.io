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
                title: 'Some convincing',
                description: 'Welcome back! In this chapter, we\'ll start to filter what we select, starting with the columns. Why is this important? Well, imagine that you have a huge table with millions or maybe more of rows, and a couple hundred columns, and you use the internet to fetch them. Now, it\'s true, that the speed is increasing every day, but it will still take some time to fetch everything. And that is a waste of time, when you don\'t need it. The main point of this training is to make you able to filter what goes trough the wires, and what is calculated by you. So let\'s start. This is just a refresher, what was the query we used previously. Run it, and come along!',
                solution: [{"columns":["uuid","product","volume","price","revenue","time","payed","fix_cost","variable_cost","total_cost","profit"],"values":[["aca034ab-12b2-4004-aec5-c84c751e71b9","ice",43,23,989,"2014.12.13 11:28","TRUE",100,15,745,244],["ac32d002-7cce-498e-8192-d71cac8dcb04","fork",51,32,1632,"2014.11.26 0:37","TRUE",50,35,1835,-203],["ad2e99be-2d71-4a48-9fd6-f7c2b54baa99","cake",41,5,205,"2014.11.08 4:53","FALSE",50,37,1567,-1362],["ebc54057-ec26-4574-96d5-7393fa41dc9f","butter",32,20,640,"2014.11.26 9:53","FALSE",150,18,726,-86],["25a02968-6337-4d5b-9028-5225a3f55b58","fork",72,36,2592,"2014.09.12 2:33","TRUE",150,38,2886,-294],["d9c01c4f-f65d-4279-8014-62af18aad59b","egg",90,22,1980,"2014.12.24 3:45","FALSE",100,70,6400,-4420],["05511395-5287-4986-8d68-91dbd5fa6e18","butter",17,56,952,"2014.09.24 6:34","FALSE",100,37,729,223],["6e9ce1ad-1b72-45fa-8446-b467df23d0ac","flower",47,21,987,"2014.12.03 5:42","TRUE",150,42,2124,-1137],["3b55116e-0fca-4241-869d-2004f9aaeec8","egg",21,60,1260,"2014.09.13 1:20","TRUE",150,25,675,585],["50240bc3-0735-485d-a71a-ff35aae063f3","cake",79,31,2449,"2014.09.10 21:24","FALSE",100,45,3655,-1206],["0d9faac5-08b2-4024-8943-7d4ee89e937b","butter",91,18,1638,"2014.10.28 3:14","FALSE",100,50,4650,-3012],["47206117-d438-4d8c-8a7c-5d5df25cba40","fork",86,13,1118,"2014.10.07 18:06","FALSE",50,54,4694,-3576],["df60b16d-f9b7-402d-a24a-0fb94e19e9c6","cake",20,32,640,"2014.10.24 6:53","FALSE",150,54,1230,-590],["2adccfb7-576d-423c-a0bc-413c1955daad","ice",46,86,3956,"2014.10.22 9:52","FALSE",50,44,2074,1882],["88d17411-30e0-4e1b-84c9-df044ca1e2c2","flower",45,9,405,"2014.09.01 1:42","TRUE",100,23,1135,-730],["02b364a6-5456-469b-b01e-31d8df683b64","butter",54,65,3510,"2014.11.08 0:43","TRUE",150,42,2418,1092],["29bddff2-b637-4dbf-b5a8-586690f7cbf9","egg",78,63,4914,"2014.11.21 12:57","TRUE",50,43,3404,1510],["53f744fb-adb2-45f1-99eb-a5ea15c48b56","flower",47,100,4700,"2014.09.23 3:36","FALSE",150,42,2124,2576],["a2abb752-cf7e-4bd1-8c1b-50edb7fdc193","cake",55,21,1155,"2014.10.12 7:02","TRUE",50,25,1425,-270],["76400a11-0676-409e-8575-6a29903e0467","butter",78,30,2340,"2014.09.12 15:40","FALSE",100,34,2752,-412],["eeaeaadc-7037-4fdc-80a5-1a0fbdb66022","flower",82,67,5494,"2014.11.30 0:45","TRUE",50,29,2428,3066],["15b9c28b-ce06-4f96-8637-a67105deeaad","ice",77,64,4928,"2014.10.30 10:48","FALSE",150,59,4693,235],["60ca4e32-dfeb-4209-ba7b-73487ae22e46","egg",90,73,6570,"2014.11.10 14:56","FALSE",150,38,3570,3000],["d9fc9f40-f409-4179-936b-6a66e2796192","fork",80,73,5840,"2014.10.09 6:44","TRUE",100,15,1300,4540],["ad54ac8a-829f-467a-ab69-c0120d9538ea","fork",73,40,2920,"2014.10.26 13:57","TRUE",50,13,999,1921],["3f27d138-ddbc-4197-bf55-0a856de89e8d","cake",122,64,7808,"2014.09.25 2:14","FALSE",150,18,2346,5462],["693a7a98-0de7-4d18-ad4c-b687e5d9e809","egg",101,83,8383,"2014.10.16 6:16","FALSE",50,49,4999,3384],["c9c6f630-3136-4e14-894d-506a05cdac42","flower",66,76,5016,"2014.11.29 18:43","TRUE",50,38,2558,2458],["4deb0c1e-7db2-4e63-a91c-253a8aabcdee","cake",49,56,2744,"2014.09.29 19:58","TRUE",150,33,1767,977],["938b4f22-44b3-40c8-ab01-d729a60675fb","ice",68,94,6392,"2014.09.17 22:36","TRUE",100,42,2956,3436],["4622cdcd-ec19-4522-a8c1-2ca77e45436c","butter",64,45,2880,"2014.10.28 0:12","TRUE",150,29,2006,874],["b2f19e23-93fc-4c31-99bf-7d81821969b2","flower",81,99,8019,"2014.10.04 0:33","TRUE",50,53,4343,3676],["f040da99-bce9-4811-86a9-072f03bc6dc3","flower",92,77,7084,"2014.12.27 13:17","TRUE",50,48,4466,2618],["1d8ceee1-44ab-4a80-97c2-8ea1ea941c81","cake",31,42,1302,"2014.10.21 11:18","TRUE",100,38,1278,24],["06d7b5ba-ba9d-4ce4-be38-2d90517c04fc","butter",66,98,6468,"2014.12.28 15:35","FALSE",150,33,2328,4140],["38657626-93e8-406e-9dbe-4c433a861d4b","cake",42,49,2058,"2014.10.29 19:40","TRUE",150,56,2502,-444],["6b0a4442-2319-404b-907b-2c67f3d9d067","egg",52,116,6032,"2014.09.30 12:26","FALSE",150,29,1658,4374],["f32c380e-db26-4f11-9aae-33c1f47bac63","cake",90,81,7290,"2014.10.10 18:44","FALSE",50,36,3290,4000],["c39f76a5-7cfb-4873-8646-4f1254612687","flower",69,65,4485,"2014.09.14 7:04","TRUE",150,44,3186,1299],["a0e6d287-4878-4066-aefc-82a637591737","butter",111,52,5772,"2014.12.31 14:10","TRUE",100,15,1765,4007],["4afc86c3-c7f6-4009-bb5a-40d400185c1f","cake",11,45,495,"2014.09.18 9:08","FALSE",50,36,446,49],["0e6e765b-4ef3-4aaa-bfd5-e4c88ed14c95","fork",88,53,4664,"2014.10.12 20:30","TRUE",150,32,2966,1698],["d2ef7cbf-bd2a-4de8-8a54-c14a904d6263","egg",109,81,8829,"2014.09.03 17:55","TRUE",150,42,4728,4101],["38c504be-df58-497d-97d6-2d38dca68a88","butter",23,47,1081,"2014.11.12 17:59","TRUE",100,42,1066,15],["c84007ad-a930-4292-aea4-81bfc84a3dc5","cake",60,31,1860,"2014.12.29 1:35","TRUE",100,48,2980,-1120],["b44d025b-597c-412d-b2f8-30202d9bdc5f","fork",108,23,2484,"2014.11.24 7:08","TRUE",50,39,4262,-1778],["5e36cd87-6499-4e7a-a27c-6a61a0504d0c","ice",62,88,5456,"2014.12.09 4:43","TRUE",150,38,2506,2950]]}],
                query: 'select * from purchases;'
            },
            {
                title: 'Always the profit, just the profit',
                description: 'Okay, so, what if we only need to calculate whether our work was profitable or not? For that we just need to add up all the profit values in the table. Then we only need the profit column, right? You can replace the star with the column name, you want to get. Just try it, and we\'ll continue on in the next step with more options.',
                solution: [{"columns":["profit"],"values":[[244],[-203],[-1362],[-86],[-294],[-4420],[223],[-1137],[585],[-1206],[-3012],[-3576],[-590],[1882],[-730],[1092],[1510],[2576],[-270],[-412],[3066],[235],[3000],[4540],[1921],[5462],[3384],[2458],[977],[3436],[874],[3676],[2618],[24],[4140],[-444],[4374],[4000],[1299],[4007],[49],[1698],[4101],[15],[-1120],[-1778],[2950]]}],
                query: 'select * from purchases;'
            },
            {
                title: 'Congrats, but...',
                description: 'I also need to know the profit per unit. At least that\'s what your boss tells you. Well, then we need the profit column but also the volume column. It\'s really easy. Just separate the two column names with a comma. Using this, select the profit and the volume columns in this order. And then we can continue.',
                solution: [{"columns":["profit","volume"],"values":[[244,43],[-203,51],[-1362,41],[-86,32],[-294,72],[-4420,90],[223,17],[-1137,47],[585,21],[-1206,79],[-3012,91],[-3576,86],[-590,20],[1882,46],[-730,45],[1092,54],[1510,78],[2576,47],[-270,55],[-412,78],[3066,82],[235,77],[3000,90],[4540,80],[1921,73],[5462,122],[3384,101],[2458,66],[977,49],[3436,68],[874,64],[3676,81],[2618,92],[24,31],[4140,66],[-444,42],[4374,52],[4000,90],[1299,69],[4007,111],[49,11],[1698,88],[4101,109],[15,23],[-1120,60],[-1778,108],[2950,62]]}],
                query: 'select profit from purchases;'
            },
            {
                title: 'Many columns',
                description: 'You can of course list any number of columns in whatever order you wish to see them, you are not tied to the order in which they are in the table. Select now the the total_cost, the revenue, the price and the profit columns in this order.',
                solution: [{"columns":["total_cost","revenue","price","profit"],"values":[[745,989,23,244],[1835,1632,32,-203],[1567,205,5,-1362],[726,640,20,-86],[2886,2592,36,-294],[6400,1980,22,-4420],[729,952,56,223],[2124,987,21,-1137],[675,1260,60,585],[3655,2449,31,-1206],[4650,1638,18,-3012],[4694,1118,13,-3576],[1230,640,32,-590],[2074,3956,86,1882],[1135,405,9,-730],[2418,3510,65,1092],[3404,4914,63,1510],[2124,4700,100,2576],[1425,1155,21,-270],[2752,2340,30,-412],[2428,5494,67,3066],[4693,4928,64,235],[3570,6570,73,3000],[1300,5840,73,4540],[999,2920,40,1921],[2346,7808,64,5462],[4999,8383,83,3384],[2558,5016,76,2458],[1767,2744,56,977],[2956,6392,94,3436],[2006,2880,45,874],[4343,8019,99,3676],[4466,7084,77,2618],[1278,1302,42,24],[2328,6468,98,4140],[2502,2058,49,-444],[1658,6032,116,4374],[3290,7290,81,4000],[3186,4485,65,1299],[1765,5772,52,4007],[446,495,45,49],[2966,4664,53,1698],[4728,8829,81,4101],[1066,1081,47,15],[2980,1860,31,-1120],[4262,2484,23,-1778],[2506,5456,88,2950]]}],
                query: 'select profit, volume from purchases;'
            },
            {
                title: 'Aliases',
                description: 'In this step, we\'re going to rename the columns. No, not really, not in the database, only in the result set. Remember, you cannot alter the information in the database with a select statement. But you can determine in excruciating detail, what is returned from there. The new column name is called an alias, and the AS keyword is used for it. Run the query I just set up for you, take a look at the results, and then in the next step, you get to practice it.',
                solution: [{"columns":["cost","revenue","price","profit"],"values":[[745,989,23,244],[1835,1632,32,-203],[1567,205,5,-1362],[726,640,20,-86],[2886,2592,36,-294],[6400,1980,22,-4420],[729,952,56,223],[2124,987,21,-1137],[675,1260,60,585],[3655,2449,31,-1206],[4650,1638,18,-3012],[4694,1118,13,-3576],[1230,640,32,-590],[2074,3956,86,1882],[1135,405,9,-730],[2418,3510,65,1092],[3404,4914,63,1510],[2124,4700,100,2576],[1425,1155,21,-270],[2752,2340,30,-412],[2428,5494,67,3066],[4693,4928,64,235],[3570,6570,73,3000],[1300,5840,73,4540],[999,2920,40,1921],[2346,7808,64,5462],[4999,8383,83,3384],[2558,5016,76,2458],[1767,2744,56,977],[2956,6392,94,3436],[2006,2880,45,874],[4343,8019,99,3676],[4466,7084,77,2618],[1278,1302,42,24],[2328,6468,98,4140],[2502,2058,49,-444],[1658,6032,116,4374],[3290,7290,81,4000],[3186,4485,65,1299],[1765,5772,52,4007],[446,495,45,49],[2966,4664,53,1698],[4728,8829,81,4101],[1066,1081,47,15],[2980,1860,31,-1120],[4262,2484,23,-1778],[2506,5456,88,2950]]}],
                query: 'select total_cost as cost, revenue, price, profit from purchases;'
            },
            {
                title: 'Your turn',
                description: 'Fetch the product, the price and the variable cost of every record in a table with the headers name, value and cost.',
                solution: [{"columns":["name","value","cost"],"values":[["ice",23,15],["fork",32,35],["cake",5,37],["butter",20,18],["fork",36,38],["egg",22,70],["butter",56,37],["flower",21,42],["egg",60,25],["cake",31,45],["butter",18,50],["fork",13,54],["cake",32,54],["ice",86,44],["flower",9,23],["butter",65,42],["egg",63,43],["flower",100,42],["cake",21,25],["butter",30,34],["flower",67,29],["ice",64,59],["egg",73,38],["fork",73,15],["fork",40,13],["cake",64,18],["egg",83,49],["flower",76,38],["cake",56,33],["ice",94,42],["butter",45,29],["flower",99,53],["flower",77,48],["cake",42,38],["butter",98,33],["cake",49,56],["egg",116,29],["cake",81,36],["flower",65,44],["butter",52,15],["cake",45,36],["fork",53,32],["egg",81,42],["butter",47,42],["cake",31,48],["fork",23,39],["ice",88,38]]}],
                query: ''
            },
            {
                title: 'Wrapping up',
                description: 'Well done! Congratulations, in this lesson we learned about selecting columns and aliases. This will be our foundation in the upcoming chapters, when we take a look at a use case, when we really need aliases.',
                solution: [],
                query: 'select product as name, price as value, variable_cost as cost from purchases;'
            },
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