var filter = (function() {

  var dataList = new List('data-list', { item: 'data-item' });

  var address = (function() {

    var bestPictures = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      prefetch: './room/json/address/init',
      remote: {
        url: './room/json/address/%QUERY',
        wildcard: '%QUERY'
      }
    });

    $('#room .typeahead').typeahead(null, {
      name: 'best-pictures',
      display: 'addr1',
      source: bestPictures,
      templates: {
        empty: [
          '<div class="empty-message">',
            'unable to find any Best Picture winners that match the current query',
          '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<div><strong>{{icl_translation.post.room.ID}}</strong> – {{addr1}}</div>')
      }
    });

    var $root = $('#room #address');
    var addrList = [];

    $('#room .typeahead.tt-input').on('typeahead:selected', function(evt, data) {
      const address = $(this).val();
      mapReplace(address);
    });

    $('#room .typeahead.tt-input').on('change', function(evt, data) {
      const address = $(this).val();
      mapReplace(address);
    });

    function mapReplace(address) {
      let url = "/post/room/json/address/info/";

      $.ajax({
        url: url + address,
        success: function(data) {
          if (data) {
            let c = data.coordinate;
            MapData.setCenter(c.lat, c.lng);
          } else {
            alert("Not found !!");
          }
        }
      });
    }
  })();

  var type = (function() {
    var $root = $('select#type');
    var typeList = [];

    function push($data) {
      $root.append('<option>' + $data + '</option>')
           .selectpicker('refresh');
    };
    
    function clear() {
      typeList = [];
      $root.html('').selectpicker('refresh');
    }

    function reload() {
    }

    $root.change(function() {
      mapReload();
    });

    function filter(data) {
      if ($root.val() == null) return true;

      if ($root.val().indexOf(data.room_type) == -1) return false;
      
      return true;
    }

    return {
      push: push,
      clear: clear,
      reload: reload,
      filter: filter
    }
  })();

  var deposit = (function() {
    var $min = $('#deposit .min');
    var $max = $('#deposit .max');

    function clear() {
      $min.val(0);
      $max.val(0);
    }

    function reload() {
      clear();
      var min = true;

      dataList.sort('deposit', { order: 'asc' });
      var list = dataList.search();
      list.forEach(function(d) {
        var v = d._values;
        if (min) $min.val(v.deposit);
        
        $max.val(v.deposit);
      });
    };

    $min.change(function() {
      mapReload();
    });

    $max.change(function() {
      mapReload();
    });
    
    function filter(data) {
      if ($min.val() == 0 && $max.val() == 0) return true;

      if (data.deposit < $min.val()) return false;
      if (data.deposit > $max.val()) return false;
      
      return true;
    }

    return {
      clear: clear,
      reload: reload,
      filter: filter
    }
  })();

  var rentFee = (function() {
    var $min = $('#rent_fee .min');
    var $max = $('#rent_fee .max');

    function clear() {
      $min.val(0);
      $max.val(0);
    }

    function reload() {
      clear();
      var min = true;

      dataList.sort('monthly_rent_fee', { order: 'asc' });
      var list = dataList.search();
      list.forEach(function(d) {
        var v = d._values;
        if (min) $min.val(v.monthly_rent_fee);
        
        $max.val(v.monthly_rent_fee);
      });
    };
    
    $min.change(function() {
      mapReload();
    });

    $max.change(function() {
      mapReload();
    });

    function filter(data) {
      if ($min.val() == 0 && $max.val() == 0) return true;

      if (data.monthly_rent_fee < $min.val()) return false;
      if (data.monthly_rent_fee > $max.val()) return false;
      
      return true;
    }

    return {
      clear: clear,
      reload: reload,
      filter: filter
    }
  })();

  function push(data) {
    // console.log(data);
    data.forEach(function(d) {
      // console.log(d);
      dataList.add({
        ID: d.ID,
        address: d.post.icl_translation.addresses[0].addr1,
        room_type: d.room_type,
        monthly_rent_fee: d.monthly_rent_fee,
        deposit: d.deposit
      });
    });
    console.log(dataList.search());
  }

  function clear() {
    dataList.clear();
    // type.clear();
    // deposit.clear();
    // rentFee.clear();
  }

  function reload() {
    // type.reload();
    deposit.reload();
    rentFee.reload();
  }

  function filter(list) {
    var result = [];
    list.forEach(function(e) {
      if (!type.filter(e)) return;
      if (!rentFee.filter(e)) return;
      if (!deposit.filter(e)) return;

      result.push(e);
    }, this);
    return result;;
  }

  function mapReload() {
    ListData.data.filterReload();
  }

  return {
    push: push,
    clear: clear,
    reload: reload,
    filter: filter
  }
})();

var roomList = (function() {
  var map = (function() {
    /**
     * @desc  방정보로 된 맵 초기화
     * @param {lat} lat 위도
     * @param {lng} lng 경도
     */
    function drawRoom(lat, lng) {
      MapData.drawMap(lat, lng, roomTimer);
    };

    /**
     * @desc  방 정보 요청 이벤트
     * @param {*} e 동쪽 좌표
     * @param {*} w 서쪽 좌표
     * @param {*} s 남쪽 좌표
     * @param {*} n 북쪽 좌표
     */
    function roomTimer(e, w, s, n) {
      const url = "/map/room/locations/" + e + "/" + w + "/" + s + "/" + n;
      MapData.timer(url, list.reload);
    };

    function makeLocations(data) {
      console.log('makeLocations');
      locations = [];
      data.forEach(function(v) {
        var c = v.post.icl_translation.coordinates[0];
        var l = {lat: c.lat, lng: c.lng};
        locations.push(l);
      });
      return locations;
    }

    return {
      drawRoom: drawRoom,
      makeLocations: makeLocations
    }

  })();

  var list = (function() {

    function roomDataReload(data) {
      filter.clear();
      let init = getRoomList(data);

      ListData.data.dataReload(init, roomCompare, makeRoom, filter.push, filter.filter, map.makeLocations, null);
      // ListData.data.dataReload(init, roomCompare, makeRoom, filter.push, filter.reload);
      // ListData.data.dataReload(init, roomCompare, makeRoom, null, filter.reload);
    };

    function getRoomList($list) {
      let url = "/post/room/json/list/";
      return ListData.data.getList(url, makeRoomList($list));
    }

    function makeRoomList(data) {
      $list = [];
      data.forEach(function(v) {
        let room_id = v.icl_translation.post.room.ID;
        $list.push(room_id);

        // filter.push(room_id);
      });

      return ListData.data.makeList($list);
    };

    function makeRoom(data) {
      let imgServerAddr = "/";
      return ListData.template.makeTemplate('/template/room-data.ejs', {
        image_path: imgServerAddr + JSON.parse(data.post.thumbnail_image_path)[0].path,
        deposit: data.deposit,
        monthly_rent_fee: data.monthly_rent_fee,
        title: data.post.title,
        room_type: data.room_type
      });
    };

    /**
     * @desc  room에서 방 번호로 정렬 room list를 정렬하기 위한 함수
     * @param {room} a room 객체
     * @param {room} b room 객체
     *
     * @return {int} 순서 쌍에 의한 값
     */
    function roomCompare(a,b) {
      if (a.ID < b.ID) return -1;
      if (a.ID > b.ID) return 1;
      return 0;
    };

    return {
      reload: roomDataReload
    }
  })();

  return {
    drawRoom: map.drawRoom
  }
})();