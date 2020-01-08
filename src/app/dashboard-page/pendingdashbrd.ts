export class PendingDashboard
{
    constructor(
        public SNo :Number,
        public BranchName:string,
        public LineName:string,
        public AreaName:string,
        public CategoryName:string,
        public AgentName:string,
        public RequestID:Number,
        public RequestDate:Date,
        public Date: Date,
        public CustomerID:Number,
        public CustomerName:string,
        public LoanAmt:Number,
        public ReqStatus:string      
    )
    {}
}