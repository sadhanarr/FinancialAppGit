import { Injectable } from '@angular/core';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as FileSaver from 'file-saver';

@Injectable()
export class ExcelExportService {
    constructor() { }
    public exportAsExcelFile(json:any[],filename:string):void{
        const blobType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const workbook= new Excel.Workbook();
        workbook.addWorksheet('Data', { views: [{xSplit: 1, activeCell: 'A1' }] });
        var sheet = workbook.getWorksheet(1);
   if(filename=='RequestRegister.xlsx'){
        sheet.columns = [   
            {header:'SNO',width:15, key: 'SNO',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'REQUEST ID',width:20, key: 'RequestID',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CUSTOMER ID',width:20, key: 'CustomerID' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'CUSTOMER NAME',width:30, key: 'CustomerName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'INITIAL',width:15, key: 'Initial',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'REQUEST DATE',width:25, key: 'RequestDate',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}}, 
            {header:'LINE',width:30, key: 'LineName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}  },
            {header:'AREA',width:30, key: 'AreaName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN CATEGORY',width:30, key: 'LoanCategory',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'SHOWROOM_AGENT',width:30, key: 'AgentName' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'LOAN AMOUNT',width:25, key: 'LoanAmt',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CREATED BY',width:25, key: 'CreatedBy',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'STATUS',width:25, key: 'Status',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}}, 
            
        ]; 
    }
    if(filename=='IssueRegister.xlsx')
    {
        sheet.columns = [   
            {header:'SNO',width:15, key: 'SNO',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN NO',width:20, key: 'LoanNo',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CUSTOMER ID',width:20, key: 'CustomerID' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'CUSTOMER NAME',width:30, key: 'CustomerName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'INITIAL',width:15, key: 'Initial',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'LOAN DATE',width:25, key: 'LoanDate',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}}, 
            {header:'LINE',width:30, key: 'LineName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}  },
            {header:'AREA',width:30, key: 'AreaName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN CATEGORY',width:30, key: 'LoanCategory',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'SHOWROOM_AGENT',width:30, key: 'AgentName' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'TOTAL LOAN AMOUNT',width:25, key: 'TotLoanAmt',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'TOTAL AMOUNT',width:25, key: 'TotAmount',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'INTEREST AMOUNT',width:25, key: 'InterestAmt',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'NET AMOUNT',width:25, key: 'NetAmt',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CREATED BY',width:25, key: 'CreatedBy',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'PAYMENT BY BANK',width:25, key: 'PaymentByBank',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}}, 
            
        ];  
    }
    if(filename=='CollectionRegister.xlsx')
    {
        sheet.columns = [   
            {header:'SNO',width:15, key: 'SNO',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN NO',width:20, key: 'LoanNo',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CUSTOMER ID',width:20, key: 'CustomerID' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'CUSTOMER NAME',width:30, key: 'CustomerName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'INITIAL',width:15, key: 'Initial',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'ENTRY DATE',width:25, key: 'EMIDate',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}}, 
            {header:'LINE',width:30, key: 'LineName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}  },
            {header:'AREA',width:30, key: 'AreaName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN CATEGORY',width:30, key: 'LoanCategory',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'SHOWROOM_AGENT',width:30, key: 'AgentName' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'DUE/PRINCIPAL RECEIPT',width:25, key: 'DueReceipt',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'INTEREST RECEIPT',width:25, key: 'InterestReceipt',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'PENALTY RECEIPT',width:25, key: 'PenaltyReceipt',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'TOTAL RECEIPT',width:25, key: 'Total',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'MACHINE ID',width:25, key: 'MachineID',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'MODE',width:25, key: 'Mode',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'NARRATION',width:25, key: 'Narration',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'RECEIPT NUMBER',width:25, key: 'ReceiptNum',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'CREATED BY',width:25, key: 'CreatedBy',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}}, 
            
        ];  
    }
    if(filename=='BalanceRegister.xlsx')
    {
        sheet.columns = [   
            {header:'SNO',width:15, key: 'SNO',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN NO',width:20, key: 'LoanNo',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CUSTOMER ID',width:20, key: 'CustomerID' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'CUSTOMER NAME',width:30, key: 'CustomerName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'INITIAL',width:15, key: 'Initial',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'LINE',width:30, key: 'LineName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}  },
            {header:'AREA',width:30, key: 'AreaName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN CATEGORY',width:30, key: 'LoanCategory',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'SHOWROOM_AGENT',width:30, key: 'AgentName' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'TOTAL LOAN AMOUNT',width:25, key: 'TotalLoanAmount',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CLOSING LOAN BALANCE',width:25, key: 'LoanBalance',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CLOSING DUE BALANCE',width:25, key: 'DueBalance',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CLOSING PENALTY BALANCE',width:25, key: 'PenBalance',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CLOSING INTEREST BALANCE',width:25, key: 'InterestBalance',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}}
            
        ];  
    }
    if(filename=='ClosedReport.xlsx')
    {
        sheet.columns = [   
            {header:'SNO',width:15, key: 'SNO',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN NO',width:20, key: 'LoanNo',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CUSTOMER ID',width:20, key: 'CustomerID' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'CUSTOMER NAME',width:30, key: 'CustomerName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'INITIAL',width:15, key: 'Initial',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'LINE',width:30, key: 'LineName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}  },
            {header:'AREA',width:30, key: 'AreaName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN CATEGORY',width:30, key: 'LoanCategory',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'SHOWROOM_AGENT',width:30, key: 'AgentName' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'STATUS',width:25, key: 'Status',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'SUB STATUS',width:25, key: 'LoanStatus',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'SPL. STATUS',width:25, key: 'LoanSubStatus',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CLOSED DATE',width:25, key: 'LoanCloseDate',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'TOTAL LOAN AMOUNT',width:25, key: 'TotalLoanAmount',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}}
            
        ];  
    }
    if(filename=='EndReport.xlsx')
    {
        sheet.columns = [   
            {header:'SNO',width:15, key: 'SNO',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN NO',width:20, key: 'LoanNo',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CUSTOMER ID',width:20, key: 'CustomerID' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'CUSTOMER NAME',width:30, key: 'CustomerName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'INITIAL',width:15, key: 'Initial',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'LINE',width:30, key: 'LineName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}  },
            {header:'AREA',width:30, key: 'AreaName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN CATEGORY',width:30, key: 'LoanCategory',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'SHOWROOM_AGENT',width:30, key: 'AgentName' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'LAST RECEIPT DATE',width:25, key: 'LoanEndDate',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LAST RECEIPT AMOUNT',width:25, key: 'Received',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
           
        ];  
    }
    if(filename=='FollowupReport.xlsx')
    {
        sheet.columns = [   
            {header:'SNO',width:15, key: 'SNO',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN NO',width:20, key: 'LoanNo',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'CUSTOMER ID',width:20, key: 'CustomerID' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'CUSTOMER NAME',width:30, key: 'CustomerName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'INITIAL',width:15, key: 'Initial',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'LINE',width:30, key: 'LineName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}  },
            {header:'AREA',width:30, key: 'AreaName',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'LOAN CATEGORY',width:30, key: 'LoanCategory',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'SHOWROOM_AGENT',width:30, key: 'AgentName' ,style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'FOLLOWUP DATE',width:25, key: 'FollowupDate',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'COMMITMENT DATE',width:25, key: 'CommitmentDate',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'ATTENDED BY',width:25, key: 'AttendedBy',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'REMARKS',width:25, key: 'Remarks',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}} },
            {header:'STATUS',width:25, key: 'Status',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'RECEIVED',width:25, key: 'Received',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}},
            {header:'DUE BALANCE',width:25, key: 'DueBalance',style :{border:{ top: {style:'thin'},left: {style:'thin'},bottom: {style:'thin'}, right: {style:'thin'}}}}

        ];  
    }
    if(filename=='DueListReport.xlsx')
    {
sheet.columns=[
{header:'SNo',width:25,key:'SNo'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'LINE',width:25,key:'LINE'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'AREA',width:25,key:'AREA'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'CUSTOMER ID',width:25,key:'CustomerID'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'CUSTOMER NAME',width:25,key:'CustName'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'INITIAL',width:25,key:'Initial	'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'FATHER NAME',width:25,key:'FatherName'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'MOTHER NAME',width:25,key:'MotherName'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'SPOUSE NAME',width:25,key:'SpouseName'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'COMMUNICATION ADDRESS',width:35,key:'CommAddress'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'PRIMARY CONTACT',width:25,key:'CustContact1'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'SECONDARY CONTACT',width:25,key:'CustContact2'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'GUARANTOR NAME',width:25,key:'GuarantorName'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'RELATIONSHIP',width:25,key:'Relationship'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'GUARANTOR RESIDENT TYPE',width:25,key:'GResidentType'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'GUARANTOR ADDRESS',width:35,key:'GAddress'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'GUARANTOR PRIMARY CONTACT',width:25,key:'GContactNum1'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'GUARANTOR SECONDARY CONTACT',width:25,key:'GContactNum2'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'LOAN CATEGORY',width:25,key:'LoanCatID'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'LOAN NO',width:25,key:'LoanNo',style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'LOAN DATE',width:25,key:'LoanDate'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'SHOWROOM_AGENT',width:25,key:'Agent_ShowroomID'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'BRAND',width:25,key:'Label1Value',style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'THINGS',width:25,key:'Label2Value'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'REGD. NO',width:25,key:'Label3Value'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'COLLECTION METHOD',width:25,key:'CollectionMethod'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'AGENT RESPONSIBLE',width:25,key:'AgentResponsible'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'PAYMENT BY BANK',width:25,key:'PaymentByBank'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'NO OF CHEQUE',width:25,key:'NoofCheque',style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'LOAN AMOUNT',width:25,key:'LoanAmt',style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'DUE TYPE',width:25,key:'DueType'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'INTEREST RATE',width:25,key:'IntRate'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'TOTAL LOAN AMOUNT',width:25,key:'TotLoanAmt'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'DOCUMENT CHARGE',width:25,key:'DocCharge'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'SCHEME',width:25,key:'Scheme',style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'INSTALMENTS',width:25,key:'Instalments'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'INTEREST AMOUNT',width:25,key:'InterestAmt'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'TOTAL AMOUNT',width:25,key:'TotAmount'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'FIRST DUE DATE',width:25,key:'FirstDueDt'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'LAST DUE DATE',width:25,key:'LastDueDt'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'INSTALMENT AMOUNT',width:25,key:'InstalmentAmt'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'REMARKS',width:25,key:'Remarks'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'LOAN SUBSTATUS',width:25,key:'LoanSubStatus'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'CREATED BY',width:25,key:'CreatedBy'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'TOTAL RECEIVED',width:25,key:'TotalReceived'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'OPENING LOAN BALANCE',width:25,key:'OLoanBal'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'OPENING DUE BALANCE',width:25,key:'ODueBal'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'OPENING PENALTY BALANCE',width:25,key:'OPenBal'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'OPENING INTEREST BALANCE',width:25,key:'OIntBal'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'DUE AMOUNT',width:25,key:'DueAmt'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'PENALTY AMOUNT',width:25,key:'PenAmt'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'INTEREST AMOUNT',width:25,key:'IntAmt'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'DUE RECEIPT',width:25,key:'DueReceipt'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'PENALTY RECEIPT',width:25,key:'PenReceipt'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'INTEREST RECEIPT',width:25,key:'IntReceipt'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'CLOSING LOAN BALANCE',width:25,key:'CLoanBal'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'CLOSING DUE BALANCE',width:25,key:'CDueBal'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'CLOSING PENALTY BALANCE',width:25,key:'CPenBal'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'CLOSING INTEREST BALANCE',width:25,key:'CIntBal'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'PENDING DUE AMOUNT',width:25,key:'PendingDueAmt'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'PENDING DUE',width:25,key:'PendingDue'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'OD',width:25,key:'OD'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'RECEIVALBE AMOUNT',width:25,key:'ReceivableAmt'		,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}},
{header:'COLLECT DAY',width:25,key:'CollectDay'	,style:{border:{top:{style:'thin'},left:{style:'thin'},bottom:{style:'thin'},right:{style:'thin'}}}}
];
    }
        sheet.addRows(json);
        sheet.getRow(1).font={
            name: 'Calibri',
            family: 4,
            size: 11,
            bold: true
          }
        

        workbook.xlsx.writeBuffer().then(json => {
            const blob = new Blob([json], { type: blobType }); 
            FileSaver.saveAs(blob, filename);
           });
    }
}