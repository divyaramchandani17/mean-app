module.exports = mongoose => {
    const Employee = mongoose.model(
      "employee",
      mongoose.Schema(
        {
          empNo: String,
          firstName: String,
          lastName: String,
          userName: String,
          password: String,
          email: String,
          age: Number,
          gender: String,
          phoneNo: String,
          department: String,
          salary: Number,
          hireDate: Date,
          jobTitle: String,
          qualification: String,
          noOfExperienceYears: Number
        },
        { timestamps: true }
      )
    );
    return Employee;
  };