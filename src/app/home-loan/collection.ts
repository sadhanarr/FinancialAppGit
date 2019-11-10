export class Collection
{
    constructor(
        public  SNO :Number,
        public LoanID:Number,
        public  Date:Date,

        public  BillBook :string,

        public  DueNo :Number,
        public  DueAmt :Number,
        public  Duereciept :Number,
        public PenaltyAmount:Number,
        public  Penaltyreciept :Number,
        public  penaltyBal :Number,
        public  dueBal :Number,
        public  TotalBal :Number,
    )
    {
       
    }
}