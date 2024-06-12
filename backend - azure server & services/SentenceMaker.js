const {translateText} = require("./azure-translate-service");

function objectNameCombine(array){
    let text = "";
    const length = array.length;

    if(length > 2){
        array.forEach((element,index)=>{
            if(index === length - 1)
                text += ("and " + element.tags[0].name);
            else{
                text += (element.tags[0].name + ", ");
            }
        });
    }
    else if(length === 2){
        text = (array[0].tags[0].name + " and " + array[1].tags[0].name);
    }
    else{
        text = array[0].tags[0].name;
    }

    return text;
}

function readsTextCombine(array){
    text = "";
    readList = array.lines;
    length = readList.length;

    if(length > 2){
        readList.forEach((element,index)=>{
            if(index === length - 1){
                text += ("and " + element.text);
            }
            else{
                text += (element.text + ", ");
            }
        });
    }
    else if(length === 2){
        text += (readList[0].text + " and " + readList[1].text);
    }
    else if(length === 1){
        text += readList[0].text;
    }

    return text;
}

async function createSentence(predictionList){
    
    let text = "";
    const objects = predictionList.objectsResult.values;
    const reads = predictionList.readResult.blocks[0];

    if(objects[0]!== undefined && reads!== undefined){
        text = "Di depan ada objects: ";
        const objectName = objectNameCombine(objects);
        const objectNameTranslate = await translateText(objectName);
        text += objectNameTranslate;
        text += ". Dan juga ada text, bertuliskan: ";
        text += readsTextCombine(reads);
    }
    else if(objects[0] !== undefined){
        text = "Di depan ada objects: ";
        const objectName = objectNameCombine(objects);
        const objectNameTranslate = await translateText(objectName);
        text += objectNameTranslate;
    }
    else if(reads !== undefined){
        text += "Di depan ada text, bertuliskan: ";
        text += readsTextCombine(reads);
    }
    else{
        return null;
    }
    //console.log(text);
    return text;
}

module.exports = {createSentence};