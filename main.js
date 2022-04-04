//유저가 값을 입력한다
//+버튼을 클릭하면 할일이 추가된다
//유저가 delete버튼을 누르면 할일이 삭제된다
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1.체크버튼을 클릭하는 순간 false>>true
//2. true 이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주고하고 그대로
//진행중 끝남 탭을 누르면, 언더바가 이동한다
//끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");

let taskList = []; //입력받은 할일을 저장할 배열
let filterList = []; //필터링한 할일을 저장할 배열
let mode = "all"; //기본적으로 all에 나타낼수있도록 설정

//+버튼 클릭시 추가
addButton.addEventListener("click",addTask);
//엔터 누를경우 추가
taskInput.addEventListener("keypress", (e)=>{
    if(e.code === 'Enter'){
        addTask();
        taskInput.value = ''; //입력한값 지우기
    }
});




for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function (event){filter(event)});
} //all, not done, done을 클릭하면 filter함수에 event 값이 넘어감


//task마다 각자의 id를 부여하기 위해서 랜덤함수를 만듦
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

//할일 추가되는 함수( + 버튼)
function addTask(){
    //일의 끝남을 사용하기 위해서 string이 아닌 객체를 이용
    
    let task = {
        id: randomIDGenerate(), //랜덤으로 생성되는 id
        taskContent: taskInput.value, //입력받은 값 저장
        isComplete: false //할일의 완성도 체크
    }
    taskList.push(task); //taskList 배열에 입력받은 값,완성도,id를 넣는다
    console.log(taskList);   
    render(); 
}


//추가되는 할일들 화면에 나타내주는 함수
function render(){
    let list = []; //필터링에 따라 배열을 적용할수있도록 새 배열을 정의
    if(mode == "all"){
        list = taskList; //전체모드일시 taskList 배열 사용
    }else if(mode == "ongoing" || mode == "done"){
        list = filterList; //안끝남,끝남모드 일시 filterList 배열 사용
    }

    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button class="check-btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-square-check fa-2x"></i></button>
                <button class="delete-btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-eraser fa-2x"></i></button>
            </div>
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button class="check-btn" onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-square fa-2x"></i></button>
                <button class="delete-btn" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-eraser fa-2x"></i></button>
            </div>
        </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;

    

}

//할일완료 버튼클릭시 id값을 같이 받아옴(어떤 할일을 선택했는지 알기위해)
function toggleComplete(id){
    console.log("id:",id);
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            //true,false 직접 쓰면 영원히 그 값이 되므로 !를 써서 반대되는 값을 취하기
            break; //찾는 순간 for문을 나오도록
        }
    }
    filter(); //불러서 UI도 업뎃
    console.log(taskList);
}



//삭제 버튼 클릭시 배열에서 삭제
function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }

    }
    filter();
    console.log(taskList);
}

//필터링하는 함수
function filter(event){
   
    if(event){
        mode = event.target.id;
        //밑줄그리는 것
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.top = event.target.offsetTop + event.currentTarget.offsetHeight + "px";
    }
   
    //여기서 event는 tabs를 클릭할때 발생, 그때 id값 all ongoing done 중에 가져온다
    
    filterList = []; //매번 초기화 하지 않으면 탭을 클릭할때마다 중복돼서 쌓여감
    
    if(mode == "all"){
        render();
    }else if(mode == "ongoing"){ //진행중인 할일들
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
                
            }
        }
        render();
    }else if(mode == "done"){ //끝낸 할일들
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
                
            }
        }
        render(); 
    }

    console.log(filterList);
}