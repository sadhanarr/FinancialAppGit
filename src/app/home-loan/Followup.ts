export class Followup
{
    constructor(
       public FollowupID : Number,
       public LoanID : Number,
       public FollowupDate : Date,
       public CommitmentDate : Date,
       public FollowupStatus : string,
       public Remarks : string,
       public AttendedBy : string

    )
    {}
}