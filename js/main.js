// 지도 생성 =========================================================
var container = document.getElementById('map'),
  options = {
    center: new kakao.maps.LatLng(37.3311110877474, 127.113932721957),
    level: 5,
  };

var map = new kakao.maps.Map(container, options);

// 지도에 컨트롤 올리기 =========================================================
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 마커 =========================================================
var marker = new kakao.maps.Marker({
  position: new kakao.maps.LatLng(37.3311110877474, 127.113932721957),
  title: '죽전동',
});

marker.setMap(map);

// 마커 클러스터러를 생성합니다 =========================================================
var clusterer = new kakao.maps.MarkerClusterer({
  map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
  averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  minLevel: 5, // 클러스터 할 최소 지도 레벨
});

// 여러개 마커  =========================================================
// 마커를 표시할 위치와 title 객체 배열입니다
var positions = [
  {
    title: '아르피아 스포츠센터',
    latlng: new kakao.maps.LatLng(37.32601007422664, 127.10577829824362),
  },
  {
    title: '수지체육 공원',
    latlng: new kakao.maps.LatLng(37.32902296039825, 127.09793894242159),
  },
  {
    title: '배수지 공원',
    latlng: new kakao.maps.LatLng(37.32116588270193, 127.12212727125704),
  },
  {
    title: '보정동 까페거리',
    latlng: new kakao.maps.LatLng(37.3217681060137, 127.10993239535533),
  },
];

// 마커 이미지의 이미지 주소입니다
var imageSrc =
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

for (var i = 0; i < positions.length; i++) {
  // 마커 이미지의 이미지 크기 입니다
  var imageSize = new kakao.maps.Size(24, 35);

  // 마커 이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: positions[i].latlng, // 마커를 표시할 위치
    title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    image: markerImage, // 마커 이미지
  });
}

// 주소로 좌표찾기 =========================================================
var geocoder = new kakao.maps.services.Geocoder();
var addressCallback = function (result, status) {
  if (status === kakao.maps.services.Status.OK) {
    console.log('주소좌표====>', result);
    geocoder.coord2RegionCode(result[0].x, result[0].y, callbackRegionCode);
  }
};

geocoder.addressSearch('수지구 죽전동', addressCallback);

// coord2RegionCode(x, y, callback, options)
// 좌표 값에 해당하는 행정동, 법정동 정보를 얻는다.
var callbackRegionCode = function (result, status) {
  if (status === kakao.maps.services.Status.OK) {
    console.log('지역 명칭 : ' + result[0].address_name);
    console.log('행정구역 코드 : ' + result[0].code);
  }
};

// 카테고리 =========================================================
var categoryPlaces = new kakao.maps.services.Places();
var categoryResult = new Array();

var categoryCallback = function (result, status, pagination) {
  // 마커 이미지의 이미지 주소입니다
  var imageSrc = './images/icon.png';
  // 마커 이미지의 이미지 크기 입니다
  var imageSize = new kakao.maps.Size(30, 30);

  // 마커 이미지를 생성합니다
  var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  clusterer.clear();

  if (status === kakao.maps.services.Status.OK) {
    for (let r of result) {
      // console.log(r, r.address_name, r.place_name, r.y, r.x);
      var item = {
        title: r.place_name,
        latlng: new kakao.maps.LatLng(r.y, r.x),
      };

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: item.latlng, // 마커를 표시할 위치
        title: item.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: `<div>&nbsp;${item.title}&nbsp;</div>`, // 인포윈도우에 표시할 내용
        removable: true,
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      kakao.maps.event.addListener(
        marker,
        'click',
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        'mouseout',
        makeOutListener(infowindow)
      );

      clusterer.addMarker(marker);
    }
  }
};

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
  return function () {
    infowindow.open(map, marker);
  };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
  return function () {
    infowindow.close();
  };
}

// MT1 대형마트, CS2 편의점, PS3 어린이집, 유치원, SC4 학교, AC5 학원
// PK6 주차장, OL7 주유소, 충전소, SW8 지하철역, BK9 은행, CT1 문화시설 , AG2 중개업소
// PO3 공공기관, AT4 관광명소, AD5 숙박, FD6 음식점, CE7 카페, HP8 병원, PM9 약국
// 공공기관 코드 검색
// categoryPlaces.categorySearch('PO3', categoryCallback, {
//   // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
//   location: new kakao.maps.LatLng(37.3311110877474, 127.113932721957),
// });

const menu = document.querySelector('.menu');
const menu_box = menu.querySelector('.box');
const boxWrap = menu_box.querySelector('.boxWrap');
const menu_toggle = menu.querySelector('.menu_toggle');
const selectbox = menu_box.querySelector('#categorySelect');
menu_toggle.addEventListener('click', () => {
  menu_toggle.classList.toggle('show');
  menu_box.classList.toggle('show');
  boxWrap.classList.toggle('hidden');
});
selectbox.addEventListener('change', e => {
  // console.log('selectBox====>', categorySelect.value);
  categoryPlaces.categorySearch(categorySelect.value, categoryCallback, {
    // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
    location: map.getCenter(),
  });
});

// idle 이벤트 : 중심 좌표나 확대 수준이 변경되면 발생한다.
// 단, 애니메이션 도중에는 발생하지 않는다.
kakao.maps.event.addListener(map, 'idle', function () {
  // console 에서 지도 정보를 보려면 getInfo() 주석을 해제하세요
  // getInfo();

  // 카테고리가 있을 경우 카테고리 검색
  if (categorySelect.value !== '') {
    categoryPlaces.categorySearch(categorySelect.value, categoryCallback, {
      // Map 객체를 지정하지 않았으므로 좌표객체를 생성하여 넘겨준다.
      location: map.getCenter(),
    });
  }
  // 좌표로 주소 얻기
  searchAddrFromCoords(map.getCenter(), displayCenterInfo);
  geocoder.coord2RegionCode(
    map.getCenter().La,
    map.getCenter().Ma,
    callbackRegionCode
  );
});

// 콘솔 창에서 getInfo() 하면 message 내용 출력 =========================================================
function getInfo() {
  // 지도의 현재 중심좌표를 얻어옵니다
  var center = map.getCenter();

  // 지도의 현재 레벨을 얻어옵니다
  var level = map.getLevel();

  // 지도타입을 얻어옵니다
  var mapTypeId = map.getMapTypeId();

  // 지도의 현재 영역을 얻어옵니다
  var bounds = map.getBounds();

  // 영역의 남서쪽 좌표를 얻어옵니다
  var swLatLng = bounds.getSouthWest();

  // 영역의 북동쪽 좌표를 얻어옵니다
  var neLatLng = bounds.getNorthEast();

  // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
  var boundsStr = bounds.toString();

  var message = `
    지도 중심좌표는 위도 ${center.getLat()}, 경도 ${center.getLng()}이고 
    지도 레벨은 ${level}입니다 
    지도 타입은 ${mapTypeId} 이고
    지도의 남서쪽 좌표는${swLatLng.getLat()}, ${swLatLng.getLng()}이고
    북동쪽 좌표는 ${neLatLng.getLat()}, ${neLatLng.getLng()} 입니다
    영역정보는 ${boundsStr} 입니다`;

  console.log(message);
}

// 좌표로 주소 얻기 =========================================================
function searchAddrFromCoords(coords, callback) {
  // 좌표로 행정동 주소 정보를 요청합니다
  geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
  if (status === kakao.maps.services.Status.OK) {
    var infoDiv = document.getElementById('centerAddr');

    for (var i = 0; i < result.length; i++) {
      // 행정동의 region_type 값은 'H' 이므로
      if (result[i].region_type === 'H') {
        infoDiv.innerHTML = result[i].address_name;
        break;
      }
    }
  }
}

searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 현재위치로 가기 =========================================================

// 현재위치 를 1번만 호출할수 있도록 해주는 변수
const myLocation = document.querySelector('.mylocation > i');
let currentUse = true;

// 현재위치를 받아오는 함수
myLocation.addEventListener('click', () => {
  console.log(navigator);
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const latlng = new kakao.maps.LatLng(lat, lng);

      // 현재위치를 1회만 호출
      if (currentUse) {
        // 마커 이미지의 이미지 주소입니다
        var imageSrc = './images/currentPoint.png';
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(22, 22);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: latlng, // 마커를 표시할 위치
          title: '현재위치',
          image: markerImage, // 마커 이미지
        });

        currentUse = false;
      }

      map.setLevel(4);
      // latlng 위치로 이동
      map.panTo(latlng);
    });
  } else {
    alert('위치정보사용 불가능');
  }
});
