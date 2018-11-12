const initialState = {
    problemCatToReport: '-',
    problemTypeToReport: '-',
    houseAreaToReport: '-',
    additionalCommentToReport: '',
    reportModal: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'PROBLEMCATEGORYCHANGE':
            return { ...state, problemCatToReport: action.payload };
        case 'PROBLEMTYPECHANGE':
            return { ...state, problemTypeToReport: action.payload };
        case 'HOUSEAREACHANGE':
            return { ...state, houseAreaToReport: action.payload };
        case 'ADDITIONALCOMMENTCHANGE':   
            return { ...state, additionalCommentToReport: action.payload };
        case 'REPORTMODAL':
            return { ...state, reportModal: action.payload };     
        case 'RESETREPORTFORM':
            return initialState;    
        default:
            return state;
    }
};
