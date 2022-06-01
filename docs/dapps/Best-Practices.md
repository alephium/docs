# Best practices

Every language has its own idioms, and Ralph is no different. It's important to
follow these idioms so that others who can read Ralph are able to understand
your code. Concise, secure and proficient code will generally follow.

## General advice

When writing smart contract programs, it's necessary to account for how much
storage will be used and how much computation your contract will do.
As space and computation increases, the cost of the contract rises. It's for
this reason you should aim to make the contract as simple as possible, and keep
as much space and computation off-chain as you can.

For example, rather than storing a full document, you can store its hash, as
a proof the document exists.

Another example is instead of storing a full sentence, you can store indices
to an external dictionary, which can then re-construct the full sentence.

Code that interacts with money must be regarded as high risk. Any high risk
code should use many assert and approve calls within close proximity. This
keeps the high risk code in one concentrated place, making it easier to audit
for errors.

## Safety techniques

None at the moment
