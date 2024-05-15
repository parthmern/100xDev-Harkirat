// this is interface
interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
}

// here Employee is class that implements the interface of Person
class Employee implements Person {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    // Implement the greet method as required by the Person interface
    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

// here NAME, AGE, GREET all are required with same DataType

//- It has properties (`name` and `age`) matching the structure defined in the interface.
//- The `greet` method is implemented as required by the interface.

const e1 = new Employee("parth", 18) ;
console.log(e1.greet("hellllo"));