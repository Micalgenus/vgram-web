var infoData = {
  root: $('.grid-container').isotope({
      // specify itemSelector so stamps do get laid out
      itemSelector: '.grid-item'
    }),
  dataArray: [],
  displayArray: [],
  page: 1,
  pageSize: 5,
  total: 1,

  data: (function() {
    function makeInfo(data) {
      console.log(data);
      return new EJS({url: '/template/room-data.ejs'}).render({
        image_path: JSON.parse(data.thumbnail_image_path),
        deposit: data.deposit,
        monthly_rent_fee: data.monthly_rent_fee,
        title: data.post.title
      });
    };

    return {
      makeInfo: makeInfo
    };
  })(),

  push: function(list) {
    for (var i in list) {
      infoData.dataArray.push(list[i]);
    }

    infoData.total = list.length;
  },

  displayPush: function(data) {
    // console.log(data);
    infoData.displayArray.push(data);
    // infoData.root.append(infoData.data.makeInfo(data));
  },

  display: function(dataList) {
    infoData.clearDisplay();
    // console.log(infoData.root);
    for (var i in infoData.displayArray) {
      var $items = $(infoData.data.makeInfo(infoData.displayArray[i]));
      infoData.root.append($items).isotope('appended', $items).isotope('layout');
    }
    infoData.root.isotope('layout');
  },
  
  clear: function() {
    infoData.dataArray = [];
    infoData.root.html('');
  },

  clearDisplay: function() {
    infoData.root.html('');
  },

  roomDisplayReload: function() {
    // console.log(infoData.dataArray);
    infoData.displayArray = [];
    let count = 0;
    infoData.dataArray = infoData.sort.roomSort(infoData.dataArray);
    for (var d in infoData.dataArray) {
      if (count >= infoData.pageSize * (infoData.page - 1) && count < infoData.pageSize * infoData.page) {
        // console.log('push:', count);
        infoData.displayPush(infoData.dataArray[d]);
      }
      count++;
    }
    infoData.display();
  },

  sort: (function() {
    function roomCompare(a,b) {
      if (a.ID < b.ID)
        return -1;
      if (a.ID > b.ID)
        return 1;
      return 0;
    };

    function roomSort(obj) {
      return obj.sort(roomCompare);
    };

    return {
      roomSort: roomSort
    };
  })(),

  roomDataReload: function(data) {
    infoData.clear();
    infoData.page = 1;
    
    let init = infoData.list.infoList.makeRoomInfoList(data);

    init.then(function() {
      infoData.roomDisplayReload();

      infoData.total = Math.ceil(infoData.dataArray.length / infoData.pageSize);
      infoData.pagination.reload(infoData.total);
    });
  },

  list: (function() {
    function makeList(list) {
      // 중복 제거
      return list.reduce(function(a, b){
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
      },[]);
    }

    function makeRoomList(data) {
      list = [];
      data.forEach(function(v) {
        let room_id = v.icl_translation.post.room.ID;
        list.push(room_id);
      });

      return makeList(list);
    };

    var infoList = (function() {
      function makeRoomInfoList(data) {
        let list = JSON.stringify(makeRoomList(data));
        return $.ajax({
          url: "/room/json/list/" + list,
          success: function(data) {
            if (data) {
              infoData.push(data);
            } else {
              alert("Load Error !!");
            }
          }
        });
      }

      return {
        makeRoomInfoList: makeRoomInfoList
      }
    })();
    
    return {
      infoList: infoList
    };
  })(),

  pagination: (function() {
    var start = false;
    var $pagination = $('#pagination');
    var defaultOpts = {
      totalPages: 1
    };

    function clickEvent(evt, page) {
      console.log(page);
      infoData.page = page;
      infoData.roomDisplayReload();
    };

    function init(total) {
      start = true;
      defaultOpts.totalPages = total;
      $pagination.twbsPagination({
        totalPages: total,
        onPageClick: clickEvent
      });
    }

    function reload(total) {
      if (total < 1) total = 1;
      console.log(total);
      if (!start) return init(total);

      $pagination.twbsPagination('destroy');
      $pagination.twbsPagination($.extend({}, defaultOpts, {
        startPage: infoData.page,
        totalPages: total,
        onPageClick: clickEvent
      }));
    }

    return {
      reload: reload,
    }
  })(),
}

var dataMap = {
  markerCluster: null,
  t: null,

  locations: (function() {
    function makeMapLocations(data) {
      locations = [];
      data.forEach(function(v) {
        var l = {lat: v.lat, lng: v.lng};
        locations.push(l);
      });
      return locations;
    };

    function makeLocations(url, done) {
      $.ajax({
        url: url,
        success: function(data) {
          if (data) {
            var locations = makeMapLocations(data);
            dataMap.map.loadMap(locations);
            if (done) done(data);
          } else {
            alert("Load Error !!");
          }
        }
      });
    };

    return {
      makeLocations: makeLocations
    };
  })(),

  event: (function(){
    function timer(url, done) {
      t = setTimeout(function() {
        clearTimeout(t);
        dataMap.locations.makeLocations(url, done);
      }, 500);
    };

    function roomTimer(e, w, s, n) {
      timer("/map/room/locations/" + e + "/" + w + "/" + s + "/" + n, infoData.roomDataReload);
    };

    return {
      roomTimer: roomTimer
    }
  })(),

  marker: (function(){
    var labels = '1';

    function makeMarker(locations) {
      return locations.map(function(location, i) {
        return new google.maps.Marker({
          position: location,
          label: labels[i % labels.length]
        });
      });
    }

    return {
      makeMarker: makeMarker
    };
  })(),

  map: {
    initMap: function(ID, lat, lng) {
      return new google.maps.Map(document.getElementById(ID), {
        zoom: 15,
        center: {lat: lat, lng: lng}
      });
    },

    drawMap: function(lat, lng, timer) {
      var map = dataMap.map.initMap('map', lat, lng);

      map.addListener('dragend', function() {
        var bounds = map.getBounds();
        var c = dataMap.getCoordinate(bounds);
        timer(c.east + c.wtoe, c.west - c.wtoe, c.south - c.ston, c.north + c.ston);
      });

      map.addListener('zoom_changed', function() {
        var bounds = map.getBounds();
        var c = dataMap.getCoordinate(bounds);
        timer(c.east + c.wtoe, c.west - c.wtoe, c.south - c.ston, c.north + c.ston);
      });

      // Init Map
      map.addListener('projection_changed', function() {
        var bounds = map.getBounds();
        var c = dataMap.getCoordinate(bounds);
        timer(c.east + c.wtoe, c.west - c.wtoe, c.south - c.ston, c.north + c.ston);
      });

      // Add a marker clusterer to manage the markers.
      markerCluster = new MarkerClusterer(map, dataMap.marker.makeMarker([]),
          {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    },

    roomMap: function(lat, lng) {
      dataMap.map.drawMap(lat, lng, dataMap.event.roomTimer);
    },

    loadMap: function(locations) {
      var newmarkers = dataMap.marker.makeMarker(locations);

      markerCluster.clearMarkers();
      markerCluster.addMarkers(newmarkers, true);
      markerCluster.redraw();
    },
  },

  getCoordinate: function(bounds) {
    var n = bounds.getNorthEast().lat();
    var e = bounds.getNorthEast().lng();
    var s = bounds.getSouthWest().lat();
    var w = bounds.getSouthWest().lng();

    var ew = (e - w) / 10;
    var ns = (n - s) / 10;

    return {
      east: e,
      north: n,
      south: s,
      west: w,

      wtoe: ew,
      ston: ns
    }
  }
}
