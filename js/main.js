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

var showPolygon = false;
function setPolygon() {
  // panBy 로 지도를 움직임으로 리프레시 효과 줌, 처음에 움직였다가 다시 움직여서 안움직인 것 처럼 보이게 함
  map.panBy(0.0001, 0.0001);
  if (chkPolygon.checked) {
    showPolygon = true;
    map.panBy(-0.0001, -0.0001);
  } else {
    showPolygon = false;
    map.panBy(-0.0001, -0.0001);
  }
}

var showRoadNameAddrPolygon = false;
function setRoadNameAddrPolygon() {
  // panBy 로 지도를 움직임으로 리프레시 효과 줌, 처음에 움직였다가 다시 움직여서 안움직인 것 처럼 보이게 함
  map.panBy(0.0001, 0.0001);
  if (chkRoadNameAddrPolygon.checked) {
    showRoadNameAddrPolygon = true;
    map.panBy(-0.0001, -0.0001);
  } else {
    showRoadNameAddrPolygon = false;
    map.panBy(-0.0001, -0.0001);
  }
}

var showPermissionForDevelopment = false;
function setPermissionForDevelopment() {
  // panBy 로 지도를 움직임으로 리프레시 효과 줌, 처음에 움직였다가 다시 움직여서 안움직인 것 처럼 보이게 함
  map.panBy(0.0001, 0.0001);
  if (chkPermissionForDevelopment.checked) {
    showPermissionForDevelopment = true;
    map.panBy(-0.0001, -0.0001);
  } else {
    showPermissionForDevelopment = false;
    map.panBy(-0.0001, -0.0001);
  }
}

var showUnitPlan = false;
function setUnitPlan() {
  // panBy 로 지도를 움직임으로 리프레시 효과 줌, 처음에 움직였다가 다시 움직여서 안움직인 것 처럼 보이게 함
  map.panBy(0.0001, 0.0001);
  if (chkUnitPlan.checked) {
    showUnitPlan = true;
    map.panBy(-0.0001, -0.0001);
  } else {
    showUnitPlan = false;
    map.panBy(-0.0001, -0.0001);
  }
}

var showMajorCommercialDistrict = false;
function setMajorCommercialDistrict() {
  // panBy 로 지도를 움직임으로 리프레시 효과 줌, 처음에 움직였다가 다시 움직여서 안움직인 것 처럼 보이게 함
  map.panBy(0.0001, 0.0001);
  if (chkMajorCommercialDistrict.checked) {
    showMajorCommercialDistrict = true;
    map.panBy(-0.0001, -0.0001);
  } else {
    showMajorCommercialDistrict = false;
    map.panBy(-0.0001, -0.0001);
  }
}

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
    // console.log('주소좌표====>', result);
    geocoder.coord2RegionCode(result[0].x, result[0].y, callbackRegionCode);
  }
};

geocoder.addressSearch('수지구 죽전동', addressCallback);

// coord2RegionCode(x, y, callback, options)
// 좌표 값에 해당하는 행정동, 법정동 정보를 얻는다.
var callbackRegionCode = function (result, status) {
  if (status === kakao.maps.services.Status.OK) {
    // console.log('지역 명칭 : ' + result[0].address_name);
    // console.log('행정구역 코드 : ' + result[0].code);

    var dongname = result[0].address_name.split(' ');

    // 읍면동 행정구역 표시
    if (showPolygon) {
      if (result[0].code.substring(8, 10) === '00') {
        regionData(dongname[dongname.length - 1]);
        // console.log(dongname[dongname.length - 1]);
      } else {
        regionData(dongname[dongname.length - 2]);
        // console.log(dongname[dongname.length - 2]);
      }
    }

    // 개발행위허가필지 표시
    if (showRoadNameAddrPolygon) {
      // console.log(result[0].code.substring(0, 8));
      roadNameAddrData();
    }

    // 개발행위허가필지 표시
    if (showPermissionForDevelopment) {
      // console.log(result[0].code.substring(0, 8));
      permissionForDevelopmentData(result[0].code.substring(0, 8));
    }

    // 지구단위 계획 표시
    if (showUnitPlan) {
      unitPlanData();
    }

    // 주요상권 표시
    if (showMajorCommercialDistrict) {
      majorCommercialDistrictData();
    }
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
      // kakao.maps.event.addListener(
      //   marker,
      //   'mouseout',
      //   makeOutListener(infowindow)
      // );

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
  getInfo();
  deletePolygon(polygons);
  deleteRoadNameAddrPolygon(roadNameAddrPolygons);
  deletePermissionForDevelopmentPolygon(permissionForDevelopmentPolygons);
  deleteUnitPlanPolygon(unitPlanPolygons);
  deleteMajorCommercialDistrictPolygon(majorCommercialDistrictPolygons);

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

var level;
var polygonAreaData;
// 콘솔 창에서 getInfo() 하면 message 내용 출력 =========================================================
function getInfo() {
  // 지도의 현재 중심좌표를 얻어옵니다
  var center = map.getCenter();

  // 지도의 현재 레벨을 얻어옵니다
  level = map.getLevel();

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

  polygonAreaData = `POLYGON((${swLatLng.getLng()} ${neLatLng.getLat()},${neLatLng.getLng()} ${neLatLng.getLat()},${neLatLng.getLng()} ${swLatLng.getLat()},${swLatLng.getLng()} ${swLatLng.getLat()},${swLatLng.getLng()} ${neLatLng.getLat()}))`;

  var message = `
    지도 중심좌표는 위도 ${center.getLat()}, 경도 ${center.getLng()}이고 
    지도 레벨은 ${level}입니다 
    지도 타입은 ${mapTypeId} 이고
    지도의 남서쪽 좌표는${swLatLng.getLat()}, ${swLatLng.getLng()}이고
    북동쪽 좌표는 ${neLatLng.getLat()}, ${neLatLng.getLng()} 입니다
    영역정보는 ${boundsStr} 입니다
    화면영역 폴리곤 좌표는 좌측상단, 우측상단, 우측하단, 좌측하단 순으로 마지막으로 처음것으로 폴리곤을 닫아준다. 
    API geomFilter 항목의 입력란에서 자주 사용됨
    ${polygonAreaData}
    `;
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
let customOverlay;
// 현재위치를 받아오는 함수
myLocation.addEventListener('click', () => {
  // console.log(navigator);
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

      // 커스텀 오버레이를 생성하고 지도에 표시한다 ===============================
      // 커스텀 오버레이에 표시할 컨텐츠 입니다
      // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
      // 별도의 이벤트 메소드를 제공하지 않습니다
      var content =
        '<div class="custom_overlay_wrap">' +
        '    <div class="custom_overlay">' +
        '        <div class="title">' +
        '            현재위치' +
        '            <div class="close" onclick="closeOverlay()" title="닫기"><i class="far fa-window-close"></i></div>' +
        '        </div>' +
        '        <div class="body">' +
        '            <div class="img">' +
        '                <img src="https://picsum.photos/70" alt="" />' +
        '           </div>' +
        '            <div class="desc">' +
        '                <div class="ellipsis">현재 사용자의 위치입니다.</div>' +
        '                <br />' +
        '                <div><a href="https://jxlove2020.github.io/map_site/" target="_blank" class="link">홈페이지</a></div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '</div>';

      customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        content: content,
        position: latlng, // 커스텀 오버레이를 표시할 좌표
        xAnchor: 0.5, // 컨텐츠의 x 위치
        yAnchor: 3, // 컨텐츠의 y 위치
      });

      // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
      kakao.maps.event.addListener(marker, 'click', function () {
        customOverlay.setMap(map);
      });

      map.setLevel(4);
      // latlng 위치로 이동
      map.panTo(latlng);
    });
  } else {
    alert('위치정보사용 불가능');
  }
});

// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
function closeOverlay() {
  customOverlay.setMap(null);
}

// 키워드 검색
var searchText = document.querySelector('#search');
var places = new kakao.maps.services.Places();
var searchdata = document.querySelector('.searchdata');
// 키워드 검색 마커 클러스터러를 생성합니다 =========================================================
var clustererKeyword = new kakao.maps.MarkerClusterer({
  map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
  averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
  minLevel: 5, // 클러스터 할 최소 지도 레벨
});

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNodes(el) {
  // console.log(el);
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}

var callbackKeyword = function (result, status) {
  if (status === kakao.maps.services.Status.OK) {
    searchdata.classList.remove('hidden');
    var fragment = document.createDocumentFragment();

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNodes(searchdata);

    for (let r of result) {
      // console.log(r, r.address_name, r.place_name, r.y, r.x);
      var item = {
        title: r.place_name,
        latlng: new kakao.maps.LatLng(r.y, r.x),
      };

      // 검색 데이터 리스트
      // console.log(getListItem(r));
      fragment.appendChild(getListItem(r));

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: item.latlng, // 마커를 표시할 위치
        title: item.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
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
      // kakao.maps.event.addListener(
      //   marker,
      //   'mouseout',
      //   makeOutListener(infowindow)
      // );

      clustererKeyword.addMarker(marker);
    }
    searchdata.appendChild(fragment);
  }
};

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(places) {
  var el = document.createElement('li'),
    itemStr = '<div class="info">' + '   <h5>' + places.place_name + '</h5>';

  if (places.road_address_name) {
    itemStr +=
      '    <span>' +
      places.road_address_name +
      '</span>' +
      '   <span class="jibun gray">' +
      places.address_name +
      '</span>';
  } else {
    itemStr += '    <span>' + places.address_name + '</span>';
  }

  itemStr += '  <span class="tel">' + places.phone + '</span>' + '</div>';

  el.innerHTML = itemStr;
  el.className = 'item';

  return el;
}

// 검색창에서 엔터 키 누르면 검색
searchText.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    clustererKeyword.clear();
    places.keywordSearch(searchText.value, callbackKeyword);
  }
});
searchText.addEventListener('input', () => {
  if (searchText.value == '') {
    // console.log('test');
    clustererKeyword.clear();

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNodes(searchdata);
    searchdata.classList.add('hidden');
  }
});

// 죽전동 지역 경계
// 행정 구역 구분
// baseUrl =
//   'http://api.vworld.kr/req/data?service=data&version=2.0&request=GetFeature&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&data=LT_C_ADEMD_INFO&attrfilter=emd_kor_nm:like:죽전동&crs=EPSG%3A900913&domain=localhost:5500';
//   'http://api.vworld.kr/req/data?service=data&version=2.0&request=GetFeature&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&data=LT_C_ADEMD_INFO&attrfilter=emd_kor_nm:like:죽전동&crs=EPSG%3A4326&domain=localhost:5500';
// &crs=EPSG%3A900913 (google mercator)
// &crs=EPSG%3A4326 (경위도)
var polygons = []; // function 안쪽에 지역변수로 넣으면 폴리곤 하나 생성할 때마다 배열이 비어서 클릭할 때 전체를 못 없애줌.

function regionData(dongname) {
  $.ajax({
    // url: `http://api.vworld.kr/req/data?service=data&version=2.0&request=GetFeature&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&data=LT_C_ADEMD_INFO&attrfilter=emd_kor_nm:like:${dongname}&crs=EPSG%3A4326&domain=localhost:5500`,
    url: `https://api.vworld.kr/req/data?service=data&version=2.0&request=GetFeature&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&data=LT_C_ADEMD_INFO&attrfilter=emd_kor_nm:like:${dongname}&crs=EPSG%3A4326&domain=jxlove2020.github.io`,
    dataType: 'jsonp',
  })
    // $.getJSON('./js/data.json', geojson => {
    .done(geojson => {
      // console.log(geojson.response.result.featureCollection.features);
      var data = geojson.response.result.featureCollection.features;
      var coordinates = []; // 좌표 저장할 배열
      var name = ''; // 행정 구역 이름

      $.each(data, (index, val) => {
        coordinates = val.geometry.coordinates;
        name = val.properties.full_nm;

        displayArea(coordinates, name);
      });
    });
}

// ================================================================================================
// 행정구역 폴리곤 ================================================================================
function displayArea(coordinates, name) {
  // console.log(coordinates, name);

  var path = []; // 폴리곤 그려줄 path
  var points = []; // 중심좌표 구하기 위한 지역구 좌표들

  $.each(coordinates[0][0], (index, coordinate) => {
    // console.log((coordinate[1], coordinate[0]));
    var point = new Object();
    point.x = coordinate[1];
    point.y = coordinate[0];
    points.push(point);
    path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
  });

  // 다각형을 생성합니다.
  var polygon = new kakao.maps.Polygon({
    map: map, // 다각형을 표시할 지도 선택
    path: path,
    strokeWeight: 2,
    strokeColor: '#004c80',
    strokeOpacity: 0.8,
    fillColor: '#09f',
    fillOpacity: 0.5,
  });

  // console.log(polygon);
  polygons.push(polygon); // 폴리곤 제거하기 위한 배열

  // 다각형에 mouseover 이벤트를 등록 하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다.
  // 지역명을 표시하는 커스텀 오버레이를 지도위에 표시합니다.
  kakao.maps.event.addListener(polygon, 'mouseover', function () {
    polygon.setOptions({
      fillColor: '#09f',
    });
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다.
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    polygon.setOptions({
      fillColor: '#09f',
    });
  });

  // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 해당 지역을 확대합니다.
  kakao.maps.event.addListener(polygon, 'click', function () {
    // 현재 지도 레벨에서 2레밸 확대한 레벨
    var level = map.getLevel() - 2;
    // 지도롤 클릭된 폴리곤의 중앙 위치를 기준으로 확대합니다.
    map.setLevel(level, {
      anchor: centroid(points),
      animate: {
        duration: 350, // 확대 애니메이션 시간
      },
    });
    deletePolygon(polygons); // 폴리곤 제거
  });
}

// centroid 알고리즘(폴리곤 중심좌표 구하기 위함)
function centroid(points) {
  var i, j, len, p1, p2, f, area, x, y;
  area = x = y = 0;

  for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
    p1 = points[i];
    p2 = points[j];
    f = p1.y * p2.x - p2.y * p1.x;
    x += (p1.x + p2.x) * f;
    y += (p1.y + p2.y) * f;
    area += f * 3;
  }
  return new kakao.maps.LatLng(x / area, y / area);
}

// 지도 위 표시되고 있는 폴리곤 제거
function deletePolygon(polygons) {
  for (var i = 0; i < polygons.length; i++) {
    polygons[i].setMap(null);
  }
  polygons = [];
}

// 지도 타입 정보를 가지고 있을 객체입니다
// map.addOverlayMapTypeId 함수로 추가된 지도 타입은
// 가장 나중에 추가된 지도 타입이 가장 앞에 표시됩니다
// 이 예제에서는 지도 타입을 추가할 때 지적편집도, 지형정보, 교통정보, 자전거도로 정보 순으로 추가하므로
// 자전거 도로 정보가 가장 앞에 표시됩니다
var mapTypes = {
  terrain: kakao.maps.MapTypeId.TERRAIN,
  traffic: kakao.maps.MapTypeId.TRAFFIC,
  bicycle: kakao.maps.MapTypeId.BICYCLE,
  useDistrict: kakao.maps.MapTypeId.USE_DISTRICT,
};

// 체크 박스를 선택하면 호출되는 함수입니다
function setOverlayMapTypeId() {
  var chkTerrain = document.getElementById('chkTerrain'),
    chkTraffic = document.getElementById('chkTraffic'),
    chkBicycle = document.getElementById('chkBicycle'),
    chkUseDistrict = document.getElementById('chkUseDistrict');

  // 지도 타입을 제거합니다
  for (var type in mapTypes) {
    map.removeOverlayMapTypeId(mapTypes[type]);
  }

  // 지적편집도정보 체크박스가 체크되어있으면 지도에 지적편집도정보 지도타입을 추가합니다
  if (chkUseDistrict.checked) {
    map.addOverlayMapTypeId(mapTypes.useDistrict);
  }

  // 지형정보 체크박스가 체크되어있으면 지도에 지형정보 지도타입을 추가합니다
  if (chkTerrain.checked) {
    map.addOverlayMapTypeId(mapTypes.terrain);
  }

  // 교통정보 체크박스가 체크되어있으면 지도에 교통정보 지도타입을 추가합니다
  if (chkTraffic.checked) {
    map.addOverlayMapTypeId(mapTypes.traffic);
  }

  // 자전거도로정보 체크박스가 체크되어있으면 지도에 자전거도로정보 지도타입을 추가합니다
  if (chkBicycle.checked) {
    map.addOverlayMapTypeId(mapTypes.bicycle);
  }
}
// ================================================================================================

// 개발행위허가필지 구분 ==========================================================================
var permissionForDevelopmentPolygons = []; // function 안쪽에 지역변수로 넣으면 폴리곤 하나 생성할 때마다 배열이 비어서 클릭할 때 전체를 못 없애줌.
// dongcode - 읍면동코드 8자리
function permissionForDevelopmentData(dongcode) {
  // console.log('dongcode', dongcode);
  $.ajax({
    // url: `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_UPISUQ174&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&attrfilter=emdCd:=:${dongcode}&crs=EPSG%3A4326&domain=localhost:5500`,
    // url: `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_UPISUQ174&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&attrfilter=emdCd:=:${dongcode}&crs=EPSG%3A4326&domain=jxlove2020.github.io`,
    url: `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_UPISUQ174&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&geomFilter=${polygonAreaData}&crs=EPSG%3A4326&domain=jxlove2020.github.io`,
    dataType: 'jsonp',
  })
    // $.getJSON('./js/data.json', geojson => {
    .done(geojson => {
      // console.log(geojson.response);
      // console.log(geojson.response.status);
      // var data = geojson.response.result.featureCollection.features;
      var coordinates = []; // 좌표 저장할 배열
      var name = ''; // 행정 구역 이름

      if (geojson.response.status != 'NOT_FOUND') {
        var data = geojson.response.result.featureCollection.features;

        $.each(data, (index, val) => {
          coordinates = val.geometry.coordinates;
          name = val.properties.full_nm;

          displayPermissionForDevelopmentArea(coordinates, name);
        });
      }
    });
}

// 개발행위허가필지 폴리곤
function displayPermissionForDevelopmentArea(coordinates, name) {
  // console.log(coordinates, name);

  var path = []; // 폴리곤 그려줄 path
  var points = []; // 중심좌표 구하기 위한 지역구 좌표들

  $.each(coordinates[0][0], (index, coordinate) => {
    // console.log((coordinate[1], coordinate[0]));
    var point = new Object();
    point.x = coordinate[1];
    point.y = coordinate[0];
    points.push(point);
    path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
  });

  // 다각형을 생성합니다.
  var polygon = new kakao.maps.Polygon({
    map: map, // 다각형을 표시할 지도 선택
    path: path,
    strokeWeight: 2,
    strokeColor: '#d02000', // 빨간색
    strokeOpacity: 0.8,
    fillColor: '#d02000',
    fillOpacity: 0.5,
  });

  permissionForDevelopmentPolygons.push(polygon); // 폴리곤 제거하기 위한 배열

  // 다각형에 mouseover 이벤트를 등록 하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다.
  // 지역명을 표시하는 커스텀 오버레이를 지도위에 표시합니다.
  kakao.maps.event.addListener(polygon, 'mouseover', function () {
    polygon.setOptions({
      fillColor: '#d02000',
    });
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다.
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    polygon.setOptions({
      fillColor: '#d02000',
    });
  });

  // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 해당 지역을 확대합니다.
  kakao.maps.event.addListener(polygon, 'click', function () {
    // 현재 지도 레벨에서 2레밸 확대한 레벨
    var level = map.getLevel() - 2;
    // 지도롤 클릭된 폴리곤의 중앙 위치를 기준으로 확대합니다.
    map.setLevel(level, {
      anchor: centroid(points),
      animate: {
        duration: 350, // 확대 애니메이션 시간
      },
    });
    deletePermissionForDevelopmentPolygon(permissionForDevelopmentPolygons); // 폴리곤 제거
  });
}

// 지도 위 표시되고 있는 개발행위허가필지 폴리곤 제거
function deletePermissionForDevelopmentPolygon(
  permissionForDevelopmentPolygons
) {
  for (var i = 0; i < permissionForDevelopmentPolygons.length; i++) {
    permissionForDevelopmentPolygons[i].setMap(null);
  }
  permissionForDevelopmentPolygons = [];
}
// ================================================================================================

// 지구단위계획 구분 ==============================================================================
var unitPlanPolygons = []; // function 안쪽에 지역변수로 넣으면 폴리곤 하나 생성할 때마다 배열이 비어서 클릭할 때 전체를 못 없애줌.
function unitPlanData() {
  $.ajax({
    // url: `api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_UPISUQ161&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&geomFilter=${polygonAreaData}&attrFilter=dgm_nm:like:지구단위계획구역&crs=EPSG%3A4326&domain=localhost:5500`,
    url: `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_UPISUQ161&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&geomFilter=${polygonAreaData}&attrFilter=dgm_nm:like:지구단위계획구역&crs=EPSG%3A4326&domain=jxlove2020.github.io`,
    dataType: 'jsonp',
  })
    // $.getJSON('./js/data.json', geojson => {
    .done(geojson => {
      // console.log(geojson.response);
      // console.log(geojson.response.status);
      // var data = geojson.response.result.featureCollection.features;
      var coordinates = []; // 좌표 저장할 배열
      var name = ''; // 행정 구역 이름

      if (geojson.response.status != 'NOT_FOUND') {
        var data = geojson.response.result.featureCollection.features;

        $.each(data, (index, val) => {
          coordinates = val.geometry.coordinates;
          name = val.properties.full_nm;

          displayUnitPlanArea(coordinates, name);
        });
      }
    });
}

// 개발행위허가필지 폴리곤
function displayUnitPlanArea(coordinates, name) {
  // console.log(coordinates, name);

  var path = []; // 폴리곤 그려줄 path
  var points = []; // 중심좌표 구하기 위한 지역구 좌표들

  $.each(coordinates[0][0], (index, coordinate) => {
    // console.log((coordinate[1], coordinate[0]));
    var point = new Object();
    point.x = coordinate[1];
    point.y = coordinate[0];
    points.push(point);
    path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
  });

  // 다각형을 생성합니다.
  var polygon = new kakao.maps.Polygon({
    map: map, // 다각형을 표시할 지도 선택
    path: path,
    strokeWeight: 2,
    strokeColor: '#00ff1a', // 연두색
    strokeOpacity: 0.8,
    fillColor: '#00ff1a',
    fillOpacity: 0.5,
  });

  unitPlanPolygons.push(polygon); // 폴리곤 제거하기 위한 배열

  // 다각형에 mouseover 이벤트를 등록 하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다.
  // 지역명을 표시하는 커스텀 오버레이를 지도위에 표시합니다.
  kakao.maps.event.addListener(polygon, 'mouseover', function () {
    polygon.setOptions({
      fillColor: '#00ff1a',
    });
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다.
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    polygon.setOptions({
      fillColor: '#00ff1a',
    });
  });

  // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 해당 지역을 확대합니다.
  kakao.maps.event.addListener(polygon, 'click', function () {
    // 현재 지도 레벨에서 2레밸 확대한 레벨
    var level = map.getLevel() - 2;
    // 지도롤 클릭된 폴리곤의 중앙 위치를 기준으로 확대합니다.
    map.setLevel(level, {
      anchor: centroid(points),
      animate: {
        duration: 350, // 확대 애니메이션 시간
      },
    });
    deleteUnitPlanPolygon(unitPlanPolygons); // 폴리곤 제거
  });
}

// 지도 위 표시되고 있는 개발행위허가필지 폴리곤 제거
function deleteUnitPlanPolygon(unitPlanPolygons) {
  for (var i = 0; i < unitPlanPolygons.length; i++) {
    unitPlanPolygons[i].setMap(null);
  }
  unitPlanPolygons = [];
}
// ================================================================================================

// 주요상권 구분 ==============================================================================
var majorCommercialDistrictPolygons = []; // function 안쪽에 지역변수로 넣으면 폴리곤 하나 생성할 때마다 배열이 비어서 클릭할 때 전체를 못 없애줌.
function majorCommercialDistrictData() {
  $.ajax({
    // url: `api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_UPISUQ161&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&geomFilter=${polygonAreaData}&crs=EPSG%3A4326&domain=localhost:5500`,
    url: `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_DGMAINBIZ&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=10&page=1&geomFilter=${polygonAreaData}&crs=EPSG%3A4326&domain=jxlove2020.github.io`,
    dataType: 'jsonp',
  })
    // $.getJSON('./js/data.json', geojson => {
    .done(geojson => {
      // console.log(geojson.response);
      // console.log(geojson.response.status);
      // var data = geojson.response.result.featureCollection.features;
      var coordinates = []; // 좌표 저장할 배열
      var name = ''; // 행정 구역 이름

      if (geojson.response.status != 'NOT_FOUND') {
        var data = geojson.response.result.featureCollection.features;

        $.each(data, (index, val) => {
          coordinates = val.geometry.coordinates;
          name = val.properties.full_nm;

          displayMajorCommercialDistrictArea(coordinates, name);
        });
      }
    });
}

// 주요상권 폴리곤
function displayMajorCommercialDistrictArea(coordinates, name) {
  // console.log(coordinates, name);

  var path = []; // 폴리곤 그려줄 path
  var points = []; // 중심좌표 구하기 위한 지역구 좌표들

  $.each(coordinates[0][0], (index, coordinate) => {
    // console.log((coordinate[1], coordinate[0]));
    var point = new Object();
    point.x = coordinate[1];
    point.y = coordinate[0];
    points.push(point);
    path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
  });

  // 다각형을 생성합니다.
  var polygon = new kakao.maps.Polygon({
    map: map, // 다각형을 표시할 지도 선택
    path: path,
    strokeWeight: 2,
    strokeColor: '#ffc300', // 주황색
    strokeOpacity: 0.8,
    fillColor: '#ffc300',
    fillOpacity: 0.5,
  });

  majorCommercialDistrictPolygons.push(polygon); // 폴리곤 제거하기 위한 배열

  // 다각형에 mouseover 이벤트를 등록 하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다.
  // 지역명을 표시하는 커스텀 오버레이를 지도위에 표시합니다.
  kakao.maps.event.addListener(polygon, 'mouseover', function () {
    polygon.setOptions({
      fillColor: '#ffc300',
    });
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다.
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    polygon.setOptions({
      fillColor: '#ffc300',
    });
  });

  // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 해당 지역을 확대합니다.
  kakao.maps.event.addListener(polygon, 'click', function () {
    // 현재 지도 레벨에서 2레밸 확대한 레벨
    var level = map.getLevel() - 2;
    // 지도롤 클릭된 폴리곤의 중앙 위치를 기준으로 확대합니다.
    map.setLevel(level, {
      anchor: centroid(points),
      animate: {
        duration: 350, // 확대 애니메이션 시간
      },
    });
    deleteMajorCommercialDistrictPolygon(majorCommercialDistrictPolygons); // 폴리곤 제거
  });
}

// 지도 위 표시되고 있는 주요상권 폴리곤 제거
function deleteMajorCommercialDistrictPolygon(majorCommercialDistrictPolygons) {
  for (var i = 0; i < majorCommercialDistrictPolygons.length; i++) {
    majorCommercialDistrictPolygons[i].setMap(null);
  }
  majorCommercialDistrictPolygons = [];
}
// ================================================================================================

// 도로명주소 구분 ==============================================================================
var roadNameAddrPolygons = []; // function 안쪽에 지역변수로 넣으면 폴리곤 하나 생성할 때마다 배열이 비어서 클릭할 때 전체를 못 없애줌.
function roadNameAddrData() {
  if (level < 3) {
    $.ajax({
      // url: `api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_SPBD&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=100&page=1&geomFilter=${polygonAreaData}&crs=EPSG%3A4326&domain=localhost:5500`,
      url: `https://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_SPBD&key=9CCBEBE8-9506-3CF7-AAF6-46C996046E2D&format=json&errorformat=json&size=100&page=1&geomFilter=${polygonAreaData}&crs=EPSG%3A4326&domain=jxlove2020.github.io`,
      dataType: 'jsonp',
    })
      // $.getJSON('./js/data.json', geojson => {
      .done(geojson => {
        console.log('RoadNameAddr', geojson.response);
        // console.log(geojson.response.status);
        // var data = geojson.response.result.featureCollection.features;
        var coordinates = []; // 좌표 저장할 배열
        var name = ''; // 행정 구역 이름

        if (geojson.response.status != 'NOT_FOUND') {
          var data = geojson.response.result.featureCollection.features;

          $.each(data, (index, val) => {
            coordinates = val.geometry.coordinates;
            name = val.properties.buld_nm;

            displayRoadNameAddrArea(coordinates, name);
          });
        }
      });
  } else {
    displayToast(
      `도로명 주소 건물 표시는 줌 레벨 2 이하에서만 보입니다.\n 지도 화면을 확대 해주세요 `,
      3
    );
  }
}

// 주요상권 폴리곤
function displayRoadNameAddrArea(coordinates, name) {
  console.log(coordinates, name);

  var path = []; // 폴리곤 그려줄 path
  var points = []; // 중심좌표 구하기 위한 지역구 좌표들

  $.each(coordinates[0][0], (index, coordinate) => {
    var point = new Object();
    point.x = coordinate[1];
    point.y = coordinate[0];

    // console.log('point.x ', coordinate[1]);
    // console.log('point.y', coordinate[0]);

    points.push(point);
    path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
  });

  // 다각형을 생성합니다.
  var polygon = new kakao.maps.Polygon({
    map: map, // 다각형을 표시할 지도 선택
    path: path,
    strokeWeight: 2,
    strokeColor: '#ffc300', // 주황색
    strokeOpacity: 0.8,
    fillColor: '#ffc300',
    fillOpacity: 0.5,
  });

  roadNameAddrPolygons.push(polygon); // 폴리곤 제거하기 위한 배열

  // 다각형에 mouseover 이벤트를 등록 하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다.
  // 지역명을 표시하는 커스텀 오버레이를 지도위에 표시합니다.
  kakao.maps.event.addListener(polygon, 'mouseover', function () {
    polygon.setOptions({
      fillColor: '#ffc300',
    });
  });

  // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다.
  kakao.maps.event.addListener(polygon, 'mouseout', function () {
    polygon.setOptions({
      fillColor: '#ffc300',
    });
  });

  // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 해당 지역을 확대합니다.
  kakao.maps.event.addListener(polygon, 'click', function () {
    // 현재 지도 레벨에서 2레밸 확대한 레벨
    var level = map.getLevel() - 2;
    // 지도롤 클릭된 폴리곤의 중앙 위치를 기준으로 확대합니다.
    map.setLevel(level, {
      anchor: centroid(points),
      animate: {
        duration: 350, // 확대 애니메이션 시간
      },
    });
    deleteRoadNameAddrPolygon(roadNameAddrPolygons); // 폴리곤 제거
  });
}

// 지도 위 표시되고 있는 주요상권 폴리곤 제거
function deleteRoadNameAddrPolygon(roadNameAddrPolygons) {
  for (var i = 0; i < roadNameAddrPolygons.length; i++) {
    roadNameAddrPolygons[i].setMap(null);
  }
  roadNameAddrPolygons = [];
}
// ================================================================================================

// 토스트 메시지 ==================================================================================
let removeToast;
function displayToast(string, seconds) {
  const toast = document.getElementById('toast');

  toast.classList.contains('reveal')
    ? (clearTimeout(removeToast),
      (removeToast = setTimeout(function () {
        document.getElementById('toast').classList.remove('reveal');
      }, seconds * 1000)))
    : (removeToast = setTimeout(function () {
        document.getElementById('toast').classList.remove('reveal');
      }, seconds * 1000));
  toast.classList.add('reveal'), (toast.innerText = string);
}
