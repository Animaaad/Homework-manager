import Homework from "./Homework";
  
function EmptyHomeworkList() {
    return <div className="row">
            <div className="col">
              <div className="py-3">
                  No homeworks yet
              </div>
            </div>
          </div>;
  }


function HomeworkList({homeworks}) {
    console.log(homeworks);
    console.log("a");
    let homeworkList = homeworks.map((homework) => <Homework key={homework.id} homework={homework}></Homework>);
    let emptyHomeworkList =  <EmptyHomeworkList></EmptyHomeworkList>;  
  
    return homeworkList.length > 0 ?  homeworkList : emptyHomeworkList;
  }

export { HomeworkList };