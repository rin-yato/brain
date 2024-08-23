
date: 13-Jan-2024
status: #status/unprocessed 
type: #type/doc 
area: #area/cultivation #area/tech 
keyword: #keyword/cpp 

---

## What de heck is CPP?

C++ is a high-performance, versatile language used for applications, systems software, and games. C and C++ is the goat when it comes to learning DSA.

One of my go-to tutorial video for CPP would be [# C++ Full Course for free ⚡️](https://youtu.be/-TkoO8Z07hI) by `Bro Code`.


## Basic Syntax

These are some of the basic syntax for CPP.

```cpp title="Comment"
// This is a single-line comment

/* This is
a multi-line
comment */
```

```cpp title="Directives"
#include <iostream> // Include the iostream header file
#define PI 3.14159   // Define a constant value for PI
```

```cpp title="Main Function"
int main() {
  // Code statements go here
  return 0; // Return 0 to indicate successful execution
}
```

```cpp title="Data Types"
int age = 25;
float price = 9.99;
char grade = 'A';
bool isReady = true;
```

```cpp title="Variables"
int width; // Variable declaration
width = 10; // Variable assignment

// Variable declaration with initialization
int height = 5; 

// Variable usage in an expression
int area = width * height; 
```

```cpp title="Operators"
int a = 5, b = 3, c;
c = a + b; // Addition operator
c = a * b; // Multiplication operator
c = (a == b) ? 10 : 20; // Ternary operator
```

```cpp title="Control flow statements"
if (score >= 60) {
  cout << "Passed" << endl;
} else {
  cout << "Failed" << endl;
}

for (int i = 0; i < 5; i++) {
  cout << i << " ";
}

while (count > 0) {
  cout << count << " ";
  count--;
}

do {
  cout << "Hello ";
} while (condition);
```

```cpp title="Function"
// Function declaration
int add(int a, int b);

// Function definition
int add(int a, int b) {
  return a + b;
}

// Function call
int result = add(3, 4);
```

```cpp title="Class and Object"
class Rectangle {
private:
  int width;
  int height;

public:
  void setDimensions(int w, int h) {
    width = w;
    height = h;
  }

  int getArea() {
    return width * height;
  }
};

Rectangle rect;
rect.setDimensions(5, 3);
int area = rect.getArea();
```

```cpp title="Standard Input & Output"
#include <iostream>
using namespace std;

int main() {
  int num;
  cout << "Enter a number: ";
  cin >> num;
  cout << "The number is: " << num << endl;
  return 0;
}
```

And that's it for the basic, we'll dive deeper after I attend another class haha.

## Update: 23-Aug-2024

Yup, I never got to attend anymore class 😆.




