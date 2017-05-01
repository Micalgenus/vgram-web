//////////////////////////////
/**
 * @desc 출력될 리스트 데이터
 * 
 * @return {object} template, data
 */
//////////////////////////////
var ListData = (function() {

  /**
   * @desc 화면에 뿌려주기 위한 객체
   * 
   * @return {object} displayReload
   */
  var display = (function() {

    /**
     * @desc 출력을 위한 
     */
    var list = (function() {
      var displayArray = [];

      // 리스트가 출력될 태그
      var root = $('.grid-container').isotope({ itemSelector: '.grid-item' });

      /**
       * @desc 화면 리스트를 초기화
       */
      function clear() {
        root.html('');
      };

      function show(make) {
        clear();
        for (var i in displayArray) appendRoot(make(displayArray[i]));
        root.isotope('layout');
      };

      function appendRoot(data) {
        var $items = $(data);
        root.append($items).isotope('appended', $items).isotope('layout');
      };
      
      var displayList = (function() {

        function push(data) {
          displayArray.push(data);
        }

        function displayReload(make) {
          displayArray = [];
          const dataArray = data.getDataArray();
          let count = 0;
          let start = pagination.getPageSize() * (pagination.getPage() - 1);
          let end = pagination.getPageSize() * pagination.getPage();
          for (var d in dataArray) {
            if (count >= start && count < end) {
              push(dataArray[d]);
            }
            count++;
          }
          show(make);
        };
        return {
          displayReload: displayReload
        }
      })(); /* ListData.display.list.displayList */

      return {
        displayReload: displayList.displayReload
      }

    })(); /* ListData.display.list */

    /**
     * @desc 페이지 관리
     * 
     * @return {object} reload
     */
    var pagination = (function() {

      var $start = false;
      var $pagination = $('#pagination');
      var defaultOpts = { totalPages: 1 };

      var $make = null;
      var $page = 1;
      let $pageSize = 5;

      /**
       * @desc  페이지 클릭 시 발생 이벤트
       * @param {*} evt 
       * @param {page} page 클릭된 페이지
       */
      function clickEvent(evt, page) {
        $page = page;
        display.displayReload($make);
      };
      
      /**
       * @desc  pagination 초기화
       */
      function init() {
        $start = true;
        $pagination.twbsPagination(defaultOpts);
      };

      function getPage() { return $page; }
      function getPageSize() { return $pageSize; }

      /**
       * @desc  pagination 다시 그리기
       * @param {int} listSize 목록 갯수
       */
      function reload(listSize, make) {
        if (!$start) init();
        if (listSize < 1) listSize = 1;
        var total = Math.ceil(listSize  / $pageSize);
        
        $make = make;

        $pagination.twbsPagination('destroy');
        $pagination.twbsPagination($.extend({}, defaultOpts, {
          totalPages: total,
          onPageClick: clickEvent
        }));
      }

      return {
        getPage: getPage,
        getPageSize: getPageSize,
        reload: reload,
      }
    })(); /* ListData.display.pagination */

    /**
     * @desc 데이터를 template로 변환
     * 
     * @return {object} makeTemplate
     */
    var template = (function() {
      /**
       * @desc  
       * @param {object} data 방 정보에 관한 object 
       */
      function makeTemplate(url, obj) {
        return new EJS({url: url}).render(obj);
      };

      return {
        makeTemplate: makeTemplate
      };
    })(); /* ListData.display.template */

    return {
      displayReload: display.displayReload,
      template: template,
      pagination: pagination
    }

  })(); /* ListData.display */

  var data = (function() {

    var dataArray = [];

    function makeList(list) {
      // 중복 제거
      return list.reduce(function(a, b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
      },[]);
    }

    function getList(url, $list) {
      let list = JSON.stringify($list);
      return $.ajax({
        url: url + list,
        success: function(data) {
          if (data) {
            push(data);
          } else {
            alert("Load Error !!");
          }
        }
      });
    }

    function push(list) {
      for (var i in list) {
        dataArray.push(list[i]);
      }
    }

    function dataReload($init, compare, make) {
      clear();
      
      $init.then(function() {
        dataArray = dataArray.sort(compare);
        display.pagination.reload(dataArray.length, make);

        display.displayReload(make);
      });
    };

    function getDataArray() { return dataArray; }

    function clear() {
      dataArray = [];
    };

    return {
      getDataArray: getDataArray,
      dataReload: dataReload,
      makeList: makeList,
      getList: getList
    }
  })(); /* ListData.data */

  return {
    template: display.template,
    data: data
  }
})(); /* ListData */



//////////////////////////////
/**
 * @desc 맵 관련 데이터
 * 
 * @return {object} drawMap
 */
//////////////////////////////
var MapData = (function() {

  /**
   * @desc 맵 이벤트 관련 처리
   * 
   * @return {object} imer
   */
  var event = (function() {

    // timer event listener
    var t = null;

    /**
     * @desc  이벤트 처리 루틴
     * @param {URL}      url request url
     * @param {function} done 요청 성공시 추가 호출할 함수
     */
    function timer(url, done) {
      t = setTimeout(function() {
        clearTimeout(t);
        map.getLocations(url, done);
      }, 500); // 500ms 이내에 같은 이벤트 호출 시 중복 호출 제거
    };

    return {
      // Timer
      timer: timer
    }
  })(); /* MapData.event */


  /**
   * @desc Map전체를 관리하는 객체
   * 
   * @return {object} drawMap, getLocations
   */
  var map = (function() {

    /**
     * @desc 좌표를 관리하는 객체
     * 
     * @return {object} getLocations
     */
    var locations = (function() {

      /**
       * @desc  좌표의 값을 가공하는 함수
       * @param {array} data 좌표(lat, lng)등을 멤버로 가지는 배열
       * 
       * @return {array} array(object(lat,lng)) 좌표 배열
       */
      function makeLocations(data) {
        locations = [];
        data.forEach(function(v) {
          var l = {lat: v.lat, lng: v.lng};
          locations.push(l);
        });
        return locations;
      };

      /**
       * @desc  서버로부터 좌표의 값을 구해옴
       * @param {URL}      url 요청될 주소
       * @param {function} done 요청이 끝난 후 실행될 함수
       */
      function getLocations(url, done) {
        $.ajax({
          url: url,
          success: function(result) {
            if (result) {
              var locations = makeLocations(result);
              data.loadMap(locations)
              if (done) done(result);
            } else {
              alert("Load Error !!");
            }
          }
        });
      };

      return {
        getLocations: getLocations
      }
    })(); /* MapData.map.locations */

    /**
     * @desc 맵에 표시될 마커를 관리
     * 
     * @return {object} initMarkerClusterer, redrawMarkerCluster
     */
    var marker = (function() {

      /**
       * @desc  좌표를 marker객체로 생성
       * @param {array} locations 좌표(lat, lng) 객체로 이루어진 배열
       * 
       * @return {marker} marker에 대한 정보
       */
      function makeMarker(locations) {
        const labels = '1';
        return locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });
      }

      /**
       * @desc  MarkerClusterer객체 초기화
       * @param {map} map 맵에 대한 정보
       * 
       * @return {MarkerClusterer} MarkerClusterer객체
       */
      function initMarkerClusterer(map) {
        const imagePath = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
        return new MarkerClusterer(map, makeMarker([]), {imagePath: imagePath});
      }

      /**
       * @desc  좌표를 맵에 다시 그리는 함수
       * @param {markerCluster} markerCluster 생성된 MarkerClusterer객체
       * @param {array} locations 좌표를 포함하는 객체 배열
       */
      function redrawMarkerCluster(markerCluster, locations) {
        var newmarkers = makeMarker(locations);

        markerCluster.clearMarkers();
        markerCluster.addMarkers(newmarkers, true);
        markerCluster.redraw();
      }

      return {
        initMarkerClusterer: initMarkerClusterer,
        redrawMarkerCluster: redrawMarkerCluster
      };
    })(); /* MapData.map.marker */

    /**
     * @desc Map Data를 관리하는 객체
     * 
     * @return {object} loadMap, drawMap
     */
    var data = (function() {

      // markerCluster 객체
      var markerCluster = null;

      /**
       * @desc  Map 초기화
       * @param {selector} ID 맵이 생성될 태그
       * @param {int} lat 위도
       * @param {int} lng 경도
       * 
       * @return {map} 생성된 맵 객체
       */
      function initMap(ID, lat, lng) {
        return new google.maps.Map(document.getElementById(ID), {
          zoom: 15,
          center: {lat: lat, lng: lng}
        });
      };

      /**
       * @desc  맵을 초기화하고 그림
       * @param {lat} lat 시작 위도
       * @param {lng} lng 시작 경도
       * @param {event} timer 이벤트에 따른 실행될 함수
       */
      function drawMap(lat, lng, timer) {
        var map = initMap('map', lat, lng);

        addListener(map, 'dragend', timer);
        addListener(map, 'zoom_changed', timer);
        addListener(map, 'projection_changed', timer);

        markerCluster = marker.initMarkerClusterer(map)
      };
      
      /**
       * @desc  좌표를 이용하여 맵을 다시 그림
       * @param {array} locations 다시 그릴 좌표 배열
       */
      function loadMap(locations) {
        marker.redrawMarkerCluster(markerCluster, locations);
      };

      /**
       * @des   Map에 이벤트를 추가 시킨다.
       * @param {map}    map Map 객체
       * @param {string} event 처리될 이벤트
       * @param {timer}  done 실행될 타이머
       */
      function addListener(map, event, done) {
        map.addListener(event, function() {
          var bounds = map.getBounds();
          var c = getBounds(bounds);
          done(c.east, c.west, c.south, c.north);
        });
      };

      /**
       * @desc bounds를 이용하여 개선된 맵의 크기를 구함
       * @param {bounds} bounds map.getBounds로 구한 값
       * 
       * @return {locations} 동, 서, 남, 북에 대한 값
       */
      function getBounds(bounds) {
        var n = bounds.getNorthEast().lat();
        var e = bounds.getNorthEast().lng();
        var s = bounds.getSouthWest().lat();
        var w = bounds.getSouthWest().lng();

        var ew = (e - w) / 10;
        var ns = (n - s) / 10;

        return { east: e + ew, north: n + ns, south: s - ns, west: w - ew }
      };

      return {
        loadMap: loadMap,
        drawMap: drawMap
      }

    })(); /* MapData.map.data */

    return {
      drawMap: data.drawMap,
      getLocations: locations.getLocations
    }
  })(); /* MapData.map */

  return {
    drawMap: map.drawMap,
    timer: event.timer
  }
})(); /* MapData */