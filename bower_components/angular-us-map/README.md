# angular-us-map
An angular module to show data while hovering over different US states.

### [Live demo link](https://rajasharan.github.io/angular-us-map)

## Install
```sh
$ bower install angular-us-map --save
```
 
## Usage
#### include script file
```html
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-us-map/src/us-map.js"></script>
```

#### Import module `usMap` as dependency
```js
angular.module('myApp', ['usMap']);
```

#### Pass raw strings to `hover-data` (in single quotes)
```html
<us-map>
    <map-data 
        state="VA"
        color="blue"
        hover-data=" 'Virginia' ">
    </map-data>

    <map-data
        state="WV"
        color="red"
        hover-data=" 'West \nVirginia' "
        hover-padding="20px"
        hover-bg-color="grey"
        hover-color="yellow">
    </map-data>
</us-map>
```
![Virginia](/pics/VA.png) ![West Virginia](/pics/WV.png)

#### Pass any JS object to `hover-data` from controller scope
```html
<div ng-controller="TestController as ctrl">
    <us-map>
        <map-data state="CA" color="#345" hover-data="ctrl.data['CA'] | json"></map-data>
        <map-data state="WA" color="#f43" hover-data="ctrl.data['WA'] | json"></map-data>
    </us-map>
</div>
```
![California](/pics/CA.png) ![Washington](/pics/WA.png)

## [License](/LICENSE)
    The MIT License (MIT)
    
## Attribution
[us-map.svg](https://commons.wikimedia.org/wiki/File:Blank_US_Map_(states_only).svg) is licensed under [Attribution-Share Alike 3.0 Unported](https://creativecommons.org/licenses/by-sa/3.0/deed.en)
