import firebase from 'firebase';

export const changeProblemCategoryAct = problemCategoryChange => {
    return {
        type: 'PROBLEMCATEGORYCHANGE',
        payload: problemCategoryChange
    };
};

export const changeProblemTypeAct = changeProblemType => {
    return {
        type: 'PROBLEMTYPECHANGE',
        payload: changeProblemType
    };
};

export const changeHouseAreaAct = changeHouseArea => {
    return {
        type: 'HOUSEAREACHANGE',
        payload: changeHouseArea
    };
};

export const changeAdditionalCommentAct = changeAdditionalComment => {
    return {
        type: 'ADDITIONALCOMMENTCHANGE',
        payload: changeAdditionalComment
    };
};

export const resetReportFormAct = () => {
    return {
        type: 'RESETREPORTFORM'
    };
};

export const reportModalAct = showModal => {
    return {
        type: 'REPORTMODAL',
        payload: showModal
    };
};

export const reportProblemAct = ({
    problemCatToReport,
    problemTypeToReport,
    houseAreaToReport,
    additionalCommentToReport,
    userFbId
}) => {
    return dispatch => {
        firebase
            .database()
            .ref('reportsCount')
            .transaction(currentReportCount => {
                const nextReportCount = currentReportCount + 1;
                if (currentReportCount !== null) {
                    firebase
                        .database()
                        .ref(`reports/${userFbId}`)
                        .push({
                            problemCategory: problemCatToReport,
                            problemType: problemTypeToReport,
                            houseArea: houseAreaToReport,
                            additionalComment: additionalCommentToReport,
                            status: 'open',
                            createdAt: firebase.database.ServerValue.TIMESTAMP,
                            closedAt: '',
                            reportId: nextReportCount
                        });
                    dispatch({ type: 'REPORTMODAL', payload: true });
                }
                return nextReportCount;
            });


            //UPDATE ACTIVE REPORT NUMBER
            firebase
            .database()
            .ref('reportsActive').transaction(activeReportCount => {
                return activeReportCount + 1;
            });
    };
};
