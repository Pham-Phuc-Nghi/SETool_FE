export const getUserNameSelector = (state) => state.dang_nhap.name;
export const getAccessTokenSelector = (state) => state.dang_nhap.accessToken;

//project
export const getDSProjectSelector = (state) => state.homepage.dsProject;

//collaboration
export const getDSMemberAllSelector = (state) => state.collaboration.dsMember;
export const getDSMemberListSelector = (state) => state.collaboration.dsMemberList;

//backlogs
export const getDSTaskAllSelector = (state) => state.backlogs.dsTask;


//manager zone
export const getDSAllSprintSelector = (state) => state.manager.dsSprint;
export const getProjectDetailSelector = (state) => state.manager.projectDetails;
export const getListDevSelector = (state) => state.manager.dsDev;
export const getListQASelector = (state) => state.manager.dsQA;
