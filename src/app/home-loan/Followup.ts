export class Followup
{
    constructor(
        public SNo :Number,
       public FollowupId : Number,
       public LoanID : Number,
       public FollowupDate : Date,
       public CommitmentDate : Date,
       public Remarks : string,
       public AttendedBy : string,
       public FollowupStatus : string

    )
    {}
}