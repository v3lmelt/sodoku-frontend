/**
     * Request 封装，统一使用这里的请求获取数独
     */
import request from "@/utils/request";


/**
 * 从localStorage中获取指定下标的数独
 * @param i 数独索引
 * @returns {Array} 返回对应下标的数独(二维数组)
 */
export function sudokuJSONParser(i){
    // 首先localStorage得有对应的数独
    if(localStorage.getItem("sudokuArray")){
        return JSON.parse(localStorage.getItem("sudokuArray"))[i]
    }
}

/**
 * 将二维数组转化为localStorage
 * @param i 数独索引
 * @param arr 新的数独(二维数组)
 */

export function saveSudokuToLocalstorage(i, arr){
    if(JSON.parse(localStorage.getItem("sudokuArray"))[i]){
        let tmp = JSON.parse(localStorage.getItem("sudokuArray"));
        tmp[i] = arr;

        localStorage.setItem("sudokuArray", JSON.stringify(tmp));
    }
}



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

