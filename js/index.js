const 정답 = "FILED";

let attempts = 0; // n번의 시도
let index = 0; // index값을 수정하기위해 0으로 설정
let timer

function appStart() {
    // 7) BackSpace시 지우기
    const handleBackspace = () => {
        if (index > 0) {
        const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
        );
        preBlock.innerText = "";
        if(index !== 0) {
            index -= 1;
        }
    }
    };

    // 6) 게임오버후 스타일링 /html을 javascript로 
    const displayGameover = () => {
        const div = document.createElement('div');
        div.innerText = '게임이 종료됐습니다.';
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw; background-color:white; width: 200px; height: 100px;";
        document.body.appendChild(div);
    };

  // 5) 모두 다 맞을시 게임종료/ EventLis
  const gameover = () => {
    window.removeEventListener("keyword", handleKeydown);
    displayGameover();
    clearInterval(timer);
  }
  
  // 4) 엔터시 다음줄로 넘기기
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  // 3) 'Enter'누를시 for문으로 한글자씩 정답확인
  const handleEnterKey = () => {    
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자){
        맞은_갯수 += 1; 
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if(맞은_갯수 === 5) gameover();
    else nextLine(); // 호출하면 다음으로 넘겨주기
  };
  // 2) 키 누를시 이벤트발생
  const handleKeydown = (event) => {     
    const key = event.key.toUpperCase(); // 현재 키/키코드는 이벤트키/키코드
    const keyCode = event.keyCode;
    console.log(event.key, event.keyCode);
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    ); // board-column값을 뽑아 data-index가 00인 값을 뽑는다.  / 원하는 변수를 넣고싶다 = (`을 쓴다)
    if (event.key === "Backspace") {
        handleBackspace();
    }
    else if (index === 5) {
      if (event.key === "Enter") {
        // 엔터키가 눌리면 handleEnterKey() 호출
        handleEnterKey();
      } else {
        return;
      }
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;    // thisBlock위치에 Text(key) 불러오기
      index += 1;
    } 
  };

  // 8) 타이머기능 추가
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
        const 현재_시간 = new Date();
        const 흐른_시간 = new Date(현재_시간 - 시작_시간);
        const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
        const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
        const timeDiv = document.querySelector("#timer");
        timeDiv.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);    // timer는 setInterval의 id를 갖고 저장했다가 게임종료시 clearInterval로 종료
  };

  startTimer();
  // 1) 텍스트 오픈 
  window.addEventListener("keydown", handleKeydown);
}
// keydown: 키가 눌렸을때 바로반응
appStart();
// 5, 30, 11, 12, 13, 27, /기본세팅/ 1, 2, 14, 20, 21, 17, 6
// appStart => (addEventListener)handleKeydown 선언 => key.대문자 => .thisBlock = board-column을 0부터 index만큼 돌리고 if문 => thisBlock을 innerText하여 텍스트로 나타냄
// if(Enter)=handleEnterKey선언하여 정답함수선언 => 5개 for문 => 입력글자/정답글자/정답 비교하여 색상입히기 => 엔터누를시 다음것 넘어가게
// @@ 기본구현 끝 / BackSpace 구현 / 정답시 finish / 6번의 시도만 가능하게 attempts 조정
