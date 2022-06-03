let TaskAddBtn =document.querySelector(".add");
let TaskContainer=document.querySelector(".write");

let completeTaskBtn=document.querySelector(".Pending-Tasks");

let completedtaskbox=document.querySelector(".completed");
let Taskbtn=document.querySelector(".Tasks")

const uid = new ShortUniqueId();

let TaskArray=[];

if(localStorage.getItem("tasks")){

    let str=localStorage.getItem("tasks");
    let arr=JSON.parse(str);
    TaskArray =arr
    for(let idx in TaskArray){
       let myId =TaskArray[idx].ide
       let task = TaskArray[idx].task
       let check = TaskArray[idx].check
       createtask(myId,task,check)

    }
}











// task adder and add button functionality--- main part 

TaskAddBtn.addEventListener("click",function(){
     let id=uid();
   

     createtask(id)
   
})

function createtask(id,task,checker){
    let checking=-1;
    let symbol;
    if(checker !=undefined){
        checking=checker;
    }
    if(checking==-1){
        symbol="check_box_outline_blank";
    }else{
        symbol="check_box";
    }
    
    
    
    let currentTask=document.createElement("div");
    currentTask.classList.add("currentTask");
    currentTask.innerHTML=`<!-- check box icon -->
    <span class="material-symbols-outlined checkBox" id="icon"> ${symbol}  </span>
    <!-- task area -->
     <textarea name="" id="task-area" placeholder="task"  unique="${id}" >
     ${task?task:''}
     </textarea>
     <!-- delete icon -->
     <span class="material-symbols-outlined deleteicon"  id="icon">delete </span>`

     TaskContainer.appendChild(currentTask);
     

    //  task in the currentTask container

    let currentText=currentTask.querySelector("#task-area");
    currentText.addEventListener("blur",function(e){
        let taskContent=e.target.value;
        let id=currentText.getAttribute("unique");
        // console.log( taskContent + " " + id);
        let idx=-1;
        for(let i=0;i<TaskArray.length;i++){
            let taskid=TaskArray[i].ide;
            if(taskid==id){
                idx=i;
                break;
            }
        }
        if(idx==-1){
        
        let ticketObj={
            ide:id,
            task:taskContent,
            check:checking,

        }
        TaskArray.push(ticketObj);
      
       
        }else{
            TaskArray[idx].task=taskContent;
        }
        // let StringfyArray=JSON.stringify(TaskArray);
        // localStorage.setItem("tasks",StringfyArray);



        // updating local storage
        updatelocalStorgae();

        console.log(TaskArray);
    })
//    check box functionality in ticket

    let BoxCheck=currentTask.querySelector(".checkBox");
    let flag =true;
    BoxCheck.addEventListener("click",function(){
        let id=currentText.getAttribute("unique");
        
        let idx=-1;
        for(let i=0;i<TaskArray.length;i++){
            let taskid=TaskArray[i].ide;
            if(taskid==id){
                idx=i;
                break;
            }
        }

          if(flag){
            BoxCheck.innerHTML="check_box";
            TaskArray[idx].check=1;

          }else{
            BoxCheck.innerHTML="check_box_outline_blank";
            TaskArray[idx].check=-1;
          }
          flag=!flag;

          console.log(TaskArray)
          updatelocalStorgae();
    })






    //  delete button function in tasks 
    let deletebutton=currentTask.querySelector(".deleteicon");

    deletebutton.addEventListener("click",function(){
        let id=currentText.getAttribute("unique");
        let idx=-1;
        for(let i=0;i<TaskArray.length;i++){
            let taskid=TaskArray[i].ide;
            if(taskid==id){
                idx=i;
                break;
            }
        }
        // array elemnt delete
        TaskArray.splice(idx);
        // UI delete
        currentTask.remove();
        updatelocalStorgae();
        // console.log(TaskArray);
    })
}

completeTaskBtn.addEventListener("click",function(){
    if(completedtaskbox.style.display=="none"){
        completedtaskbox.style.display="block";
        for(let i=0;i<TaskArray.length;i++){
            if(TaskArray[i].check==1){
                let element=document.createElement("div");
            element.innerHTML=`
           
            <!-- task area -->
             <textarea  class="completetaskclass" name="" id="task-area" placeholder=${TaskArray[i].task} disbaled ></textarea>`
            

             completedtaskbox.appendChild(element);
            }
        }
          }
    else{
      
        completedtaskbox.innerHTML="";
         completedtaskbox.style.display="none";
       
        
    }
})

// taskBtn functionality

Taskbtn.addEventListener("click",function(){
    completedtaskbox.innerHTML="";
    completedtaskbox.style.display="none";
})

function updatelocalStorgae(){
    let StringfyArray=JSON.stringify(TaskArray);
    localStorage.setItem("tasks",StringfyArray);
}