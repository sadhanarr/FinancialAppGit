export class Collection
{
    constructor(
        public  SNO :Number,
        public LoanID:Number,
        public  Date:Date,
        public  BillBook :string,
        public EMIID:Number,
        public  DueNo :Number,
        public  DueAmt :Number,
        public  Duereciept :Number,
        public PenaltyAmount:Number,
        public  Penaltyreciept :Number,
        public  penaltyBal :Number,
        public  dueBal :Number,
        public  TotalBal :Number,
        public  Principalreciept :Number,
        public  LoanAmount :Number,
        public MachineID:Number,
        public CreatedBy:string
    )
    {
       
    }
}