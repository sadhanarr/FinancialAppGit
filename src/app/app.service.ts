import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders,HttpClientModule } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {Branch} from './master-screen/branch'
import {ICompany} from './master-screen/Company'
import {map, catchError} from 'rxjs/operators';
import {State} from './master-screen/State'
import {District} from './master-screen/district'
import {Taluk} from './master-screen/taluk'
import {Area} from './master-screen/area'
import {Agent} from './master-screen/agent'
import {User} from './master-screen/user'
import {MLine} from './master-screen/MLine'
import {Machine} from './master-screen/machine'
import {Request} from './loan-request/request'
import {ROI} from './loan-request/ROI'
import {IReportPost} from './reports/postReport'
import { BehaviorSubject } from 'rxjs';
import {CustSearch} from './customer-search/CustSearch'
import {LoanSearch} from './loan-req-search/LoanSearch'
import {IUpdate} from './loan-req-search/UpdateStatus'
import {Customer} from './home-loan/Customer'
import {Loan} from './home-loan/loan'
import { IProof} from './home-loan/Proof'
import {Collection} from './home-loan/collection'
import {addCollection} from './home-loan/addcollection'
import { Followup } from './home-loan/Followup';
import {IClosed} from './reports/closed-report/Closed'
import {IEnd} from './reports/end-report/End'
import {IFollow} from './reports/followup-report/followReport'
import {DueDate} from './home-loan/duedate'
import { Dashboard } from './dashboard-page/Dashboard';
import { LoanStatus } from './home-loan/LoanStatus';
import { PendingDashboard } from './dashboard-page/pendingdashbrd';
import {IRRequest} from './reports/request-register/ReqReport'
import {IIRequest} from './reports/issue-register/IssueReport'
import {ICollectionRep} from './reports/collection-register/CollectionReport'
import {IBalance} from './reports/balance-register/BalReport'
import {IDueList} from './reports/due-list/DueList'
import {IReportDrop} from './reports/ReportDrop'
import * as moment from 'moment';

@Injectable()
export class AppService
{
    public filepath= "C:\\Application\\Tech\\"
    private _baseUrl= location.origin+'/FinanceAPI/api/Value/';
    //private _baseUrl= 'https://staging.marudhamcapitals.in/FinanceAPI/api/Value/';
    private _getUserCredentials = this._baseUrl+"getUserCredentials";
    private _validateLoginURL=this._baseUrl+"ValidateUserLogin";
    private _getUserRolesUrl=this._baseUrl+"GetUserRoles";
    private _getUserRolesByNameUrl = this._baseUrl+"GetUserRolesByName";
    private _getCompanyURL = this._baseUrl+"getCompany";
    private _insertBranchURL= this._baseUrl+"InsertBranch"
    private _getBranchURL =this._baseUrl+'GetBranch';
    private _deleteBranchURL =this._baseUrl+'DeleteBranch';
    private _insertStateURL= this._baseUrl+"InsertState"
    private _getStateURL =this._baseUrl+'getState';
    private _deleteStateURL =this._baseUrl+'DeleteState';
    private _insertDistrictURL= this._baseUrl+"InsertDistrict"
    private _getDistrictURL =this._baseUrl+'getDistrict';
    private _deleteDistrictURL =this._baseUrl+'DeleteDistrict';
    private _insertTalukURL= this._baseUrl+"InsertTaluk"
    private _getTalukURL =this._baseUrl+'getTaluk';
    private _deleteTalukURL =this._baseUrl+'DeleteTaluk';
    private _insertLineURL= this._baseUrl+"InsertLine"
    private _getLineURL =this._baseUrl+'getLine';
    private _getReportLineURL =this._baseUrl+'getReportLine';
    private _getReportAgentURL =this._baseUrl+'getReportAgent';
    private _getReportMachineURL =this._baseUrl+'getReportMachine';
    private _deleteLineURL =this._baseUrl+'DeleteLine';
    private _insertAreaURL= this._baseUrl+"InsertArea"
    private _getAreaURL =this._baseUrl+'getArea';
    private _deleteAreaURL =this._baseUrl+'DeleteArea';
    private _insertSAreaURL= this._baseUrl+"InsertSArea"
    private _getSAreaURL =this._baseUrl+'getSArea';
    private _deleteSAreaURL =this._baseUrl+'DeleteSArea';
    private _insertSAgentURL= this._baseUrl+"InsertSAgent"
    private _getSAgentURL =this._baseUrl+'getSAgent';
    private _deleteSAgentURL =this._baseUrl+'DeleteSAgent';
    private _insertUserURL= this._baseUrl+"InsertUser"
    private _getUserURL =this._baseUrl+'getUser';
    private _deleteUserURL =this._baseUrl+'DeleteUser';
    private _insertUserRoleURL= this._baseUrl+"InsertUserRole"
    private _getUserRoleURL =this._baseUrl+'getUserRole';
    private _deleteUserRoleURL =this._baseUrl+'DeleteUserRole';
    private _insertMachineURL= this._baseUrl+"InsertMachine"
    private _getMachineURL =this._baseUrl+'getMachine';
    private _deleteMachineeURL =this._baseUrl+'DeleteMachine';
    private _insertMachineLineURL= this._baseUrl+"InsertMachineLine"
    private _getMachineLineURL =this._baseUrl+'getMachineLine';
    private _deleteMachineLineURL =this._baseUrl+'DeleteMachineLine';
    private _getLoanCategoryURL =this._baseUrl+'LoanCategory';
    private _insertLoanRequestURL =this._baseUrl+'InsertLoanRequest';
    private _getROIURL =this._baseUrl+'getROI';
    private _insertPhotoURL= this._baseUrl+"InsertPhoto";
    private _insertProofURL= this._baseUrl+"InsertProof";
    private _getCustomerSearchURL= this._baseUrl+"getCustomerSearch"
    private _getCustomerVerificationURL= this._baseUrl+"getCustomerVerification"
    private _getLoanRequestSearchURL= this._baseUrl+"getLoanRequestSearch"
    private _updateLoanStatus= this._baseUrl+"InsertLoanStatus"
    private _getLoanReqDetailURL= this._baseUrl+"getLoanRequest"
    private _getCustomerURL= this._baseUrl+"getCustomer"
    private _getDetailforLoanIssueURL= this._baseUrl+"getDetailforLoanIssue"
    private _InsertIssuedLoanDetails=this._baseUrl+"InsertIssuedLoanDetails";
    private _getLoanDetailsURL= this._baseUrl+"getLoanDetails"
    private _getLoanDetailURL= this._baseUrl+"LoanDetail"
    private _getLoanbyCustomerURL= this._baseUrl+"getLoanbyCustomer"
    private _getRequestbyCustomerURL= this._baseUrl+"getRequestbyCustomer"
    private _getProofURL= this._baseUrl+"getProof"
    private _deleteProofURL= this._baseUrl+"deleteProof"
    private _deleteCollectionURL= this._baseUrl+"DeleteCollection"
    private _getCollectionURL= this._baseUrl+"getLoanEMIList"
    private _getCollectionValURL= this._baseUrl+"getCollection"
    private _addCollectionURL= this._baseUrl+"addCollection"
    private _UpdateCustomerURL= this._baseUrl+"UpdateCustomer"
    private _insertLoanFollowupURL = this._baseUrl+"InsertLoanFollowupDetails";
    private _deleteLoanFollowupURL = this._baseUrl+"DeleteLoanFollowupDetail";
    private _getdueURL= this._baseUrl+"getDueDate"
    private _insertIssueLoanStatus = this._baseUrl+"InsertIssueLoanStatus";
    private _getIssueLoanStatus = this._baseUrl+"getLoanStatusDetails";
    private _getLoanFollowupDetailsURL = this._baseUrl+"getLoanFollowupDetails";
    private _getDashboardDetailsURL = this._baseUrl+"getDashboardDetails";
    private _getSecondDashboardDetailsURL = this._baseUrl+"getSecondDashboardDetails";
    private _getPendingDashboardValuesUrl=this._baseUrl+"getPendingDashboardValues";
    private _getSummaryDashboardValuesUrl=this._baseUrl+"getSummaryDashboardValues";
    private _getLoanReqSearchURL = this._baseUrl+"getLoanReqSearch";
    private _getLoanIssueReqSearchUrl = this._baseUrl+"getIssueLoanRequestSearch";
    private _deleteFIleLocURL = this._baseUrl+"DeleteFileLoc";
    private _getRequestReportURL = this._baseUrl+"getRequestReport";
    private _getIssueReportURL = this._baseUrl+"getIssueReport";
    private _getCollectionReportURL = this._baseUrl+"getCollectionReport";
    private _getBalanceReportURL = this._baseUrl+"getBalanceReport";
    private _getEndReportURL = this._baseUrl+"getEndReport";
    private _getClosedeReportURL = this._baseUrl+"getClosedReport";
    private _getFollowupReportURL = this._baseUrl+"getFollowupReport";
    private _getDueListURL = this._baseUrl+"getDueList";
    private _InsertGroupURL = this._baseUrl+"InsertGroup";
    private _getGroupURL = this._baseUrl+"GetGroup";
    private _deleteURL = this._baseUrl+"deleteGroup";
    private _InsertHowtoKnoURL = this._baseUrl+"InsertHowtoKno";
    private _getHowtoKnoURL = this._baseUrl+"GetHowtoKno";
    private _deleteHowtoKnoURL = this._baseUrl+"deleteHowtoKno";

    private RequestID = new BehaviorSubject<Number>(0);
    currentReqID = this.RequestID.asObservable();
    private UserID = new BehaviorSubject<Number>(0);
    currentUserID = this.UserID.asObservable();

    private CustomerID = new BehaviorSubject<Number>(0);
    currentCustID = this.CustomerID.asObservable();
    private ReqStatus = new BehaviorSubject<string>('');
    Status = this.ReqStatus.asObservable();
    private userName = new BehaviorSubject<string>('');
    UserName = this.userName.asObservable();
    constructor(private _http: HttpClient) { }
    private CustSearch= new BehaviorSubject<CustSearch>({Status:'',CustName:'',OtherName:'',Address:'',CustID:'',IDProof:'',ContactList:'',Line:'',Area:'',KeywordSearch:''})
    custSearch= this.CustSearch.asObservable();
    private verfSearch= new BehaviorSubject<CustSearch>({Status:'',CustName:'',OtherName:'',Address:'',CustID:'',IDProof:'',ContactList:'',Line:'',Area:'',KeywordSearch:''})
    VerfSearch= this.verfSearch.asObservable();
   private requestSearch= new BehaviorSubject<LoanSearch>({    Status  :'',FromDate:'',ToDate:'',RequestID:'',CustName  :'', OtherName  :'', 
    Address   :'', CustID   :'', IDProof   :'', ContactList  :'',  Line   :'', Area  :'', AgentName:'', LoanCategory:'', KeywordSearch:''
})
ReqSearch= this.requestSearch.asObservable();
private loanissueSearch= new BehaviorSubject<LoanSearch>({    Status  :'Approved',FromDate:'',ToDate:'',RequestID:'',CustName  :'', OtherName  :'', 
Address   :'', CustID   :'', IDProof   :'', ContactList  :'',  Line   :'', Area  :'', AgentName:'', LoanCategory:'', KeywordSearch:''
})
LoanIssueSearch= this.loanissueSearch.asObservable();

    changeStatus(Status:string) {
      this.ReqStatus.next(Status);
    }
    changeCustSearch(Status:CustSearch) {
      this.CustSearch.next(Status);
    }
    changeReqSearch(search:LoanSearch)
    {
      this.requestSearch.next(search)
    }
    changeLoanIssueSearch(search:LoanSearch)
    {
      this.loanissueSearch.next(search)
    }
    changeVerificationSearch(Status:CustSearch) {
      this.verfSearch.next(Status);
    }
    changeUserName(user:string) {
      this.userName.next(user);
    }
    changeReqID(currentReqID:Number) {
      this.RequestID.next(currentReqID);
    }
    changeCUstID(currentCustID:Number) {
      this.CustomerID.next(currentCustID);
    }
    changeUserID(id:Number)
    {
      this.UserID.next(id);
    }
    getCompany():Observable<ICompany[]>
    {
        return this._http.get<ICompany[]>(this._getCompanyURL)
    }
   
    getLoanCategory():Observable<ICompany[]>
    {
        return this._http.get<ICompany[]>(this._getLoanCategoryURL)
    
    }
    getCollection(LoanID):Observable<Collection[]>
    {
        return this._http.get<Collection[]>(this._getCollectionURL+"/"+LoanID)
    
    }
    getFollowup(LoanID):Observable<Followup[]>
    {
      return this._http.get<Followup[]>(this._getLoanFollowupDetailsURL+"/"+LoanID)
    }
    getDashboardDetails(StartDate,EndDate):Observable<Dashboard[]>
    {
      console.log(StartDate)
      return this._http.get<Dashboard[]>(this._getDashboardDetailsURL+"/"+StartDate+"/"+EndDate)
    }
    getRequestReport(StartDate,EndDate):Observable<IRRequest[]>
    {
      console.log(this._getRequestReportURL+'/'+StartDate+'/'+EndDate)
      return this._http.get<IRRequest[]>(this._getRequestReportURL+'/'+StartDate+'/'+EndDate)
    }
    getIssueReport(StartDate,EndDate):Observable<IIRequest[]>
    {
      console.log(this._getRequestReportURL+'/'+StartDate+'/'+EndDate)
      return this._http.get<IIRequest[]>(this._getIssueReportURL+'/'+StartDate+'/'+EndDate)
    }
    getEndReport(post:IReportPost):Observable<IEnd[]>
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post<IEnd[]>(this._getEndReportURL,post,httpOptions);  
    
      //return this._http.post<IEnd[]>(this._getEndReportURL+'/'+StartDate+'/'+EndDate+'/'+Line+'/'+Agent)
    }
    getClosedReport(post:IReportPost):Observable<IClosed[]>
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post<IClosed[]>(this._getClosedeReportURL,post,httpOptions);  
    
      
    }
    getFollowupReport(post:IReportPost):Observable<IFollow[]>
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post<IFollow[]>(this._getFollowupReportURL,post,httpOptions);  
    
    }
    getDueList(post:IReportPost):Observable<IDueList[]>
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post<IDueList[]>(this._getDueListURL,post,httpOptions);  
    
     
    }
    getCollectionReport(post:IReportPost):Observable<ICollectionRep[]>
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post<ICollectionRep[]>(this._getCollectionReportURL,post,httpOptions);  
    
      
    }
    getBalanceReport(post:IReportPost):Observable<IBalance[]>
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post<IBalance[]>(this._getBalanceReportURL,post,httpOptions);  
    
     
    }
    getSecondDashboardDetails():Observable<Dashboard[]>
    {
      return this._http.get<Dashboard[]>(this._getSecondDashboardDetailsURL)
    }
    getPendingDashboardValues(type):Observable<PendingDashboard[]>
    {
      return this._http.get<PendingDashboard[]>(this._getPendingDashboardValuesUrl+"/"+type)
    }
    getSummaryDashboardValues(type,startDate,endDate):Observable<PendingDashboard[]>
    {
      return this._http.get<PendingDashboard[]>(this._getSummaryDashboardValuesUrl+"/"+type+"/"+startDate+"/"+endDate)
    }
    getCollectionValue(ID,LoanID,EntryDate):Observable<Collection>
    {
      console.log(this._getCollectionValURL+"/"+ID+"/"+LoanID+"/"+EntryDate)
        return this._http.get<Collection>(this._getCollectionValURL+"/"+ID+"/"+LoanID+"/"+EntryDate)
    
    }
    getIssueLoanStatus(loanId:Number):Observable<LoanStatus>
    {
      return this._http.get<LoanStatus>(this._getIssueLoanStatus+"/"+loanId)
    }
    getDueDate(date,Type:string,months:Number):Observable<DueDate>
    {
        return this._http.get<DueDate>(this._getdueURL+"/"+date+"/"+Type+"/"+months)
    }
    validateUserLogin(userName:string,password:string):Observable<Number>
    {
      return this._http.get<Number>(this._validateLoginURL+"/"+userName+"/"+password)
    }
    getUserCredentials(userName:string):Observable<string[]>
    {
      return this._http.get<string[]>(this._getUserCredentials+"/"+userName);
    }
    GetGroup()
    {
      return this._http.get<Taluk[]>(this._getGroupURL);
    }
    GetHowtoKno()
    {
      return this._http.get<Taluk[]>(this._getHowtoKnoURL);
    }
    getUserRoles(userId:Number)
    {
      return this._http.get<string[]>(this._getUserRolesUrl+"/"+userId);
    }
    getUserRolesByName(name:string)
    {
      return this._http.get<string[]>(this._getUserRolesByNameUrl+"/"+name);
    }
    getAllUsers() {
      return this._http.get<User[]>(this._validateLoginURL);
  }

  getUserById(id: number) {
      return this._http.get<User>(this._validateLoginURL);
  }
    insertLoanIssueStatus(status:LoanStatus)
    {
      console.log(status)
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      }; 
        return this._http.post(this._insertIssueLoanStatus,status,httpOptions)
    }
    addCollection(collection:addCollection)
    {
      console.log(collection)
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      }; 
        return this._http.post(this._addCollectionURL,collection,httpOptions)
    }
    getROI():Observable<ROI[]>
    {
        return this._http.get<ROI[]>(this._getROIURL)
    
    }
    getBranch():Observable<Branch[]>
    {
      return this._http.get<Branch[]>(this._getBranchURL);
    }
    getMachine():Observable<Machine[]>
    {
      return this._http.get<Machine[]>(this._getMachineURL);
    }
    getLoanDetails():Observable<Loan[]>
    {
      return this._http.get<Loan[]>(this._getLoanDetailsURL);
    }
    getLoanDetail(LoanID:Number):Observable<Loan>
    {
      return this._http.get<Loan>(this._getLoanDetailURL+"/"+LoanID);
    }
    getLoanbyCustomer( CustID):Observable<Loan[]>
    {
      return this._http.get<Loan[]>(this._getLoanbyCustomerURL+"/"+CustID);
    }
    getRequestbyCustomer( CustID):Observable<Request[]>
    {
      return this._http.get<Request[]>(this._getRequestbyCustomerURL+"/"+CustID);
    }
    getCustomer(CustID:Number,RequestID:Number):Observable<Loan>
    {
      return this._http.get<Loan>(this._getCustomerURL+"/"+CustID+"/"+RequestID);
    }
    getLoanRequest(ID):Observable<Request>
    {
      return this._http.get<Request>(this._getLoanReqDetailURL+"/"+ID)
    }
    getDetailforLoanIssue(ID):Observable<Loan>
    {
      return this._http.get<Loan>(this._getDetailforLoanIssueURL+"/"+ID)
    }
    getProof(CustID:Number, Type:string, LoanID:Number):Observable<IProof[]>
    {
     return this._http.get<IProof[]>(this._getProofURL+"/"+CustID+"/"+Type+"/"+LoanID)
    }
    DeleteMachine(id:Number)
    {
      return this._http.get(this._deleteMachineeURL+"/"+id)
    }
    DeleteFileLoc(CustID:Number,LoanID:Number)
    {
      console.log(this._deleteFIleLocURL+"/"+CustID+"/"+LoanID)
      return this._http.get(this._deleteFIleLocURL+"/"+CustID+"/"+LoanID)
    }
    deleteProof(CustID:Number,ProofType:string,Type:string,LoanID:Number)
    {
      return this._http.get(this._deleteProofURL+"/"+CustID+"/"+ProofType.replace(' ','%20')+"/"+Type+"/"+LoanID)
    }
    InsertMachine(dist:Machine)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };      
       
       return  this._http.post(this._insertMachineURL,dist,httpOptions);  
    
      
    }
    UpdateLoanStatus(dist:IUpdate)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };      
       
       return  this._http.post(this._updateLoanStatus,dist,httpOptions);  
    
      
    }
    getMachineLine():Observable<MLine[]>
    {
      return this._http.get<MLine[]>(this._getMachineLineURL);
    }
    DeleteMachineLine(id:Number)
    {
      return this._http.get(this._deleteMachineLineURL+"/"+id)
    }
    DeleteCollection(id:Number,LoanID:Number)
    {
      return this._http.get(this._deleteCollectionURL+"/"+id+"/"+LoanID)
    }
    InsertMachineLine(dist:MLine)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertMachineLineURL,dist,httpOptions);  
    
      
    }
    getCustomerSearch(search:CustSearch){
   
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       console.log("search"+search)
       return  this._http.post(this._getCustomerSearchURL,search,httpOptions) 
    
      
    }
    getCustomerVerfication(search:CustSearch){
   
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       console.log("search"+search)
       return  this._http.post(this._getCustomerVerificationURL,search,httpOptions) 
    
      
    }
   
     getLoanRequestSearch(search:LoanSearch){
   
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       console.log("search"+search["ToDate"])
       return  this._http.post(this._getLoanRequestSearchURL,search,httpOptions) 
    
      
    }
    getLoanReqSearch(search:LoanSearch){
   
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       console.log("search"+search["FromDate"])
       return  this._http.post(this._getLoanReqSearchURL,search,httpOptions) 
    }
    getLoanIssueRequestSearch(search:LoanSearch){
   
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       return  this._http.post(this._getLoanIssueReqSearchUrl,search,httpOptions) 
    }
    
    InsertIssuedLoanDetails(loan:Loan)
    {
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       return  this._http.post(this._InsertIssuedLoanDetails,loan,httpOptions)
    }

    UpdateCustomer(loan:Loan)
    {
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       return  this._http.post(this._UpdateCustomerURL,loan,httpOptions)
    }
    DeleteLoanFollowupDetail(id:Number)
    {
      return this._http.get(this._deleteLoanFollowupURL+"/"+id)
    }
    InsertLoanFollowupDetail(followup:Followup)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       return  this._http.post(this._insertLoanFollowupURL,followup,httpOptions)
    }

    InsertLoanRequest(data:Request,file:File)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       return   this._http.post(this._insertLoanRequestURL,data,httpOptions)
    
      
    }
InsertPhoto(CustID:Number,file:File)
{
  const HttpUploadOptions = {
    headers: new HttpHeaders({
      "Accept": "multipart/form-data",
      "Access-Control-Allow-Origin":"true"
    })
  }
  const uploadData = new FormData();
  uploadData.append("CustID", CustID.toString());
  uploadData.append("file", file);
  console.log(uploadData)
  return this._http.post(this._insertPhotoURL,uploadData,HttpUploadOptions)
}
    InsertProof(CustID:Number,proof:string,proofNumber:string,file:File,value:string, LoanID:Number)
    {
      const HttpUploadOptions = {
        headers: new HttpHeaders({
          "Accept": "multipart/form-data",
          "Access-Control-Allow-Origin":"true"
        })
      }
      console.log(CustID+" "+proof+" "+proofNumber+' '+file+' '+value+' '+LoanID)
      const uploadData = new FormData();
      uploadData.append("CustID", CustID.toString());
      uploadData.append("Proof", proof);
      uploadData.append("proofNumber", proofNumber);
      uploadData.append("file", file);
      uploadData.append("Type", value);
      uploadData.append("LoanID", LoanID.toString());
      console.log(uploadData)
     return this._http.post(this._insertProofURL,uploadData,HttpUploadOptions)
    }
    getDistrict():Observable<District[]>
    {
      return this._http.get<District[]>(this._getDistrictURL);
    }
    DeleteDistrict(id:Number)
    {
      return this._http.get(this._deleteDistrictURL+"/"+id)
    }
    InsertState(state:State)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertStateURL,state,httpOptions);  
    
      
    }
    getSAgent():Observable<Agent[]>
    {
      return this._http.get<Agent[]>(this._getSAgentURL);
    }
    DeleteSAgent(id:Number)
    {
      return this._http.get(this._deleteSAgentURL+"/"+id)
    }
    InsertSAgent(agent:Agent)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertSAgentURL,agent,httpOptions);  
    
      
    }
      getUser():Observable<User[]>
    {
      return this._http.get<User[]>(this._getUserURL);
    }
    DeleteUser(id:Number)
    {
      return this._http.get(this._deleteUserURL+"/"+id)
    }
    DeleteGroup(id:Number)
    {
      return this._http.get(this._deleteURL+"/"+id)
    }
    DeleteHowtoKno(id:Number)
    {
      return this._http.get(this._deleteHowtoKnoURL+"/"+id)
    }
    InsertUser(user:User)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertUserURL,user,httpOptions);  
    
      
    }
    InsertGroup(group:Taluk)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._InsertGroupURL,group,httpOptions);  
    
      
    }
    InsertHowtoKno(group:Taluk)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._InsertHowtoKnoURL,group,httpOptions);  
    
      
    }
    getTaluk():Observable<Taluk[]>
    {
      return this._http.get<Taluk[]>(this._getTalukURL);
    }
    DeleteTaluk(id:Number)
    {
      return this._http.get(this._deleteTalukURL+"/"+id)
    }
    InsertTaluk(state:Taluk)
    {
      console.log(state)
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertTalukURL,state,httpOptions);  
    
      
    }
    getUserRole():Observable<Taluk[]>
    {
      return this._http.get<Taluk[]>(this._getUserRoleURL);
    }
    DeleteUserRole(id:Number)
    {
      return this._http.get(this._deleteUserRoleURL+"/"+id)
    }
    InsertUserRole(role:Taluk)
    {
      console.log(role)
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertUserRoleURL,role,httpOptions);  
    
      
    }
    getReportLine():Observable<IReportDrop[]>
    {
      return this._http.get<IReportDrop[]>(this._getReportLineURL);
    }
    getReportAgent():Observable<IReportDrop[]>
    {
      return this._http.get<IReportDrop[]>(this._getReportAgentURL);
    }
    getReportMachine():Observable<IReportDrop[]>
    {
      return this._http.get<IReportDrop[]>(this._getReportMachineURL);
    }
    getLine():Observable<Taluk[]>
    {
      return this._http.get<Taluk[]>(this._getLineURL);
    }
    DeleteLine(id:Number)
    {
      return this._http.get(this._deleteLineURL+"/"+id)
    }
    InsertLine(line:Taluk)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertLineURL,line,httpOptions);  
    
      
    }
    getSArea():Observable<Taluk[]>
    {
      return this._http.get<Taluk[]>(this._getSAreaURL);
    }
    DeleteSArea(id:Number)
    {
      return this._http.get(this._deleteSAreaURL+"/"+id)
    }
    InsertSArea(line:Taluk)
    {
      console.log(line)
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertSAreaURL,line,httpOptions);  
    
      
    }
    getArea():Observable<Area[]>
    {
      return this._http.get<Area[]>(this._getAreaURL);
    }
    DeleteArea(id:Number)
    {
      return this._http.get(this._deleteAreaURL+"/"+id)
    }
    InsertArea(line:Area)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertAreaURL,line,httpOptions);  
    
      
    }
    DeleteBranch(id:Number)
    {
      return this._http.get(this._deleteBranchURL+"/"+id)
    }
    InsertBranch(branch:Branch)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertBranchURL,branch,httpOptions);  
    
      
    }

    getState():Observable<State[]>
    {
      return this._http.get<State[]>(this._getStateURL);
    }
    DeleteState(id:Number)
    {
      return this._http.get(this._deleteStateURL+"/"+id)
    }
    InsertDistrict(dist:District)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertDistrictURL,dist,httpOptions);  
    
      
    }
    private handleError(err: HttpErrorResponse) {
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage = '';
      if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
      } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}