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
      MapData.timer(url, list.reload); ///////////////////////////////////////////////////////////////////
    };

    return {
      drawRoom: drawRoom
    }

  })();

  var list = (function() {

    function makeRoomList(data) {
      $list = [];
      data.forEach(function(v) {
        let room_id = v.icl_translation.post.room.ID;
        $list.push(room_id);
      });

      return ListData.data.makeList($list);
    };

    function roomDataReload(data) {
      let init = getRoomList(data);

      ListData.data.dataReload(init, roomCompare, makeRoom);
    };

    function getRoomList($list) {
      let url = "/room/json/list/";
      return ListData.data.getList(url, makeRoomList($list));
    }

    function makeRoom(data) {
      // console.log(data);
      return ListData.template.makeTemplate('/template/room-data.ejs', {
        image_path: JSON.parse(data.thumbnail_image_path),
        deposit: data.deposit,
        monthly_rent_fee: data.monthly_rent_fee,
        title: data.post.title
      });
    };

    function displayRoom(displayList) {
      show(displayList, template.makeRoom);
    }

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
