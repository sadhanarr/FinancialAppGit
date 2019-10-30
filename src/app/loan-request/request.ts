export class Request
{
    constructor(
    public RequestID:Number , 
	public RequestDate :Date,
	public  CompanyID :Number ,
	public  BranchID :Number ,
	public  LineID  :Number,
	public  StateID :Number ,
	public  DistrictID :Number ,
	public  TalukID  :Number,
	public  AreaID  :Number,
	public  CustomerID :Number ,
	public   CustomerName : string, 
	public  Initial  : string,
	public  FatherName  : string,
	public  MotherName : string,
	public  Gender : string,
	public  MaritalStatus : string,
	public  SpouseName : string,
	public  CommunicationAddress : string,
	public  CustPrimaryContact : string,
	public  CustSecondaryContact : string,
	public  CustAadhar : string,
	public  GuarantorName : string,
	public  Relationship : string,
	public  GContact1 : string,
	public  GContact2 : string,
	public  GAadhar : string,
	public  LoanCatID  :Number,
	public  AgentID :Number, 
	public  AgentResponsibility:string ,
	public  DueType  :string,
	public  IntRate :Number,
	public  LoanPeriod :Number,
	public  TotalAmt :Number,
	public  AdvanceAmt :Number,
	public  SecRatio :Number,
	public  TotalDue :Number,
	public  LoanAmt :Number,
	public  AdvRatio :Number,
	public  RateOfInt :Number,
	public  IntAmount :Number,
	public  ReferedBy  : string,
	public  HowToKnow  : string,
	public  ReqStatus : string,
	public      User : string,
    )
    {

    }
}