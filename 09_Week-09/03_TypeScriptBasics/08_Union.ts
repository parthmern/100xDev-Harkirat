// TYPE can help you to make union

type StringOrNumber = string | number | boolean;

// function printId(id: (string | number) ){}

function printId(id: StringOrNumber) {
  console.log(`ID: ${id}`);
}

printId(101);     // ID: 101
printId("202");   // ID: 202