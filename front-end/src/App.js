import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

//AXIOS

import {
  getFullResume,
  postNewResume,
  editResume,
  deleteResume,
} from "./helpers/axiosHelper";

//COMPONENTS

import ItemResume from "./components/ItemResume/ItemResume";
import Button from "./components/Button/Button";
import EditForm from "./containers/Form/Form";

//PAGES

import ResumePage from "./pages/ResumePage";
import AddPage from "./pages/AddPage";

function App() {
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    getFullResume()
      .then((response) => {
        console.log(response.data.operation);
        const mapResponse = response.data.operation.map((eachObj) => {
          return {
            ...eachObj,
            edit: false,
          };
        });
        setResumeList(mapResponse);
      })
      .catch((error) => console.log(error));
  }, []);

  const submitEditForm = (
    event,
    obj,
    isIncomeValue = obj.isIncome,
    dateValue = obj.date
  ) => {
    const newResumeList = [...resumeList];

    const inputValue = event.target.closest("form").querySelector("#number")
      .value;
    const inputConcept = event.target.closest("form").querySelector("#concept")
      .value;
    const resumeElementIndex = newResumeList.findIndex((element) => {
      return obj.id === element.id;
    });
    const newResumeELement = { ...newResumeList[resumeElementIndex] };
    delete newResumeELement.edit;
    newResumeELement.value = parseInt(inputValue);
    newResumeELement.isIncome = isIncomeValue;
    newResumeELement.concept = inputConcept;
    newResumeELement.date = dateValue;
    editResume(newResumeELement, newResumeELement.id)
      .then((response) => {
        if (response.data.ok) {
          newResumeELement.edit = false;
          newResumeList.push(newResumeELement);
          console.log(newResumeList);
          console.log(newResumeELement);

          setResumeList(newResumeList);
        } else {
          alert("This listing was not updated due to an issue in the Back End");
        }
      })
      .catch((error) => console.log(error));

    newResumeELement.edit = false;

    newResumeList[resumeElementIndex] = newResumeELement;
    setResumeList(newResumeList);
  };

  const editHandler = (event, obj) => {
    const newResumeList = [...resumeList];
    const resumeElementIndex = newResumeList.findIndex((element) => {
      return obj.id === element.id;
    });
    const newResumeELement = { ...newResumeList[resumeElementIndex] };

    if (newResumeELement.edit) {
      newResumeELement.edit = false;
    } else {
      newResumeELement.edit = true;
    }
    newResumeList[resumeElementIndex] = newResumeELement;
    setResumeList(newResumeList);
  };

  const deleteHandler = (objId) => {
    deleteResume(objId)
      .then((response) => {
        if (response.data.ok) {
          const newResumeList = resumeList.filter(
            (element) => element.id !== objId
          );
          setResumeList(newResumeList);
        } else {
          alert("This listing was not deleted due to an issue in the Back End");
        }
      })
      .catch((error) => console.log(error));
  };

  const gettingResumeNum = (list) => {
    let sum = 0;
    list.forEach((element) => {
      return element.isIncome
        ? (sum = sum + element.value)
        : (sum = sum - element.value);
    });
    return sum;
  };

  const sumitAddHandler = (event, isIncomeValue, dateValue, conceptValue) => {
    const inputValue = parseInt(
      event.target.parentElement
        .closest("form")
        .querySelector("#number")
        .value.trim()
    );
    const newResumeList = [...resumeList];

    console.log(newResumeList);

    const newResumeELement = {
      value: inputValue,
      date: dateValue,
      concept: conceptValue,
      isIncome: isIncomeValue,
    };

    postNewResume(newResumeELement)
      .then((response) => {
        if (response.data.ok) {
          newResumeELement.id = response.data.createdOperation.id;
          newResumeELement.edit = false;
          newResumeList.push(newResumeELement);
          setResumeList(newResumeList);
        } else {
          alert("This listing was not created due to an issue in the Back End");
        }
      })
      .catch((error) => console.log(error));

    event.target.closest("main").querySelector("nav").firstElementChild.click();
  };

  const creatingJsxResumeList = (list) => {
    let newList = list.length < 11 ? list : list.slice(list.length - 10);
    return newList.map((eachObj) => {
      let isIncome;

      const radioButtonHandler = (event) => {
        if (event.target.value === "Income") {
          return (isIncome = true);
        } else {
          return (isIncome = false);
        }
      };

      return !eachObj.edit ? (
        <li key={eachObj.id} className="resume-element">
          <ItemResume
            className="info-resume-element"
            style={eachObj.isIncome ? { color: "green" } : { color: "red" }}
            labelConcept="Concept:"
            amount={eachObj.value}
            concept={eachObj.concept}
            date={eachObj.date}></ItemResume>
          <div className="button-wrapper">
            <Button
              className="edit-task-button base-button"
              click={(event) => {
                editHandler(event, eachObj);
              }}
              text="Edit"></Button>
            <Button
              className="delete-task-button base-button"
              click={() => {
                deleteHandler(eachObj.id);
              }}
              text="Delete"></Button>
          </div>
        </li>
      ) : (
        <li key={eachObj.id} className="edit-element">
          <EditForm
            change={(event) => radioButtonHandler(event)}
            click={(event) => {
              const value = event.target.closest("form").querySelector("#date")
                .value;
              let dateValue = value === "" ? eachObj.date : value;
              if (
                event.target.closest("form").querySelector("#number").value ===
                ""
              ) {
                return alert("you need to put a number");
              }

              return submitEditForm(event, eachObj, isIncome, dateValue);
            }}
            obj={eachObj}></EditForm>
        </li>
      );
    });
  };

  return (
    <Router>
      <main>
        <Switch>
          <Route
            path="/adding"
            render={() => <AddPage sumitHandler={sumitAddHandler}></AddPage>}
          />
          <Route
            path="/"
            exact
            render={() => (
              <ResumePage
                resumeNum={gettingResumeNum(resumeList)}
                resumeList={creatingJsxResumeList(
                  resumeList
                ).reverse()}></ResumePage>
            )}
          />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
