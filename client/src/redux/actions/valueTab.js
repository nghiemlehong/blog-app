export const setValueTab = value =>{
    if(value ===0) return {type : 'TAB_HOME'}
    if(value ===1) return {type : 'TAB_FAVORITES_LIST'}
    if(value ===2) return {type : 'TAB_YOUR_POSTS'}
}

export const noTab = () =>{ return {type  :'NO_TAB' }}