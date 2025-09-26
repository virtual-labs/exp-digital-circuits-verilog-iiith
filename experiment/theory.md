Digital circuits are built using basic logic gates such as AND, OR, NAND, and NOR. These gates form the foundation of all digital systems, enabling complex operations by combining simple binary decisions.

**Logic Gates and Their Functions**

- **AND Gate:** Output is high (1) only if both inputs are high.
- **OR Gate:** Output is high if at least one input is high.
- **NAND Gate:** Output is low only if both inputs are high (inverse of AND).
- **NOR Gate:** Output is high only if both inputs are low (inverse of OR).

**Truth Tables**

| A   | B   | AND | OR  | NAND | NOR |
| --- | --- | --- | --- | ---- | --- |
| 0   | 0   | 0   | 0   | 1    | 1   |
| 0   | 1   | 0   | 1   | 1    | 0   |
| 1   | 0   | 0   | 1   | 1    | 0   |
| 1   | 1   | 1   | 1   | 0    | 0   |

**Verilog Implementation**

Each gate can be implemented in Verilog using the `assign` statement:

<pre>verilog
// AND Gate
module and_gate (
	input A,
	input B,
	output Y
);
	assign Y = A & B;
endmodule

// OR Gate
module or_gate (
	input A,
	input B,
	output Y
);
	assign Y = A | B;
endmodule

// NAND Gate
module nand_gate (
	input A,
	input B,
	output Y
);
	assign Y = ~(A & B);
endmodule

// NOR Gate
module nor_gate (
	input A,
	input B,
	output Y
);
	assign Y = ~(A | B);
endmodule
</pre>

- The `assign` statement is used for combinational logic.
- Inputs are declared as `A` and `B`, output as `Y`.

**Testbench and Simulation**

To verify the logic gates, a testbench is used to apply all possible input combinations and observe the output:

- Declare A and B as registers, Y as a wire.
- Instantiate the gate module.
- Apply input combinations (00, 01, 10, 11) and observe Y.

**Experiment Simulation Steps**

- The simulation page divides the Verilog module and testbench into colored code blocks.
- Drag and drop the code blocks to arrange them in the correct order.
- Complete the code blocks by entering module names, selecting inputs/outputs, and filling in the assign statement.
- Click **Validate** to check your code and view the output truth table.

**Key Points**

- Use the blocking assignment (`=`) for combinational logic.
- Ensure module and testbench names follow Verilog naming conventions.
- Observe how Y responds to A and B in the simulation.
