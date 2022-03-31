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
let taskList = []; //입력받은 할일을 저장할 배열

addButton.addEventListener("click",addTask);

//할일 추가되는 함수
function addTask(){
    //일의 끝남을 사용하기 위해서 string이 아닌 객체를 이용
    let task = {
        id: randomIDGenerate(), 
        taskContent: taskInput.value, //입력받은 값 저장
        isComplete: false, //할일의 완성도 체크
        isDelete:false //삭제할지말지 체크
    }
    taskList.push(task); //할일배열에 입력받은 값,완성도를 넣는다
    console.log(taskList);   
    render(); 
}

//추가되는 할일들 화면에 나타내주는 함수
function render(){
    let resultHTML = '';
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${taskList[i].taskContent}</div>
            <div>
                <button class="check-btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-square-check fa-2x"></i></button>
                <button class="delete-btn" onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-eraser fa-2x"></i></button>
            </div>
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <div>${taskList[i].taskContent}</div>
            <div>
                <button class="check-btn" onclick="toggleComplete('${taskList[i].id}')"><i class="fa-regular fa-square fa-2x"></i></button>
                <button class="delete-btn" onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-eraser fa-2x"></i></button>
            </div>
        </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;

    

}

//버튼에 클릭이벤트 넣는 방법은 addEventListener 뿐 아니고
//버튼자체에 onclick 바로 넣을 수도 있다
//버튼클릭시 id값을 같이 받아옴
function toggleComplete(id){
    console.log("id:",id);
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            //true,false 직접 쓰면 영원히 그 값이 되므로 !를 써서 반대되는 값을 취하기
            break; //찾는 순간 for문을 나오도록
        }
    }
    render(); //불러서 UI도 업뎃
    console.log(taskList);
}

//task마다 각자의 id를 부여하기 위해서 랜덤함수를 만듦
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

//삭제 버튼 클릭시 배열에서 삭제
function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }

    }
    render();
    console.log(taskList);
}
