type Employe = {
  name: string;
  startDate: Date;
};

type Manager = {
  name: string;
  department: string;
};

// here TYPE can be INTERFACE --------

// interface Employe {
//     name: string;
//     startDate: Date;
// };

// interface Manager {
//     name: string;
//     department: string;
// };



type TeamLead = Employe & Manager;   // intersection

const teamLead: TeamLead = {
  name: "harkirat",
  startDate: new Date(),
  department: "Software Developer",
};

