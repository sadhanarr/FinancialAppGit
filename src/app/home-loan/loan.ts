export class Loan{
    constructor(
        public CustomerID: Number,
        public CompanyID: Number,
        public BranchID: Number,
        public LineID: Number,
        public StateID: Number,
        public SubAreaID:Number,
        public DistrictID: Number,
        public TalukID: Number,
        public AreaID: Number,
        public CustName: string,
        public Initial: string,
        public FatherName: string,
        public MotherName: string,
        public Gender: string,
        public MaritalStatus: string,
        public SpouseName: string,
        public ResidentType: string,
        public CommAddress: string,
        public PermAddress: string,
        public OccupationType: string,
        public OccupationDetail: string,
        public CustContact1: string,
        public CustContact2: string,
        public CustAadhar: string,
        public CustPanCard: string,
        public CustFamilyCard: string,
        public CustVoterId: string,
        public CustDriveLnce: string,
        public GuarantorName: string,
        public Relationship: string,
        public GContactNum1: string,
        public GContactNum2: string,
        public GAddress: string,
        public GPermAddress: string,
        public GResidentType: string,
        public GAadhar: string,
        public GPanCard: string,
        public GFamilyCard: string,
        public GVoterId: string,
        public GDriveLnce: string,
        public CustStatus: string,
        public CustRemarks: string,
        public Hint1:string,
        public Hint2:string,
        public  LoanID: Number ,
        public  LoanCatID: Number ,
        public  LoanNo: Number ,
        public LoanDate: any ,
        public  LoanMethod:string  ,
        public Agentshowroomid:  Number,
        public  Label1Val: string ,
        public  Label2Val: string ,
        public  Lable3Val: string ,
        public  CollectionMethod:  string,
        public  AgentResp: Boolean ,
        public  Paybybank: Boolean ,
        public  Sectype: string ,
        public  MortgageDoc: Boolean ,
        public  OriginalDoc: Boolean ,
        public  Patta: Boolean ,
        public  RCBook:  Boolean,
        public  Noofheque: string ,
        public  LoanAmt: Number ,
        public  DueType: string ,
        public  IntRate: Number ,
        public  IntType: string ,
        public  LastintDate: Date ,
        public  IntBal: Number ,
        public  TotLoanAmt: Number ,
        public  DocCharge: Number ,
        public  DocChargeRecvd:string  ,
        public  IncentiveCalBy: string ,
        public  IncentiveRatio: Number ,
        public  IncentiveAmt: Number ,
        public  IncentiveType: string ,
        public  SplIncentiveAmt: Number ,
        public  Scheme: string ,
        public  SchemeCalcAmt: Number ,
        public  SchemeAmt: Number ,
        public  SchemeAmtReceived: string ,
        public  Instalments: number ,
        public  InterestAmt:Number  ,
        public  TotAmount: Number ,
        public  FirstDueDt:  any,
        public  LastDueDt: any  ,
        public  InstalmentAmt: Number ,
        public  NetAmt: Number ,
        public  DueBal: Number ,
        public  LastPenCalcDate: Date ,
        public  PenaltyBal: Number ,
        public  LoanBal: Number ,
        public  RoundedOff: boolean ,
        public  LoanStatus: string ,
        public  Remarks:  string,
        public  LoanSubStatus: string ,
        public  RepaymentGrade:  string,
        public  CustomerAttitude:  string,
        public  NOCRemarks:  string,
        public RequestID:Number,
        public PhotoLoc:string,
        public ProdTotAmt:Number,
        public ProdAdvAmt:Number,
        public UserNme:string
    )
    {

    }
}