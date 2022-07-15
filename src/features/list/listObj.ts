import { showType,typeArea,typeDate,typeBk } from "../../types/listType"
//大分類的選項
export const categoryOpt = (hasAll:boolean=false)=>{
    let result = []
    for (const [key,value] of Object.entries(typeShow)){
        result.push({label:value,value:key})
    }
    if(hasAll){
        result.unshift({label:'全部',value:'none'})
    }
    return result
  }
  //今天的時間日期
export const getDateStr =()=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    function addZero(num:number){
        let str = String(num)
        if(str.length < 2){
            return `0${str}`
        }
        return str
    }
    return `${year}-${addZero(month)}-${addZero(day)}`
}
export const typeAreaItem:typeArea = {
    north:'北部',
    middle:'中部',
    south:'南部',
    east:'東部及外島',
    none:'全部區域',
}
export const allAreaType:typeArea = {
    north: '台北|臺北|新北|基隆|桃園|宜蘭|新竹',
    middle: '台中|臺中|南投|彰化|雲林|苗栗',
    south: '台南|臺南|嘉義|高雄|屏東',
    east: '花蓮|台東|臺東|金門|澎湖|馬祖',
    none: '',
  }
export const typeDateItem:typeDate = {
    up:'由近到遠',
    down:'由遠到近',
}
export const typeShow:showType = {
    indie:'獨立音樂',
    classic:'古典音樂',
    dance:'舞蹈表演',
    drama: '戲劇表演',
    mix: '綜藝活動',
}
export const typeBkItem:typeBk={
    indie:{
        img:'sky-indie.jpg',
        color:'#103873',
    },
    classic:{
        img:'sky-classic.jpg',
        color:'#38294c',
    },
    dance:{
        img:'sky-drama.jpg',
        color:'#593e85',
    },
    drama:{
        img:'sky-dance.jpg',
        color:'#3b313e',
    },
    mix:{
        img:'sky-mix.jpg',
        color:'#164ba2',
    },
}
