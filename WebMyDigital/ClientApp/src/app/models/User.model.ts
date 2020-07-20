export class User {
  constructor(
    public Id: Number,
    public Name: string,
    public LastName: string,
    public Dni: string,
    public NetworkUser: string,
    public Email: string,
    public BirthDate: Date,
    public LowDate: Date
  ) { }
}
