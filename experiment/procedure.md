# Design of Digital Circuits Using Verilog

## Modules Required -

- Verilog Module
- Verilog Test bench

## Code -

### Verilog Module -  

- The code block that defines inputs, outputs, module name should be placed first, followed by the code block that defines the module functionality and then finally the end of module block.
- Drag and drop the code blocks to arrange them in the order mentioned above.
- Now enter a name for the verilog module. Make sure that the name begins with alphabets and can only include alphanumeric characters and '_' character without any spaces or other special characters in between.
- Select the inputs as A, B and the output as Y.
- Now, to define the functionality of the module, the assign block has to be filled. The Y input has to be assigned the value of (A&B), (A|B), ~(A|B), ~(A&B) for AND, OR, NOR, NAND Logic respectively using the blocking assignment operator (=).
- Fill in the LHS and RHS of the assignment accordingly keeping in mind what value should be assigned to whom.

### Verilog Test Bench -

- The code block that defines test bench name should be placed first, followed by the code block that declares input, output registers and wires, then the block that instantiates the Logic gate module, then the initial block that defines the input A, B waves and finally the end of module block.
- Drag and drop the code blocks to arrange them in the order mentioned above.
- Now enter a name for the verilog test bench. Make sure that the name begins with alphabets and can only include alphanumeric characters and '_' character without any spaces or other special characters in between and it does not match with the verilog module name you have entered earlier.
- Then declare A and B as registers and Y as a wire. (*Y is the output here*).
- Now instantiate the gate module by entering the name of the verilog module you have earlier coded. Select the arguments in the same order as you have chosen in the logic gate module. The order in which you give the arguments here, the inputs and outputs will be used in the same order in the module. For example, you give arguments in the module instantiation in the test bench in the order A, Y, B, then the inputs of the module will become A, Y and the output will become B which is not desired.

## Observations -

- On clicking "validate" option after completing the code (assuming everything is filled correctly) you should see a "Success" message and a truth table under the observations section.
- Observe the input wave and the corresponding expected and observed output Y.

