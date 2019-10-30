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


@Injectable()
export class AppService
{
     private _baseUrl= 'http://localhost:81/api/Value/';
   // private _baseUrl= 'https://localhost:44302/api/Value/';

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
    private _getCustomerSearchURL= this._baseUrl+"getCustomerSearch"
    private _getLoanRequestSearchURL= this._baseUrl+"getLoanRequestSearch"
    private _updateLoanStatus= this._baseUrl+"InsertLoanStatus"
    private _getLoanReqDetailURL= this._baseUrl+"getLoanRequest"
   

    private RequestID = new BehaviorSubject<Number>(0);
    currentReqID = this.RequestID.asObservable();
    constructor(private _http: HttpClient) { }


    changeReqID(currentReqID:Number) {
      this.RequestID.next(currentReqID);
    }

    getCompany():Observable<ICompany[]>
    {
        return this._http.get<ICompany[]>(this._getCompanyURL)
    
    }
   
    getLoanCategory():Observable<ICompany[]>
    {
        return this._http.get<ICompany[]>(this._getLoanCategoryURL)
    
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
    getLoanRequest(ID):Observable<Request>
    {
      return this._http.get<Request>(this._getLoanReqDetailURL+"/"+ID)
    }
    DeleteMachine(id:Number)
    {
      return this._http.get(this._deleteMachineeURL+"/"+id)
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
       
       return  this._http.post(this._updateLoanStatus,dist,httpOptions).subscribe(res => console.log(res));  
    
      
    }
    getMachineLine():Observable<MLine[]>
    {
      return this._http.get<MLine[]>(this._getMachineLineURL);
    }
    DeleteMachineLine(id:Number)
    {
      return this._http.get(this._deleteMachineLineURL+"/"+id)
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
       console.log("search"+search["OtherName"])
       return  this._http.post(this._getCustomerSearchURL,search,httpOptions) 
    
      
    }
    getLoanRequestSearch(search:LoanSearch){
   
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       console.log("search"+search)
       return  this._http.post(this._getLoanRequestSearchURL,search,httpOptions) 
    
      
    }
    InsertLoanRequest(data:Request,file:File)
    {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Access-Control-Allow-Origin":"true"
        })
        
      };
       var CustID:Number
       return  this._http.post(this._insertLoanRequestURL,data,httpOptions).subscribe(res =>
        { console.log('res'+res)
        CustID= parseInt( res.toString())
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
        this._http.post(this._insertPhotoURL,uploadData,HttpUploadOptions).subscribe(res =>console.log(res))
       });  
    
      
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