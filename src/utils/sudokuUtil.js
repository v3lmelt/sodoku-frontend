/**
     * Request 封装，统一使用这里的请求获取数独
     */
import request from "@/utils/request";

export function getSudokuUtil(){
    // 判断localStorage是否有对应设置项, 如果没有则设置为FAST
    if(!localStorage.getItem("APISetting")){
        localStorage.setItem("APISetting", "FAST");
    }

    // 判断localStorage中是否有对应难度项，如果没有则设置为easy
    if(!localStorage.getItem("difficulty")){
        localStorage.setItem("difficulty", "easy");
    }

    let setting = localStorage.getItem("APISetting");
    let diff = localStorage.getItem("difficulty");
    if(setting === "FAST"){
        // 返回一个promise对象，难度为localStorage中设置的值
        // localStorage中是否有对应的难度项，没有的话设置为easy
        return request.get("fast-sudoku-list/" + diff);
    }else if(setting === "SLOW"){
        return request.get("sudoku-list/" + diff);
    }
    // 如果为非FAST和SLOW的值，则置为FAST
    else{
        return request.get("fast-sudoku-list/" + diff);
    }
}

