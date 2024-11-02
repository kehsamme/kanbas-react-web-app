import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunction";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import ParentStateComponent from "./ParentStateComponent";
import ArrayStateVariable from "./ArrayStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import DateStateVariable from "./DateStateVariable";
import StringStateVariables from "./StringStateVariables";
import React from "react";
import ReduxExamples from "./ReduxExamples";

export default function Lab4() {
    function sayHello() {
        alert("Hello");
      }
    return (
        <div id="wd-passing-functions">
            <h2>Lab 4</h2>
            <ClickEvent/>
            <PassingDataOnEvent/>
            <PassingFunctions theFunction={sayHello} />
            <Counter />
            <BooleanStateVariables />
            <StringStateVariables />
            <DateStateVariable />
            <ObjectStateVariable />
            <ArrayStateVariable />
            <ParentStateComponent />
            <ReduxExamples />
            
        </div>
    );
}
    