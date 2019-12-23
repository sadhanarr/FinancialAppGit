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
import { BehaviorSubject } from 'rxjs';
import {CustSearch} from './customer-search/CustSearch'
import {LoanSearch} from './loan-req-search/LoanSearch'
import {IUpdate} from './loan-req-search/UpdateStatus'
import {Customer} from './home-loan/Customer'
import {Loan} from './home-loan/loan'
import { IProof} from './home-loan/Proof'
import {Collection} from './home-loan/collection'
import { Followup } from './home-loan/Followup';
import {DueDate} from './home-loan/duedate'
import { Dashboard } from './dashboard-page/Dashboard';
import { LoanStatus } from './home-loan/LoanStatus';
import { PendingDashboard } from './dashboardsecond-page/pendingdashbrd';

@Injectable()
export class AppService
{
     private _baseUrl= location.origin+'/FinanceAPI/api/Value/';
  //  private _baseUrl= 'https://localhost:44302/api/Value/';
    private _validateLoginURL=this._baseUrl+"ValidateUserLogin";
    private _getUserRolesUrl=this._baseUrl+"GetUserRoles";
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
    private _getLoanReqSearchURL = this._baseUrl+"getLoanReqSearch";
    private _getLoanIssueReqSearchUrl = this._baseUrl+"getIssueLoanRequestSearch";
    private _deleteFIleLocURL = this._baseUrl+"DeleteFileLoc";

    private RequestID = new BehaviorSubject<Number>(0);
    currentReqID = this.RequestID.asObservable();
    private CustomerID = new BehaviorSubject<Number>(0);
    currentCustID = this.CustomerID.asObservable();
    constructor(private _http: HttpClient) { }


    changeReqID(currentReqID:Number) {
      this.RequestID.next(currentReqID);
    }
    changeCUstID(currentCustID:Number) {
      this.CustomerID.next(currentCustID);
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
      return this._http.get<Dashboard[]>(this._getDashboardDetailsURL+"/"+StartDate+"/"+EndDate)
    }
    getSecondDashboardDetails():Observable<Dashboard[]>
    {
      return this._http.get<Dashboard[]>(this._getSecondDashboardDetailsURL)
    }
    getPendingDashboardValues(type):Observable<PendingDashboard[]>
    {
      return this._http.get<PendingDashboard[]>(this._getPendingDashboardValuesUrl+"/"+type)
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
    getUserRoles(userId:Number)
    {
      return this._http.get<string[]>(this._getUserRolesUrl+"/"+userId);
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
    addCollection(collection:Collection)
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
       
       return  this._http.post(this._insertMachineURL,dist,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertMachineLineURL,dist,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertStateURL,state,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertSAgentURL,agent,httpOptions).subscribe(res => console.log(res));  
    
      
    }
      getUser():Observable<User[]>
    {
      return this._http.get<User[]>(this._getUserURL);
    }
    DeleteUser(id:Number)
    {
      return this._http.get(this._deleteUserURL+"/"+id)
    }
    InsertUser(user:User)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       
       return  this._http.post(this._insertUserURL,user,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertTalukURL,state,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertUserRoleURL,role,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertLineURL,line,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertSAreaURL,line,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertAreaURL,line,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertBranchURL,branch,httpOptions).subscribe(res => console.log(res));  
    
      
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
       
       return  this._http.post(this._insertDistrictURL,dist,httpOptions).subscribe(res => console.log(res));  
    
      
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