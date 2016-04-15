(function() {
    angular.module('usMap', [])
    .factory('allStates', function() {
        return [
            "AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL",
            "GA","GU","HI","IA","ID","IL","IN","KS","KY","LA",
            "MA","MD","ME","MH","MI","MN","MO","MS","MT","NC",
            "ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR",
            "PA","PR","PW","RI","SC","SD","TN","TX","UT","VA",
            "VI","VT","WA","WI","WV","WY"
        ];
    });
})();

(function(currentScriptPath) {
    angular.module('usMap')
    .directive('usMap', ['allStates', function(allStates) {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            templateUrl: currentScriptPath.replace('us-map.js', 'us-map.svg'),
            controllerAs: 'ctrl',
            controller: function() {
                var ctrl = this;

                ctrl.setColor = function(state, color) {
                    ctrl.states[state].attr('fill', color);
                };

                ctrl.getStateElement = function(state) {
                    return ctrl.states[state];
                };
            },
            link: function(scope, elem, attr, ctrl, transcludeFn) {
                scope.ctrl.states = {};
                var svg = elem.find('svg')[0];

                allStates.forEach(function(state) {
                    var st = svg.getElementById(state);
                    var stElem = angular.element(st);
                    scope.ctrl.states[state] = stElem;
                });

                // manually append the transcluded templates
                transcludeFn(function(clone) {
                    elem.append(clone);
                });

                elem.css('display', 'flex');
            }
        };
    }])
})(
    /*
     * quick hack to get current script path
     * (http://stackoverflow.com/questions/21103724/angular-directive-templateurl-relative-to-js-file)
     */
    (function() {
        var scripts = document.getElementsByTagName("script");
        var currentScriptPath = scripts[scripts.length - 1].src;
        return currentScriptPath;
    })()
);

(function() {
    angular.module('usMap')
    .directive('mapData', function() {
        return {
            restrict: 'E',
            scope: {
                state: '@',
                color: '@',
                hoverColor: '@',
                hoverBgColor: '@',
                hoverPadding: '@'
            },
            require: '^^usMap',
            transclude: true,
            link: function(scope, elem, attr, ctrl) {
                if(scope.state) {
                    elem.css('position', 'fixed');
                    elem.css('z-index', '20');
                    elem.css('white-space', 'nowrap');
                    elem.css('display', 'none');
                    if(scope.hoverBgColor) {
                        elem.css('background-color', scope.hoverBgColor);
                    }
                    if(scope.hoverColor) {
                        elem.css('color', scope.hoverColor);
                    }
                    if(scope.hoverPadding) {
                        elem.css('padding', scope.hoverPadding);
                    }

                    var stElem = ctrl.getStateElement(scope.state);

                    stElem.on('mouseenter', function() {
                        elem.css('display', 'block');
                    });

                    stElem.on('mousemove', function(e) {
                        elem.css('left', e.clientX+'px');
                        elem.css('top', e.clientY+'px');
                    });

                    stElem.on('mouseout', function() {
                        elem.css('display', 'none');
                    });

                    if(scope.color) {
                        ctrl.setColor(scope.state, scope.color);
                    }
                }
            },
            template: '<div ng-transclude></div>'
        };
    });
})();
