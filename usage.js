(function() {
    angular.module('myApp', ['usMap'])
    .controller('TestController', function() {
        var ctrl = this;

        ctrl.data = [ 
            {
                st: 'CO',
                state: 'Colorado',
                total: 66,
                clinton: 28,
                sanders: 38
            },
            {
                st: 'TX',
                state: 'Texas',
                total: 222,
                clinton: 147,
                sanders: 75
            }
        ];

        ctrl.lines = [
            '<us-map>',
            '  <map-data state="{{ctrl.state}}" color="{{ctrl.color}}">',
            '    <div class="message">',
            '      <div class="message-header">',
            '        {{ctrl.stateName}} ({{ctrl.total}} delegates)',
            '      </div>',
            '      <div class="message-body">',
            '        <div class="columns">',
            '          <div class="column">',
            '            {{ctrl.winnerName}} <br>',
            '            {{ctrl.winnerCount}} <i class="fa fa-flag"></i>',
            '          </div>',
            '          <div class="column">',
            '            {{ctrl.looserName}} <br>',
            '            {{ctrl.looserCount}}',
            '          </div>',
            '        </div>',
            '      </div>',
            '    </div>',
            '  </map-data>',
            '</us-map>'
        ];

        ctrl.color = function(obj) {
            if(obj.sanders >= obj.clinton) {
                return "#127ED6";
            }
            else {
                return "#0350A2";
            }
        };

        ctrl.winnerName = generator(greaterEqual, "name");
        ctrl.winnerCount = generator(greaterEqual, 1);

        ctrl.looserName = generator(lessThan, "name");
        ctrl.looserCount = generator(lessThan, 1);

        function lessThan(a, b) {
            return a < b;
        }
        function greaterEqual(a, b) {
            return a >= b;
        }

        function generator(predicateFn, s) {
            return function(obj) {
                if(predicateFn(obj.sanders, obj.clinton)) {
                    return typeof(s) === "string"? "Sanders": obj.sanders;
                }
                else {
                    return typeof(s) === "string"? "Clinton": obj.clinton;
                }
            };
        }
    });
})();
